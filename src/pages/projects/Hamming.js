import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../../layouts/Main';

const sections = {
  about: 'About',
  process: 'Process',
  demo: 'Demo',
};

const HammingCode = () => (
  <Main
    title="Hamming Code Implementation"
    description="Interactive demonstration of Hamming code encoding and decoding"
  >
    <article className="post" id="hamming">
      <header>
        <div className="title">
          <h2>
            <Link to="/projects/hamming">Hamming Code Implementation</Link>
          </h2>
          <p>This page is coming soon!</p>
          <div className="link-container">
            {Object.keys(sections).map((sec) => (
              <h4 key={sec}>
                <a href={`#${sec.toLowerCase()}`}>{sections[sec]}</a>
              </h4>
            ))}
          </div>
        </div>
      </header>

      <section id="about">
        <h2>About</h2>
        <p>
          This project demonstrates the implementation of Hamming codes,
          one of the earliest examples of an error detection and correction algorithm.
        </p>
      </section>

      <section id="process">
        <h2>Process</h2>
        <div className="space-y-4">
          {/* Description of the process */}
        </div>
      </section>

      <section id="demo">
        <h2>Demo</h2>
      </section>
    </article>
  </Main>
);

export default HammingCode;
