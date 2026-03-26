import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function ProblemDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();
  const problem = await prisma.problem.findUnique({
    where: { slug },
    include: {
      testCases: { orderBy: { index: 'asc' } },
      submissions: {
        orderBy: { queuedAt: 'desc' },
        include: { user: true },
        take: 10,
      },
    },
  }).catch(() => null);

  if (!problem) {
    return notFound();
  }

  return (
    <main style={{ display: 'grid', gap: 20 }}>
      <section style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, padding: 24 }}>
        <h1 style={{ marginTop: 0 }}>{problem.title}</h1>
        <p style={{ margin: '8px 0' }}>
          <strong>{problem.code}</strong> · Level {problem.level}
        </p>
        <p style={{ margin: '8px 0' }}>Time limit: {problem.timeLimitMs} ms · Memory limit: {problem.memoryLimitMb} MB · Max score: {problem.maxScore}</p>
        <p style={{ margin: '8px 0' }}>Statement PDF: {problem.pdfFilename ?? 'N/A'}</p>
        <p style={{ margin: '8px 0', color: problem.isJudgeable ? '#067647' : '#b42318' }}>
          {problem.isJudgeable ? 'Judgeable on local host-run adapter' : `Not fully judgeable: ${problem.warning ?? 'warning'}`}
        </p>
      </section>

      <section style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Submit solution</h2>
        {session?.user ? (
          <form action="/api/submissions" method="post" style={{ display: 'grid', gap: 12 }}>
            <input type="hidden" name="problemId" value={problem.id} />
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Language</span>
              <select name="language" defaultValue="cpp">
                <option value="cpp">C++17</option>
                <option value="python">Python 3</option>
              </select>
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Source code</span>
              <textarea
                name="sourceCode"
                required
                minLength={1}
                rows={18}
                defaultValue={'#include <iostream>\nusing namespace std;\n\nint main() {\n  return 0;\n}\n'}
                style={{ fontFamily: 'monospace' }}
              />
            </label>
            <p style={{ margin: 0, color: '#536076' }}>
              After you submit, the system should create a submission record immediately and then judge it in the queue.
            </p>
            <button type="submit" disabled={!problem.isJudgeable}>{problem.isJudgeable ? 'Queue submission' : 'Judging unavailable'}</button>
          </form>
        ) : (
          <p>
            <Link href={`/login?callbackUrl=/problems/${problem.slug}`}>Log in</Link> to submit.
          </p>
        )}
      </section>

      <section style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Testcases</h2>
        <ul>
          {problem.testCases.map((testCase) => (
            <li key={testCase.id}>
              #{testCase.index} · {testCase.score} pts · {testCase.isValid ? 'valid' : 'invalid'}
              {testCase.warning ? ` · ${testCase.warning}` : ''}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Recent submissions for this problem</h2>
        <ul>
          {problem.submissions.map((submission) => (
            <li key={submission.id}>
              <Link href={`/submissions/${submission.id}`}>{submission.id}</Link> · {submission.user.username} · {submission.language} · {submission.status} · {submission.score}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
