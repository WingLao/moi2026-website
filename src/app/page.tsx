import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const [problemCount, submissionCount, studentCount] = await Promise.all([
    prisma.problem.count().catch(() => 0),
    prisma.submission.count().catch(() => 0),
    prisma.user.count({ where: { role: 'STUDENT' } }).catch(() => 0),
  ]);

  return (
    <main style={{ display: 'grid', gap: 24 }}>
      <section style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, padding: 24 }}>
        <h1 style={{ marginTop: 0 }}>MOI2026 Website MVP</h1>
        <p>Contest-training portal MVP for P / J / S groups with credential login, local problem import, queue-backed judging, and a simple leaderboard.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/problems">Browse problems</Link>
          <Link href="/leaderboard">View leaderboard</Link>
          <Link href="/submissions">Recent submissions</Link>
        </div>
      </section>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {[
          { label: 'Problems', value: problemCount },
          { label: 'Students', value: studentCount },
          { label: 'Submissions', value: submissionCount },
        ].map((item) => (
          <div key={item.label} style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 14, color: '#536076' }}>{item.label}</div>
            <div style={{ fontSize: 36, fontWeight: 700 }}>{item.value}</div>
          </div>
        ))}
      </section>
      <section style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Local host-run judging note</h2>
        <p>
          This MVP deliberately uses a host-run judge adapter behind the worker queue. It does <strong>not</strong> claim full Docker sandbox isolation on this host.
        </p>
      </section>
    </main>
  );
}
