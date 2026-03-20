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
    <main style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ margin: 0 }}>Admin · Problems</h1>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>
            {problem.level}/{problem.title} · cases: {problem.testCases.length} · {problem.isJudgeable ? 'judgeable' : 'warning'}
            {problem.warning ? ` · ${problem.warning}` : ''}
          </li>
        ))}
      </ul>
    </main>
  );
}
