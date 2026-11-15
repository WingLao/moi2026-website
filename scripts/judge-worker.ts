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

type IoiSubtask = { index: number; points: number; status: string; message: string; time_ms: number };

/** IOI task: every placeholder testcase k stands for subtask k; points come from the official checker/manager. */
async function judgeIoi(
  id: string,
  language: string,
  sourcePath: string,
  ioiDir: string,
  workDir: string,
  testCases: { id: string; index: number }[],
) {
  const fail = async (status: 'COMPILE_ERROR' | 'FAILED', compileOutput: string) => {
    await prisma.submission.update({ where: { id }, data: { status, compileOutput, judgedAt: new Date() } });
  };
  if (language !== 'cpp') {
    await fail('COMPILE_ERROR', 'IOI tasks accept C++ only. IOI 題目只接受 C++。');
    return;
  }
  const run = spawnSync('python3', [path.join(__dirname, 'ioi-judge.py'), ioiDir, sourcePath, path.join(workDir, 'ioi')], {
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
    timeout: 15 * 60 * 1000,
  });
  let report: { compile_error?: string; subtasks?: IoiSubtask[] };
  try {
    report = JSON.parse(run.stdout);
  } catch {
    await fail('FAILED', `IOI judge error: ${(run.stderr || run.error?.message || '').slice(-2000)}`);
    return;
  }
  if (report.compile_error !== undefined) {
    await fail('COMPILE_ERROR', report.compile_error);
    return;
  }
  const byIndex = new Map((report.subtasks ?? []).map((s) => [s.index, s]));
  let totalScore = 0;
  for (const testCase of testCases) {
    const sub = byIndex.get(testCase.index);
    const statusMap: Record<string, TestCaseStatus> = { AC: 'AC', WA: 'WA', TLE: 'TLE', RE: 'RE' };
    const result = {
      status: sub ? statusMap[sub.status] ?? 'WA' : ('SKIPPED' as TestCaseStatus),
      score: sub ? Math.round(sub.points) : 0,
      timeMs: sub?.time_ms ?? null,
      stdout: '',
      stderr: '',
      message: sub?.message ?? '',
    };
    totalScore += result.score;
    await prisma.testCaseResult.upsert({
      where: { submissionId_testCaseId: { submissionId: id, testCaseId: testCase.id } },
      update: result,
      create: { submissionId: id, testCaseId: testCase.id, ...result },
    });
  }
  const judgedAt = new Date();
  await prisma.submission.update({ where: { id }, data: { status: 'FINISHED', score: totalScore, judgedAt, reachedScoreAt: judgedAt } });
}

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

    // IOI tasks (data dir has ioi/problem.json): judged by scripts/ioi-judge.py with the official graders.
    const firstCase = submission.problem.testCases[0];
    const ioiDir = firstCase ? path.join(path.dirname(resolveStoredPath(firstCase.inputPath)), 'ioi') : '';
    if (ioiDir && fs.existsSync(path.join(ioiDir, 'problem.json'))) {
      await judgeIoi(id, submission.language, sourcePath, ioiDir, workDir, submission.problem.testCases);
      return;
    }

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
        // maxBuffer: Node's default (1 MB) cuts off large outputs and they were reported as Runtime Error.
        const runOptions = { input, encoding: 'utf8' as const, timeout: submission.problem.timeLimitMs, maxBuffer: 64 * 1024 * 1024 };
        const run = submission.language === 'cpp'
          ? spawnSync(executablePath, runOptions)
          : spawnSync('python3', [executablePath], runOptions);

        result.stdout = run.stdout || '';
        result.stderr = run.stderr || '';

        if (run.error?.message.includes('timed out')) {
          result.status = 'TLE';
        } else if (run.status !== 0) {
          result.status = 'RE';
        } else {
          // Problems whose answer is not unique ship a checker.py next to the testcases:
          // python3 checker.py <input> <expected> <contestant_output>, exit code 0 = accepted.
          const inputPath = resolveStoredPath(testCase.inputPath);
          const checkerPath = path.join(path.dirname(inputPath), 'checker.py');
          let accepted: boolean;
          if (fs.existsSync(checkerPath)) {
            const outPath = path.join(workDir, `out-${testCase.index}.txt`);
            fs.writeFileSync(outPath, result.stdout);
            const check = spawnSync('python3', [checkerPath, inputPath, resolveStoredPath(testCase.outputPath), outPath], { encoding: 'utf8', timeout: 20000 });
            accepted = check.status === 0;
            result.message = (check.stdout || '').trim().slice(0, 200);
          } else {
            accepted = normalizeOutput(result.stdout) === normalizeOutput(expected);
          }
          if (accepted) {
            result.status = 'AC';
            result.score = testCase.score;
            totalScore += result.score;
          } else {
            result.status = 'WA';
          }
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
