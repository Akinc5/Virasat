"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider as NextAuthSessionProvider, useSession } from "next-auth/react";

// Sign-in and sign-up run as server actions that redirect, so the client's
// cached session goes stale; re-read it whenever the route changes.
function RefreshOnNavigate() {
  const pathname = usePathname();
  const { update } = useSession();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    void update();
    // `update` changes identity with every session change; only the route matters here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return null;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      <RefreshOnNavigate />
      {children}
    </NextAuthSessionProvider>
  );
}
