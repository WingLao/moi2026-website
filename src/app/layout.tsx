import type { Metadata } from 'next';
import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { auth } from '@/lib/auth';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MOI2026 Website MVP',
  description: 'Training and judging portal MVP for MOI2026',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ margin: 0, background: '#f5f7fb', color: '#172033' }}>
        <header style={{ borderBottom: '1px solid #d9e0ee', background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 24px', display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/" style={{ fontWeight: 700, color: '#172033', textDecoration: 'none' }}>
                MOI2026 MVP
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
                  <span style={{ fontSize: 14 }}>
                    Signed in as <strong>{session.user.username}</strong> ({session.user.role})
                  </span>
                  <Link href="/api/auth/signout">Sign out</Link>
                </>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </div>
          </div>
        </header>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px' }}>{children}</div>
      </body>
    </html>
  );
}
