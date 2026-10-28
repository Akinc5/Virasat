// ============================================================
// Virasat — Auth.js (NextAuth v5) Configuration
//
// Email + password sign-in (accounts in lib/auth/users.ts) with
// JWT sessions — no database required. Google sign-in is added
// automatically once its OAuth keys are set.
//
// Required in .env.local:
//   AUTH_SECRET         — openssl rand -base64 32
// Optional:
//   AUTH_GOOGLE_ID      — from Google Cloud Console OAuth client
//   AUTH_GOOGLE_SECRET  — from Google Cloud Console OAuth client
//
// To later persist accounts in Postgres, add the Prisma adapter
// here (`@auth/prisma-adapter`) and move lib/auth/users.ts to Prisma.
// ============================================================

import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { verifyUser } from "@/lib/auth/users";
import { authConfig } from "@/auth.config";

export const googleEnabled = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = typeof credentials?.email === "string" ? credentials.email : "";
      const password = typeof credentials?.password === "string" ? credentials.password : "";
      if (!email || !password) return null;
      const user = await verifyUser(email, password);
      return user ? { id: user.id, name: user.name, email: user.email } : null;
    },
  }),
];
if (googleEnabled) providers.push(Google);

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers,
});
