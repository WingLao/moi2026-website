import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const MAX_BYTES = 2_000_000;

// GET ?problemId=X            → own versions for this problem
// GET ?problemId=X&userId=Y   → (admin) that user's versions
// GET ?problemId=X&owners=1   → (admin) users who have whiteboards for this problem
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const isAdmin = session.user.role === 'ADMIN';
  const params = request.nextUrl.searchParams;
  const problemId = params.get('problemId') ?? '';
  if (!problemId) {
    return NextResponse.json({ ok: false, error: 'problemId is required.' }, { status: 400 });
  }

  if (params.get('owners') === '1') {
    if (!isAdmin) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    const groups = await prisma.whiteboardVersion.groupBy({
      by: ['userId'],
      where: { problemId },
      _count: { _all: true },
      _max: { createdAt: true },
    });
    const users = await prisma.user.findMany({
      where: { id: { in: groups.map((g) => g.userId) } },
      select: { id: true, name: true, username: true },
    });
    const owners = groups
      .map((g) => {
        const user = users.find((u) => u.id === g.userId);
        return { userId: g.userId, name: user?.name || user?.username || '?', count: g._count._all, latest: g._max.createdAt };
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'zh-Hant'));
    return NextResponse.json({ ok: true, owners });
  }

  const requestedUserId = params.get('userId');
  if (requestedUserId && requestedUserId !== session.user.id && !isAdmin) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const versions = await prisma.whiteboardVersion.findMany({
    where: { problemId, userId: requestedUserId || session.user.id },
    orderBy: { createdAt: 'desc' },
    select: { id: true, createdAt: true },
  });
  return NextResponse.json({ ok: true, versions });
}

// POST { problemId, data } → save a new version for the current user
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const raw = await request.text();
  if (raw.length > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: '白板內容太大（上限約 2 MB）。' }, { status: 413 });
  }
  let body: { problemId?: unknown; data?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 });
  }
  const problemId = typeof body.problemId === 'string' ? body.problemId : '';
  const data = body.data as { items?: unknown } | null;
  if (!problemId || !data || typeof data !== 'object' || !Array.isArray(data.items)) {
    return NextResponse.json({ ok: false, error: 'problemId and whiteboard data are required.' }, { status: 400 });
  }
  const problem = await prisma.problem.findUnique({ where: { id: problemId }, select: { id: true } });
  if (!problem) {
    return NextResponse.json({ ok: false, error: 'Problem not found.' }, { status: 404 });
  }
  const version = await prisma.whiteboardVersion.create({
    data: { userId: session.user.id, problemId, data: data as object },
    select: { id: true, createdAt: true },
  });
  return NextResponse.json({ ok: true, version });
}
