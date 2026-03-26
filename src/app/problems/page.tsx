import Link from 'next/link';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function ProblemsPage() {
  const session = await auth();
  const problems = await prisma.problem.findMany({
    orderBy: [{ level: 'asc' }, { code: 'asc' }],
    include: {
      testCases: true,
      submissions: session?.user
        ? {
            where: session.user.role === 'ADMIN' ? undefined : { userId: session.user.id },
            orderBy: { queuedAt: 'desc' },
          }
        : false,
    },
  }).catch(() => []);

  const judgeableCount = problems.filter((problem) => problem.isJudgeable).length;
  const warningCount = problems.length - judgeableCount;

  return (
    <main className="page">
      <section className="card">
        <div className="section-title">
          <div>
            <h1>Problems</h1>
            <p className="subtle" style={{ marginTop: 8 }}>
              Imported from local MOI2026 statements and testcase folders. Open a problem to submit code and inspect recent runs.
            </p>
          </div>
          <div className="inline-actions">
            <span className="badge success">Judgeable: {judgeableCount}</span>
            {warningCount ? <span className="badge warning">Warnings: {warningCount}</span> : null}
          </div>
        </div>
      </section>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Level</th>
              <th>Code</th>
              <th>Title</th>
              <th>Cases</th>
              <th>Your best</th>
              <th>Last status</th>
              <th>Judge status</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => {
              const submissions = Array.isArray(problem.submissions) ? problem.submissions : [];
              const best = submissions.reduce((max, submission) => Math.max(max, submission.score), 0);
              const latest = submissions[0];

              return (
                <tr key={problem.id}>
                  <td>{problem.level}</td>
                  <td>{problem.code}</td>
                  <td>
                    <Link href={`/problems/${problem.slug}`} style={{ color: 'var(--primary)', fontWeight: 700 }}>
                      {problem.title}
                    </Link>
                  </td>
                  <td>{problem.testCases.length}</td>
                  <td>{session?.user ? `${best} / ${problem.maxScore}` : 'Login to view'}</td>
                  <td>{latest ? `${latest.status} · ${latest.score}` : '—'}</td>
                  <td>
                    {problem.isJudgeable ? (
                      <span className="badge success">Ready</span>
                    ) : (
                      <span className="badge warning">{problem.warning || 'Needs attention'}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
