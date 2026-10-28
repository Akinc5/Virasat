import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, googleEnabled } from "@/auth";
import { LogoMark } from "@/components/brand/Logo";
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import { safeCallbackUrl } from "@/lib/auth/callback";
import { cn } from "@/lib/utils";
import { signInWithGoogle, signInWithPassword, signUpWithPassword } from "./actions";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Virasat or create a free account.",
};

const ERRORS: Record<string, string> = {
  invalid: "That email and password don't match. Please try again.",
  name: "Please enter your name.",
  email: "Please enter a valid email address.",
  password: "Use a password of at least 8 characters.",
  taken: "An account with this email already exists. Sign in instead.",
};

const inputClass =
  "w-full rounded-lg border border-[var(--hv-bg-border)] bg-[var(--hv-bg-primary)] px-3.5 py-2.5 text-sm text-[var(--hv-text-primary)] placeholder:text-[var(--hv-text-muted)] focus:outline-none focus:border-[var(--hv-gold)] focus:ring-2 focus:ring-[var(--hv-gold)]/20 transition";

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block text-left">
      <span className="block text-xs font-medium text-[var(--hv-text-secondary)] mb-1.5">{label}</span>
      <input className={inputClass} {...props} />
    </label>
  );
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; mode?: string; error?: string }>;
}) {
  const params = await searchParams;
  const session = await auth();
  const callbackUrl = safeCallbackUrl(params.callbackUrl);
  if (session) redirect(callbackUrl);

  const signup = params.mode === "signup";
  const error = params.error ? (ERRORS[params.error] ?? ERRORS.invalid) : null;
  const tab = (mode: "signin" | "signup") => `/login?${new URLSearchParams({ mode, callbackUrl }).toString()}`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16 bg-[var(--hv-bg-primary)]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <LogoMark className="w-12 h-12 mx-auto mb-5" />
          <h1 className="font-display text-2xl font-medium tracking-wide text-[var(--hv-text-primary)]">
            {signup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm font-serif italic text-[var(--hv-text-secondary)]">
            {signup ? "Free for learners, teachers and travellers." : "Sign in to continue exploring."}
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] shadow-xl shadow-[#6B5E52]/5 p-6">
          <div className="grid grid-cols-2 p-1 mb-6 rounded-full bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)]">
            {(["signin", "signup"] as const).map((m) => (
              <Link
                key={m}
                href={tab(m)}
                aria-current={(m === "signup") === signup ? "page" : undefined}
                className={cn(
                  "text-center py-1.5 rounded-full text-xs font-medium transition-colors",
                  (m === "signup") === signup
                    ? "bg-[var(--hv-text-primary)] text-[var(--hv-bg-primary)]"
                    : "text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)]"
                )}
              >
                {m === "signin" ? "Sign in" : "Create account"}
              </Link>
            ))}
          </div>

          {error && (
            <p role="alert" className="mb-4 rounded-lg border border-rose-300/60 bg-rose-50 px-3 py-2 text-xs text-rose-700">
              {error}
            </p>
          )}

          <form action={signup ? signUpWithPassword : signInWithPassword} className="space-y-4">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            {signup && <Field label="Name" name="name" autoComplete="name" required />}
            <Field label="Email" name="email" type="email" autoComplete="email" required />
            <Field
              label="Password"
              name="password"
              type="password"
              autoComplete={signup ? "new-password" : "current-password"}
              minLength={signup ? 8 : undefined}
              required
            />
            <button
              type="submit"
              className="w-full rounded-lg px-5 py-3 text-xs font-semibold uppercase tracking-widest bg-[var(--hv-text-primary)] text-[var(--hv-bg-primary)] hover:bg-[var(--hv-blue-dark)] transition-colors cursor-pointer"
            >
              {signup ? "Create account" : "Sign in"}
            </button>
          </form>

          {googleEnabled && (
            <>
              <div className="flex items-center gap-3 my-5 text-[11px] text-[var(--hv-text-muted)]">
                <span className="h-px flex-1 bg-[var(--hv-bg-border)]" /> or <span className="h-px flex-1 bg-[var(--hv-bg-border)]" />
              </div>
              <form action={signInWithGoogle}>
                <input type="hidden" name="callbackUrl" value={callbackUrl} />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-3 rounded-lg px-5 py-2.5 text-sm font-medium bg-[var(--hv-bg-primary)] border border-[var(--hv-bg-border)] text-[var(--hv-text-primary)] hover:bg-[var(--hv-bg-secondary)] transition-colors cursor-pointer"
                >
                  <GoogleIcon className="w-4 h-4" />
                  Continue with Google
                </button>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-[11px] text-[var(--hv-text-muted)]">
          Virasat is free for educational use.
        </p>
      </div>
    </div>
  );
}
