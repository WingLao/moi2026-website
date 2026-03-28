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
      <h1 style={{ margin: 0 }}>Admin · 管理頁</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        <Link href="/admin/problems">Problem Management · 題目管理</Link>
        <Link href="/admin/submissions">Submission Management · 提交管理</Link>
        <Link href="/admin/users">User Management · 用戶管理</Link>
      </div>
    </main>
  );
}
