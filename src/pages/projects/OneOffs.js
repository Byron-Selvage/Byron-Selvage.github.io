import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../../layouts/Main';

const sections = {
  image_compression: 'Image Compression',
  three_body: 'Three Body',
  strange_attractors: 'Strange Attractors',
};

const OneOffs = () => (
  <Main
    title="One Offs"
    description="Random small projects"
  >
    <article className="post" id="neural-chaos">
      <header>
        <div className="title">
          <h2>
            <Link to="/projects/random">One-Offs</Link>
          </h2>
          <p>
            My random projects that are too small to have their own page.
          </p>
          <div className="link-container">
            {Object.keys(sections).map((sec) => (
              <h4 key={sec}>
                <a href={`#${sec.toLowerCase().replace(/ /g, '-')}`}>{sections[sec]}</a>
              </h4>
            ))}
          </div>
        </div>
      </header>

      <section id="image_compression">
        <h2>Image Compression</h2>
        <p>
          SVD
        </p>
      </section>

      <section id="three_body">
        <h2>Three Body</h2>
        <p>
          dsakl
        </p>
        <img
          src="/images/NeuralChaos/Neuron_Behavior.jpg"
          alt="Figure 1: Neuron Behavior"
          className="centered-figure"
        />
        <figcaption className="figure-caption">TMP</figcaption>
      </section>

      <section id="strange_attractors">
        <h2>Strange Attractors</h2>
        <p>
          DJSKL
        </p>
      </section>
    </article>
  </Main>
);

export default OneOffs;
