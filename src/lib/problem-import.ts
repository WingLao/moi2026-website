import fs from 'node:fs';
import path from 'node:path';
import { prisma } from './prisma';

const MAP = {
  'P-gaps.pdf': { slug: 'p-gaps', title: 'gaps', level: 'P' },
  'P-letters.pdf': { slug: 'p-letters', title: 'letters', level: 'P' },
  'P-round.pdf': { slug: 'p-round', title: 'round', level: 'P' },
  'J-partner.pdf': { slug: 'j-partner', title: 'partner', level: 'J' },
  'J-parttime.pdf': { slug: 'j-parttime', title: 'parttime', level: 'J' },
  'J-exchnage.pdf': { slug: 'j-exchange', title: 'exchange', level: 'J' },
  'S-balls.pdf': { slug: 's-balls', title: 'balls', level: 'S' },
  'S-climb.pdf': { slug: 's-climb', title: 'climb', level: 'S' },
  'S-comm.pdf': { slug: 's-comm', title: 'comm', level: 'S' },
} as const;

export async function importProblems(projectRoot: string) {
  const warnings: string[] = [];

  for (const [pdf, meta] of Object.entries(MAP)) {
    const pdfPath = path.join(projectRoot, pdf);
    const dataDir = path.join(projectRoot, 'data', meta.level, meta.title);

    const problem = await prisma.problem.upsert({
      where: { slug: meta.slug },
      update: {
        title: meta.title,
        level: meta.level as 'P' | 'J' | 'S',
        pdfFilename: pdf,
        pdfPath,
        isJudgeable: true,
        warning: null,
      },
      create: {
        code: meta.slug.toUpperCase().replace(/-/g, '_'),
        slug: meta.slug,
        title: meta.title,
        level: meta.level as 'P' | 'J' | 'S',
        pdfFilename: pdf,
        pdfPath,
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
            inputPath: path.join(dataDir, inputFile),
            outputPath,
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
