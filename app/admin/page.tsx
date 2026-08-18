import type { Metadata } from "next";
import Link from "next/link";
import {
  Landmark,
  Image as ImageIcon,
  Box,
  Users,
  BarChart3,
  Plus,
  ArrowUpRight,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { sampleHeritageSites } from "@/data/sample-heritage-sites";

export const metadata: Metadata = {
  title: "Admin Dashboard — HeritageVerse",
  description: "Heritage Verse admin dashboard — manage heritage sites, media, 3D models, users, and analytics.",
};

// ── Admin sidebar navigation items ───────────────────────────
const adminSections = [
  { id: "heritage-sites", icon: Landmark, label: "Heritage Sites", count: sampleHeritageSites.length },
  { id: "media", icon: ImageIcon, label: "Media Library", count: 12 },
  { id: "3d-models", icon: Box, label: "3D Models", count: 0 },
  { id: "users", icon: Users, label: "Users", count: 1 },
  { id: "analytics", icon: BarChart3, label: "Analytics", count: null },
  { id: "settings", icon: Settings, label: "Settings", count: null },
];

// Stats cards
const stats = [
  {
    label: "Heritage Sites",
    value: sampleHeritageSites.length,
    icon: Landmark,
    color: "amber",
    change: "+2 this month",
  },
  {
    label: "Media Files",
    value: 12,
    icon: ImageIcon,
    color: "blue",
    change: "+4 this week",
  },
  {
    label: "3D Models",
    value: 0,
    icon: Box,
    color: "purple",
    change: "Coming soon",
  },
  {
    label: "Team Members",
    value: 1,
    icon: Users,
    color: "green",
    change: "Active",
  },
];

const colorMap: Record<string, string> = {
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  green: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen pt-16 flex">
      {/* ── Sidebar ── */}
      <aside
        className="hidden lg:flex w-64 flex-col border-r border-[var(--hv-bg-border)] bg-[var(--hv-bg-secondary)] sticky top-16 h-[calc(100vh-4rem)]"
        aria-label="Admin sidebar"
      >
        <div className="p-5 border-b border-[var(--hv-bg-border)]">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hv-text-muted)]">
            Admin Console
          </p>
          <p className="text-sm font-display font-bold text-[var(--hv-text-primary)] mt-0.5">
            HeritageVerse
          </p>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto" aria-label="Admin navigation">
          <ul className="space-y-0.5">
            {adminSections.map(({ id, icon: Icon, label, count }) => (
              <li key={id}>
                <a
                  href={`#admin-${id}`}
                  id={`admin-nav-${id}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)] hover:bg-white/5 transition-all group"
                >
                  <Icon size={16} className="flex-shrink-0 group-hover:text-amber-400 transition-colors" />
                  <span className="flex-1">{label}</span>
                  {count !== null && (
                    <span className="text-xs bg-[var(--hv-bg-elevated)] px-2 py-0.5 rounded-full text-[var(--hv-text-muted)]">
                      {count}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-[var(--hv-bg-border)]">
          <Link href="/" className="block">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
              <ArrowUpRight size={14} />
              View Live Site
            </Button>
          </Link>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl font-bold text-[var(--hv-text-primary)]">
                Dashboard
              </h1>
              <p className="text-sm text-[var(--hv-text-muted)] mt-0.5">
                Manage heritage sites, media, and platform content.
              </p>
            </div>
            <Button variant="gold" leftIcon={<Plus size={16} />} id="admin-add-site-btn">
              Add Heritage Site
            </Button>
          </div>

          {/* Stats Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
            aria-label="Dashboard statistics"
          >
            {stats.map(({ label, value, icon: Icon, color, change }) => (
              <div
                key={label}
                className="p-5 rounded-2xl bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap[color]}`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-xs text-[var(--hv-text-muted)]">{change}</span>
                </div>
                <p className="font-display text-3xl font-black text-[var(--hv-text-primary)]">
                  {value}
                </p>
                <p className="text-xs text-[var(--hv-text-muted)] mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Heritage Sites Section */}
          <section
            id="admin-heritage-sites"
            className="mb-10"
            aria-labelledby="admin-heritage-heading"
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                id="admin-heritage-heading"
                className="font-display text-lg font-semibold text-[var(--hv-text-primary)]"
              >
                Heritage Sites
              </h2>
              <Button variant="outline" size="sm" leftIcon={<Plus size={14} />} id="admin-sites-add-btn">
                Add Site
              </Button>
            </div>
            <div className="rounded-2xl bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] overflow-hidden">
              <table className="w-full" aria-label="Heritage sites table">
                <thead>
                  <tr className="border-b border-[var(--hv-bg-border)]">
                    {["Name", "State", "Category", "UNESCO", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--hv-text-muted)]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sampleHeritageSites.map((site) => (
                    <tr
                      key={site.id}
                      className="border-b border-[var(--hv-bg-border)] last:border-0 hover:bg-white/2 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-[var(--hv-text-primary)]">
                          {site.name}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--hv-text-secondary)]">
                        {site.state}
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--hv-text-secondary)]">
                        {site.category}
                      </td>
                      <td className="px-4 py-3">
                        {site.unescoStatus === "World Heritage Site" ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            UNESCO
                          </span>
                        ) : (
                          <span className="text-xs text-[var(--hv-text-muted)]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Link href={`/heritage/${site.slug}`}>
                            <Button variant="ghost" size="sm" id={`admin-view-${site.slug}`}>
                              View
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            id={`admin-edit-${site.slug}`}
                            className="text-amber-500"
                          >
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Media Section */}
          <section id="admin-media" className="mb-10" aria-labelledby="admin-media-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="admin-media-heading" className="font-display text-lg font-semibold text-[var(--hv-text-primary)]">
                Media Library
              </h2>
              <Button variant="outline" size="sm" leftIcon={<Plus size={14} />} id="admin-media-upload-btn">
                Upload Media
              </Button>
            </div>
            <div className="rounded-2xl bg-[var(--hv-bg-card)] border border-dashed border-[var(--hv-bg-border)] p-12 text-center">
              <ImageIcon size={32} className="text-[var(--hv-text-muted)] mx-auto mb-3" />
              <p className="text-[var(--hv-text-muted)] text-sm">
                Media management UI — connect to storage provider (S3/Cloudinary) to enable.
              </p>
            </div>
          </section>

          {/* 3D Models Section */}
          <section id="admin-3d-models" className="mb-10" aria-labelledby="admin-models-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="admin-models-heading" className="font-display text-lg font-semibold text-[var(--hv-text-primary)]">
                3D Models
              </h2>
              <Button variant="outline" size="sm" leftIcon={<Plus size={14} />} id="admin-model-upload-btn">
                Upload Model
              </Button>
            </div>
            <div className="rounded-2xl bg-[var(--hv-bg-card)] border border-dashed border-[var(--hv-bg-border)] p-12 text-center">
              <Box size={32} className="text-[var(--hv-text-muted)] mx-auto mb-3" />
              <p className="text-[var(--hv-text-muted)] text-sm">
                Upload .glb or .gltf files here. They will be linked to heritage sites and loaded in the 3D viewer.
              </p>
            </div>
          </section>

          {/* Analytics Placeholder */}
          <section id="admin-analytics" aria-labelledby="admin-analytics-heading">
            <h2 id="admin-analytics-heading" className="font-display text-lg font-semibold text-[var(--hv-text-primary)] mb-4">
              Analytics
            </h2>
            <div className="rounded-2xl bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] p-8 text-center">
              <BarChart3 size={32} className="text-[var(--hv-text-muted)] mx-auto mb-3" />
              <p className="text-[var(--hv-text-muted)] text-sm">
                Connect PostHog, Plausible, or Vercel Analytics to view site traffic and user behavior.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
