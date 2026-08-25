// ============================================================
// HeritageVerse — Route Proxy (Next.js 16 renamed `middleware` -> `proxy`)
//
// Optimistic auth check: redirects unauthenticated visitors away
// from /admin before the route renders. Session data still comes
// from the signed JWT cookie set by Auth.js.
// ============================================================

import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && !req.auth) {
    const signInUrl = new URL("/login", req.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
