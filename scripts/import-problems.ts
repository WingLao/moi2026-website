import { importProblems } from '../src/lib/problem-import';

const root = process.argv[2] || process.env.JUDGE_DATA_ROOT;

importProblems(root)
  .then((warnings) => console.log(JSON.stringify({ warnings }, null, 2)))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
