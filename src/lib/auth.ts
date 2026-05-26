import NextAuth, { type NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Resend from 'next-auth/providers/resend';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { db } from './firebase';

/**
 * NextAuth config is produced by a factory so the FirestoreAdapter (and
 * the underlying firebase-admin app it pulls in) is only instantiated at
 * request time, not at module load / build time. During `next build`,
 * FIREBASE_PROJECT_ID is not in the environment and constructing the
 * adapter eagerly would fail with
 * `Service account object must contain a string "project_id" property`.
 */
const buildConfig = (): NextAuthConfig => ({
  adapter: FirestoreAdapter({
    firestore: db,
    // Prefixed collection names keep NextAuth's schema separate from
    // GPTwiki's own `users` collection, which holds product fields like
    // wikisCount. The jwt callback below mirrors auth identities into
    // `users` so feature code stays unchanged.
    collections: {
      users: 'authjs_users',
      accounts: 'authjs_accounts',
      sessions: 'authjs_sessions',
      verificationTokens: 'authjs_verification_tokens',
    },
  }),
  // Keep JWT sessions — no per-request DB read, unlike database sessions.
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
    // Email magic-link via Resend. Enter an email, receive a one-time
    // sign-in link. No password, no regional OAuth restrictions — opens
    // the door to users without easy Google/GitHub access.
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.AUTH_EMAIL_FROM || 'no-reply@gptwiki.net',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Gate sign-in on having an email. The mirror to `users` lives in the
      // jwt callback below — at signIn time, NextAuth's OAuth path hands us
      // a `user.id` that is `crypto.randomUUID()` for first-time signups,
      // not the FirestoreAdapter's auto-ID, so writing here lands the doc
      // at an orphan key the rest of the app never reads.
      return Boolean(user.email);
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      // `user` is only passed on actual sign-in / sign-up events — not on
      // subsequent JWT refreshes — so this block is the right place to
      // mirror identity into the GPTwiki `users` collection. By the time
      // we get here, next-auth has already run handleLoginOrRegister, so
      // `user.id` is the FirestoreAdapter's auto-ID (the same value that
      // becomes token.sub and that the rest of the app uses to read
      // `users/{id}`). Doing the write in signIn instead would key the
      // doc by a random UUID for first-time OAuth signups.
      if (user) {
        token.sub = user.id;
        if (user.id && user.email) {
          const userRef = db.collection('users').doc(user.id);
          const snap = await userRef.get();
          if (!snap.exists) {
            await userRef.set({
              name: user.name || user.email.split('@')[0] || '',
              email: user.email,
              image: user.image || '',
              provider: account?.provider || 'resend',
              wikisCount: 0,
              createdAt: Date.now(),
            });
          }
        }
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    verifyRequest: '/login?check=1',
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth(buildConfig);
