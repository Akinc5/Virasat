// ============================================================
// Edge-safe Auth.js settings shared by auth.ts and proxy.ts.
//
// The proxy only needs to read the session cookie, so it must not
// import providers that touch the filesystem (the email/password
// store) — keep those in auth.ts.
// ============================================================

import type { NextAuthConfig } from "next-auth";
import { roleFor, type Role } from "@/lib/auth/roles";

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
    async jwt({ token, user }) {
      // On sign-in, copy the role into the signed cookie
      if (user) token.role = roleFor({ email: user.email, role: (user as { role?: Role }).role });
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = (token.role as Role | undefined) ?? "user";
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
