import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExperienceViewer } from "@/components/experience/ExperienceViewer";
import { ViewerControls } from "@/components/experience/ViewerControls";
import { ExperienceInfo } from "@/components/experience/ExperienceInfo";
import { ARPlaceholder } from "@/components/experience/ARPlaceholder";
import { VRPlaceholder } from "@/components/experience/VRPlaceholder";
import { getHeritageSiteBySlug } from "@/lib/services/heritage.service";
import { sampleHeritageSites } from "@/data/sample-heritage-sites";
import { PageWrapper, Section } from "@/components/layout/PageWrapper";
import Link from "next/link";
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

  return (
    <div className="min-h-screen pt-16 bg-[var(--hv-bg-primary)]">
      {/* Top Bar */}
      <div className="border-b border-[var(--hv-bg-border)] bg-[var(--hv-bg-secondary)]">
        <PageWrapper noTopPadding className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/heritage/${site.slug}`}
                className="flex items-center gap-2 text-sm text-[var(--hv-text-muted)] hover:text-amber-400 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to {site.name}
              </Link>
              <div className="w-px h-4 bg-[var(--hv-bg-border)]" />
              <p className="font-display text-sm font-semibold text-[var(--hv-text-primary)]">
                3D Experience — {site.name}
              </p>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">
                3D Active
              </span>
              <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium">
                AR Soon
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
            <ViewerControls />
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-1">
            <ExperienceInfo site={site} />
          </div>
        </div>

        {/* AR + VR Placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ARPlaceholder siteName={site.name} />
          <VRPlaceholder siteName={site.name} />
        </div>
      </PageWrapper>
    </div>
  );
}
