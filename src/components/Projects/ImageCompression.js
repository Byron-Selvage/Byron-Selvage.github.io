import React, { useState } from 'react';

const ImageCompression = () => {
  const ranks = [1, 5, 15, 25, 50, 150, 300, 512];
  const storageSavings = {
    1: 99.61,
    5: 98.04,
    15: 94.13,
    25: 90.22,
    50: 80.45,
    150: 41.35,
    300: 24.12,
    512: 0,
  };

  // Initial state for rank and image
  const [selectedRank, setSelectedRank] = useState(512);

  return (
    <section id="image_compression">
      <div className="image-compression-container">
        <div className="image-display">
          <h3>Low-Rank Approximation</h3>
          <img
            src={`/images/ImageCompression/rank_${selectedRank}.png`}
            alt={`Rank ${selectedRank} Approximation`}
            className="image"
          />
          <p className="storage-text">
            Storage Saved: {storageSavings[selectedRank]}%
          </p>
        </div>

        <div className="slider-container">
          <input
            type="range"
            min={0}
            max={ranks.length - 1}
            value={ranks.indexOf(selectedRank)}
            onChange={(e) => setSelectedRank(ranks[e.target.value])}
            aria-label="Select rank"
            list="rank-ticks"
          />
          <div className="tick-marks">
            {ranks.map((rank) => (
              <div key={rank} className="tick">
                <span className="tick-label">{rank}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCompression;
