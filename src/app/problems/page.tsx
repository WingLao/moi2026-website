import Link from 'next/link';
import Bi from '@/components/Bi';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { LEVEL_LABELS, SUBMISSION_STATUS_LABELS } from '@/lib/status-labels';
import { splitTitle } from '@/lib/title';

const LEVEL_OPTIONS = ['ALL', 'Beginner', 'GA', 'DP', 'P', 'J', 'S', 'IOI'] as const;

export default async function ProblemsPage({
  searchParams,
}: {
  searchParams?: Promise<{ level?: string }>;
}) {
  const session = await auth();
  const isAdmin = session?.user?.role === 'ADMIN';
  const params = searchParams ? await searchParams : undefined;
  const requestedLevel = params?.level;
  const activeLevel = LEVEL_OPTIONS.includes((requestedLevel ?? 'ALL') as (typeof LEVEL_OPTIONS)[number])
    ? (requestedLevel ?? 'ALL')
    : 'ALL';
  const problems = await prisma.problem.findMany({
    orderBy: [{ level: 'asc' }, { code: 'asc' }],
    include: {
      submissions: session?.user
        ? {
            where: isAdmin ? undefined : { userId: session.user.id },
            orderBy: { queuedAt: 'desc' },
          }
        : false,
    },
  }).catch(() => []);
  const filteredProblems = activeLevel === 'ALL'
    ? problems
    : problems.filter((problem) => problem.level === activeLevel);
  const warningCount = filteredProblems.filter((problem) => Boolean(problem.warning) || !problem.isJudgeable).length;

  return (
    <main className="page">
      <section className="card hero">
        <h1><Bi block en="Problems" zh="題目" /></h1>
        <p className="subtle" style={{ marginTop: 10 }}>
          <Bi block en="Every problem is written in English and Chinese. Open one to read it, take notes on the whiteboard and submit your code." zh="每一題都有英文和中文。打開題目即可閱讀、在白板做筆記和提交程式。" />
        </p>
        <div className="level-filter" style={{ marginTop: 16 }}>
          {LEVEL_OPTIONS.map((level) => {
            const href = level === 'ALL' ? '/problems' : `/problems?level=${encodeURIComponent(level)}`;
            const active = level === activeLevel;
            const label = level === 'ALL' ? { en: 'All', zh: '全部' } : LEVEL_LABELS[level];
            return (
              <Link
                key={level}
                href={href}
                className={`button-link${active ? '' : ' secondary'}`}
                aria-current={active ? 'page' : undefined}
              >
                <Bi en={label.en} zh={label.zh} />
              </Link>
            );
          })}
        </div>
        {isAdmin && warningCount ? (
          <p className="small-text" style={{ marginTop: 12 }}>Teacher: {warningCount} problem(s) here have data warnings · 老師：此處有 {warningCount} 題有資料提醒</p>
        ) : null}
      </section>

      <div className="table-wrap">
        <table className="table problem-table">
          <thead>
            <tr>
              <th><Bi en="Problem" zh="題目" /></th>
              <th><Bi en="Level" zh="程度" /></th>
              <th>{isAdmin ? <Bi en="Best (all students)" zh="最高分（全部學生）" /> : <Bi en="My best" zh="我的最高分" />}</th>
              <th><Bi en="Latest result" zh="最近結果" /></th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem) => {
              const submissions = Array.isArray(problem.submissions) ? problem.submissions : [];
              const best = submissions.reduce((max, submission) => Math.max(max, submission.score), 0);
              const latest = submissions[0];
              const latestStatus = latest ? SUBMISSION_STATUS_LABELS[latest.status] : null;
              const title = splitTitle(problem.title);
              const level = LEVEL_LABELS[problem.level] ?? { en: problem.level, zh: problem.level };

              return (
                <tr key={problem.id}>
                  <td>
                    <Link href={`/problems/${problem.slug}`} className="problem-title">
                      <span className="bi bi-block">
                        <span lang="en">{title.en}</span>
                        {title.zh ? <span lang="zh-Hant" className="bi-zh">{title.zh}</span> : null}
                      </span>
                    </Link>
                    {isAdmin && (problem.warning || !problem.isJudgeable) ? (
                      <div className="small-text" style={{ color: 'var(--warning)' }}>{problem.isJudgeable ? '' : 'Judge blocked · '}{problem.warning}</div>
                    ) : null}
                  </td>
                  <td><Bi block en={level.en} zh={level.zh} /></td>
                  <td>
                    {session?.user ? (
                      <span className={best === problem.maxScore ? 'badge success' : best > 0 ? 'badge warning' : 'subtle'}>
                        {best} / {problem.maxScore}
                      </span>
                    ) : (
                      <span className="subtle"><Bi en="Log in" zh="請登入" /></span>
                    )}
                  </td>
                  <td>
                    {latest && latestStatus ? (
                      <Bi block en={`${latestStatus.en} · ${latest.score}`} zh={latestStatus.zh} />
                    ) : (
                      <span className="subtle"><Bi en="Not tried" zh="未提交" /></span>
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
