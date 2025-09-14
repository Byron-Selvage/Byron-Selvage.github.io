import React from 'react';
import Link from 'next/link';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link href="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.jpg`} alt="" />
      </Link>
      <header>
        <h2>Byron Selvage</h2>
        <p>
          <a href="mailto:bselvage20@gmail.com">BSelvage20@gmail.com</a>
        </p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>
        Hi, I&apos;m Byron. I am a senior at{' '}
        <a href="https://www.mines.edu/" target="_blank" rel="noopener noreferrer">Colorado School of Mines </a>
        studying Computational and Applied Mathematics. I am passionate about
        solving complex problems in data science, mathematical modeling, and simulation.
        While you&apos;re here, check out my resume and projects!
      </p>
      <ul className="actions">
        <li>
          {window.location.pathname === '/' ? (
            <Link href="/projects" className="button">
              My Projects
            </Link>
          ) : (
            <Link href="/" className="button">
              Learn More
            </Link>
          )}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">
        &copy; Byron Selvage <Link href="/">Byron-Selvage.github.io</Link>.
      </p>
    </section>
  </section>
);

export default SideBar;
