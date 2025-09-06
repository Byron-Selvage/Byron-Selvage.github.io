/**
 * @typedef {Object} Position
 * Conforms to https://jsonresume.org/schema/
 *
 * @property {string} name - Name of the company
 * @property {string} position - Position title
 * @property {string} url - Company website
 * @property {string} startDate - Start date of the position in YYYY-MM-DD format
 * @property {string|undefined} endDate - End date of the position in YYYY-MM-DD format.
 * If undefined, the position is still active.
 * @property {string|undefined} summary - html/markdown summary of the position
 * @property {string[]} highlights - plain text highlights of the position (bulleted list)
 */
const work = [
  {
    name: 'National Renewable Energy Laboratory',
    position: 'Research Intern',
    startDate: '2025-05-19',
    summary: 'Worked as a research intern in the AI, Learning, and Intelligent Systems (ALIS) group at the NREL, focusing on the development of open-source tools for global optimization, surrogate modeling, and black-box problem solving.',
    highlights: [
      'Developed and published pyGOLD, an open-source Python library for testing global optimization algorithms.',
      'Contributed to SOOGO, an open-source surrogate-based optimization library for black box problems.',
      'Designed abstract interfaces and modular architecture for extendibility and user integration.',
      'Implemented automated testing & deployment workflows with extensive user documentation.',
      'Presented work in meetings, a research paper, and a poster session.',
      'Selected to extend internship at NREL based on demonstrated contributions and performance.',
    ],
  },
  {
    name: 'Colorado School of Mines',
    position: 'Undergraduate Researcher',
    startDate: '2024-08-19',
    endDate: '2025-05-19',
    summary: 'Contributed to the development of Active Subspace Coarse-Graining, a novel computational framework for studying protein complex biogenesis and dynamics with potential applications in biotechnology, nanomedicine, and computational tool development.',
    highlights: [
      'Derived equations of motion guiding subatomic particles in non-Cartesian coordinate systems.',
      'Built machine learning models in the Active Subspace Coarse-Graining workflow.',
    ],
  },
  {
    name: 'Red Rocks Community College',
    position: 'Math Tutor',
    startDate: '2022-08-19',
    summary: 'Supported students in courses from Pre-Calculus to Differential Equations and Linear Algebra.',
    highlights: [
      'Assisted up to 30 students at one time with understanding mathematical concepts and developing problem-solving skills.',
      'Communicated concepts clearly to students with varying levels of mathematical experience and comfort.',
      'Collaborated with other tutors to ensure all students received the support they needed.',
      'Maintained a safe and welcoming environment in the math lab.',
    ],
  },
  {
    name: 'DBGB LLC',
    position: 'Co-Founder',
    startDate: '2020-06-19',
    endDate: '2024-08-19',
    summary: ' In June of 2020, I Co-Founded DBGB LLC, an automotive parts company. Starting from an initial investment of $300, DBGB has achieved sales of over 15,000 parts and quarterly revenues exceeding $100,000. I oversaw all facets of the business, from the acquisition and disassembly of vehicles to managing inventory systems, optimizing online sales strategies, and expanding into vehicle repairs.',
    highlights: [
      'Performed market analysis to identify pathways of growth.',
      'Managed online inventory systems.',
      'Managed business operations.',
      'Conducted vehicle maintenance, repair, and disassembly.',
    ],
  },
];

export default work;
