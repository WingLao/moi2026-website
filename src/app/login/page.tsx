'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');

    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
      callbackUrl,
    });

    setPending(false);

    if (!result || result.error) {
      setError('Invalid username or password. 帳號或密碼錯誤。');
      return;
    }

    router.push(result.url || callbackUrl);
    router.refresh();
  }

  return (
    <main style={{ maxWidth: 460, margin: '0 auto' }}>
      <div style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, padding: 24 }}>
        <h1 style={{ marginTop: 0 }}>Login · 登入</h1>
        <p>Use seeded accounts like <code>admin</code> / <code>Admin@MOI2026</code> or <code>moi01</code> / <code>MOI2026-01</code>. 請使用已建立帳號登入。</p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Username · 帳號</span>
            <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Password · 密碼</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
          </label>
          {error ? <p style={{ color: '#b42318', margin: 0 }}>{error}</p> : null}
          <button type="submit" disabled={pending}>{pending ? 'Signing in… 登入中' : 'Sign in · 登入'}</button>
        </form>
      </div>
    </main>
  );
}
