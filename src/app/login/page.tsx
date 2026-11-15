import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const users = await prisma.user
    .findMany({ where: { role: 'STUDENT', name: { not: null } }, select: { username: true, name: true } })
    .catch(() => []);
  const students = users
    .map((user) => ({ username: user.username, name: user.name ?? user.username }))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-Hant'));

  return (
    <Suspense>
      <LoginForm students={students} />
    </Suspense>
  );
}
