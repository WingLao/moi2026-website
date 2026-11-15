import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(_request: NextRequest, ctx: RouteContext<'/api/whiteboards/[id]'>) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await ctx.params;
  const version = await prisma.whiteboardVersion.findUnique({ where: { id } });
  if (!version || (version.userId !== session.user.id && session.user.role !== 'ADMIN')) {
    return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, version: { id: version.id, createdAt: version.createdAt, data: version.data } });
}
