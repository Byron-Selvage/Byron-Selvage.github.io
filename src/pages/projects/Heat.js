import React from 'react';
import Link from 'next/link';
import Main from '../../layouts/Main';

const sections = {
  about: 'About',
  model: 'Model Variables',
  class: 'Class',
  code: 'Code',
};

const Heat = () => (
  <Main
    title="Heat Diffusion"
    description="Heat Diffusion Model in C++"
  >
    <article className="post" id="heat">
      <header>
        <div className="title">
          <h2>
            <Link href="/projects/heat-diffusion">Heat Diffusion</Link>
          </h2>
          <p>A CSCI200: Programming Concepts project</p>
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
          This project visualizes the one-dimensional heat distribution of a bar
          over time using the 1D heat equation. Users can control simulation variables like
          thermal diffusivity and select an initial temperature profile. The program
          reads the initial profile from a file, performs a time-stepping simulation
          using the explicit finite difference method, and visualizes the evolving bar
          temperature using SFML.
        </p>
      </section>

      <section id="model">
        <h2>Model Variables</h2>
        <p>
          This model relies on the variables thermal diffusivity, end temperature,
          and initial temperature profile.
        </p>
        <p>
          Thermal diffusivity controls the rate of heat dispersion in the bar.
          For this simulation, recommended values are between 0.1 and 0.5 as higher
          values can cause irregularities with the finte difference method. Note that
          this is simply a limitation of the finite difference method used to calculate
          the temperatures over time.
        </p>
        <p>
          End temperature represents the fixed temperature at the ends of the bar. As the
          simulation runs, this is the value the temperature in the bar is expected to
          tend towards.
        </p>
        <p>
          Initial temperature profile defines the initial temperature distribution within
          the bar. My code allows you to choose from one of five initial temperature
          distributions: Linear, Normal, Point, Segmented, and Sinusiodal.
        </p>
      </section>

      <section id="class">
        <h2>Class</h2>
        <p>
          The program is structured with a HeatSim class that encapsulates the simulation logic.
          The custom HeatSim class contains the _temperatures vector representing the discrete
          temperature values along the bar, the thermal diffusivity _alpha, and helper variables
          _min and _max tracking the temperature range. Key member functions are the constructor
          to initialize values, setInitialProfile to read the starting _temperatures from a file,
          simulate to update _temperatures for the next time step via finite differences, and
          getter functions.
        </p>
      </section>

      <section id="code">
        <h2>Code</h2>
        <p>
          <a href="https://github.com/Byron-Selvage/CSCI200_Heat_Diffusion" target="_blank" rel="noreferrer">This projects code can be found on my GitHub here</a>.
          To run this program for yourself, compile the main.cpp file and run the resulting
          final.exe.
          The program will prompt user inputs for thermal diffusivity, end temperature, and initial
          temperature profile choice. After entering these values, an SFML window will appear
          showing the initial temperature state. The white bar represents the zero line, while the
          red linerepresents the temperature at each position along the bar.
          Select the SFML window and press Enter to begin the simulation, which will evolve the
          temperature over time based on the inputs until the window is closed.
        </p>
        <p>
          This project helped solidify my understanding of core C++ concepts like classes, file I/O,
          and external libraries. If I were to revisit this project, I would like to expand the
          simulation to 2D or even 3D, add color maps for better visualations, and allow
          for user-defined initial heat profiles.

        </p>
      </section>

    </article>
  </Main>
);

export default Heat;
