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
    name: 'Colorado School of Mines',
    position: 'Undergraduate Researcher',
    startDate: '2024-08-19',
    summary: 'As an Undergraduate Researcher at Colorado School of Mines, I am working as part of an interdisciplinary team combining experience in chemistry, physics, mathematics, and computer science. I am contributing to the development of Active Subspace Coarse-Graining, a novel computational framework for studying protein complex biogenesis and dynamics with potential applications in biotechnology, nanomedicine, and computational tool development.',
    highlights: [
      'Derivation of equations of motion guiding subatomic particles in non-cartesian coordinate systems.',
      'Contributions to machine learning models in the Active Subspace Coarse-Graining workflow.',
    ],
  },
  {
    name: 'Red Rocks Community College',
    position: 'Math Tutor',
    startDate: '2022-08-19',
    summary: ' As a Math Tutor at Red Rocks Community College, I provide support to students in courses from Pre-Calculus to Differential Equations and Linear Algebra. I am responsible for managing the Math Lab, ensuring students receive appropriate and productive assistance.',
    highlights: [
      'Assist up to 30 students at one time with understanding mathematical concepts and developing problem-solving skills.',
      'Communicate concepts clearly to students with varying levels of mathematical experience and comfort.',
      'Collaborate with other tutors to ensure all students get the support they need.',
      'Maintain a safe and welcoming environment in the math lab.',
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
