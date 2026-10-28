import type { Metadata } from "next";
import Link from "next/link";
import { BedDouble, BookOpen, CheckCircle2, Compass, MapPin, Package, ShieldAlert } from "lucide-react";
import { requireUser } from "@/lib/auth/guards";
import { listOrders, listSaved } from "@/lib/services/commerce";
import { STATUS_STYLE } from "@/lib/services/order-status";
import { sampleHeritageSites } from "@/data/sample-heritage-sites";
import { cancelOrder } from "@/app/library/actions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "My account" };

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ ordered?: string; denied?: string }> }) {
  const user = await requireUser("/account");
  const { ordered, denied } = await searchParams;
  const [orders, saved] = await Promise.all([listOrders({ userId: user.id }), listSaved(user.id)]);
  const names = Object.fromEntries(sampleHeritageSites.map((s) => [s.slug, s.name]));
  const bySite = saved.reduce<Record<string, typeof saved>>((acc, s) => {
    (acc[s.siteSlug] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className="bg-[var(--hv-bg-primary)] pt-28 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--hv-blue)] mb-3">My account</p>
        <h1 className="font-display text-3xl md:text-4xl font-medium text-[var(--hv-text-primary)]">
          Namaste, {user.name?.split(" ")[0] ?? "traveller"}
        </h1>
        <p className="mt-2 text-sm text-[var(--hv-text-muted)]">
          {user.email}
          {user.role === "admin" && (
            <>
              {" · "}
              <Link href="/admin" className="text-[var(--hv-blue-dark)] font-medium hover:underline">
                Open admin dashboard
              </Link>
            </>
          )}
        </p>

        {ordered && (
          <p role="status" className="mt-6 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <CheckCircle2 size={18} className="shrink-0 mt-px" />
            Order {ordered} received. We&apos;ll email you within 24 hours to confirm the price and delivery date.
          </p>
        )}
        {denied && (
          <p role="alert" className="mt-6 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <ShieldAlert size={18} className="shrink-0 mt-px" />
            The admin dashboard is only available to administrators.
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Orders */}
          <section className="lg:col-span-3">
            <h2 className="flex items-center gap-2 font-display text-xl text-[var(--hv-text-primary)] mb-4">
              <Package size={18} className="text-[var(--hv-gold-muted)]" /> Book orders
            </h2>
            {orders.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[var(--hv-bg-border)] p-8 text-center">
                <BookOpen size={22} className="mx-auto text-[var(--hv-text-muted)] mb-2" />
                <p className="text-sm text-[var(--hv-text-secondary)]">No orders yet.</p>
                <Link href="/library" className="mt-3 inline-block text-sm font-medium text-[var(--hv-blue-dark)] hover:underline">
                  Browse the library
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {orders.map((o) => (
                  <li key={o.id} className="rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-[var(--hv-text-primary)]">{o.bookTitle}</p>
                        <p className="mt-0.5 text-xs text-[var(--hv-text-muted)]">
                          {o.id} · {o.quantity} × {o.format} · {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                        <p className="mt-1 text-xs text-[var(--hv-text-secondary)]">
                          Deliver to {o.shipping.city}, {o.shipping.state} {o.shipping.pincode}
                        </p>
                      </div>
                      <span className={cn("text-[11px] font-semibold capitalize px-2.5 py-1 rounded-full border", STATUS_STYLE[o.status])}>{o.status}</span>
                    </div>
                    {o.status === "requested" && (
                      <form action={cancelOrder} className="mt-3">
                        <input type="hidden" name="orderId" value={o.id} />
                        <button className="text-xs text-[var(--hv-text-muted)] hover:text-rose-600 underline underline-offset-2">Cancel request</button>
                      </form>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Saved trip */}
          <section className="lg:col-span-2">
            <h2 className="flex items-center gap-2 font-display text-xl text-[var(--hv-text-primary)] mb-4">
              <Compass size={18} className="text-[var(--hv-gold-muted)]" /> My trip
            </h2>
            {saved.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[var(--hv-bg-border)] p-8 text-center">
                <MapPin size={22} className="mx-auto text-[var(--hv-text-muted)] mb-2" />
                <p className="text-sm text-[var(--hv-text-secondary)]">Save places and stays from any monument&apos;s &ldquo;Plan your visit&rdquo; map.</p>
                <Link href="/explore" className="mt-3 inline-block text-sm font-medium text-[var(--hv-blue-dark)] hover:underline">
                  Explore monuments
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(bySite).map(([slug, items]) => (
                  <div key={slug} className="rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] p-5">
                    <Link href={`/heritage/${slug}#plan`} className="font-display text-base text-[var(--hv-text-primary)] hover:text-[var(--hv-blue-dark)]">
                      {names[slug] ?? slug}
                    </Link>
                    <ul className="mt-3 space-y-2">
                      {items.map((i) => (
                        <li key={i.itemId} className="flex items-center gap-2 text-sm text-[var(--hv-text-secondary)]">
                          {i.kind === "stay" ? <BedDouble size={14} className="text-[var(--hv-gold-muted)]" /> : <MapPin size={14} className="text-[var(--hv-gold-muted)]" />}
                          {i.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
