'use client';

import { signOut } from 'next-auth/react';
import Bi from './Bi';

export default function SignOutButton() {
  return (
    <button type="button" className="secondary" onClick={() => signOut({ callbackUrl: '/' })}>
      <Bi en="Log out" zh="登出" />
    </button>
  );
}
