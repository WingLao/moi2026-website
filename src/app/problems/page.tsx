import Link from 'next/link';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getProblemPdfUrl } from '@/lib/pdf';
import { resolveProblemStatementBySlug } from '@/lib/problem-statements';

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
  const blockedCount = problems.length - judgeableCount;
  const warningCount = problems.filter((problem) => Boolean(problem.warning)).length;

  return (
    <main className="page">
      <section className="card hero">
        <div className="section-title">
          <div>
            <h1>Problems · 題目</h1>
            <p className="subtle" style={{ marginTop: 8 }}>
              Imported from local MOI2026 statements and testcase folders. Open a problem to submit code, inspect recent runs, and verify data health. 可打開題目後提交程式，也能直接檢查資料是否完整。
            </p>
          </div>
          <div className="inline-actions">
            <span className="badge success">Judgeable 可判題: {judgeableCount}</span>
            {blockedCount ? <span className="badge danger">Blocked 需修正: {blockedCount}</span> : null}
            {warningCount ? <span className="badge warning">Warnings 警告: {warningCount}</span> : null}
          </div>
        </div>
      </section>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Level</th>
              <th>Problem</th>
              <th>Statement</th>
              <th>Cases</th>
              <th>Your best · 最佳分數</th>
              <th>Status · 狀態</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => {
              const submissions = Array.isArray(problem.submissions) ? problem.submissions : [];
              const best = submissions.reduce((max, submission) => Math.max(max, submission.score), 0);
              const latest = submissions[0];
              const pdfUrl = getProblemPdfUrl(problem.pdfFilename);
              const statement = resolveProblemStatementBySlug(problem.slug);
              const validCases = problem.testCases.filter((testCase) => testCase.isValid).length;
              const warningItems = problem.warning?.split('; ').filter(Boolean) ?? [];

              return (
                <tr key={problem.id}>
                  <td>{problem.level}</td>
                  <td>
                    <div className="dense-list">
                      <Link href={`/problems/${problem.slug}`} className="problem-title">
                        {problem.title}
                      </Link>
                      <div className="problem-subtitle mono">{problem.code}</div>
                    </div>
                  </td>
                  <td>
                    {statement?.exists ? (
                      <div className="dense-list">
                        <Link href={`/problems/${problem.slug}`} className="inline-link">Read Markdown</Link>
                        {pdfUrl ? <a href={pdfUrl} target="_blank" rel="noreferrer" className="inline-link">PDF archive</a> : null}
                      </div>
                    ) : (
                      <span className="badge warning">Missing statement</span>
                    )}
                  </td>
                  <td>
                    <div className="dense-list">
                      <div>{validCases} / {problem.testCases.length} valid</div>
                      <div className="small-text">Max score: {problem.maxScore}</div>
                    </div>
                  </td>
                  <td>{session?.user ? `${best} / ${problem.maxScore}` : 'Login to view · 登入後查看'}</td>
                  <td>
                    <div className="status-stack">
                      {problem.isJudgeable ? (
                        <span className="badge success">Judge ready · 可用</span>
                      ) : (
                        <span className="badge danger">Judge blocked · 需修正</span>
                      )}
                      {warningItems.length ? <span className="badge warning">Data warnings · {warningItems.length}</span> : <span className="badge info">Data clean · 正常</span>}
                      <div className="small-text">{latest ? `${latest.status} · ${latest.score}` : 'No submissions yet · 尚未提交'}</div>
                      {warningItems.length ? <div className="small-text">{warningItems.join(' / ')}</div> : null}
                    </div>
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
