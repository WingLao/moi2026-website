import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Bi from '@/components/Bi';
import { auth } from '@/lib/auth';
import { getDataRoot } from '@/lib/data-root';
import { FLOWERSHOW_URL, getLessonLinks } from '@/lib/flowershow-links';
import { getProblemPdfDownloadUrl, getProblemPdfUrl } from '@/lib/pdf';
import { getProblemCatalogEntryBySlug, getProblemDataDirName } from '@/lib/problem-catalog';
import { prisma } from '@/lib/prisma';
import { readProblemStatementBySlug } from '@/lib/problem-statements';
import { renderStatementMarkdown } from '@/lib/statement-markdown';
import { LEVEL_LABELS, SUBMISSION_STATUS_LABELS } from '@/lib/status-labels';
import { splitTitle } from '@/lib/title';
import { getUserDisplayName } from '@/lib/user-display';
import WhiteboardPanel from './WhiteboardPanel';

export default async function ProblemDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();
  const isAdmin = session?.user?.role === 'ADMIN';
  const problem = await prisma.problem.findUnique({
    where: { slug },
    include: {
      testCases: { orderBy: { index: 'asc' } },
      submissions: {
        // Students (and visitors) only see their own submissions; admins see everyone's.
        where: isAdmin ? undefined : { userId: session?.user?.id ?? '' },
        orderBy: { queuedAt: 'desc' },
        include: { user: true },
        take: 10,
      },
    },
  }).catch(() => null);

  if (!problem) {
    return notFound();
  }

  const title = splitTitle(problem.title);
  const level = LEVEL_LABELS[problem.level] ?? { en: problem.level, zh: problem.level };
  const pdfUrl = getProblemPdfUrl(problem.pdfFilename);
  const pdfDownloadUrl = getProblemPdfDownloadUrl(problem.pdfFilename);
  const statementMarkdown = readProblemStatementBySlug(problem.slug);
  const warningItems = problem.warning?.split('; ').filter(Boolean) ?? [];
  const validCases = problem.testCases.filter((testCase) => testCase.isValid).length;
  const submissions = problem.submissions;
  const catalog = getProblemCatalogEntryBySlug(problem.slug);
  const lessons = getLessonLinks(problem.slug);
  const ioiTemplatePath = catalog ? path.join(getDataRoot(), 'data', catalog.level, getProblemDataDirName(catalog), 'ioi', 'template.cpp') : '';
  const ioiTemplate = ioiTemplatePath && fs.existsSync(ioiTemplatePath) ? fs.readFileSync(ioiTemplatePath, 'utf8') : null;

  return (
    <main className="page">
      <section className="card hero">
        <div className="eyebrow">
          <Bi en={level.en} zh={level.zh} /> <span className="mono" style={{ marginLeft: 8 }}>{problem.code}</span>
        </div>
        <h1 className="problem-heading">
          <span lang="en">{title.en}</span>
          {title.zh ? <span lang="zh-Hant" className="bi-zh">{title.zh}</span> : null}
        </h1>
        <div className="inline-actions" style={{ marginTop: 14 }}>
          <span className="badge info"><Bi en="Time limit" zh="時限" />&nbsp;{problem.timeLimitMs} ms</span>
          <span className="badge info"><Bi en="Memory" zh="記憶體" />&nbsp;{problem.memoryLimitMb} MB</span>
          {pdfUrl ? (
            <a href={pdfUrl} target="_blank" rel="noreferrer" className="badge info">
              <Bi en="Original PDF (Chinese)" zh="原題 PDF（中文）" />
            </a>
          ) : null}
        </div>
      </section>

      <section className="problem-layout">
        <div className="problem-main">
          <section className="card statement-card">
            {statementMarkdown ? (
              <article id="statement-body" className="statement-article">
                {renderStatementMarkdown(statementMarkdown)}
              </article>
            ) : (
              <div className="empty">
                <Bi block en="The problem statement is not available yet." zh="題目內容暫時未有。" />
              </div>
            )}
          </section>
        </div>

        <div className="problem-side">
          <section className="card lesson-card">
            <h2 style={{ marginTop: 0 }}><Bi en="Learn first" zh="先學再做" /></h2>
            {lessons.length ? (
              <ul className="lesson-links">
                {lessons.map((lesson) => (
                  <li key={lesson.url}>
                    <a href={lesson.url} target="_blank" rel="noreferrer" className="inline-link">
                      <Bi block en={lesson.en} zh={lesson.zh} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="small-text" style={{ margin: '8px 0 0' }}>
                <a href={FLOWERSHOW_URL} target="_blank" rel="noreferrer" className="inline-link">
                  <Bi block en="Training path: lessons from beginner to contest level (in Chinese)" zh="培訓路線網站：由入門到比賽的課程" />
                </a>
              </p>
            )}
          </section>

          <section className="card">
            <h2 style={{ marginTop: 0 }}><Bi en="Submit" zh="提交" /></h2>
            {session?.user ? (
              <form action="/api/submissions" method="post" className="page" style={{ gap: 12 }}>
                <input type="hidden" name="problemId" value={problem.id} />
                <label className="dense-list">
                  <Bi en="Language" zh="語言" />
                  <select name="language" defaultValue="cpp">
                    <option value="cpp">C++17</option>
                    {ioiTemplate ? null : <option value="python">Python 3</option>}
                  </select>
                </label>
                <label className="dense-list">
                  <Bi en="Source code" zh="程式碼" />
                  <textarea
                    name="sourceCode"
                    required
                    minLength={1}
                    rows={18}
                    defaultValue={ioiTemplate ?? '#include <iostream>\nusing namespace std;\n\nint main() {\n  return 0;\n}\n'}
                    className="mono"
                  />
                </label>
                <p className="subtle" style={{ margin: 0 }}>
                  <Bi block en="Your code is judged right after you submit. The result appears on the next page." zh="提交後系統會立即判題，結果會在下一頁顯示。" />
                </p>
                <button type="submit" disabled={!problem.isJudgeable}>
                  {problem.isJudgeable ? <Bi en="Submit" zh="提交" /> : <Bi en="Judging unavailable" zh="暫時不能判題" />}
                </button>
              </form>
            ) : (
              <p>
                <Link href={`/login?callbackUrl=/problems/${problem.slug}`} className="inline-link">
                  <Bi en="Log in to submit" zh="登入後才可提交" />
                </Link>
              </p>
            )}
          </section>

          {session?.user ? (
            <section className="card">
              <h2 style={{ marginTop: 0 }}>
                {isAdmin ? <Bi en="Recent submissions" zh="最近提交" /> : <Bi en="My submissions" zh="我的提交" />}
              </h2>
              {submissions.length ? (
                <div className="table-wrap" style={{ marginTop: 14 }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th><Bi en="Time" zh="時間" /></th>
                        {isAdmin ? <th><Bi en="Student" zh="學生" /></th> : null}
                        <th><Bi en="Result" zh="結果" /></th>
                        <th><Bi en="Score" zh="分數" /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((submission) => {
                        const status = SUBMISSION_STATUS_LABELS[submission.status];
                        return (
                          <tr key={submission.id}>
                            <td>
                              <Link href={`/submissions/${submission.id}`} className="inline-link">
                                {submission.queuedAt.toLocaleString('zh-Hant')}
                              </Link>
                            </td>
                            {isAdmin ? <td>{getUserDisplayName(submission.user)}</td> : null}
                            <td>{status ? <Bi en={status.en} zh={status.zh} /> : submission.status}</td>
                            <td>{submission.score}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty" style={{ marginTop: 14 }}>
                  <Bi block en="No submissions yet." zh="還沒有提交。" />
                </div>
              )}
            </section>
          ) : null}

          {isAdmin ? (
            <section className="card admin-only">
              <h2 style={{ marginTop: 0 }}>Teacher view · 老師專用</h2>
              <div className="status-stack" style={{ marginTop: 8 }}>
                {problem.isJudgeable ? <span className="badge success">Judge ready · 可判題</span> : <span className="badge danger">Judge blocked · 需修正</span>}
                {warningItems.length ? <span className="badge warning">Warnings · {warningItems.length}</span> : <span className="badge info">Data clean · 正常</span>}
              </div>
              {warningItems.length ? (
                <ul className="list" style={{ marginTop: 10 }}>
                  {warningItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : null}
              <ul className="list small-text" style={{ marginTop: 10 }}>
                <li>Slug: <span className="mono">{problem.slug}</span></li>
                {catalog ? <li>Data: <span className="mono">data/{catalog.level}/{getProblemDataDirName(catalog)}</span></li> : null}
                {catalog ? <li>Statement: <span className="mono">statements/{catalog.statementFilename}</span></li> : null}
                {pdfDownloadUrl ? <li><a href={pdfDownloadUrl} className="inline-link">Download PDF · 下載 PDF</a></li> : null}
              </ul>
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
              <div className="small-text" style={{ marginTop: 8 }}>{validCases} / {problem.testCases.length} valid</div>
            </section>
          ) : null}
        </div>
      </section>

      {session?.user ? <WhiteboardPanel problemId={problem.id} isAdmin={isAdmin} /> : null}
    </main>
  );
}
