import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminUsers() {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    redirect('/login?callbackUrl=/admin/users');
  }

  const users = await prisma.user.findMany({
    orderBy: { username: 'asc' },
    include: { submissions: true },
  }).catch(() => []);

  return (
    <main style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ margin: 0 }}>Admin · Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} · {user.role} · mustChangePass={String(user.mustChangePass)} · submissions={user.submissions.length}
          </li>
        ))}
      </ul>
    </main>
  );
}
