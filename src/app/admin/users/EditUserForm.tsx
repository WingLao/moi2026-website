'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type EditUserFormProps = {
  id: string;
  name: string;
  username: string;
  role: 'ADMIN' | 'STUDENT';
  mustChangePass: boolean;
};

type UpdateResult = {
  ok: boolean;
  message: string;
};

export default function EditUserForm({ id, name, username, role, mustChangePass }: EditUserFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<UpdateResult | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const formData = new FormData(event.currentTarget);
      formData.set('id', id);

      const response = await fetch('/api/admin/users/update', {
        method: 'POST',
        body: formData,
      });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Update user failed');
      }

      setResult({
        ok: true,
        message: `Updated ${payload.user.name || payload.user.username} successfully.`,
      });
      router.refresh();
    } catch (error) {
      setResult({
        ok: false,
        message: error instanceof Error ? error.message : 'Update user failed',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <details>
      <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Edit · 編輯</summary>

      <form onSubmit={onSubmit} className="dense-list" style={{ marginTop: 12, minWidth: 260, gap: 10 }}>
        <label className="dense-list">
          <span>Name · 姓名</span>
          <input name="name" defaultValue={name} placeholder="例如：陳大文" />
        </label>

        <label className="dense-list">
          <span>Username / E-mail · 登入帳號</span>
          <input name="username" type="text" defaultValue={username} required />
        </label>

        <label className="dense-list">
          <span>New password · 新密碼</span>
          <input name="password" type="text" minLength={6} placeholder="留空＝不更改" />
        </label>

        <label className="dense-list">
          <span>Role · 身分</span>
          <select name="role" defaultValue={role}>
            <option value="STUDENT">STUDENT</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </label>

        <label style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input name="mustChangePass" type="checkbox" defaultChecked={mustChangePass} />
          <span>Must change password · 需改密碼</span>
        </label>

        <div className="inline-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save · 儲存'}
          </button>
        </div>
      </form>

      {result ? (
        <div className={result.ok ? 'notice success' : 'notice warning'} style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 700 }}>{result.ok ? 'Update complete' : 'Update failed'}</div>
          <div style={{ marginTop: 8 }}>{result.message}</div>
        </div>
      ) : null}
    </details>
  );
}
