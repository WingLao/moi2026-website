import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

function normalizeRole(value: FormDataEntryValue | null) {
  return value === 'ADMIN' ? 'ADMIN' : 'STUDENT';
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const username = String(formData.get('username') ?? '').trim().toLowerCase();
  const name = String(formData.get('name') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const role = normalizeRole(formData.get('role'));
  const mustChangePass = formData.get('mustChangePass') === 'on';

  if (!username || !password) {
    return NextResponse.json({ ok: false, error: 'Username / E-mail and password are required.' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ ok: false, error: 'Password must be at least 6 characters.' }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { username } });
  if (exists) {
    return NextResponse.json({ ok: false, error: 'This username / E-mail already exists.' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      name: name || null,
      passwordHash,
      role,
      mustChangePass,
    },
  });

  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      mustChangePass: user.mustChangePass,
    },
  });
}
