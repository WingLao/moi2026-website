import fs from 'node:fs/promises';
import { NextResponse } from 'next/server';
import { getDataRoot } from '@/lib/data-root';
import { resolveProblemPdf } from '@/lib/problem-assets';

function buildHeaders(filename: string, size: number, download: boolean, lastModified: Date) {
  return {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `${download ? 'attachment' : 'inline'}; filename="${filename}"`,
    'Cache-Control': 'public, max-age=300',
    'Accept-Ranges': 'bytes',
    'Content-Length': String(size),
    'Last-Modified': lastModified.toUTCString(),
  };
}

async function getPdfResponse(request: Request, filename: string, pdfPath: string) {
  const download = new URL(request.url).searchParams.get('download') === '1';
  const stat = await fs.stat(pdfPath);
  const headers = buildHeaders(filename, stat.size, download, stat.mtime);
  const range = request.headers.get('range');

  if (!range) {
    const pdf = await fs.readFile(pdfPath);
    return new NextResponse(new Uint8Array(pdf), { headers });
  }

  const match = range.match(/bytes=(\d*)-(\d*)/);
  if (!match) {
    return new NextResponse(null, { status: 416, headers: { ...headers, 'Content-Range': `bytes */${stat.size}` } });
  }

  const start = match[1] ? Number.parseInt(match[1], 10) : 0;
  const end = match[2] ? Number.parseInt(match[2], 10) : stat.size - 1;

  if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= stat.size) {
    return new NextResponse(null, { status: 416, headers: { ...headers, 'Content-Range': `bytes */${stat.size}` } });
  }

  const boundedEnd = Math.min(end, stat.size - 1);
  const handle = await fs.open(pdfPath, 'r');

  try {
    const length = boundedEnd - start + 1;
    const buffer = Buffer.alloc(length);
    await handle.read(buffer, 0, length, start);

    return new NextResponse(new Uint8Array(buffer), {
      status: 206,
      headers: {
        ...headers,
        'Content-Length': String(length),
        'Content-Range': `bytes ${start}-${boundedEnd}/${stat.size}`,
      },
    });
  } finally {
    await handle.close();
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  const decodedFilename = decodeURIComponent(filename);
  const resolved = resolveProblemPdf(getDataRoot(), decodedFilename);

  if (!resolved?.pdfPath) {
    return NextResponse.json({ ok: false, error: 'PDF not found' }, { status: 404 });
  }

  return getPdfResponse(request, resolved.canonicalFilename, resolved.pdfPath);
}

export async function HEAD(request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  const decodedFilename = decodeURIComponent(filename);
  const resolved = resolveProblemPdf(getDataRoot(), decodedFilename);

  if (!resolved?.pdfPath) {
    return new NextResponse(null, { status: 404 });
  }

  const download = new URL(request.url).searchParams.get('download') === '1';
  const stat = await fs.stat(resolved.pdfPath);

  return new NextResponse(null, {
    headers: buildHeaders(resolved.canonicalFilename, stat.size, download, stat.mtime),
  });
}
