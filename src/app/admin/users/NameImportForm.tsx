'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type ImportState = {
  ok: boolean;
  message: string;
  missingEmails?: string[];
  invalidRows?: string[];
};

export default function NameImportForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ImportState | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch('/api/admin/users/import-names', {
        method: 'POST',
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Import failed');
      }

      setResult({
        ok: true,
        message: `Imported ${payload.updatedUsers} user name(s) from ${payload.totalRows} row(s).`,
        missingEmails: payload.missingEmails,
        invalidRows: payload.invalidRows,
      });
      event.currentTarget.reset();
      router.refresh();
    } catch (error) {
      setResult({
        ok: false,
        message: error instanceof Error ? error.message : 'Import failed',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="card">
      <div className="section-title">
        <div>
          <h2 style={{ margin: 0 }}>Import Names · 匯入姓名</h2>
          <p className="subtle" style={{ marginTop: 8 }}>
            Upload a CSV with `Name` and `E-mail` columns. Existing users will be matched by E-mail and updated in place.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="page" style={{ gap: 12, marginTop: 14 }}>
        <input type="file" name="file" accept=".csv,text/csv" required />
        <div className="inline-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Importing...' : 'Upload CSV · 上傳 CSV'}
          </button>
        </div>
      </form>

      {result ? (
        <div className={result.ok ? 'notice success' : 'notice warning'} style={{ marginTop: 14 }}>
          <div style={{ fontWeight: 700 }}>{result.ok ? 'Import complete' : 'Import failed'}</div>
          <div style={{ marginTop: 8 }}>{result.message}</div>
          {result.missingEmails && result.missingEmails.length > 0 ? (
            <div style={{ marginTop: 8 }}>
              Missing users: {result.missingEmails.slice(0, 10).join(', ')}
              {result.missingEmails.length > 10 ? ` ... (+${result.missingEmails.length - 10} more)` : ''}
            </div>
          ) : null}
          {result.invalidRows && result.invalidRows.length > 0 ? (
            <div style={{ marginTop: 8 }}>
              Invalid rows: {result.invalidRows.slice(0, 10).join(', ')}
              {result.invalidRows.length > 10 ? ` ... (+${result.invalidRows.length - 10} more)` : ''}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
