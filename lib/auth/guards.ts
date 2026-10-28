// Server-side access checks for pages and server actions.

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { currentRole } from "@/lib/auth/users";

export async function requireUser(callbackUrl = "/account") {
  const session = await auth();
  if (!session?.user?.email) redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  return session.user as typeof session.user & { email: string };
}

/** The proxy checks the cookie; this re-checks the stored role on every admin request. */
export async function requireAdmin() {
  const user = await requireUser("/admin");
  if ((await currentRole(user.email)) !== "admin") redirect("/account?denied=admin");
  return user;
}
