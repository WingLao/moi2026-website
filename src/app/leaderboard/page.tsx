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
      const bestByProblem = new Map<string, { score: number; reachedAt: Date; problemCode: string }>();
      for (const submission of user.submissions) {
        const reachedAt = submission.reachedScoreAt ?? submission.judgedAt ?? submission.queuedAt;
        const previous = bestByProblem.get(submission.problemId);
        if (!previous || submission.score > previous.score || (submission.score === previous.score && reachedAt < previous.reachedAt)) {
          bestByProblem.set(submission.problemId, { score: submission.score, reachedAt, problemCode: submission.problem.code });
        }
      }

      const bestScores = [...bestByProblem.values()];
      const total = bestScores.reduce((sum, item) => sum + item.score, 0);
      const solvedProblems = bestScores.filter((item) => item.score > 0).length;
      const tieBreaker = bestScores.reduce((min, item) => Math.min(min, item.reachedAt.getTime()), Number.MAX_SAFE_INTEGER);
      const breakdown = bestScores
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.problemCode.localeCompare(b.problemCode))
        .map((item) => `${item.problemCode} ${item.score}`)
        .join(', ');

      return { username: user.username, total, solvedProblems, tieBreaker, breakdown };
    })
    .sort((left, right) => right.total - left.total || right.solvedProblems - left.solvedProblems || left.tieBreaker - right.tieBreaker || left.username.localeCompare(right.username));

  return (
    <main className="page">
      <section className="card">
        <div className="section-title">
          <div>
            <h1>Leaderboard · 排名榜</h1>
            <p className="subtle" style={{ marginTop: 8 }}>
              Best score per problem counts. Ties prefer the user who reached the counted score earlier. 以每題最佳分計算。
            </p>
          </div>
          <span className="badge info">Students ranked 排名人數: {rows.length}</span>
        </div>
      </section>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Rank · 名次</th>
              <th>User · 用戶</th>
              <th>Solved (&gt;0) · 已得分題數</th>
              <th>Total · 總分</th>
              <th>Best-score breakdown · 最佳分明細</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.username}>
                <td>{index + 1}</td>
                <td>{row.username}</td>
                <td>{row.solvedProblems}</td>
                <td>{row.total}</td>
                <td className="subtle">{row.breakdown || 'No positive scores yet · 暫未得分'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
