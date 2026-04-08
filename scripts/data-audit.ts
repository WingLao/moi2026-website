import path from 'node:path';
import { auditProblemAssets } from '../src/lib/problem-assets';
import { PROBLEM_CATALOG } from '../src/lib/problem-catalog';

const root = path.resolve(process.argv[2] || process.cwd());

const problems = PROBLEM_CATALOG.map((entry) => {
  const audit = auditProblemAssets(root, entry);

  return {
    slug: entry.slug,
    level: entry.level,
    title: entry.title,
    statementFilename: entry.statementFilename,
    statementPresent: Boolean(audit.statementPath),
    pdfFilename: entry.pdfFilename,
    pdfPresent: Boolean(audit.pdfPath),
    judgeable: audit.isJudgeable,
    testcaseCount: audit.cases.length,
    duplicateFiles: audit.duplicateFiles,
    extraOutputs: audit.extraOutputs,
    warnings: audit.warnings,
  };
});

const summary = {
  totalProblems: problems.length,
  problemsWithWarnings: problems.filter((problem) => problem.warnings.length > 0).length,
  nonJudgeableProblems: problems.filter((problem) => !problem.judgeable).length,
  missingStatementProblems: problems.filter((problem) => !problem.statementPresent).length,
  missingPdfProblems: problems.filter((problem) => !problem.pdfPresent).length,
  duplicateFiles: problems.reduce((count, problem) => count + problem.duplicateFiles.length, 0),
};

console.log(JSON.stringify({ root, summary, problems }, null, 2));
