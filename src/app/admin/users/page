import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminUsers() {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    redirect('/login?callbackUrl=/admin/users');
  }

  const users = await prisma.user.findMany({
    orderBy: { username: 'asc' },
    where: { role: 'STUDENT' },
    include: {
      submissions: {
        include: { problem: true },
        orderBy: [{ queuedAt: 'desc' }],
      },
    },
  }).catch(() => []);

  const rows = users.map((user) => {
    const bestByProblem = new Map<string, number>();
    for (const submission of user.submissions) {
      const previous = bestByProblem.get(submission.problemId) ?? 0;
      if (submission.score > previous) {
        bestByProblem.set(submission.problemId, submission.score);
      }
    }

    const totalScore = [...bestByProblem.values()].reduce((sum, score) => sum + score, 0);
    const practicedProblems = bestByProblem.size;
    const solvedProblems = [...bestByProblem.values()].filter((score) => score > 0).length;
    const latestSubmission = user.submissions[0];

    return {
      id: user.id,
      username: user.username,
      mustChangePass: user.mustChangePass,
      totalSubmissions: user.submissions.length,
      practicedProblems,
      solvedProblems,
      totalScore,
      latestSubmission,
    };
  });

  return (
    <main className="page" style={{ display: 'grid', gap: 16 }}>
      <section className="card">
        <div className="section-title">
          <div>
            <h1>Admin · Student Progress</h1>
            <p className="subtle" style={{ marginTop: 8 }}>
              Quick view of each student&apos;s practice activity and best-score progress.
            </p>
          </div>
          <span className="badge info">Students: {rows.length}</span>
        </div>
      </section>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Total submissions</th>
              <th>Practiced problems</th>
              <th>Solved (&gt;0)</th>
              <th>Total best score</th>
              <th>Must change password</th>
              <th>Latest activity</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.username}</td>
                <td>{row.totalSubmissions}</td>
                <td>{row.practicedProblems}</td>
                <td>{row.solvedProblems}</td>
                <td>{row.totalScore}</td>
                <td>{row.mustChangePass ? 'Yes' : 'No'}</td>
                <td className="subtle">
                  {row.latestSubmission
                    ? `${row.latestSubmission.problem.code} · ${row.latestSubmission.status} · ${row.latestSubmission.score}`
                    : 'No submissions yet'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
