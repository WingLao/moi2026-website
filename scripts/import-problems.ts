import { importProblems } from '../src/lib/problem-import';
importProblems(process.argv[2] || process.cwd() + '/..').then(w => console.log(JSON.stringify({warnings:w},null,2))).catch(e=>{console.error(e);process.exit(1)});
