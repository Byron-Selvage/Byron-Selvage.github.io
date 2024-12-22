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
    summary: 'IMPROVEMENTS NEEDED TO ALLWorking on a project with potential applications in biotechnology, nanomedicine, and computational tool development. The project aims to develop and apply innovative computational frameworks to understand protein complex biogenesis and dynamics.',
    highlights: [
      'Utilizing techniques such as all-atom molecular dynamics, coarse-grained modeling, and machine learning.',
      'Collaborating within an interdisciplinary team combining experience in Chemistry, Physics, Mathematics, and Computer Science.',
    ],
  },
  {
    name: 'Red Rocks Community College',
    position: 'Math Tutor',
    startDate: '2022-08-19',
    summary: 'Collaborated alongside a fellow tutor to manage a math lab serving up to 30 students, offering support across a broad spectrum of math subjects spanning precalculus, calculus, differential equations, and linear algebra.',
    highlights: [
      'Developed multi-tasking and communication skills by managing multiple students with varying needs, learning styles, and mathematical backgrounds while maintaining clear explanations of complex concepts',
    ],
  },
  {
    name: 'DBGB LLC',
    position: 'Co-Founder',
    startDate: '2020-06-19',
    endDate: '2024-08-19',
    summary: 'Starting from an initial investment of $300, DBGB, an automotive parts company, achieved sales of over 15,000 parts and quarterly revenues exceeding $100,000. Responsibilities included overseeing all facets of the business, from the acquisition and disassembly of vehicles to managing inventory systems, optimizing online sales strategies, and expanding into vehicle repairs.',
    highlights: [
      'Built entrepreneurial skills',
    ],
  },
];

export default work;
