import type { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { auth } from './auth';

export async function requireUser(callbackPath: string): Promise<Session> {
  const session = await auth();

  if (!session?.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackPath)}`);
  }

  return session;
}
