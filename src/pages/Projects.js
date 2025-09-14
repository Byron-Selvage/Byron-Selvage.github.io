import React, { useState } from 'react';
import Link from 'next/link';

import Main from '../layouts/Main';

import CategoryButton from '../components/Resume/Skills/CategoryButton';
import Cell from '../components/Projects/Cell';
import data from '../data/projects/projects';
import tags from '../data/projects/tags';

const Projects = () => {
  const initialButtons = {
    All: true,
    ...Object.fromEntries(tags.map((tag) => [tag, false])),
  };

  const [buttons, setButtons] = useState(initialButtons);

  const handleChildClick = (label) => {
    const newButtons = Object.keys(buttons).reduce(
      (obj, key) => ({
        ...obj,
        [key]: label === key && !buttons[key],
      }),
      {},
    );
    if (label === 'All' || !Object.values(newButtons).slice(1).some((value) => value)) {
      newButtons.All = true;
    }
    setButtons(newButtons);
  };

  const filteredProjects = () => {
    const activeTag = Object.keys(buttons).find((key) => buttons[key]);
    if (activeTag === 'All') {
      return data;
    }
    return data.filter((project) => project.tags.includes(activeTag));
  };

  const getButtons = () => Object.keys(buttons).map((key) => (
    <CategoryButton
      label={key}
      key={key}
      active={buttons}
      handleClick={handleChildClick}
    />
  ));

  return (
    <Main title="Projects" description="Learn about Byron Selvage's projects.">
      <article className="post" id="projects">
        <header>
          <div className="title">
            <h2>
              <Link href="/projects">Projects</Link>
            </h2>
            <p>Click project title to learn more</p>
          </div>
        </header>
        <div className="skill-button-container">{getButtons()}</div>
        <div className="project-row-container">
          {filteredProjects().map((project) => (
            <Cell data={project} key={project.title} />
          ))}
        </div>
      </article>
    </Main>
  );
};

export default Projects;
