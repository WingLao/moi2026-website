import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function ProblemsPage() {
  const problems = await prisma.problem.findMany({
    orderBy: [{ level: 'asc' }, { title: 'asc' }],
    include: { testCases: true, submissions: true },
  }).catch(() => []);

  return (
    <main style={{ display: 'grid', gap: 16 }}>
      <div>
        <h1 style={{ marginBottom: 8 }}>Problems</h1>
        <p style={{ marginTop: 0 }}>Imported from the MOI2026 statements and local testcase folders.</p>
      </div>
      <div style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#eef3fb', textAlign: 'left' }}>
              <th style={{ padding: 12 }}>Level</th>
              <th style={{ padding: 12 }}>Code</th>
              <th style={{ padding: 12 }}>Title</th>
              <th style={{ padding: 12 }}>Cases</th>
              <th style={{ padding: 12 }}>Submissions</th>
              <th style={{ padding: 12 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.id} style={{ borderTop: '1px solid #e4e9f2' }}>
                <td style={{ padding: 12 }}>{problem.level}</td>
                <td style={{ padding: 12 }}>{problem.code}</td>
                <td style={{ padding: 12 }}>
                  <Link href={`/problems/${problem.slug}`}>{problem.title}</Link>
                </td>
                <td style={{ padding: 12 }}>{problem.testCases.length}</td>
                <td style={{ padding: 12 }}>{problem.submissions.length}</td>
                <td style={{ padding: 12, color: problem.isJudgeable ? '#067647' : '#b42318' }}>
                  {problem.isJudgeable ? 'Judgeable' : problem.warning || 'Warning'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
