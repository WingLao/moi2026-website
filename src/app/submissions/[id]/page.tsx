import { notFound, redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AutoRefresh from './AutoRefresh';

export default async function SubmissionDetail({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  const { id } = await params;
  const submission = await prisma.submission.findUnique({
    where: { id },
    include: {
      user: true,
      problem: true,
      results: { include: { testCase: true }, orderBy: { testCase: { index: 'asc' } } },
    },
  }).catch(() => null);

  if (!submission) {
    return notFound();
  }

  const isAdmin = session.user.role === 'ADMIN';
  if (!isAdmin && submission.userId !== session.user.id) {
    redirect('/submissions');
  }

  const isPending = submission.status === 'PENDING' || submission.status === 'JUDGING';

  return (
    <main style={{ display: 'grid', gap: 16 }}>
      <AutoRefresh active={isPending} />
      <section style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, padding: 24 }}>
        <h1 style={{ marginTop: 0 }}>Submission {submission.id}</h1>
        <p style={{ margin: '8px 0' }}>{submission.user.username} · {submission.problem.title} · {submission.language}</p>
        <p style={{ margin: '8px 0' }}>Status: <strong>{submission.status}</strong> · Score: <strong>{submission.score}</strong></p>
        {isPending ? <p style={{ margin: '8px 0', color: '#2155d6' }}>Judging is still in progress. This page auto-refreshes every 3 seconds.</p> : null}
        <p style={{ margin: '8px 0' }}>Queued: {submission.queuedAt.toLocaleString()}</p>
        {submission.judgedAt ? <p style={{ margin: '8px 0' }}>Judged: {submission.judgedAt.toLocaleString()}</p> : null}
        {submission.compileOutput ? (
          <details>
            <summary>Compile output</summary>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{submission.compileOutput}</pre>
          </details>
        ) : null}
      </section>
      <section style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Per testcase results</h2>
        <ul>
          {submission.results.map((result) => (
            <li key={result.id}>
              #{result.testCase.index} · {result.status} · {result.score} pts
              {result.message ? ` · ${result.message}` : ''}
            </li>
          ))}
        </ul>
      </section>
      <section style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Source code</h2>
        <pre style={{ whiteSpace: 'pre-wrap', overflowX: 'auto' }}>{submission.sourceCode}</pre>
      </section>
    </main>
  );
}
