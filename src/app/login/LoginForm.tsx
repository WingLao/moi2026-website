'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Bi from '@/components/Bi';

type Student = { username: string; name: string };

export default function LoginForm({ students }: { students: Student[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [manual, setManual] = useState(students.length === 0);
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
      setError(manual
        ? 'Wrong username or password. 帳號或密碼錯誤。'
        : 'Wrong password. Your password is your date of birth as 8 digits (YYYYMMDD), e.g. 20120315. 密碼錯誤。密碼是你的出生日期 8 位數字，例如 20120315。');
      return;
    }

    router.push(result.url || callbackUrl);
    router.refresh();
  }

  function switchMode() {
    setManual((value) => !value);
    setUsername('');
    setError('');
  }

  return (
    <main style={{ maxWidth: 460, margin: '0 auto' }}>
      <div style={{ background: '#fff', border: '1px solid #d9e0ee', borderRadius: 16, padding: 24 }}>
        <h1 style={{ marginTop: 0 }}><Bi en="Log in" zh="登入" /></h1>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          {manual ? (
            <label style={{ display: 'grid', gap: 6 }}>
              <Bi en="Username" zh="帳號" />
              <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
            </label>
          ) : (
            <label style={{ display: 'grid', gap: 6 }}>
              <Bi en="Your name" zh="姓名" />
              <select value={username} onChange={(event) => setUsername(event.target.value)} required>
                <option value="" disabled>Choose your name · 請選擇你的姓名</option>
                {students.map((student) => (
                  <option key={student.username} value={student.username}>{student.name}</option>
                ))}
              </select>
            </label>
          )}
          <label style={{ display: 'grid', gap: 6 }}>
            {manual ? (
              <Bi en="Password" zh="密碼" />
            ) : (
              <Bi block en="Password: your date of birth, 8 digits (YYYYMMDD), e.g. 20120315" zh="密碼：出生日期 8 位數字，例如 20120315" />
            )}
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              inputMode={manual ? undefined : 'numeric'}
              required
            />
          </label>
          {error ? <p style={{ color: '#b42318', margin: 0 }}>{error}</p> : null}
          <button type="submit" disabled={pending}>{pending ? <Bi en="Logging in…" zh="登入中…" /> : <Bi en="Log in" zh="登入" />}</button>
        </form>
        {students.length ? (
          <button type="button" className="secondary" onClick={switchMode} style={{ marginTop: 16, width: '100%' }}>
            {manual ? <Bi en="Student login (choose your name)" zh="學生登入（選擇姓名）" /> : <Bi en="Teacher / other account" zh="老師／其他帳號登入" />}
          </button>
        ) : null}
      </div>
    </main>
  );
}
