import dayjs from 'dayjs';

/* Keys match keys returned by the github api. Fields without keys are
 * mostly jokes. To see everything returned by the github api, run:
 curl https://api.github.com/repos/mldangelo/personal-site
 */
const data = [
  {
    label: 'Last updated on',
    key: 'pushed_at',
    format: (x) => dayjs(x).format('MMMM DD, YYYY'),
  },
  {
    // TODO update this with a pre-commit hook
    /* find . -type d \( -name "node_modules" -o -name ".git" \) -prune -o \
    -type f -name "*.js" ! -name "*.min.js" -exec cat {} + | wc -l */
    label: 'Lines of Javascript powering this website',
    value: '2850',
  },
];

export default data;
