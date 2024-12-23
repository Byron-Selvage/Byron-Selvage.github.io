const skills = [
  {
    title: 'Python',
    competency: 5,
    category: ['Languages', 'Python', 'Machine Learning', 'Data Science'],
  },
  {
    title: 'C++',
    competency: 4,
    category: ['Languages'],
  },
  {
    title: 'R',
    competency: 2,
    category: ['Languages'],
  },
  {
    title: 'Matlab',
    competency: 4,
    category: ['Languages'],
  },
  {
    title: 'Javascript',
    competency: 1,
    category: ['Languages'],
  },
  {
    title: 'Numpy',
    competency: 3,
    category: ['Data Science', 'Python', 'Machine Learning'],
  },
  {
    title: 'Tensorflow',
    competency: 2,
    category: ['Machine Learning', 'Python'],
  },
  {
    title: 'Jupyter',
    competency: 4,
    category: ['Data Science', 'Python'],
  },
  {
    title: 'Data Visualization',
    competency: 3,
    category: ['Data Science'],
  },
  {
    title: 'Pandas',
    competency: 3,
    category: ['Machine Learning', 'Python'],
  },
  {
    title: 'Matplotlib',
    competency: 3,
    category: ['Data Science', 'Machine Learning', 'Python'],
  },
  {
    title: 'Scikit-Learn',
    competency: 3,
    category: ['Machine Learning', 'Python'],
  },
  {
    title: 'GitHub',
    competency: 3,
    category: ['Tools'],
  },
  {
    title: 'LaTeX',
    competency: 5,
    category: ['Tools'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

// this is a list of colors that I like. The length should be === to the
// number of categories. Re-arrange this list until you find a pattern you like.
const colors = [
  '#6968b3',
  '#37b1f5',
  '#40494e',
  '#747fff',
  '#515dd4',
];

const categories = [...new Set(skills.flatMap(({ category }) => category))]
  .sort()
  .map((category, index) => ({
    name: category,
    color: colors[index],
  }));

export { categories, skills };
