import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getProblemLearningSupport } from '@/lib/problem-learning-support';
import { prisma } from '@/lib/prisma';
import { readProblemStatementBySlug } from '@/lib/problem-statements';

export default async function AdminProblems() {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    redirect('/login?callbackUrl=/admin/problems');
  }

  const problems = await prisma.problem.findMany({
    include: { testCases: true },
    orderBy: [{ level: 'asc' }, { title: 'asc' }],
  }).catch(() => []);
  const guidedProblems = problems
    .map((problem) => {
      const statementMarkdown = readProblemStatementBySlug(problem.slug);
      const learningSupport = getProblemLearningSupport(problem, statementMarkdown);
      const validCases = problem.testCases.filter((testCase) => testCase.isValid).length;
      return { problem, learningSupport, validCases };
    })
    .filter((item) => item.learningSupport);

  return (
    <main className="page">
      <section className="card hero">
        <div className="section-title">
          <div>
            <h1>Admin · Problems</h1>
            <p className="subtle" style={{ marginTop: 8 }}>Quick audit view for imported statements and testcase health. 題目資料健康狀態總覽。</p>
          </div>
          <div className="inline-actions">
            <span className="badge success">Judgeable: {problems.filter((problem) => problem.isJudgeable).length}</span>
            <span className="badge warning">Warnings: {problems.filter((problem) => Boolean(problem.warning)).length}</span>
          </div>
        </div>
      </section>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Problem</th>
              <th>Cases</th>
              <th>Judge</th>
              <th>Warnings</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.id}>
                <td>{problem.level}/{problem.title}</td>
                <td>{problem.testCases.filter((testCase) => testCase.isValid).length} / {problem.testCases.length}</td>
                <td>{problem.isJudgeable ? 'judgeable' : 'blocked'}</td>
                <td>{problem.warning ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="card" style={{ marginTop: 18 }}>
        <div className="section-title">
          <div>
            <h2 style={{ margin: 0 }}>Beginner / GA / DP Testcase Preview</h2>
            <p className="subtle" style={{ marginTop: 8 }}>
              額外顯示教學題的 testcase 表格格式，以及 Input / 中文簡述提示。
            </p>
          </div>
          <span className="badge info">Preview cards: {guidedProblems.length}</span>
        </div>
      </section>

      <div className="page" style={{ gap: 16, marginTop: 16 }}>
        {guidedProblems.map(({ problem, learningSupport, validCases }) => (
          <section key={problem.id} className="card">
            <div className="section-title">
              <div>
                <h2 style={{ margin: 0 }}>{problem.level} / {problem.title}</h2>
                <p className="subtle" style={{ marginTop: 8 }}>
                  Canonical testcase pairs only. 系統只會匯入正式測資，不會把重複複製檔算進去。
                </p>
              </div>
              <span className={validCases === problem.testCases.length ? 'badge success' : 'badge warning'}>
                {validCases} / {problem.testCases.length} valid
              </span>
            </div>

            <div className="kv-grid" style={{ marginTop: 14 }}>
              <div className="kv">
                <div className="kv-label">簡短中文題目說明</div>
                <div className="kv-value" style={{ fontSize: 16, fontWeight: 600 }}>{learningSupport?.shortDescriptionZh}</div>
                {learningSupport?.rawDescription ? (
                  <div className="small-text" style={{ marginTop: 10 }}>Original: {learningSupport.rawDescription}</div>
                ) : null}
              </div>
              <div className="kv">
                <div className="kv-label">Input 程式提示</div>
                <div className="kv-value" style={{ fontSize: 16, fontWeight: 600 }}>{learningSupport?.inputHintZh}</div>
                {learningSupport?.rawInputSpec ? (
                  <div className="small-text" style={{ marginTop: 10 }}>Original: {learningSupport.rawInputSpec}</div>
                ) : null}
              </div>
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
        ))}
      </div>
    </main>
  );
}
