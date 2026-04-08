import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminProblems() {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    redirect('/login?callbackUrl=/admin/problems');
  }

  const problems = await prisma.problem.findMany({
    include: { testCases: true },
    orderBy: [{ level: 'asc' }, { title: 'asc' }],
  }).catch(() => []);

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
    </main>
  );
}
