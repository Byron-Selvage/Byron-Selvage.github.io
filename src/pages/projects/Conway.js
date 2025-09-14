import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Main from '../../layouts/Main';

const GameOfLife = dynamic(
  () => import('../../components/Projects/GameOfLife').catch((err) => {
    console.error('Failed to load GameOfLife:', err);
  }),
  { ssr: false },
);

// TODO: Improve writing
const sections = {
  about: 'About',
  rules: 'Rules',
  demo: 'Demo',
};

const ConwaysGameOfLife = () => (
  <Main
    title="Conway's Game of Life"
    description="Explore Conway's Game of Life with a playable demo"
  >
    <article className="post" id="conway">
      <header>
        <div className="title">
          <h2>
            <Link href="/projects/conway">Conway&apos;s Game of Life</Link>
          </h2>
          <div className="link-container">
            {Object.keys(sections).map((sec) => (
              <h4 key={sec}>
                <a href={`#${sec.toLowerCase().replace(/ /g, '-')}`}>{sections[sec]}</a>
              </h4>
            ))}
          </div>
        </div>
      </header>

      <section id="about">
        <h2>About</h2>
        <p>
          Conway&apos;s Game of Life is a 2D cellular automaton
          created by mathematician John Conway in 1970. The Game of
          Life simulates the evolution of cells based on only four simple rules.
          Despite it&apos;s simplicity, the Game of Life is Turing complete.
          This means that anything that can be computed algorithmically can be
          computed within the Game of Life.
        </p>
        <p>
          I originally implemented the Game of Life using MATLAB in Fall 2023 to
          practice basic MATLAB syntax. As I revisited that project during the creation
          of this page however, I was inspired to create a new version. Below you
          will find an interactive React-based implementation of the Game of Life.
          I encourage you to try it out for yourself!
        </p>
      </section>

      <section id="rules">
        <h2>Rules</h2>
        <p>The Game of Life operates on a grid of cells,
          each of which can be either alive or dead.
          The state of the grid evolves in steps, following these four rules:
        </p>
        <ul>
          <li><b>Underpopulation:</b> A live cell with fewer than two live neighbors dies.</li>
          <li><b>Overpopulation:</b> A live cell with more than three live neighbors dies.</li>
          <li><b>Survival:</b>
            A live cell with two or three live neighbors lives on to the next generation.
          </li>
          <li><b>Reproduction:</b>
            A dead cell with exactly three live neighbors becomes a live cell.
          </li>
        </ul>
      </section>

      <section id="demo">
        <h2>Demo</h2>
        <p>
          Below is an interactive version of Conway&apos;s Game of Life.
          Choose from the preset starting grids or click on cells to make your own.
          Then start the simulation and see how the system evolves over time!
        </p>
        <GameOfLife />
      </section>
    </article>
  </Main>
);

export default ConwaysGameOfLife;
