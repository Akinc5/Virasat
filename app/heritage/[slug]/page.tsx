import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HeritageHero } from "@/components/heritage/HeritageHero";
import { HeritageInfo } from "@/components/heritage/HeritageInfo";
import { HeritageTimeline } from "@/components/heritage/HeritageTimeline";
import { HeritageGallery } from "@/components/heritage/HeritageGallery";
import { RelatedSites } from "@/components/heritage/RelatedSites";
import { Section } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
  getHeritageSiteBySlug,
  getRelatedSites,
} from "@/lib/services/heritage.service";
import { sampleHeritageSites } from "@/data/sample-heritage-sites";
import { ExperienceViewer } from "@/components/experience/ExperienceViewer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths from sample data
export async function generateStaticParams() {
  return sampleHeritageSites.map((site) => ({ slug: site.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = await getHeritageSiteBySlug(slug);
  if (!site) return { title: "Site Not Found" };

  return {
    title: `${site.name} — Heritage Site`,
    description: site.shortDescription,
    openGraph: {
      title: site.name,
      description: site.shortDescription,
      images: [{ url: site.heroImage }],
    },
  };
}

// Tabbed content sections
const TABS = ["Overview", "History", "Architecture", "Cultural Significance"] as const;
type Tab = (typeof TABS)[number];

function ContentSection({
  site,
}: {
  site: Awaited<ReturnType<typeof getHeritageSiteBySlug>> & object;
}) {
  return (
    <div className="space-y-8">
      {/* Tab-like sections */}
      {(
        [
          { label: "Overview", content: site.description },
          { label: "History", content: site.history },
          { label: "Architecture", content: site.architecture },
          { label: "Cultural Significance", content: site.culturalSignificance },
        ] as const
      ).map(({ label, content }) => (
        <div
          key={label}
          className="rounded-2xl bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] p-6 md:p-8"
        >
          <h2 className="font-display text-xl font-semibold text-[var(--hv-text-primary)] mb-4 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-amber-500 inline-block" />
            {label}
          </h2>
          <p className="text-[var(--hv-text-secondary)] leading-relaxed font-serif text-base">
            {content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default async function HeritageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const site = await getHeritageSiteBySlug(slug);

  if (!site) notFound();

  const related = await getRelatedSites(site.id, 3);

  return (
    <div>
      {/* Hero */}
      <HeritageHero site={site} />

      {/* Info Chips */}
      <Section>
        <HeritageInfo site={site} />
      </Section>

      {/* Main content grid */}
      <Section elevated>
        <div className="grid grid-cols-1 gap-10">
          <ContentSection site={site} />
        </div>
      </Section>

      {/* Timeline */}
      {site.timelineEvents && site.timelineEvents.length > 0 && (
        <Section>
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-[var(--hv-text-primary)] mb-8">
              Historical Timeline
            </h2>
            <HeritageTimeline events={site.timelineEvents} />
          </div>
        </Section>
      )}

      {/* Gallery */}
      {site.media && site.media.length > 0 && (
        <Section elevated>
          <h2 className="font-display text-2xl font-bold text-[var(--hv-text-primary)] mb-6">
            Photo Gallery
          </h2>
          <HeritageGallery media={site.media} siteName={site.name} />
        </Section>
      )}

      {/* 3D / VR Experience Section */}
      <Section id="3d-experience">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2">
            Immersive Experience
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--hv-text-primary)]">
            Explore in 3D
          </h2>
          <p className="text-[var(--hv-text-muted)] text-sm mt-2">
            A full 3D viewer experience is in development. Click Launch for a preview.
          </p>
        </div>

        <ExperienceViewer site={site} />

        <div className="mt-4 flex gap-3">
          <Link href={`/experience/${site.slug}`}>
            <Button variant="gold" id={`launch-3d-${site.slug}`}>
              Launch Full 3D Experience
            </Button>
          </Link>
        </div>
      </Section>

      {/* Related sites */}
      <Section elevated>
        <RelatedSites sites={related} currentSiteId={site.id} />
      </Section>
    </div>
  );
}
