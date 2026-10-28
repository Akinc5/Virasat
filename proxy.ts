// ============================================================
// HeritageVerse — Route Proxy (Next.js 16 renamed `middleware` -> `proxy`)
//
// Optimistic auth check: sends signed-out visitors from /account and
// /admin to the login page, and non-admins away from /admin. Session data still comes
// from the signed JWT cookie set by Auth.js.
// ============================================================

import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Edge-safe config only: the full auth.ts pulls in the filesystem-backed
// account store, which must not be bundled into the proxy.
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const needsAdmin = pathname.startsWith("/admin");
  const needsUser = needsAdmin || pathname.startsWith("/account");
  if (!needsUser) return;

  if (!req.auth) {
    const signInUrl = new URL("/login", req.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }
  // Optimistic check only — admin pages and actions re-check the role server-side
  if (needsAdmin && req.auth.user?.role !== "admin") {
    return NextResponse.redirect(new URL("/account?denied=admin", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
