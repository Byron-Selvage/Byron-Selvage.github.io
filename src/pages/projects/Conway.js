import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../../layouts/Main';
import GameOfLife from '../../components/Projects/GameOfLife';

// TODO: Improve writing, complete demo
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
            <Link to="/projects/conways-game-of-life">Conway&apos;s Game of Life</Link>
          </h2>
          <p>A project exploring cellular automata, its history, and a modern interactive demo.</p>
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
          Conway&apos;s Game of Life, a cellular automaton
          devised by mathematician John Conway in 1970,
          simulates the evolution of cells on a grid based on simple rules.
          Originally, I implemented the Game of Life using MATLAB in Fall 2023 to
          practice fundamental programming techniques. This new version modernizes
          the project with an interactive React-based interface.
        </p>
        <p>
          The Game of Life is not only a fun programming challenge
          but also a rich topic in computational theory,
          demonstrating emergent complexity from simple rules.
          It has fascinated computer scientists, mathematicians,
          and hobbyists for decades.
        </p>
      </section>

      <section id="rules">
        <h2>Rules</h2>
        <p>The Game of Life operates on a grid of cells,
          each of which can be in one of two states: alive or dead.
          The state of the grid evolves in steps, following these simple rules:
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
          Choose from preset starting grids or click on cells to toggle them
          before starting the simulation. Watch how patterns evolve over time!
        </p>
        <GameOfLife /> {/* Include the interactive Game of Life component */}
      </section>
    </article>
  </Main>
);

export default ConwaysGameOfLife;
