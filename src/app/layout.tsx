import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import Bi from '@/components/Bi';
import SignOutButton from '@/components/SignOutButton';
import { auth } from '@/lib/auth';
import { getUserDisplayName } from '@/lib/user-display';

export const metadata: Metadata = {
  title: 'MOI2026 Practice · 練習平台',
  description: 'Programming practice and judging for CDSJ5 students · 聖若瑟五校程式練習及判題平台',
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
                MOI2026 Practice · 練習平台
              </Link>
              <nav className="site-nav">
                <Link href="/problems"><Bi en="Problems" zh="題目" /></Link>
                <Link href="/submissions"><Bi en="Submissions" zh="提交紀錄" /></Link>
                <Link href="/quiz"><Bi en="CSP Quiz" zh="選擇題" /></Link>
                <Link href="/leaderboard"><Bi en="Leaderboard" zh="排名榜" /></Link>
                <Link href="/teaching"><Bi en="Lessons" zh="演算法教學" /></Link>
                {isAdmin ? <Link href="/admin"><Bi en="Admin" zh="管理" /></Link> : null}
              </nav>
            </div>
            <div className="site-meta">
              {session?.user ? (
                <>
                  <span className="badge info">{getUserDisplayName(session.user)}{session.user.role === 'ADMIN' ? ' · Admin' : ''}</span>
                  <SignOutButton />
                </>
              ) : (
                <Link href="/login" className="button-link"><Bi en="Log in" zh="登入" /></Link>
              )}
            </div>
          </div>
        </header>
        <div className="site-shell">{children}</div>
      </body>
    </html>
  );
}
