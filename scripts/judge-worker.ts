import { Worker } from 'bullmq';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { type TestCaseStatus } from '@prisma/client';
import { prisma } from '../src/lib/prisma';
import { resolveStoredPath } from '../src/lib/data-root';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const normalizeOutput = (value: string) => value.replace(/[ \t]+$/gm, '').trimEnd();

type JudgeResult = {
  status: TestCaseStatus;
  score: number;
  stdout: string;
  stderr: string;
  message: string;
};

async function judgeSubmission(id: string) {
  const submission = await prisma.submission.findUnique({
    where: { id },
    include: { problem: { include: { testCases: true } } },
  });

  if (!submission) {
    return;
  }

  await prisma.submission.update({ where: { id }, data: { status: 'JUDGING' } });

  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'moi-judge-'));

  try {
    const sourcePath = path.join(workDir, submission.language === 'cpp' ? 'main.cpp' : 'main.py');
    fs.writeFileSync(sourcePath, submission.sourceCode);

    let executablePath = sourcePath;
    if (submission.language === 'cpp') {
      const binaryPath = path.join(workDir, 'main');
      const compile = spawnSync('g++', ['-std=c++17', sourcePath, '-O2', '-o', binaryPath], { encoding: 'utf8' });
      if (compile.status !== 0) {
        await prisma.submission.update({
          where: { id },
          data: {
            status: 'COMPILE_ERROR',
            compileOutput: compile.stderr,
            judgedAt: new Date(),
          },
        });
        return;
      }
      executablePath = binaryPath;
    }

    let totalScore = 0;
    const testCases = [...submission.problem.testCases].sort((left, right) => left.index - right.index);

    for (const testCase of testCases) {
      const result: JudgeResult = {
        status: 'SKIPPED',
        score: 0,
        stdout: '',
        stderr: '',
        message: '',
      };

      if (!testCase.isValid || !testCase.outputPath) {
        result.status = 'INVALID';
        result.message = testCase.warning || 'Invalid testcase';
      } else {
        const input = fs.readFileSync(resolveStoredPath(testCase.inputPath));
        const expected = fs.readFileSync(resolveStoredPath(testCase.outputPath), 'utf8');
        const run = submission.language === 'cpp'
          ? spawnSync(executablePath, { input, encoding: 'utf8', timeout: submission.problem.timeLimitMs })
          : spawnSync('python3', [executablePath], { input, encoding: 'utf8', timeout: submission.problem.timeLimitMs });

        result.stdout = run.stdout || '';
        result.stderr = run.stderr || '';

        if (run.error?.message.includes('timed out')) {
          result.status = 'TLE';
        } else if (run.status !== 0) {
          result.status = 'RE';
        } else if (normalizeOutput(result.stdout) === normalizeOutput(expected)) {
          result.status = 'AC';
          result.score = testCase.score;
          totalScore += result.score;
        } else {
          result.status = 'WA';
        }
      }

      await prisma.testCaseResult.upsert({
        where: { submissionId_testCaseId: { submissionId: id, testCaseId: testCase.id } },
        update: result,
        create: {
          submissionId: id,
          testCaseId: testCase.id,
          ...result,
        },
      });
    }

    const judgedAt = new Date();
    await prisma.submission.update({
      where: { id },
      data: {
        status: 'FINISHED',
        score: totalScore,
        judgedAt,
        reachedScoreAt: judgedAt,
      },
    });
  } catch (error) {
    await prisma.submission.update({
      where: { id },
      data: {
        status: 'FAILED',
        compileOutput: error instanceof Error ? error.stack || error.message : String(error),
        judgedAt: new Date(),
      },
    });
  } finally {
    fs.rmSync(workDir, { recursive: true, force: true });
  }
}

new Worker(
  'submission-judge',
  async (job) => {
    await judgeSubmission(String(job.data.submissionId));
  },
  { connection: { url: redisUrl } },
);

console.log('judge worker started');
