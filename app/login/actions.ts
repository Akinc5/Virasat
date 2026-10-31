"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { createUser } from "@/lib/auth/users";
import { safeCallbackUrl } from "@/lib/auth/callback";
import { WELCOME_COOKIE, type WelcomeKind } from "@/lib/auth/welcome";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(form: FormData, name: string) {
  const v = form.get(name);
  return typeof v === "string" ? v.trim() : "";
}

function back(mode: "signin" | "signup", error: string, callbackUrl: string): never {
  const q = new URLSearchParams({ mode, error, callbackUrl });
  redirect(`/login?${q.toString()}`);
}

async function setWelcome(kind: WelcomeKind, maxAge: number) {
  (await cookies()).set(WELCOME_COOKIE, kind, { path: "/", sameSite: "lax", maxAge });
}

async function signInOrBack(email: string, password: string, mode: "signin" | "signup", callbackUrl: string) {
  await setWelcome(mode, 60);
  try {
    // On success this throws Next's redirect, which must propagate
    await signIn("credentials", { email, password, redirectTo: callbackUrl });
  } catch (err) {
    if (err instanceof AuthError) {
      (await cookies()).delete(WELCOME_COOKIE);
      back(mode, "invalid", callbackUrl);
    }
    throw err;
  }
}

export async function signInWithPassword(form: FormData) {
  const callbackUrl = safeCallbackUrl(field(form, "callbackUrl"));
  const email = field(form, "email");
  const password = form.get("password");
  if (!EMAIL_RE.test(email) || typeof password !== "string" || !password) back("signin", "invalid", callbackUrl);
  await signInOrBack(email, password as string, "signin", callbackUrl);
}

export async function signUpWithPassword(form: FormData) {
  const callbackUrl = safeCallbackUrl(field(form, "callbackUrl"));
  const name = field(form, "name");
  const email = field(form, "email");
  const password = form.get("password");
  if (!name) back("signup", "name", callbackUrl);
  if (!EMAIL_RE.test(email)) back("signup", "email", callbackUrl);
  if (typeof password !== "string" || password.length < 8) back("signup", "password", callbackUrl);
  try {
    await createUser(name, email, password as string);
  } catch (err) {
    if (err instanceof Error && err.message === "EMAIL_TAKEN") back("signup", "taken", callbackUrl);
    console.error("Sign-up failed", err);
    back("signup", "server", callbackUrl);
  }
  await signInOrBack(email, password as string, "signup", callbackUrl);
}

export async function signInWithGoogle(form: FormData) {
  // Google's consent screen can take a while; give the greeting longer to arrive
  await setWelcome("signin", 600);
  await signIn("google", { redirectTo: safeCallbackUrl(field(form, "callbackUrl")) });
}
