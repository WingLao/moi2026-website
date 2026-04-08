import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getProblemPdfUrl } from '@/lib/pdf';
import { prisma } from '@/lib/prisma';

export default async function ProblemDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();
  const problem = await prisma.problem.findUnique({
    where: { slug },
    include: {
      testCases: { orderBy: { index: 'asc' } },
      submissions: {
        orderBy: { queuedAt: 'desc' },
        include: { user: true },
        take: 10,
      },
    },
  }).catch(() => null);

  if (!problem) {
    return notFound();
  }

  const pdfUrl = getProblemPdfUrl(problem.pdfFilename);
  const warningItems = problem.warning?.split('; ').filter(Boolean) ?? [];
  const validCases = problem.testCases.filter((testCase) => testCase.isValid).length;

  return (
    <main className="page">
      <section className="card hero">
        <div className="section-title">
          <div>
            <h1>{problem.title}</h1>
            <p className="subtle" style={{ marginTop: 8 }}>
              <span className="mono">{problem.code}</span> · Level {problem.level}
            </p>
          </div>
          <div className="status-stack">
            {problem.isJudgeable ? <span className="badge success">Judge ready · 可判題</span> : <span className="badge danger">Judge blocked · 需修正</span>}
            {warningItems.length ? <span className="badge warning">Warnings · {warningItems.length}</span> : <span className="badge info">Data clean · 正常</span>}
          </div>
        </div>

        <div className="kv-grid" style={{ marginTop: 18 }}>
          <div className="kv">
            <div className="kv-label">Time limit</div>
            <div className="kv-value">{problem.timeLimitMs} ms</div>
          </div>
          <div className="kv">
            <div className="kv-label">Memory limit</div>
            <div className="kv-value">{problem.memoryLimitMb} MB</div>
          </div>
          <div className="kv">
            <div className="kv-label">Testcases</div>
            <div className="kv-value">{validCases} / {problem.testCases.length}</div>
          </div>
          <div className="kv">
            <div className="kv-label">Statement PDF</div>
            <div className="kv-value" style={{ fontSize: 16 }}>{problem.pdfFilename ?? 'N/A'}</div>
          </div>
        </div>

        {pdfUrl ? (
          <div className="action-links" style={{ marginTop: 18 }}>
            <a href={pdfUrl} target="_blank" rel="noreferrer">View PDF · 開啟題目</a>
            <a href={pdfUrl} download={problem.pdfFilename ?? undefined}>Download PDF · 下載 PDF</a>
          </div>
        ) : (
          <div className="notice warning" style={{ marginTop: 18 }}>
            Statement PDF is missing. 題目 PDF 尚未就緒。
          </div>
        )}

        {warningItems.length ? (
          <div className="notice warning" style={{ marginTop: 18 }}>
            <div style={{ fontWeight: 700 }}>Data warnings · 資料提醒</div>
            <ul className="list" style={{ marginTop: 10 }}>
              {warningItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="notice success" style={{ marginTop: 18 }}>
            Statement and testcase structure look clean. 題目 PDF 與測資結構目前正常。
          </div>
        )}
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Submit solution</h2>
        {session?.user ? (
          <form action="/api/submissions" method="post" className="page" style={{ gap: 12 }}>
            <input type="hidden" name="problemId" value={problem.id} />
            <label className="dense-list">
              <span>Language</span>
              <select name="language" defaultValue="cpp">
                <option value="cpp">C++17</option>
                <option value="python">Python 3</option>
              </select>
            </label>
            <label className="dense-list">
              <span>Source code</span>
              <textarea
                name="sourceCode"
                required
                minLength={1}
                rows={18}
                defaultValue={'#include <iostream>\nusing namespace std;\n\nint main() {\n  return 0;\n}\n'}
                className="mono"
              />
            </label>
            <p className="subtle">
              After you submit, the system should create a submission record immediately and then judge it in the queue.
            </p>
            <button type="submit" disabled={!problem.isJudgeable}>{problem.isJudgeable ? 'Queue submission' : 'Judging unavailable'}</button>
          </form>
        ) : (
          <p>
            <Link href={`/login?callbackUrl=/problems/${problem.slug}`} className="inline-link">Log in</Link> to submit.
          </p>
        )}
      </section>

      <section className="card">
        <div className="section-title">
          <div>
            <h2>Testcases</h2>
            <p className="subtle" style={{ marginTop: 8 }}>Canonical testcase pairs only. 系統只會匯入正式測資，不會把重複複製檔算進去。</p>
          </div>
          <span className={validCases === problem.testCases.length ? 'badge success' : 'badge warning'}>
            {validCases} / {problem.testCases.length} valid
          </span>
        </div>
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Input</th>
                <th>Output</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {problem.testCases.map((testCase) => (
                <tr key={testCase.id}>
                  <td>{testCase.index}</td>
                  <td className="mono">{testCase.inputPath.split('/').at(-1)}</td>
                  <td className="mono">{testCase.outputPath?.split('/').at(-1) ?? '—'}</td>
                  <td>{testCase.score}</td>
                  <td>{testCase.warning ?? (testCase.isValid ? 'valid' : 'invalid')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Recent submissions for this problem</h2>
        {problem.submissions.length ? (
          <div className="table-wrap" style={{ marginTop: 14 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Language</th>
                  <th>Status</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {problem.submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td><Link href={`/submissions/${submission.id}`} className="inline-link mono">{submission.id}</Link></td>
                    <td>{submission.user.username}</td>
                    <td>{submission.language}</td>
                    <td>{submission.status}</td>
                    <td>{submission.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty" style={{ marginTop: 14 }}>No submissions yet for this problem. 這題目前還沒有提交。</div>
        )}
      </section>
    </main>
  );
}
