import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getUserDisplayName } from '@/lib/user-display';

export default async function AdminSubs() {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    redirect('/login?callbackUrl=/admin/submissions');
  }

  const submissions = await prisma.submission.findMany({
    take: 100,
    orderBy: { queuedAt: 'desc' },
    include: { user: true, problem: true, results: true },
  }).catch(() => []);

  return (
    <main style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ margin: 0 }}>Admin · Submissions</h1>
      <ul>
        {submissions.map((submission) => (
          <li key={submission.id}>
            <Link href={`/submissions/${submission.id}`}>{submission.id}</Link> · {getUserDisplayName(submission.user)} · {submission.problem.title} · {submission.status} · {submission.score} · cases judged: {submission.results.length}
          </li>
        ))}
      </ul>
    </main>
  );
}
