"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { CheckCircle2, X } from "lucide-react";
import { WELCOME_COOKIE, isWelcomeKind, type WelcomeKind } from "@/lib/auth/welcome";

const SHOW_FOR_MS = 6000;

function readWelcomeCookie(): WelcomeKind | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${WELCOME_COOKIE}=([^;]*)`));
  const value = match?.[1];
  return isWelcomeKind(value) ? value : null;
}

// Greets the visitor once after a successful sign-in or sign-up.
export function WelcomeToast() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [kind, setKind] = useState<WelcomeKind | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    const found = readWelcomeCookie();
    if (!found) return;
    document.cookie = `${WELCOME_COOKIE}=; Max-Age=0; path=/`;
    // Let the new page settle before sliding in
    const show = setTimeout(() => setKind(found), 300);
    return () => clearTimeout(show);
  }, [status, pathname]);

  useEffect(() => {
    if (!kind) return;
    const hide = setTimeout(() => setKind(null), SHOW_FOR_MS);
    return () => clearTimeout(hide);
  }, [kind]);

  if (!kind) return null;

  const firstName = session?.user?.name?.split(" ")[0];
  const title = kind === "signup" ? "Account created successfully" : "Signed in successfully";
  const message =
    kind === "signup"
      ? `Welcome to Virasat${firstName ? `, ${firstName}` : ""}! Start exploring India's heritage.`
      : `Welcome back${firstName ? `, ${firstName}` : ""}!`;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 right-4 left-4 sm:left-auto sm:w-96 z-[60] animate-fade-in-up"
    >
      <div className="flex items-start gap-3 rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] p-4 shadow-xl shadow-[#6B5E52]/15">
        <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--hv-text-primary)]">{title}</p>
          <p className="mt-0.5 text-sm text-[var(--hv-text-secondary)]">{message}</p>
        </div>
        <button
          type="button"
          onClick={() => setKind(null)}
          className="shrink-0 rounded-full p-1 text-[var(--hv-text-muted)] hover:bg-[var(--hv-bg-secondary)] hover:text-[var(--hv-text-primary)]"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
