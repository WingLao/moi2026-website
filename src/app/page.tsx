import Link from 'next/link';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const session = await auth();
  const [problemCount, submissionCount, studentCount, recentSubmissions] = await Promise.all([
    prisma.problem.count().catch(() => 0),
    prisma.submission.count().catch(() => 0),
    prisma.user.count({ where: { role: 'STUDENT' } }).catch(() => 0),
    prisma.submission.findMany({
      take: 5,
      orderBy: { queuedAt: 'desc' },
      include: { problem: true, user: true },
    }).catch(() => []),
  ]);

  return (
    <main className="page">
      <section className="card">
        <div className="section-title">
          <div>
            <h1>MOI2026 contest portal</h1>
            <p className="subtle" style={{ marginTop: 10 }}>
              Local training and judging portal for P / J / S groups. Students can browse problems, submit code, and track results. Admins can monitor imports, submissions, and users.
            </p>
          </div>
          <div className="inline-actions">
            <Link href="/problems" className="button-link">Browse problems</Link>
            <Link href="/leaderboard" className="button-link secondary">Leaderboard</Link>
            {session?.user ? <Link href="/submissions" className="button-link secondary">My submissions</Link> : <Link href="/login" className="button-link secondary">Login</Link>}
          </div>
        </div>
      </section>

      <section className="grid-tiles">
        {[
          { label: 'Problems', value: problemCount, note: 'Imported and listed for contestants' },
          { label: 'Students', value: studentCount, note: 'Seeded training accounts' },
          { label: 'Submissions', value: submissionCount, note: 'Queued and judged attempts' },
        ].map((item) => (
          <div key={item.label} className="card compact">
            <div className="subtle">{item.label}</div>
            <div className="tile-number">{item.value}</div>
            <div className="subtle">{item.note}</div>
          </div>
        ))}
      </section>

      <section className="card">
        <div className="section-title">
          <div>
            <h2>Quick reminders</h2>
            <p className="subtle" style={{ marginTop: 8 }}>Current platform behavior and operator-facing caveats.</p>
          </div>
        </div>
        <ul className="list" style={{ marginTop: 14 }}>
          <li>Judging currently runs on the host via the worker queue, so this is suitable for local rehearsal, not hardened production isolation.</li>
          <li>Students only see their own submissions. Admins can inspect all users, problems, and judged runs.</li>
          <li>Some imported problem data may contain warnings if testcase files are incomplete.</li>
        </ul>
      </section>

      <section className="card">
        <div className="section-title">
          <div>
            <h2>Recent activity</h2>
            <p className="subtle" style={{ marginTop: 8 }}>Useful for quick smoke-checks after startup.</p>
          </div>
        </div>
        {recentSubmissions.length ? (
          <div className="table-wrap" style={{ marginTop: 14 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Problem</th>
                  <th>Status</th>
                  <th>Score</th>
                  <th>Queued</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((submission) => (
                  <tr key={submission.id}>
                    <td>{submission.user.username}</td>
                    <td>{submission.problem.title}</td>
                    <td>{submission.status}</td>
                    <td>{submission.score}</td>
                    <td>{submission.queuedAt.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty" style={{ marginTop: 14 }}>No submissions yet. Create one from any problem page to verify the queue + worker path.</div>
        )}
      </section>
    </main>
  );
}
