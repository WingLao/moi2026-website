import Bi from '@/components/Bi';
import { prisma } from '@/lib/prisma';
import { formatWeightedScore, getLevelMultiplier, getWeightedScore } from '@/lib/score-utils';
import { getUserDisplayName } from '@/lib/user-display';

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
      const bestByProblem = new Map<string, { score: number; reachedAt: Date; problemCode: string; level: 'Beginner' | 'GA' | 'DP' | 'P' | 'J' | 'S' | 'CSPJ' | 'CSPS' | 'NOIP' | 'NOI' | 'IOI' }>();
      for (const submission of user.submissions) {
        const reachedAt = submission.reachedScoreAt ?? submission.judgedAt ?? submission.queuedAt;
        const previous = bestByProblem.get(submission.problemId);
        if (!previous || submission.score > previous.score || (submission.score === previous.score && reachedAt < previous.reachedAt)) {
          bestByProblem.set(submission.problemId, {
            score: submission.score,
            reachedAt,
            problemCode: submission.problem.code,
            level: submission.problem.level,
          });
        }
      }

      const bestScores = [...bestByProblem.values()];
      const total = bestScores.reduce((sum, item) => sum + getWeightedScore(item.score, item.level), 0);
      const solvedProblems = bestScores.filter((item) => item.score > 0).length;
      const tieBreaker = bestScores.reduce((min, item) => Math.min(min, item.reachedAt.getTime()), Number.MAX_SAFE_INTEGER);
      const breakdown = bestScores
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.problemCode.localeCompare(b.problemCode))
        .map((item) => `${item.problemCode} ${item.score} x ${getLevelMultiplier(item.level)} = ${formatWeightedScore(getWeightedScore(item.score, item.level))}`)
        .join(', ');

      return { id: user.id, displayName: getUserDisplayName(user), total, solvedProblems, tieBreaker, breakdown };
    })
    .sort((left, right) => right.total - left.total || right.solvedProblems - left.solvedProblems || left.tieBreaker - right.tieBreaker || left.displayName.localeCompare(right.displayName));

  return (
    <main className="page">
      <section className="card hero">
        <h1><Bi block en="Leaderboard" zh="排名榜" /></h1>
        <p className="subtle" style={{ marginTop: 10 }}>
          <Bi
            block
            en="Your best score on each problem counts, multiplied by the level weight: Beginner ×0.1, Greedy ×0.5, DP ×1, P ×1, J ×2, S ×3, CSP-J ×2, CSP-S ×3, NOIP ×3, NOI ×4, IOI ×4. If two totals are equal, whoever reached it first ranks higher."
            zh="每題取你的最高分，再乘以程度權重：入門 ×0.1、貪心 ×0.5、動態規劃 ×1、P 組 ×1、J 組 ×2、S 組 ×3、CSP-J ×2、CSP-S ×3、NOIP ×3、NOI ×4、IOI ×4。總分相同時，先達到該分數的排前。"
          />
        </p>
      </section>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th><Bi en="Rank" zh="名次" /></th>
              <th><Bi en="Student" zh="學生" /></th>
              <th><Bi en="Problems scored" zh="已得分題數" /></th>
              <th><Bi en="Total" zh="總分" /></th>
              <th><Bi en="Breakdown" zh="分數明細" /></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.displayName}</td>
                <td>{row.solvedProblems}</td>
                <td>{formatWeightedScore(row.total)}</td>
                <td className="subtle">{row.breakdown || <Bi en="No score yet" zh="暫未得分" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
