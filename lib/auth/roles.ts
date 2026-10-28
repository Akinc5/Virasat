// Pure role helpers — no storage imports, so they are safe in the proxy.

export type Role = "user" | "admin";

export function normaliseEmail(email: string) {
  return email.trim().toLowerCase();
}

export function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => normaliseEmail(e))
    .filter(Boolean);
}

/** Effective role: the env allow-list always wins, so an admin can't be locked out. */
export function roleFor(user: { email?: string | null; role?: Role }): Role {
  if (user.email && adminEmails().includes(normaliseEmail(user.email))) return "admin";
  return user.role ?? "user";
}
