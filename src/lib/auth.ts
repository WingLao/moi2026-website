import { getServerSession, type DefaultSession, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      role: 'ADMIN' | 'STUDENT';
      username: string;
    };
  }

  interface User {
    id: string;
    role: 'ADMIN' | 'STUDENT';
    username: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'ADMIN' | 'STUDENT';
    username?: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const username = String(credentials?.username ?? '').trim();
        const password = String(credentials?.password ?? '');
        if (!username || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
          return null;
        }

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
          return null;
        }

        return {
          id: user.id,
          name: user.name ?? user.username,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub && token.role && token.username) {
        session.user.name = token.name ?? session.user.name;
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: { signIn: '/login' },
};

export function auth() {
  return getServerSession(authOptions);
}
