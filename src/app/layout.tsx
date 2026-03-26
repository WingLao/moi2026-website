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
    <html lang="en">
      <body>
        <header style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
          <div
            style={{
              maxWidth: 1180,
              margin: '0 auto',
              padding: '16px 24px',
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/" style={{ fontWeight: 800, color: 'var(--foreground)' }}>
                MOI2026 Contest Portal
              </Link>
              <nav style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/problems">Problems</Link>
                <Link href="/submissions">Submissions</Link>
                <Link href="/leaderboard">Leaderboard</Link>
                {isAdmin ? <Link href="/admin">Admin</Link> : null}
              </nav>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
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
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '24px' }}>{children}</div>
      </body>
    </html>
  );
}
