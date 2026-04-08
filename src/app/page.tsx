import Link from 'next/link';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const session = await auth();
  const [problemCount, judgeableCount, warningProblemCount, submissionCount, studentCount, recentSubmissions] = await Promise.all([
    prisma.problem.count().catch(() => 0),
    prisma.problem.count({ where: { isJudgeable: true } }).catch(() => 0),
    prisma.problem.count({ where: { warning: { not: null } } }).catch(() => 0),
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
      <section className="card hero">
        <div className="section-title">
          <div>
            <h1>MOI2026 Contest Portal</h1>
            <p className="subtle" style={{ marginTop: 10 }}>
              Local training and judging portal for P / J / S groups. Students can browse problems, submit code, and track results. 管理員可查看學生、提交與題目和資料健康狀態。
            </p>
          </div>
          <div className="inline-actions">
            <Link href="/problems" className="button-link">Browse Problems · 瀏覽題目</Link>
            <Link href="/leaderboard" className="button-link secondary">Leaderboard · 排名</Link>
            {session?.user ? <Link href="/submissions" className="button-link secondary">My Submissions · 我的提交</Link> : <Link href="/login" className="button-link secondary">Login · 登入</Link>}
          </div>
        </div>
      </section>

      <section className="grid-tiles">
        {[
          { label: 'Problems · 題目', value: problemCount, note: 'Imported and listed for contestants 已匯入題目' },
          { label: 'Ready · 可判題', value: judgeableCount, note: 'Problems with complete testcase pairs 測資可正常判題' },
          { label: 'Issues · 資料提醒', value: warningProblemCount, note: 'Problems with PDF or testcase warnings 需要留意的題目' },
          { label: 'Students · 學生', value: studentCount, note: 'Seeded training accounts 已建立帳號' },
          { label: 'Submissions · 提交', value: submissionCount, note: 'Queued and judged attempts 已提交與判題' },
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
            <h2>Quick Reminders · 重要提示</h2>
            <p className="subtle" style={{ marginTop: 8 }}>Current platform behavior and operator-facing caveats. 以下是目前平台重點。</p>
          </div>
        </div>
        <ul className="list" style={{ marginTop: 14 }}>
          <li>Problem PDFs are now served from the source dataset, so the site no longer depends on `public/problem-pdfs` being manually synced each time. 題目 PDF 不再依賴手動同步公開資料夾。</li>
          <li>Judging currently runs on the host via the worker queue, so this is suitable for local rehearsal, not hardened production isolation. 目前較適合教學 / 測試用途。</li>
          <li>Students only see their own submissions. Admins can inspect all users, problems, and judged runs. 學生只會看到自己的提交。</li>
          <li>Imported problems now keep data warnings even when still judgeable, so duplicate testcase copies and missing PDFs are easier to spot. 有資料警告時會直接在頁面顯示。</li>
        </ul>
      </section>

      <section className="card">
        <div className="section-title">
          <div>
            <h2>Recent Activity · 最近活動</h2>
            <p className="subtle" style={{ marginTop: 8 }}>Useful for quick smoke-checks after startup. 可快速檢查系統是否正常。</p>
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
          <div className="empty" style={{ marginTop: 14 }}>No submissions yet. Create one from any problem page to verify the queue + worker path. 目前尚未有提交紀錄。</div>
        )}
      </section>
    </main>
  );
}
