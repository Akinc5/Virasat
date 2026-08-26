import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Globe } from "lucide-react";
import { auth, signIn } from "@/auth";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card, CardContent } from "@/components/ui/Card";
import { GoogleIcon } from "@/components/auth/GoogleIcon";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to HeritageVerse with your Google account.",
};

// Only allow same-site relative paths — a raw callbackUrl from the query
// string is attacker-controlled and must never reach redirect()/signIn()
// unvalidated, or /login?callbackUrl=https://evil.com becomes an open redirect.
function safeCallbackUrl(callbackUrl: string | undefined): string {
  if (callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")) {
    return callbackUrl;
  }
  return "/";
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await auth();
  const callbackUrl = safeCallbackUrl((await searchParams).callbackUrl);

  if (session) {
    redirect(callbackUrl);
  }

  return (
    <PageWrapper className="flex min-h-[70vh] items-center justify-center">
      <Card variant="glass" className="w-full max-w-sm">
        <CardContent className="flex flex-col items-center text-center py-10">
          <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[var(--hv-blue)] to-[var(--hv-blue-dark)] flex items-center justify-center shadow-sm shadow-[var(--hv-blue)]/20 mb-5">
            <Globe size={22} className="text-[var(--hv-bg-primary)]" />
          </div>

          <h1 className="font-display text-xl font-medium tracking-wide text-[var(--hv-text-primary)]">
            Welcome to Virasat
          </h1>
          <p className="mt-2 text-sm font-serif italic text-[var(--hv-text-secondary)]">
            Sign in to save favorites and access your account.
          </p>

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: callbackUrl });
            }}
            className="w-full mt-8"
          >
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-3 rounded-lg px-5 py-3 text-sm font-medium bg-[var(--hv-bg-primary)] border border-[var(--hv-bg-border)] text-[var(--hv-text-primary)] hover:bg-[var(--hv-bg-secondary)] transition-colors cursor-pointer"
            >
              <GoogleIcon className="w-4 h-4" />
              Continue with Google
            </button>
          </form>

          <p className="mt-6 text-[11px] text-[var(--hv-text-secondary)]">
            By continuing, you agree to explore India&apos;s heritage responsibly.
          </p>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
