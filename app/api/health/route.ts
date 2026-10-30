// Deployment health check: confirms auth is configured and the data store
// can write and read. Reveals no user data.

import { NextResponse } from "next/server";
import { storeHealth } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = await storeHealth();
  const authConfigured = Boolean(process.env.AUTH_SECRET);
  const ok = store.ok && authConfigured;
  return NextResponse.json({ ok, authConfigured, store }, { status: ok ? 200 : 503 });
}
