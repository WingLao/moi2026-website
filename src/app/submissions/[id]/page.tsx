import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import Bi from '@/components/Bi';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SUBMISSION_STATUS_LABELS, TESTCASE_STATUS_LABELS } from '@/lib/status-labels';
import { splitTitle } from '@/lib/title';
import { getUserDisplayName } from '@/lib/user-display';
import AutoRefresh from './AutoRefresh';

export default async function SubmissionDetail({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  const { id } = await params;
  const submission = await prisma.submission.findUnique({
    where: { id },
    include: {
      user: true,
      problem: true,
      results: { include: { testCase: true }, orderBy: { testCase: { index: 'asc' } } },
    },
  }).catch(() => null);

  if (!submission) {
    return notFound();
  }

  const isAdmin = session.user.role === 'ADMIN';
  if (!isAdmin && submission.userId !== session.user.id) {
    redirect('/submissions');
  }

  const isPending = submission.status === 'PENDING' || submission.status === 'JUDGING';
  const status = SUBMISSION_STATUS_LABELS[submission.status];
  const title = splitTitle(submission.problem.title);

  return (
    <main className="page">
      <AutoRefresh active={isPending} />
      <section className="card hero">
        <div className="eyebrow"><Bi en="Submission" zh="提交" /></div>
        <h1 className="problem-heading">
          <Link href={`/problems/${submission.problem.slug}`}>
            <span lang="en">{title.en}</span>
            {title.zh ? <span lang="zh-Hant" className="bi-zh"> {title.zh}</span> : null}
          </Link>
        </h1>
        <div className="kv-grid" style={{ marginTop: 16 }}>
          <div className="kv">
            <div className="kv-label"><Bi en="Result" zh="結果" /></div>
            <div className="kv-value">{status ? <Bi block en={status.en} zh={status.zh} /> : submission.status}</div>
          </div>
          <div className="kv">
            <div className="kv-label"><Bi en="Score" zh="分數" /></div>
            <div className="kv-value">{submission.score} / {submission.problem.maxScore}</div>
          </div>
          <div className="kv">
            <div className="kv-label"><Bi en="Language" zh="語言" /></div>
            <div className="kv-value">{submission.language === 'python' ? 'Python 3' : 'C++17'}</div>
          </div>
          <div className="kv">
            <div className="kv-label"><Bi en="Submitted" zh="提交時間" /></div>
            <div className="kv-value" style={{ fontSize: 16 }}>{submission.queuedAt.toLocaleString('zh-Hant')}</div>
          </div>
        </div>
        {isAdmin ? <p className="small-text" style={{ marginTop: 10 }}>Student · 學生：{getUserDisplayName(submission.user)}</p> : null}
        {isPending ? (
          <p style={{ marginTop: 12, color: 'var(--primary)' }}>
            <Bi block en="Still judging… this page refreshes every 3 seconds." zh="判題中……本頁每 3 秒自動更新。" />
          </p>
        ) : null}
        {submission.compileOutput ? (
          <details style={{ marginTop: 12 }}>
            <summary><Bi en="Compiler messages" zh="編譯訊息" /></summary>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{submission.compileOutput}</pre>
          </details>
        ) : null}
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}><Bi en="Test results" zh="各測試結果" /></h2>
        {submission.results.length ? (
          <div className="table-wrap" style={{ marginTop: 14 }}>
            <table className="table">
              <thead>
                <tr>
                  <th><Bi en="Test" zh="測試" /></th>
                  <th><Bi en="Result" zh="結果" /></th>
                  <th><Bi en="Score" zh="分數" /></th>
                  <th><Bi en="Time" zh="用時" /></th>
                </tr>
              </thead>
              <tbody>
                {submission.results.map((result) => {
                  const label = TESTCASE_STATUS_LABELS[result.status];
                  return (
                    <tr key={result.id}>
                      <td>#{result.testCase.index}</td>
                      <td>
                        {label ? <span className={`badge ${label.tone}`}><Bi en={label.en} zh={label.zh} /></span> : result.status}
                        {result.message ? <div className="small-text">{result.message}</div> : null}
                      </td>
                      <td>{result.score}</td>
                      <td>{result.timeMs != null ? `${result.timeMs} ms` : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty" style={{ marginTop: 14 }}><Bi block en="No results yet." zh="暫時未有結果。" /></div>
        )}
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}><Bi en="Your code" zh="你的程式碼" /></h2>
        <pre className="statement-code" style={{ whiteSpace: 'pre-wrap', overflowX: 'auto' }}>{submission.sourceCode}</pre>
      </section>
    </main>
  );
}
