import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../../layouts/Main';

const sections = {
  about: 'About',
};

const StudentOutcomes = () => (
  <Main
    title="Student Outcomes"
    description="Using Python and machine learning libraries like Scikit-Learn and TensorFlow to predict student outcomes from education data"
  >
    <article className="post" id="neural-chaos">
      <header>
        <div className="title">
          <h2>
            <Link to="/projects/student-outcomes">Student Outcomes</Link>
          </h2>
          <p>
            A Data Science (CSCI 330) project in collaboration with <a href="https://www.linkedin.com/in/melody-goldanloo" target="_blank" rel="noreferrer">Melody Goldanloo</a> and
            Jenna Ramsey-Rutledge
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

      <section id="About">
        <h2>About</h2>
        <p>
          Full writeup coming soon! In the meantime, feel free to check
          out the project&apos;s code on <a href="https://github.com/melody-gold/csci303_semester_project" target="_blank" rel="noreferrer">GitHub</a>!
        </p>
      </section>
    </article>
  </Main>
);

export default StudentOutcomes;
