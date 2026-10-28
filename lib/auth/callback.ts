// Only allow same-site relative paths — a raw callbackUrl from the query
// string is attacker-controlled and must never reach redirect()/signIn()
// unvalidated, or /login?callbackUrl=https://evil.com becomes an open redirect.
export function safeCallbackUrl(callbackUrl: string | undefined | null): string {
  if (callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("//") && !callbackUrl.startsWith("/\\")) {
    return callbackUrl;
  }
  return "/";
}
