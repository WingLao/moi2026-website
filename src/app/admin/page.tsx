import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function AdminPage() {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    redirect('/login?callbackUrl=/admin');
  }

  return (
    <main style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ margin: 0 }}>Admin</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        <Link href="/admin/problems">Problem management</Link>
        <Link href="/admin/submissions">Submission management</Link>
        <Link href="/admin/users">User management</Link>
      </div>
    </main>
  );
}
