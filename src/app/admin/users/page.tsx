import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatWeightedScore, getWeightedScore } from '@/lib/score-utils';
import CreateUserForm from './CreateUserForm';
import NameImportForm from './NameImportForm';
import UserTableRow from './UserTableRow';
import { getUserDisplayName } from '@/lib/user-display';

export default async function AdminUsers() {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    redirect('/login?callbackUrl=/admin/users');
  }

  const users = await prisma.user.findMany({
    orderBy: { username: 'asc' },
    include: {
      submissions: {
        include: { problem: true },
        orderBy: [{ queuedAt: 'desc' }],
      },
    },
  }).catch(() => []);

  const rows = users.map((user) => {
    const bestByProblem = new Map<string, { score: number; level: 'Beginner' | 'GA' | 'DP' | 'P' | 'J' | 'S' }>();
    for (const submission of user.submissions) {
      const previous = bestByProblem.get(submission.problemId);
      if (!previous || submission.score > previous.score) {
        bestByProblem.set(submission.problemId, { score: submission.score, level: submission.problem.level });
      }
    }

    const totalScore = [...bestByProblem.values()].reduce((sum, item) => sum + getWeightedScore(item.score, item.level), 0);
    const practicedProblems = bestByProblem.size;
    const solvedProblems = [...bestByProblem.values()].filter((item) => item.score > 0).length;
    const latestSubmission = user.submissions[0];

    return {
      id: user.id,
      name: user.name ?? '',
      displayName: getUserDisplayName(user),
      username: user.username,
      mustChangePass: user.mustChangePass,
      role: user.role,
      totalSubmissions: user.submissions.length,
      practicedProblems,
      solvedProblems,
      totalScore: formatWeightedScore(totalScore),
      latestActivity: latestSubmission
        ? `${latestSubmission.problem.code} · ${latestSubmission.status} · ${latestSubmission.score}`
        : 'No submissions yet',
    };
  });

  return (
    <main className="page" style={{ display: 'grid', gap: 16 }}>
      <CreateUserForm />
      <NameImportForm />

      <section className="card">
        <div className="section-title">
          <div>
            <h1>Admin · User Management</h1>
            <p className="subtle" style={{ marginTop: 8 }}>
              Manage all user accounts here, including inline editing, password reset, deletion, and weighted score totals.
            </p>
          </div>
          <span className="badge info">Users: {rows.length}</span>
        </div>
      </section>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username / E-mail</th>
              <th>Role</th>
              <th>Total submissions</th>
              <th>Practiced problems</th>
              <th>Solved (&gt;0)</th>
              <th>Total weighted score</th>
              <th>Must change password</th>
              <th>Latest activity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <UserTableRow
                key={row.id}
                id={row.id}
                currentUserId={session.user.id}
                name={row.name}
                displayName={row.displayName}
                username={row.username}
                role={row.role}
                mustChangePass={row.mustChangePass}
                totalSubmissions={row.totalSubmissions}
                practicedProblems={row.practicedProblems}
                solvedProblems={row.solvedProblems}
                totalScore={row.totalScore}
                latestActivity={row.latestActivity}
              />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
