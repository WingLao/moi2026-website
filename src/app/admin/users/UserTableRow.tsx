'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type UserTableRowProps = {
  id: string;
  currentUserId: string;
  name: string;
  displayName: string;
  username: string;
  role: 'ADMIN' | 'STUDENT';
  mustChangePass: boolean;
  totalSubmissions: number;
  practicedProblems: number;
  solvedProblems: number;
  totalScore: string;
  latestActivity: string;
};

type Result = {
  ok: boolean;
  message: string;
};

export default function UserTableRow({
  id,
  currentUserId,
  name,
  displayName,
  username,
  role,
  mustChangePass,
  totalSubmissions,
  practicedProblems,
  solvedProblems,
  totalScore,
  latestActivity,
}: UserTableRowProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function onSave(event: React.FormEvent<HTMLFormElement>) {
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
      setIsEditing(false);
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

  async function onDelete() {
    const confirmed = window.confirm(`Delete user "${displayName}"? This will also remove all submissions for this user.`);
    if (!confirmed) return;

    setIsDeleting(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.set('id', id);

      const response = await fetch('/api/admin/users/delete', {
        method: 'POST',
        body: formData,
      });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Delete user failed');
      }

      router.refresh();
    } catch (error) {
      setResult({
        ok: false,
        message: error instanceof Error ? error.message : 'Delete user failed',
      });
      setIsDeleting(false);
    }
  }

  return (
    <>
      <tr>
        {isEditing ? (
          <>
            <td>
              <form id={`edit-user-${id}`} onSubmit={onSave}>
                <input name="name" defaultValue={name} placeholder="例如：陳大文" />
              </form>
            </td>
            <td className="mono">
              <input form={`edit-user-${id}`} name="username" type="text" defaultValue={username} required />
            </td>
            <td>
              <select form={`edit-user-${id}`} name="role" defaultValue={role}>
                <option value="STUDENT">STUDENT</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </td>
            <td>{totalSubmissions}</td>
            <td>{practicedProblems}</td>
            <td>{solvedProblems}</td>
            <td>{totalScore}</td>
            <td>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input form={`edit-user-${id}`} name="mustChangePass" type="checkbox" defaultChecked={mustChangePass} />
                <span>{mustChangePass ? 'Yes' : 'No'}</span>
              </label>
            </td>
            <td className="subtle">
              <div>{latestActivity}</div>
              <input
                form={`edit-user-${id}`}
                name="password"
                type="text"
                minLength={6}
                placeholder="New password, leave blank"
                style={{ marginTop: 8 }}
              />
            </td>
            <td>
              <div className="inline-actions">
                <button form={`edit-user-${id}`} type="submit" disabled={isSubmitting || isDeleting}>
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={() => setIsEditing(false)} disabled={isSubmitting || isDeleting}>
                  Cancel
                </button>
              </div>
            </td>
          </>
        ) : (
          <>
            <td>{displayName}</td>
            <td className="mono">{username}</td>
            <td>{role}</td>
            <td>{totalSubmissions}</td>
            <td>{practicedProblems}</td>
            <td>{solvedProblems}</td>
            <td>{totalScore}</td>
            <td>{mustChangePass ? 'Yes' : 'No'}</td>
            <td className="subtle">{latestActivity}</td>
            <td>
              <div className="inline-actions">
                <button type="button" onClick={() => setIsEditing(true)} disabled={isDeleting}>
                  Edit
                </button>
                <button
                  type="button"
                  onClick={onDelete}
                  disabled={id === currentUserId || isDeleting || isSubmitting}
                  style={{ background: '#a33030' }}
                  title={id === currentUserId ? 'You cannot delete your own account.' : 'Delete this user'}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </td>
          </>
        )}
      </tr>

      {result ? (
        <tr>
          <td colSpan={10} style={{ paddingTop: 0 }}>
            <div className={result.ok ? 'notice success' : 'notice warning'}>
              <div style={{ fontWeight: 700 }}>{result.ok ? 'Success' : 'Failed'}</div>
              <div style={{ marginTop: 8 }}>{result.message}</div>
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
}
