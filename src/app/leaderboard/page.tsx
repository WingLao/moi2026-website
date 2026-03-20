import { prisma } from '@/lib/prisma';

export default async function LeaderboardPage() {
  const users = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    include: {
      submissions: {
        include: { problem: true },
        orderBy: [{ score: 'desc' }, { judgedAt: 'asc' }, { queuedAt: 'asc' }],
      },
    },
  }).catch(() => []);

  const rows = users
    .map((user) => {
      const bestByProblem = new Map<string, { score: number; reachedAt: Date | null }>();
      for (const submission of user.submissions) {
        const previous = bestByProblem.get(submission.problemId);
        const reachedAt = submission.reachedScoreAt ?? submission.judgedAt ?? submission.queuedAt;
        if (!previous || submission.score > previous.score || (submission.score === previous.score && reachedAt < (previous.reachedAt ?? reachedAt))) {
          bestByProblem.set(submission.problemId, { score: submission.score, reachedAt });
        }
      }

      const total = [...bestByProblem.values()].reduce((sum, item) => sum + item.score, 0);
      const latestTieBreaker = [...bestByProblem.values()]
        .map((item) => item.reachedAt?.getTime() ?? Number.MAX_SAFE_INTEGER)
        .sort((a, b) => a - b)[0] ?? Number.MAX_SAFE_INTEGER;

      return {
        username: user.username,
        total,
        solvedProblems: [...bestByProblem.values()].filter((item) => item.score > 0).length,
        tieBreaker: latestTieBreaker,
      };
    })
    .sort((left, right) => right.total - left.total || right.solvedProblems - left.solvedProblems || left.tieBreaker - right.tieBreaker || left.username.localeCompare(right.username));

  return (
    <main style={{ display: 'grid', gap: 16 }}>
      <div>
        <h1 style={{ marginBottom: 8 }}>Leaderboard</h1>
        <p style={{ marginTop: 0 }}>Best score per problem counts. Tie-break uses earliest time that score was reached.</p>
      </div>
      <div style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#eef3fb', textAlign: 'left' }}>
              <th style={{ padding: 12 }}>Rank</th>
              <th style={{ padding: 12 }}>User</th>
              <th style={{ padding: 12 }}>Solved (&gt;0)</th>
              <th style={{ padding: 12 }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.username} style={{ borderTop: '1px solid #e4e9f2' }}>
                <td style={{ padding: 12 }}>{index + 1}</td>
                <td style={{ padding: 12 }}>{row.username}</td>
                <td style={{ padding: 12 }}>{row.solvedProblems}</td>
                <td style={{ padding: 12 }}>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
