import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, BedDouble, BookOpen, Box, ExternalLink, Image as ImageIcon, Landmark, LayoutDashboard, Package, Users } from "lucide-react";
import { requireAdmin } from "@/lib/auth/guards";
import { listUsers } from "@/lib/auth/users";
import { listClicks, listOrders, listSaved, ORDER_STATUSES } from "@/lib/services/commerce";
import { STATUS_STYLE } from "@/lib/services/order-status";
import { sampleHeritageSites } from "@/data/sample-heritage-sites";
import { ALL_BOOKS } from "@/data/heritage-books";
import { VISIT_INFO } from "@/data/travel";
import { realModels } from "@/lib/models";
import { changeUserRole, setOrderStatus } from "./actions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin dashboard" };

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "Book orders", icon: Package },
  { id: "partners", label: "Partner clicks", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "content", label: "Content", icon: Landmark },
] as const;
type Tab = (typeof TABS)[number]["id"];

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

function Card({ label, value, hint, icon: Icon }: { label: string; value: number | string; hint?: string; icon: typeof Users }) {
  return (
    <div className="rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--hv-text-muted)]">{label}</p>
        <Icon size={16} className="text-[var(--hv-gold-muted)]" />
      </div>
      <p className="mt-2 font-display text-3xl text-[var(--hv-text-primary)]">{value}</p>
      {hint && <p className="mt-1 text-[11px] text-[var(--hv-text-muted)]">{hint}</p>}
    </div>
  );
}

function Bars({ rows }: { rows: { label: string; value: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  if (rows.every((r) => r.value === 0)) return <p className="text-sm text-[var(--hv-text-muted)]">No data yet.</p>;
  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li key={r.label} className="grid grid-cols-[8rem_1fr_2.5rem] items-center gap-3 text-xs">
          <span className="truncate text-[var(--hv-text-secondary)]">{r.label}</span>
          <span className="h-2 rounded-full bg-[var(--hv-bg-secondary)] overflow-hidden">
            <span className="block h-full rounded-full bg-[var(--hv-gold-muted)]" style={{ width: `${(r.value / max) * 100}%` }} />
          </span>
          <span className="text-right tabular-nums text-[var(--hv-text-primary)]">{r.value}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const admin = await requireAdmin();
  const requested = (await searchParams).tab;
  const tab = (TABS.find((t) => t.id === requested)?.id ?? "overview") as Tab;
  const [users, orders, clicks, recentClicks, saved] = await Promise.all([
    listUsers(),
    listOrders(),
    listClicks(),
    listClicks(30),
    listSaved(),
  ]);
  const names = Object.fromEntries(sampleHeritageSites.map((s) => [s.slug, s.name]));

  const openOrders = orders.filter((o) => o.status === "requested" || o.status === "confirmed");
  const clicksBySite = sampleHeritageSites.map((s) => ({ label: s.name, value: recentClicks.filter((c) => c.siteSlug === s.slug).length }));
  const topItems = Object.values(
    recentClicks.reduce<Record<string, { label: string; kind: string; value: number }>>((acc, c) => {
      acc[c.itemId] ??= { label: c.label, kind: c.kind, value: 0 };
      acc[c.itemId].value++;
      return acc;
    }, {})
  )
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  return (
    <div className="min-h-screen pt-16 bg-[var(--hv-bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--hv-blue)] mb-2">Admin</p>
            <h1 className="font-display text-3xl text-[var(--hv-text-primary)]">Virasat dashboard</h1>
            <p className="mt-1 text-sm text-[var(--hv-text-muted)]">Signed in as {admin.email}</p>
          </div>
        </div>

        <nav aria-label="Admin sections" className="flex gap-1 overflow-x-auto [scrollbar-width:none] border-b border-[var(--hv-bg-border)] mb-8">
          {TABS.map(({ id, label, icon: Icon }) => (
            <Link
              key={id}
              href={id === "overview" ? "/admin" : `/admin?tab=${id}`}
              aria-current={tab === id ? "page" : undefined}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm border-b-2 -mb-px transition-colors",
                tab === id
                  ? "border-[var(--hv-gold)] text-[var(--hv-text-primary)] font-medium"
                  : "border-transparent text-[var(--hv-text-muted)] hover:text-[var(--hv-text-primary)]"
              )}
            >
              <Icon size={15} /> {label}
              {id === "orders" && openOrders.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--hv-gold)] text-white">{openOrders.length}</span>
              )}
            </Link>
          ))}
        </nav>

        {tab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card label="Registered users" value={users.length} icon={Users} />
              <Card label="Open book orders" value={openOrders.length} hint={`${orders.length} in total`} icon={Package} />
              <Card label="Partner clicks (30 days)" value={recentClicks.length} hint="Booking.com and bookshops" icon={BarChart3} />
              <Card label="Saved trip items" value={saved.length} icon={BedDouble} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] p-6">
                <h2 className="font-display text-lg text-[var(--hv-text-primary)] mb-5">Partner clicks by monument</h2>
                <Bars rows={clicksBySite} />
              </div>
              <div className="rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] p-6">
                <h2 className="font-display text-lg text-[var(--hv-text-primary)] mb-5">Latest orders</h2>
                {orders.length === 0 ? (
                  <p className="text-sm text-[var(--hv-text-muted)]">No orders yet.</p>
                ) : (
                  <ul className="divide-y divide-[var(--hv-bg-border)]">
                    {orders.slice(0, 5).map((o) => (
                      <li key={o.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                        <span className="min-w-0 truncate text-[var(--hv-text-primary)]">{o.bookTitle}</span>
                        <span className={cn("shrink-0 text-[10px] font-semibold capitalize px-2 py-0.5 rounded-full border", STATUS_STYLE[o.status])}>{o.status}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card label="Monuments" value={sampleHeritageSites.length} icon={Landmark} />
              <Card label="3D models" value={sampleHeritageSites.reduce((n, s) => n + realModels(s).length, 0)} icon={Box} />
              <Card label="Gallery photos" value={sampleHeritageSites.reduce((n, s) => n + (s.media?.length ?? 0), 0)} icon={ImageIcon} />
              <Card label="Library titles" value={ALL_BOOKS.length} icon={BookOpen} />
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="overflow-x-auto rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)]">
            {orders.length === 0 ? (
              <p className="p-10 text-center text-sm text-[var(--hv-text-muted)]">No orders yet. They appear here as soon as someone orders from the library.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-left text-[11px] uppercase tracking-wider text-[var(--hv-text-muted)] border-b border-[var(--hv-bg-border)]">
                  <tr>
                    <th className="px-5 py-3 font-medium">Order</th>
                    <th className="px-5 py-3 font-medium">Book</th>
                    <th className="px-5 py-3 font-medium">Customer</th>
                    <th className="px-5 py-3 font-medium">Deliver to</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--hv-bg-border)]">
                  {orders.map((o) => (
                    <tr key={o.id} className="align-top">
                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="font-medium text-[var(--hv-text-primary)]">{o.id}</p>
                        <p className="text-[11px] text-[var(--hv-text-muted)]">{fmtDate(o.createdAt)}</p>
                      </td>
                      <td className="px-5 py-4 min-w-48">
                        <p className="text-[var(--hv-text-primary)]">{o.bookTitle}</p>
                        <p className="text-[11px] text-[var(--hv-text-muted)]">
                          {o.quantity} × {o.format}
                          {o.note && <> · “{o.note}”</>}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-[var(--hv-text-primary)]">{o.shipping.fullName}</p>
                        <p className="text-[11px] text-[var(--hv-text-muted)]">{o.userEmail}</p>
                        <p className="text-[11px] text-[var(--hv-text-muted)]">{o.shipping.phone}</p>
                      </td>
                      <td className="px-5 py-4 text-xs text-[var(--hv-text-secondary)] min-w-44">
                        {o.shipping.line1}, {o.shipping.city}, {o.shipping.state} {o.shipping.pincode}
                      </td>
                      <td className="px-5 py-4">
                        {/* keyed on status so React's post-submit form reset shows the saved value */}
                        <form key={`${o.id}-${o.status}`} action={setOrderStatus} className="flex items-center gap-2">
                          <input type="hidden" name="orderId" value={o.id} />
                          <select
                            name="status"
                            defaultValue={o.status}
                            className={cn("text-xs font-medium capitalize rounded-full border px-2.5 py-1", STATUS_STYLE[o.status])}
                          >
                            {ORDER_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <button className="text-xs font-medium text-[var(--hv-blue-dark)] hover:underline">Update</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === "partners" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] p-6">
              <h2 className="font-display text-lg text-[var(--hv-text-primary)] mb-1">Top partner links</h2>
              <p className="text-xs text-[var(--hv-text-muted)] mb-5">Last 30 days</p>
              <Bars rows={topItems.map((t) => ({ label: t.label, value: t.value }))} />
              <p className="mt-6 text-[11px] text-[var(--hv-text-muted)] leading-relaxed">
                Earnings depend on bookings made on the partner site. Set <code>BOOKING_AFFILIATE_ID</code> and{" "}
                <code>AMAZON_ASSOCIATE_TAG</code> in Netlify to attribute them to Virasat.
              </p>
            </div>
            <div className="lg:col-span-3 overflow-x-auto rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)]">
              {clicks.length === 0 ? (
                <p className="p-10 text-center text-sm text-[var(--hv-text-muted)]">No clicks yet.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead className="text-left text-[11px] uppercase tracking-wider text-[var(--hv-text-muted)] border-b border-[var(--hv-bg-border)]">
                    <tr>
                      <th className="px-5 py-3 font-medium">When</th>
                      <th className="px-5 py-3 font-medium">Item</th>
                      <th className="px-5 py-3 font-medium">Monument</th>
                      <th className="px-5 py-3 font-medium">Partner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--hv-bg-border)]">
                    {clicks.slice(0, 100).map((c) => (
                      <tr key={c.id}>
                        <td className="px-5 py-3 whitespace-nowrap text-xs text-[var(--hv-text-muted)]">{fmtDate(c.at)}</td>
                        <td className="px-5 py-3 text-[var(--hv-text-primary)]">{c.label}</td>
                        <td className="px-5 py-3 text-xs text-[var(--hv-text-secondary)]">{names[c.siteSlug] ?? c.siteSlug}</td>
                        <td className="px-5 py-3 text-xs text-[var(--hv-text-secondary)]">{c.partner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {tab === "users" && (
          <div className="overflow-x-auto rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)]">
            {users.length === 0 ? (
              <p className="p-10 text-center text-sm text-[var(--hv-text-muted)]">No email accounts yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-left text-[11px] uppercase tracking-wider text-[var(--hv-text-muted)] border-b border-[var(--hv-bg-border)]">
                  <tr>
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Joined</th>
                    <th className="px-5 py-3 font-medium">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--hv-bg-border)]">
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="px-5 py-3 text-[var(--hv-text-primary)]">{u.name}</td>
                      <td className="px-5 py-3 text-[var(--hv-text-secondary)]">{u.email}</td>
                      <td className="px-5 py-3 text-xs text-[var(--hv-text-muted)]">{fmtDate(u.createdAt)}</td>
                      <td className="px-5 py-3">
                        <form action={changeUserRole} className="flex items-center gap-2">
                          <input type="hidden" name="email" value={u.email} />
                          <input type="hidden" name="role" value={u.role === "admin" ? "user" : "admin"} />
                          <span
                            className={cn(
                              "text-[11px] font-semibold px-2 py-0.5 rounded-full",
                              u.role === "admin" ? "bg-[var(--hv-blue-dark)] text-white" : "bg-[var(--hv-bg-secondary)] text-[var(--hv-text-secondary)]"
                            )}
                          >
                            {u.role}
                          </span>
                          {u.email !== admin.email && (
                            <button className="text-xs text-[var(--hv-blue-dark)] hover:underline">
                              {u.role === "admin" ? "Remove admin" : "Make admin"}
                            </button>
                          )}
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === "content" && (
          <div className="space-y-4">
            <p className="text-sm text-[var(--hv-text-secondary)] max-w-3xl">
              Monument text, photos, travel guides and books live in the <code>data/</code> folder and go live with each deploy.
              A content editor that writes to the database is the next step on the roadmap.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)]">
              <table className="w-full text-sm">
                <thead className="text-left text-[11px] uppercase tracking-wider text-[var(--hv-text-muted)] border-b border-[var(--hv-bg-border)]">
                  <tr>
                    <th className="px-5 py-3 font-medium">Monument</th>
                    <th className="px-5 py-3 font-medium">3D</th>
                    <th className="px-5 py-3 font-medium">Photos</th>
                    <th className="px-5 py-3 font-medium">Nearby / stays</th>
                    <th className="px-5 py-3 font-medium">Books</th>
                    <th className="px-5 py-3 font-medium" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--hv-bg-border)]">
                  {sampleHeritageSites.map((s) => (
                    <tr key={s.slug}>
                      <td className="px-5 py-3">
                        <p className="text-[var(--hv-text-primary)]">{s.name}</p>
                        <p className="text-[11px] text-[var(--hv-text-muted)]">{s.city}, {s.state}</p>
                      </td>
                      <td className="px-5 py-3 text-xs">{realModels(s).length}{s.sketchfabModelId ? " + Sketchfab" : ""}</td>
                      <td className="px-5 py-3 text-xs">{s.media?.length ?? 0}</td>
                      <td className="px-5 py-3 text-xs">
                        {VISIT_INFO[s.slug]?.places.length ?? 0} / {VISIT_INFO[s.slug]?.stays.length ?? 0}
                      </td>
                      <td className="px-5 py-3 text-xs">{ALL_BOOKS.filter((b) => b.siteSlug === s.slug).length}</td>
                      <td className="px-5 py-3 text-right">
                        <Link href={`/heritage/${s.slug}`} className="inline-flex items-center gap-1 text-xs text-[var(--hv-blue-dark)] hover:underline">
                          View <ExternalLink size={11} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
