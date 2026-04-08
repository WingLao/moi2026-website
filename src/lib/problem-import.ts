import fs from 'node:fs';
import path from 'node:path';
import { prisma } from './prisma';
import { getDataRoot, toStoredPath } from './data-root';
import { auditProblemAssets } from './problem-assets';
import { PROBLEM_CATALOG } from './problem-catalog';

export async function importProblems(projectRoot?: string) {
  const root = projectRoot ?? getDataRoot();
  const warnings: string[] = [];

  for (const meta of PROBLEM_CATALOG) {
    const audit = auditProblemAssets(root, meta);
    const problem = await prisma.problem.upsert({
      where: { slug: meta.slug },
      update: {
        title: meta.title,
        level: meta.level as 'P' | 'J' | 'S',
        pdfFilename: meta.pdfFilename,
        pdfPath: audit.pdfPath ? toStoredPath(audit.pdfPath, root) : null,
        isJudgeable: true,
        warning: null,
      },
      create: {
        code: meta.slug.toUpperCase().replace(/-/g, '_'),
        slug: meta.slug,
        title: meta.title,
        level: meta.level as 'P' | 'J' | 'S',
        pdfFilename: meta.pdfFilename,
        pdfPath: audit.pdfPath ? toStoredPath(audit.pdfPath, root) : null,
      },
    });

    await prisma.testCase.deleteMany({ where: { problemId: problem.id } });

    const baseScore = Math.floor(100 / Math.max(audit.cases.length, 1));
    const remainder = 100 - baseScore * audit.cases.length;

    for (let index = 0; index < audit.cases.length; index += 1) {
      const testCase = audit.cases[index];

      await prisma.testCase.create({
        data: {
          problemId: problem.id,
          index,
          inputPath: toStoredPath(fs.realpathSync(path.join(audit.dataDir, testCase.inputFile)), root),
          outputPath: testCase.outputFile ? toStoredPath(fs.realpathSync(path.join(audit.dataDir, testCase.outputFile)), root) : null,
          score: baseScore + (index < remainder ? 1 : 0),
          isValid: testCase.isValid,
          warning: testCase.warning,
        },
      });
    }

    await prisma.problem.update({
      where: { id: problem.id },
      data: {
        isJudgeable: audit.isJudgeable,
        warning: audit.warnings.join('; ') || null,
      },
    });

    if (audit.warnings.length > 0) {
      warnings.push(`${meta.slug}: ${audit.warnings.join('; ')}`);
    }
  }

  await prisma.importReport.create({
    data: {
      summary: 'problem import',
      detail: warnings.join('\n') || 'No warnings',
    },
  });

  return warnings;
}
