import Link from 'next/link';
import Bi from '@/components/Bi';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SUBMISSION_STATUS_LABELS } from '@/lib/status-labels';
import { splitTitle } from '@/lib/title';
import { getUserDisplayName } from '@/lib/user-display';

const STEPS = [
  { en: 'Open a problem and read it — every problem is in English and Chinese.', zh: '打開一題題目閱讀——每一題都有英文和中文。' },
  { en: 'Use the 📝 whiteboard to trace the sample by hand. Your notes are saved for next time.', zh: '用 📝 白板動手跑一次範例，筆記會保存，下次可以再看。' },
  { en: 'Write your program in C++ or Python and submit it. The system judges it straight away.', zh: '用 C++ 或 Python 寫程式並提交，系統會立即判題。' },
  { en: 'Check your result, fix your code and try again. Your best score counts.', zh: '查看結果，修正程式再試。以最高分計算。' },
];

export default async function Home() {
  const session = await auth();
  const isAdmin = session?.user?.role === 'ADMIN';
  const [problemCount, warningProblemCount, submissionCount, studentCount, recentSubmissions] = isAdmin
    ? await Promise.all([
        prisma.problem.count().catch(() => 0),
        prisma.problem.count({ where: { OR: [{ warning: { not: null } }, { isJudgeable: false }] } }).catch(() => 0),
        prisma.submission.count().catch(() => 0),
        prisma.user.count({ where: { role: 'STUDENT' } }).catch(() => 0),
        prisma.submission.findMany({ take: 8, orderBy: { queuedAt: 'desc' }, include: { problem: true, user: true } }).catch(() => []),
      ])
    : [0, 0, 0, 0, []];

  return (
    <main className="page">
      <section className="card hero">
        <h1><Bi block en="Programming Practice" zh="程式練習平台" /></h1>
        <p className="subtle" style={{ marginTop: 10 }}>
          <Bi block en="Practice problems for the CDSJ5 programming class and the Macao Olympiad in Informatics (MOI)." zh="聖若瑟教區中學第五校程式語言班及澳門資訊學奧林匹克（MOI）練習題。" />
        </p>
        <div className="inline-actions" style={{ marginTop: 16 }}>
          <Link href="/problems" className="button-link"><Bi en="Start practising" zh="開始練習" /></Link>
          {session?.user ? (
            <Link href="/submissions" className="button-link secondary"><Bi en="My submissions" zh="我的提交" /></Link>
          ) : (
            <Link href="/login" className="button-link secondary"><Bi en="Log in" zh="登入" /></Link>
          )}
          <Link href="/quiz" className="button-link secondary"><Bi en="CSP multiple-choice quiz" zh="CSP 選擇題練習" /></Link>
          <Link href="/leaderboard" className="button-link secondary"><Bi en="Leaderboard" zh="排名榜" /></Link>
        </div>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}><Bi en="How it works" zh="使用方法" /></h2>
        <ol className="steps">
          {STEPS.map((step) => (
            <li key={step.en}><Bi block en={step.en} zh={step.zh} /></li>
          ))}
        </ol>
      </section>

      {isAdmin ? (
        <>
          <section className="grid-tiles">
            {[
              { label: 'Problems · 題目', value: problemCount },
              { label: 'Data warnings · 資料提醒', value: warningProblemCount },
              { label: 'Students · 學生', value: studentCount },
              { label: 'Submissions · 提交', value: submissionCount },
            ].map((item) => (
              <div key={item.label} className="card compact">
                <div className="subtle">{item.label}</div>
                <div className="tile-number">{item.value}</div>
              </div>
            ))}
          </section>

          <section className="card admin-only">
            <h2 style={{ marginTop: 0 }}>Recent activity · 最近活動（teacher only · 老師專用）</h2>
            {recentSubmissions.length ? (
              <div className="table-wrap" style={{ marginTop: 14 }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Student · 學生</th>
                      <th>Problem · 題目</th>
                      <th>Result · 結果</th>
                      <th>Score · 分數</th>
                      <th>Time · 時間</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSubmissions.map((submission) => {
                      const status = SUBMISSION_STATUS_LABELS[submission.status];
                      return (
                        <tr key={submission.id}>
                          <td>{getUserDisplayName(submission.user)}</td>
                          <td>{splitTitle(submission.problem.title).en}</td>
                          <td>{status ? `${status.en} · ${status.zh}` : submission.status}</td>
                          <td>{submission.score}</td>
                          <td>{submission.queuedAt.toLocaleString('zh-Hant')}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty" style={{ marginTop: 14 }}>No submissions yet · 尚未有提交</div>
            )}
          </section>
        </>
      ) : null}
    </main>
  );
}
