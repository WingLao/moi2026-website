import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { parseUserNameCsv, syncUserNames } from '@/lib/user-name-sync';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'Missing CSV file' }, { status: 400 });
  }

  if (!file.name.toLowerCase().endsWith('.csv')) {
    return NextResponse.json({ ok: false, error: 'Please upload a CSV file' }, { status: 400 });
  }

  try {
    const content = await file.text();
    const rows = parseUserNameCsv(content);
    const result = await syncUserNames(rows);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Import failed';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
