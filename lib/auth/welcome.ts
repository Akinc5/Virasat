// A short-lived cookie the sign-in actions set just before redirecting, so the
// next page can greet the visitor once. Readable by the client, which clears it.
export const WELCOME_COOKIE = "virasat_welcome";

export type WelcomeKind = "signin" | "signup";

export function isWelcomeKind(value: string | undefined): value is WelcomeKind {
  return value === "signin" || value === "signup";
}
