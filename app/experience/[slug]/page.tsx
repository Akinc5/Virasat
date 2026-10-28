import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExperienceViewer } from "@/components/experience/ExperienceViewer";
import { ExperienceInfo } from "@/components/experience/ExperienceInfo";
import { ARPlaceholder } from "@/components/experience/ARPlaceholder";
import { VRPlaceholder } from "@/components/experience/VRPlaceholder";
import { getHeritageSiteBySlug } from "@/lib/services/heritage.service";
import { sampleHeritageSites } from "@/data/sample-heritage-sites";
import { PageWrapper } from "@/components/layout/PageWrapper";
import Link from "next/link";
import { realModels } from "@/lib/models";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return sampleHeritageSites.map((site) => ({ slug: site.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = await getHeritageSiteBySlug(slug);
  if (!site) return { title: "Experience Not Found" };
  return {
    title: `${site.name} — 3D Experience`,
    description: `Explore ${site.name} in an immersive 3D, AR, and VR experience.`,
  };
}

export default async function ExperiencePage({ params }: PageProps) {
  const { slug } = await params;
  const site = await getHeritageSiteBySlug(slug);

  if (!site) notFound();
  const arReady = realModels(site).length > 0;

  return (
    <div className="min-h-screen pt-16 bg-[var(--hv-bg-primary)]">
      {/* Top Bar */}
      <div className="border-b border-[var(--hv-bg-border)] bg-[var(--hv-bg-secondary)]">
        <PageWrapper noTopPadding className="py-4">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <div className="flex items-center gap-4 min-w-0">
              <Link
                href={`/heritage/${site.slug}`}
                className="flex items-center gap-2 text-sm text-[var(--hv-text-muted)] hover:text-amber-600 transition-colors whitespace-nowrap"
              >
                <ArrowLeft size={16} />
                <span className="sm:hidden">Back</span>
                <span className="hidden sm:inline">Back to {site.name}</span>
              </Link>
              <div className="w-px h-4 bg-[var(--hv-bg-border)]" />
              <p className="font-display text-sm font-semibold text-[var(--hv-text-primary)] truncate">
                <span className="hidden sm:inline">3D Experience — </span>
                {site.name}
              </p>
            </div>
            <div className="flex gap-2 text-xs whitespace-nowrap">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">
                3D Active
              </span>
              <span
                className={`px-2.5 py-1 rounded-full border font-medium ${
                  arReady
                    ? "bg-purple-500/15 border-purple-500/30 text-purple-600"
                    : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                }`}
                title={arReady ? "Open this page on a phone and tap “View in your space”" : undefined}
              >
                {arReady ? "AR Ready" : "AR Soon"}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-medium">
                VR Soon
              </span>
            </div>
          </div>
        </PageWrapper>
      </div>

      {/* Main Viewer Layout */}
      <PageWrapper noTopPadding className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Viewer — takes 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-4">
            <ExperienceViewer site={site} />
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-1">
            <ExperienceInfo site={site} />
          </div>
        </div>

        {/* AR + VR Placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ARPlaceholder siteName={site.name} arReady={arReady} />
          <VRPlaceholder siteName={site.name} />
        </div>
      </PageWrapper>
    </div>
  );
}
