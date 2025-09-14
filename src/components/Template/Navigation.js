import React from 'react';
import Link from 'next/link';

import Hamburger from './Hamburger';
import routes from '../../data/routes';

// Websites Navbar, displays routes defined in 'src/data/routes'
const Navigation = () => (
  <header id="header">
    {/* Static "Byron Selvage" without Link */}
    <h1 className="index-link">
      {routes
        .filter((l) => l.index)
        .map((l) => (
          <span key={l.label}>
            {l.label}
          </span>
        ))}
    </h1>
    <nav className="links">
      <ul>
        {routes
          .filter((l) => !l.index)
          .map((l) => (
            <li key={l.label}>
              <Link href={l.path}>{l.label}</Link>
            </li>
          ))}
      </ul>
    </nav>
    <Hamburger />
  </header>
);

export default Navigation;
