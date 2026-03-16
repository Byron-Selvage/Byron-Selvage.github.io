"""
strava_heatmap.py
-----------------
Downloads outdoor cycling activities from Strava and generates an
interactive Folium heatmap, saved to assets/heatmap.html.

Activity streams are cached locally so subsequent runs only fetch GPS
streams for new rides.

Required environment variables:
    STRAVA_CLIENT_ID      - From your Strava API application
    STRAVA_CLIENT_SECRET  - From your Strava API application
    STRAVA_REFRESH_TOKEN  - Obtained via get_strava_token.py (one-time setup)

Optional:
    HEATMAP_OUTPUT        - Output path (default: assets/heatmap.html)
    STRAVA_CACHE_PATH     - Cache file path (default: assets/strava_cache.json)
    HEATMAP_MARKDOWN_PATH - Markdown file to update (default: _pages/heatmap.md)
"""

import json
import os
import sys
import time
from datetime import datetime, timezone, timedelta

import folium
import requests
from folium.plugins import HeatMap

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
CLIENT_ID     = os.environ["STRAVA_CLIENT_ID"]
CLIENT_SECRET = os.environ["STRAVA_CLIENT_SECRET"]
REFRESH_TOKEN = os.environ["STRAVA_REFRESH_TOKEN"]
OUTPUT_PATH   = os.environ.get("HEATMAP_OUTPUT", "assets/heatmap.html")
CACHE_PATH    = os.environ.get("STRAVA_CACHE_PATH", "assets/strava_cache.json")
MARKDOWN_PATH = os.environ.get("HEATMAP_MARKDOWN_PATH", "_pages/heatmap.md")

STRAVA_TOKEN_URL = "https://www.strava.com/oauth/token"
STRAVA_API_BASE  = "https://www.strava.com/api/v3"

# Strava rate limits: 100 req / 15 min, 1000 req / day
# A small sleep between stream requests keeps us safe for large histories.
STREAM_REQUEST_DELAY = 0.3  # seconds
MAX_POINTS_PER_RIDE = 25000
MAX_HEATMAP_POINTS_ALL = 1000000
MAX_HEATMAP_POINTS_FILTERED = 1000000
CENTURY_DISTANCE_METERS = 160934.4  # 100 miles
METERS_TO_MILES = 0.000621371
METERS_TO_FEET = 3.28084
CACHE_VERSION = 1
MAP_MAX_ZOOM = 16

STATS_START_MARKER = "<!-- STATS:START -->"
STATS_END_MARKER   = "<!-- STATS:END -->"


def empty_cache() -> dict:
    """Return the default cache schema."""
    return {"version": CACHE_VERSION, "activities": {}}


# ---------------------------------------------------------------------------
# Strava API helpers
# ---------------------------------------------------------------------------

def get_access_token() -> str:
    """Exchange the refresh token for a short-lived access token."""
    resp = requests.post(STRAVA_TOKEN_URL, data={
        "client_id":     CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "refresh_token": REFRESH_TOKEN,
        "grant_type":    "refresh_token",
    })
    resp.raise_for_status()
    token = resp.json()["access_token"]
    print("Access token obtained.")
    return token


def get_outdoor_rides(access_token: str) -> list[dict]:
    """
    Fetch all activities and return only outdoor (non-trainer, non-manual)
    rides that have GPS data (map.summary_polyline is non-empty).
    """
    headers    = {"Authorization": f"Bearer {access_token}"}
    activities = []
    page       = 1

    print("Fetching activity list from Strava...", end="", flush=True)
    while True:
        resp = requests.get(
            f"{STRAVA_API_BASE}/athlete/activities",
            headers=headers,
            params={"per_page": 200, "page": page},
        )
        resp.raise_for_status()
        batch = resp.json()
        if not batch:
            break

        for a in batch:
            is_ride        = a.get("type") == "Ride"
            is_outdoor     = not a.get("trainer", False) and not a.get("manual", False)
            has_gps        = bool(a.get("map", {}).get("summary_polyline"))
            if is_ride and is_outdoor and has_gps:
                activities.append(a)

        print(".", end="", flush=True)
        page += 1

    print(f"\nFound {len(activities)} outdoor rides with GPS data.")
    return activities


def load_cache(cache_path: str) -> dict:
    """Load ride stream cache from disk, returning an empty cache if missing."""
    if not os.path.exists(cache_path):
        return empty_cache()

    try:
        with open(cache_path, "r", encoding="utf-8") as f:
            cache = json.load(f)
    except (json.JSONDecodeError, OSError):
        # Corrupt cache should not break the job; start fresh.
        return empty_cache()

    if not isinstance(cache, dict):
        return empty_cache()

    activities = cache.get("activities")
    if not isinstance(activities, dict):
        activities = {}

    return {
        "version": CACHE_VERSION,
        "activities": activities,
    }


def save_cache(cache_path: str, cache: dict) -> None:
    """Persist cache to disk."""
    os.makedirs(os.path.dirname(cache_path) or ".", exist_ok=True)
    with open(cache_path, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2)


def coerce_float(value, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def coerce_int(value, default: int = 0) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def format_date_with_ordinal(dt: datetime) -> str:
    """Format datetime as 'March 15th, 2026'."""
    day = dt.day
    if 10 <= day % 100 <= 20:
        suffix = "th"
    else:
        suffix = {1: "st", 2: "nd", 3: "rd"}.get(day % 10, "th")
    return f"{dt.strftime('%B')} {day}{suffix}, {dt.year}"


def calculate_stats(rides: list[dict], total_points: int) -> dict:
    """Build aggregate summary values for _pages/heatmap.md and console output."""
    distance_m = sum(coerce_float(r.get("distance")) for r in rides)
    elevation_m = sum(coerce_float(r.get("total_elevation_gain")) for r in rides)
    elapsed_s = sum(coerce_int(r.get("elapsed_time")) for r in rides)

    return {
        "total_rides": len(rides),
        "total_distance_mi": distance_m * METERS_TO_MILES,
        "total_elevation_ft": elevation_m * METERS_TO_FEET,
        "total_elapsed_hours": elapsed_s / 3600.0,
        "total_points": total_points,
        "generated_date": format_date_with_ordinal(datetime.now(timezone.utc)),
    }


def build_stats_markdown(stats: dict) -> str:
    """Render markdown block that will be injected into _pages/heatmap.md."""
    return "\n".join([
        STATS_START_MARKER,
        "## Ride Statistics",
        "",
        f"- Total rides: **{stats['total_rides']:,}**",
        f"- Total distance: **{stats['total_distance_mi']:.1f} mi**",
        f"- Total elevation gain: **{stats['total_elevation_ft']:.0f} ft**",
        f"- Total elapsed time: **{stats['total_elapsed_hours']:.1f} h**",
        f"- GPS points plotted: **{stats['total_points']:,}**",
        f"- Last updated: **{stats['generated_date']}**",
        STATS_END_MARKER,
    ])


def update_markdown_stats(markdown_path: str, stats: dict) -> None:
    """Replace or append the generated stats section in _pages/heatmap.md."""
    if not os.path.exists(markdown_path):
        print(f"! Markdown file not found at {markdown_path}. Skipping stats update.")
        return

    with open(markdown_path, "r", encoding="utf-8") as f:
        content = f.read()

    stats_block = build_stats_markdown(stats)

    if STATS_START_MARKER in content and STATS_END_MARKER in content:
        start_idx = content.index(STATS_START_MARKER)
        end_idx = content.index(STATS_END_MARKER) + len(STATS_END_MARKER)
        updated = content[:start_idx].rstrip() + "\n\n" + stats_block + "\n"
        if end_idx < len(content):
            tail = content[end_idx:].lstrip("\n")
            if tail:
                updated += "\n" + tail
    else:
        spacer = "\n\n" if not content.endswith("\n") else "\n"
        updated = content + spacer + stats_block + "\n"

    with open(markdown_path, "w", encoding="utf-8") as f:
        f.write(updated)

    print(f"Stats updated in {markdown_path}")


def get_activity_latlng(activity_id: int, access_token: str) -> list[list[float]]:
    """Fetch the latlng GPS stream for a single activity."""
    headers = {"Authorization": f"Bearer {access_token}"}
    resp = requests.get(
        f"{STRAVA_API_BASE}/activities/{activity_id}/streams",
        headers=headers,
        params={"keys": "latlng", "key_by_type": "true"},
    )
    # Gracefully handle missing streams (e.g. privacy zones wiped the data)
    if resp.status_code == 404:
        return []
    resp.raise_for_status()
    data = resp.json()
    return data.get("latlng", {}).get("data", [])


# ---------------------------------------------------------------------------
# Map generation
# ---------------------------------------------------------------------------

def parse_ride_datetime(ride: dict) -> datetime | None:
    """Parse ride start date from Strava payload into timezone-aware UTC datetime."""
    raw = ride.get("start_date") or ride.get("start_date_local")
    if not isinstance(raw, str) or not raw:
        return None
    try:
        return datetime.fromisoformat(raw.replace("Z", "+00:00")).astimezone(timezone.utc)
    except ValueError:
        return None


def downsample_coords(coords: list[list[float]], max_points: int = MAX_POINTS_PER_RIDE) -> list[list[float]]:
    """Reduce points per ride to keep browser rendering responsive."""
    if len(coords) <= max_points:
        return coords

    step = max(1, (len(coords) + max_points - 1) // max_points)
    sampled = coords[::step]
    if sampled and sampled[-1] != coords[-1]:
        sampled.append(coords[-1])
    return sampled


def build_heatmap_points(rides_data: list[dict], max_total_points: int) -> list[list[float]]:
    """Build a bounded list of coordinates for a heatmap layer."""
    points: list[list[float]] = []
    for ride in rides_data:
        points.extend(downsample_coords(ride["coords"]))

    if not points:
        return []

    if len(points) > max_total_points:
        step = max(1, (len(points) + max_total_points - 1) // max_total_points)
        points = points[::step]
    return points


def add_heat_layer(
    map_obj: folium.Map,
    rides_data: list[dict],
    layer_name: str,
    max_total_points: int,
    show: bool,
) -> int:
    """Add a heatmap feature group and return number of points rendered."""
    # overlay=False makes these mutually exclusive radio options in LayerControl.
    group = folium.FeatureGroup(name=layer_name, show=show, overlay=False)
    points = build_heatmap_points(rides_data, max_total_points=max_total_points)

    if points:
        HeatMap(
            points,
            radius=10,
            blur=11,
            max_zoom=MAP_MAX_ZOOM,
        ).add_to(group)

    group.add_to(map_obj)
    return len(points)


def build_heatmap(rides_data: list[dict], output_path: str) -> dict:
    """Render a performant multi-layer heatmap map and save to output_path."""
    all_coords = [pt for ride in rides_data for pt in ride["coords"]]
    if not all_coords:
        print("No coordinates to plot — exiting.", file=sys.stderr)
        sys.exit(1)

    lats   = [p[0] for p in all_coords]
    lngs   = [p[1] for p in all_coords]
    center = [sum(lats) / len(lats), sum(lngs) / len(lngs)]

    m = folium.Map(
        location=center,
        control_scale=True,
        zoom_start=12,
        max_zoom=MAP_MAX_ZOOM,
        tiles=None,
        prefer_canvas=True,
    )
    folium.TileLayer("Cartodb Positron", control=False, max_zoom=MAP_MAX_ZOOM).add_to(m)

    now = datetime.now(timezone.utc)
    cutoff_90 = now - timedelta(days=90)

    rides_last_90 = [r for r in rides_data if r.get("start_dt") and r["start_dt"] >= cutoff_90]
    rides_centuries = [r for r in rides_data if r.get("distance_m", 0.0) >= CENTURY_DISTANCE_METERS]

    rendered_all = add_heat_layer(
        m,
        rides_data,
        layer_name="All Rides",
        max_total_points=MAX_HEATMAP_POINTS_ALL,
        show=True,
    )
    rendered_90 = add_heat_layer(
        m,
        rides_last_90,
        layer_name="Last 90 Days",
        max_total_points=MAX_HEATMAP_POINTS_FILTERED,
        show=False,
    )
    rendered_centuries = add_heat_layer(
        m,
        rides_centuries,
        layer_name="Centuries",
        max_total_points=MAX_HEATMAP_POINTS_FILTERED,
        show=False,
    )

    folium.LayerControl(collapsed=True, position="topright").add_to(m)

    # Subtle branding in bottom-right
    title_html = """
    <div style="
        position: fixed; bottom: 30px; right: 15px; z-index: 1000;
        background: rgba(0,0,0,0.55); color: #ccc;
        font-family: monospace; font-size: 11px;
        padding: 6px 10px; border-radius: 4px;
        pointer-events: none;">
        Strava Cycling Heatmap
    </div>
    """
    m.get_root().html.add_child(folium.Element(title_html))

    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
    m.save(output_path)
    print(f"Heatmap saved → {output_path}")
    return {
        "points_all": rendered_all,
        "points_last_90": rendered_90,
        "points_centuries": rendered_centuries,
    }


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main():
    token = get_access_token()
    rides = get_outdoor_rides(token)

    if not rides:
        print("No qualifying rides found. Nothing to plot.")
        return

    cache = load_cache(CACHE_PATH)
    cached_activities: dict = cache.get("activities", {})
    rides_data: list[dict] = []
    total_points_collected = 0
    total = len(rides)
    fetched_new_streams = 0
    used_cached_streams = 0
    active_ids: set[str] = set()

    for i, ride in enumerate(rides, start=1):
        rid  = ride["id"]
        rid_key = str(rid)
        name = ride.get("name", "Unnamed")
        active_ids.add(rid_key)
        print(f"  [{i:>4}/{total}] {name} (id={rid}) ... ", end="", flush=True)

        cached_entry = cached_activities.get(rid_key)
        cached_coords = cached_entry.get("coords") if isinstance(cached_entry, dict) else None
        if isinstance(cached_coords, list):
            coords = cached_coords
            used_cached_streams += 1
            print(f"{len(coords)} pts (cache)")
        else:
            coords = get_activity_latlng(rid, token)
            fetched_new_streams += 1
            print(f"{len(coords)} pts (new)")
            time.sleep(STREAM_REQUEST_DELAY)

        cached_activities[rid_key] = {
            "id": rid,
            "name": name,
            "start_date": ride.get("start_date"),
            "start_date_local": ride.get("start_date_local"),
            "distance": ride.get("distance", 0.0),
            "total_elevation_gain": ride.get("total_elevation_gain", 0.0),
            "moving_time": ride.get("moving_time", 0),
            "elapsed_time": ride.get("elapsed_time", 0),
            "coords": coords,
        }

        total_points_collected += len(coords)
        rides_data.append({
            "id": rid,
            "name": name,
            "coords": coords,
            "distance_m": coerce_float(ride.get("distance"), 0.0),
            "start_dt": parse_ride_datetime(ride),
        })

    # Keep cache scoped to currently qualifying rides only.
    cache["activities"] = {rid: cached_activities[rid] for rid in sorted(active_ids)}
    save_cache(CACHE_PATH, cache)

    print(f"\nTotal GPS points collected: {total_points_collected:,}")
    rendered = build_heatmap(rides_data, OUTPUT_PATH)

    stats = calculate_stats(
        rides=rides,
        total_points=total_points_collected,
    )
    update_markdown_stats(MARKDOWN_PATH, stats)

    print(
        "Run summary: "
        f"{fetched_new_streams} new streams, "
        f"{used_cached_streams} cached streams, "
        f"{stats['total_rides']} rides total, "
        f"{rendered['points_all']:,} all-ride heatmap points rendered."
    )


if __name__ == "__main__":
    main()