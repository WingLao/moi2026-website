'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type CreateUserResult = {
  ok: boolean;
  message: string;
};

export default function CreateUserForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<CreateUserResult | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch('/api/admin/users/create', {
        method: 'POST',
        body: formData,
      });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Create user failed');
      }

      event.currentTarget.reset();
      setResult({ ok: true, message: `Created ${payload.user.name || payload.user.username} successfully.` });
      router.refresh();
    } catch (error) {
      setResult({
        ok: false,
        message: error instanceof Error ? error.message : 'Create user failed',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="card">
      <div className="section-title">
        <div>
          <h2 style={{ margin: 0 }}>Create User · 新增用戶</h2>
          <p className="subtle" style={{ marginTop: 8 }}>
            Admins can manually create student or admin accounts here. The username can be an E-mail or custom login id.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="page" style={{ gap: 12, marginTop: 14 }}>
        <label className="dense-list">
          <span>Name · 姓名</span>
          <input name="name" placeholder="例如：陳大文" />
        </label>

        <label className="dense-list">
          <span>Username / E-mail · 登入帳號</span>
          <input name="username" type="text" required placeholder="student@example.com" />
        </label>

        <label className="dense-list">
          <span>Password · 密碼</span>
          <input name="password" type="text" required minLength={6} placeholder="MOI2026-31" />
        </label>

        <label className="dense-list">
          <span>Role · 身分</span>
          <select name="role" defaultValue="STUDENT">
            <option value="STUDENT">STUDENT</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </label>

        <label style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input name="mustChangePass" type="checkbox" defaultChecked />
          <span>Must change password on first login · 首次登入需改密碼</span>
        </label>

        <div className="inline-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create User · 建立用戶'}
          </button>
        </div>
      </form>

      {result ? (
        <div className={result.ok ? 'notice success' : 'notice warning'} style={{ marginTop: 14 }}>
          <div style={{ fontWeight: 700 }}>{result.ok ? 'Create complete' : 'Create failed'}</div>
          <div style={{ marginTop: 8 }}>{result.message}</div>
        </div>
      ) : null}
    </section>
  );
}
