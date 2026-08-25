// ============================================================
// HeritageVerse — Auth.js (NextAuth v5) Configuration
//
// Google sign-in with JWT sessions — no database required.
// The session (name, email, avatar) lives in a signed cookie.
//
// Required in .env.local:
//   AUTH_SECRET        — openssl rand -base64 32
//   AUTH_GOOGLE_ID      — from Google Cloud Console OAuth client
//   AUTH_GOOGLE_SECRET  — from Google Cloud Console OAuth client
//
// To later persist accounts in Postgres, add the Prisma adapter
// here (`@auth/prisma-adapter`) and switch session strategy to
// "database" once DATABASE_URL is connected.
// ============================================================

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt",
  },
  // Auth.js auto-trusts localhost and Vercel; any other host (Render,
  // Railway, a VPS, etc.) needs this or requests fail with UntrustedHost.
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
