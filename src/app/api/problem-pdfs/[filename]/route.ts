import fs from 'node:fs/promises';
import { NextResponse } from 'next/server';
import { getDataRoot } from '@/lib/data-root';
import { resolveProblemPdf } from '@/lib/problem-assets';

export async function GET(_: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  const decodedFilename = decodeURIComponent(filename);
  const resolved = resolveProblemPdf(getDataRoot(), decodedFilename);

  if (!resolved?.pdfPath) {
    return NextResponse.json({ ok: false, error: 'PDF not found' }, { status: 404 });
  }

  const pdf = await fs.readFile(resolved.pdfPath);

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${resolved.canonicalFilename}"`,
      'Cache-Control': 'public, max-age=300',
    },
  });
}
