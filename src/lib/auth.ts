import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Resend from 'next-auth/providers/resend';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { db } from './firebase';

export const { handlers, signIn, signOut, auth } = NextAuth({
  // The adapter stores verification tokens (magic links) and OAuth accounts.
  // Kept in prefixed collections so NextAuth's own schema does not collide
  // with GPTwiki's existing `users` collection, which the signIn callback
  // below continues to maintain with our custom fields (wikisCount, etc.).
  adapter: FirestoreAdapter({
    firestore: db,
    collections: {
      users: 'authjs_users',
      accounts: 'authjs_accounts',
      sessions: 'authjs_sessions',
      verificationTokens: 'authjs_verification_tokens',
    },
  }),
  // Keep JWT sessions — no server round-trip per request, unlike DB sessions.
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    // Email magic link via Resend — users enter an email and receive a sign-in
    // link with a one-time verification token. No password, no OAuth app
    // required by the user's country, so it opens the door to users who
    // can't use Google/GitHub easily (China, Russia, Middle East, etc.).
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.AUTH_EMAIL_FROM || 'no-reply@gptwiki.net',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      // Mirror auth identity into the legacy `users` collection that
      // WikiCard, Leaderboard, and /api/user/* read from. The adapter
      // already persisted to `authjs_users`; this keeps feature code
      // working unchanged.
      const userRef = db.collection('users').doc(user.id!);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        await userRef.set({
          name: user.name || user.email.split('@')[0] || '',
          email: user.email,
          image: user.image || '',
          provider: account?.provider || 'resend',
          wikisCount: 0,
          createdAt: Date.now(),
        });
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    verifyRequest: '/login?check=1',
  },
});
