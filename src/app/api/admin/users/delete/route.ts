import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const id = String(formData.get('id') ?? '').trim();

  if (!id) {
    return NextResponse.json({ ok: false, error: 'User id is required.' }, { status: 400 });
  }

  if (session.user.id === id) {
    return NextResponse.json({ ok: false, error: 'You cannot delete your own account.' }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser) {
    return NextResponse.json({ ok: false, error: 'User not found.' }, { status: 404 });
  }

  await prisma.user.delete({ where: { id } });

  return NextResponse.json({
    ok: true,
    user: {
      id: existingUser.id,
      username: existingUser.username,
      name: existingUser.name,
    },
  });
}
