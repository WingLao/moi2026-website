import fs from 'node:fs';
import path from 'node:path';
import { prisma } from './prisma';
import { getDataRoot, toStoredPath } from './data-root';

const MAP = {
  'P-gaps.pdf': { slug: 'p-gaps', title: 'gaps', level: 'P' },
  'P-letters.pdf': { slug: 'p-letters', title: 'letters', level: 'P' },
  'P-round.pdf': { slug: 'p-round', title: 'round', level: 'P' },
  'P-sort.pdf': { slug: 'p-sort', title: 'sort', level: 'P' },
  'P-stairs.pdf': { slug: 'p-stairs', title: 'stairs', level: 'P' },
  'P-islands.pdf': { slug: 'p-islands', title: 'islands', level: 'P' },
  'P-steps.pdf': { slug: 'p-steps', title: 'steps', level: 'P' },
  'P-grade.pdf': { slug: 'p-grade', title: 'grade', level: 'P' },
  'P-coin.pdf': { slug: 'p-coin', title: 'coin', level: 'P' },
  'J-partner.pdf': { slug: 'j-partner', title: 'partner', level: 'J' },
  'J-parttime.pdf': { slug: 'j-parttime', title: 'parttime', level: 'J' },
  'J-exchnage.pdf': { slug: 'j-exchange', title: 'exchange', level: 'J' },
  'J-sortrank.pdf': { slug: 'j-sortrank', title: 'sortrank', level: 'J' },
  'J-lis.pdf': { slug: 'j-lis', title: 'lis', level: 'J' },
  'J-components.pdf': { slug: 'j-components', title: 'components', level: 'J' },
  'J-spread.pdf': { slug: 'j-spread', title: 'spread', level: 'J' },
  'J-inversions.pdf': { slug: 'j-inversions', title: 'inversions', level: 'J' },
  'J-schedule.pdf': { slug: 'j-schedule', title: 'schedule', level: 'J' },
  'S-balls.pdf': { slug: 's-balls', title: 'balls', level: 'S' },
  'S-climb.pdf': { slug: 's-climb', title: 'climb', level: 'S' },
  'S-comm.pdf': { slug: 's-comm', title: 'comm', level: 'S' },
} as const;

export async function importProblems(projectRoot?: string) {
  const root = projectRoot ? path.resolve(projectRoot) : getDataRoot();
  const warnings: string[] = [];

  for (const [pdf, meta] of Object.entries(MAP)) {
    const pdfPath = path.join(root, pdf);
    const dataDir = path.join(root, 'data', meta.level, meta.title);
// v2


    const problem = await prisma.problem.upsert({
      where: { slug: meta.slug },
      update: {
        title: meta.title,
        level: meta.level as 'P' | 'J' | 'S',
        pdfFilename: pdf,
        pdfPath: toStoredPath(pdfPath, root),
        isJudgeable: true,
        warning: null,
      },
      create: {
        code: meta.slug.toUpperCase().replace(/-/g, '_'),
        slug: meta.slug,
        title: meta.title,
        level: meta.level as 'P' | 'J' | 'S',
        pdfFilename: pdf,
        pdfPath: toStoredPath(pdfPath, root),
      },
    });

    await prisma.testCase.deleteMany({ where: { problemId: problem.id } });

    let judgeable = true;
    const localWarnings: string[] = [];

    if (fs.existsSync(dataDir)) {
      const files = fs.readdirSync(dataDir).filter((file) => !file.startsWith('.'));
      const inputs = files.filter((file) => file.endsWith('.in')).sort();
      const outputs = new Set(files.filter((file) => file.endsWith('.out')).map((file) => file.replace(/\.out$/, '')));

      const baseScore = Math.floor(100 / Math.max(inputs.length, 1));
      const remainder = 100 - baseScore * inputs.length;

      for (let index = 0; index < inputs.length; index += 1) {
        const inputFile = inputs[index];
        const stem = inputFile.replace(/\.in$/, '');
        const outputPath = outputs.has(stem) ? path.join(dataDir, `${stem}.out`) : null;

        if (!outputPath) {
          judgeable = false;
          localWarnings.push(`Missing .out for ${inputFile}`);
        }

        await prisma.testCase.create({
          data: {
            problemId: problem.id,
            index,
            inputPath: toStoredPath(path.join(dataDir, inputFile), root),
            outputPath: outputPath ? toStoredPath(outputPath, root) : null,
            score: baseScore + (index < remainder ? 1 : 0),
            isValid: Boolean(outputPath),
            warning: outputPath ? null : `Missing .out for ${inputFile}`,
          },
        });
      }
    } else {
      judgeable = false;
      localWarnings.push('Missing data dir');
    }

    await prisma.problem.update({
      where: { id: problem.id },
      data: {
        isJudgeable: judgeable,
        warning: localWarnings.join('; ') || null,
      },
    });

    if (localWarnings.length > 0) {
      warnings.push(`${meta.slug}: ${localWarnings.join('; ')}`);
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
