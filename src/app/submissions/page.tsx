import Link from 'next/link';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function SubmissionsPage() {
  const session = await auth();
  const where = session?.user?.role === 'ADMIN' ? {} : session?.user ? { userId: session.user.id } : undefined;
  const submissions = await prisma.submission.findMany({
    where,
    take: 50,
    orderBy: { queuedAt: 'desc' },
    include: { problem: true, user: true },
  }).catch(() => []);

  return (
    <main style={{ display: 'grid', gap: 16 }}>
      <div>
        <h1 style={{ marginBottom: 8 }}>Submissions</h1>
        <p style={{ marginTop: 0 }}>{session?.user ? 'Students see their own submissions; admins see all.' : 'Log in to see your own submission history.'}</p>
      </div>
      <div style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#eef3fb', textAlign: 'left' }}>
              <th style={{ padding: 12 }}>When</th>
              <th style={{ padding: 12 }}>User</th>
              <th style={{ padding: 12 }}>Problem</th>
              <th style={{ padding: 12 }}>Lang</th>
              <th style={{ padding: 12 }}>Status</th>
              <th style={{ padding: 12 }}>Score</th>
              <th style={{ padding: 12 }}>Open</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} style={{ borderTop: '1px solid #e4e9f2' }}>
                <td style={{ padding: 12 }}>{submission.queuedAt.toLocaleString()}</td>
                <td style={{ padding: 12 }}>{submission.user.username}</td>
                <td style={{ padding: 12 }}>{submission.problem.title}</td>
                <td style={{ padding: 12 }}>{submission.language}</td>
                <td style={{ padding: 12 }}>{submission.status}</td>
                <td style={{ padding: 12 }}>{submission.score}</td>
                <td style={{ padding: 12 }}><Link href={`/submissions/${submission.id}`}>Details</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
