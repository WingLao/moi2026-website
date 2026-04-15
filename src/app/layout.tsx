import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'MOI2026 Contest Portal',
  description: 'Training and judging portal for MOI2026 contestants and admins',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <html lang="zh-Hant">
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <div className="site-brand">
              <Link href="/" style={{ fontWeight: 800, color: 'var(--foreground)' }}>
                MOI2026 Contest Portal
              </Link>
              <nav className="site-nav">
                <Link href="/problems">Problems</Link>
                <Link href="/submissions">Submissions</Link>
                <Link href="/leaderboard">Leaderboard</Link>
                <Link href="/teaching">演算法教學</Link>
                {isAdmin ? <Link href="/admin">Admin</Link> : null}
              </nav>
            </div>
            <div className="site-meta">
              {session?.user ? (
                <>
                  <span className="badge info">{session.user.username} · {session.user.role}</span>
                  <form action="/api/auth/signout" method="post">
                    <button type="submit" className="secondary">Sign out</button>
                  </form>
                </>
              ) : (
                <Link href="/login" className="button-link">Login</Link>
              )}
            </div>
          </div>
        </header>
        <div className="site-shell">{children}</div>
      </body>
    </html>
  );
}
