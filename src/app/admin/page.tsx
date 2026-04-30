import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function AdminPage() {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    redirect('/login?callbackUrl=/admin');
  }

  return (
    <main className="page">
      <section className="card hero">
        <div className="section-title">
          <div>
            <h1>Admin · 管理頁</h1>
            <p className="subtle" style={{ marginTop: 8 }}>
              Admin shortcuts for problem, submission, and user operations.
            </p>
          </div>
        </div>
      </section>

      <section className="grid-tiles">
        <Link href="/admin/problems" className="card compact" style={{ color: 'inherit', textDecoration: 'none' }}>
          <div className="subtle">Problem Management</div>
          <div className="tile-number" style={{ fontSize: 28 }}>題目管理</div>
          <div className="subtle">Inspect imported problems, testcase health, and teaching previews.</div>
        </Link>
        <Link href="/admin/submissions" className="card compact" style={{ color: 'inherit', textDecoration: 'none' }}>
          <div className="subtle">Submission Management</div>
          <div className="tile-number" style={{ fontSize: 28 }}>提交管理</div>
          <div className="subtle">Review recent runs, statuses, and judging outcomes.</div>
        </Link>
        <Link href="/admin/users" className="card compact" style={{ color: 'inherit', textDecoration: 'none' }}>
          <div className="subtle">User Management</div>
          <div className="tile-number" style={{ fontSize: 28 }}>用戶管理</div>
          <div className="subtle">Create, edit, import, and delete user accounts.</div>
        </Link>
      </section>
    </main>
  );
}
