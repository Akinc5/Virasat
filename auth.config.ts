// ============================================================
// Edge-safe Auth.js settings shared by auth.ts and proxy.ts.
//
// The proxy only needs to read the session cookie, so it must not
// import providers that touch the filesystem (the email/password
// store) — keep those in auth.ts.
// ============================================================

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  session: {
    strategy: "jwt",
  },
  // Auth.js auto-trusts localhost and Vercel; any other host (Netlify,
  // Render, a VPS, etc.) needs this or requests fail with UntrustedHost.
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
} satisfies NextAuthConfig;
