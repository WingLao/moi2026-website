import Link from 'next/link';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getUserDisplayName } from '@/lib/user-display';

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
        <h1 style={{ marginBottom: 8 }}>Submissions · 提交紀錄</h1>
        <p style={{ marginTop: 0 }}>{session?.user ? 'Students see their own submissions; admins see all. 學生只看到自己的提交。' : 'Log in to see your own submission history. 登入後查看你的提交。'}</p>
      </div>
      <div style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#eef3fb', textAlign: 'left' }}>
              <th style={{ padding: 12 }}>When · 時間</th>
              <th style={{ padding: 12 }}>User · 用戶</th>
              <th style={{ padding: 12 }}>Problem · 題目</th>
              <th style={{ padding: 12 }}>Lang · 語言</th>
              <th style={{ padding: 12 }}>Status · 狀態</th>
              <th style={{ padding: 12 }}>Score · 分數</th>
              <th style={{ padding: 12 }}>Open · 開啟</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} style={{ borderTop: '1px solid #e4e9f2' }}>
                <td style={{ padding: 12 }}>{submission.queuedAt.toLocaleString()}</td>
                <td style={{ padding: 12 }}>{getUserDisplayName(submission.user)}</td>
                <td style={{ padding: 12 }}>{submission.problem.title}</td>
                <td style={{ padding: 12 }}>{submission.language}</td>
                <td style={{ padding: 12 }}>{submission.status}</td>
                <td style={{ padding: 12 }}>{submission.score}</td>
                <td style={{ padding: 12 }}><Link href={`/submissions/${submission.id}`}>Details · 詳情</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
