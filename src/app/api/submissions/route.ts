import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getSubmissionQueue } from '@/lib/queue';

const ALLOWED_LANGUAGES = new Set(['cpp', 'python']);

async function createSubmission(payload: { problemId: string; language: string; sourceCode: string; userId: string }) {
  const problem = await prisma.problem.findUnique({
    where: { id: payload.problemId },
    include: { testCases: { orderBy: { index: 'asc' } } },
  })

  if (!problem) {
    throw new Error('Problem not found');
  }

  if (!problem.isJudgeable) {
    throw new Error(problem.warning || 'This problem is not ready for judging');
  }

  const submission = await prisma.submission.create({
    data: {
      userId: payload.userId,
      problemId: payload.problemId,
      language: payload.language,
      sourceCode: payload.sourceCode,
      results: {
        create: problem.testCases.map((testCase) => ({
          testCaseId: testCase.id,
          status: testCase.isValid ? 'PENDING' : 'INVALID',
          score: 0,
          message: testCase.isValid ? null : testCase.warning || 'Invalid testcase',
        })),
      },
    },
  });

  try {
    await getSubmissionQueue().add('judge', { submissionId: submission.id });
  } catch (error) {
    await prisma.submission.update({
      where: { id: submission.id },
      data: {
        status: 'FAILED',
        compileOutput: error instanceof Error ? error.message : String(error),
        judgedAt: new Date(),
      },
    });
    throw new Error('Submission saved, but queueing failed. Please contact the admin.');
  }

  return submission;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const contentType = req.headers.get('content-type') || '';
  let problemId = '';
  let language = '';
  let sourceCode = '';

  if (contentType.includes('application/json')) {
    const body = (await req.json()) as Partial<{ problemId: string; language: string; sourceCode: string }>;
    problemId = body.problemId ?? '';
    language = body.language ?? '';
    sourceCode = body.sourceCode ?? '';
  } else {
    const formData = await req.formData();
    problemId = String(formData.get('problemId') ?? '');
    language = String(formData.get('language') ?? '');
    sourceCode = String(formData.get('sourceCode') ?? '');
  }

  if (!problemId || !language || !sourceCode.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!ALLOWED_LANGUAGES.has(language)) {
    return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
  }

  try {
    const submission = await createSubmission({
      problemId,
      language,
      sourceCode,
      userId: session.user.id,
    });

    if (contentType.includes('application/json')) {
      return NextResponse.json({ ok: true, id: submission.id, status: submission.status });
    }

        const baseUrl = process.env.NEXTAUTH_URL || req.url;
        return NextResponse.redirect(new URL(`/submissions/${submission.id}`, baseUrl), { status: 303 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Submission failed';
    if (contentType.includes('application/json')) {
      return NextResponse.json({ error: message }, { status: 400 });
    }

        const baseUrl = process.env.NEXTAUTH_URL || req.url;
        return NextResponse.redirect(new URL(`/problems?error=${encodeURIComponent(message)}`, baseUrl), { status: 303 });
  }
}
