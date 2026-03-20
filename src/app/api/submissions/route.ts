import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getSubmissionQueue } from '@/lib/queue';

async function createSubmission(payload: { problemId: string; language: string; sourceCode: string; userId: string }) {
  const submission = await prisma.submission.create({
    data: {
      userId: payload.userId,
      problemId: payload.problemId,
      language: payload.language,
      sourceCode: payload.sourceCode,
    },
  });

  await getSubmissionQueue().add('judge', { submissionId: submission.id });
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

  const submission = await createSubmission({
    problemId,
    language,
    sourceCode,
    userId: session.user.id,
  });

  if (contentType.includes('application/json')) {
    return NextResponse.json({ ok: true, id: submission.id });
  }

  return NextResponse.redirect(new URL(`/submissions/${submission.id}`, req.url), { status: 303 });
}
