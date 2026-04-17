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
    // wikisCount. The signIn callback below mirrors auth identities into
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
    async signIn({ user, account }) {
      if (!user.email) return false;

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

export const { handlers, signIn, signOut, auth } = NextAuth(buildConfig);
