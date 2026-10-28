import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Box, Calendar, Globe, Landmark, MapPin, Smartphone } from "lucide-react";
import { HeritageHero } from "@/components/heritage/HeritageHero";
import { HeritageTimeline } from "@/components/heritage/HeritageTimeline";
import { HeritageGallery } from "@/components/heritage/HeritageGallery";
import { HeritageBooks } from "@/components/heritage/HeritageBooks";
import { RelatedSites } from "@/components/heritage/RelatedSites";
import { Section, SectionHeader } from "@/components/layout/PageWrapper";
import { getHeritageSiteBySlug, getRelatedSites } from "@/lib/services/heritage.service";
import { sampleHeritageSites } from "@/data/sample-heritage-sites";
import { ExperienceViewer } from "@/components/experience/ExperienceViewer";
import { formatYear } from "@/lib/utils";
import { hasTour, realModels } from "@/lib/models";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return sampleHeritageSites.map((site) => ({ slug: site.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = await getHeritageSiteBySlug(slug);
  if (!site) return { title: "Site Not Found" };
  return {
    title: `${site.name} — History, Architecture and 3D Model`,
    description: site.shortDescription,
    openGraph: { title: site.name, description: site.shortDescription, images: [{ url: site.heroImage }] },
  };
}

export default async function HeritageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const site = await getHeritageSiteBySlug(slug);
  if (!site) notFound();

  const related = await getRelatedSites(site.id, 3);
  const has3D = realModels(site).length > 0 || Boolean(site.sketchfabModelId);
  const media = site.media ?? [];

  const chapters = [
    { id: "overview", label: "Overview", content: site.description },
    { id: "history", label: "History", content: site.history },
    { id: "architecture", label: "Architecture", content: site.architecture },
    { id: "significance", label: "Cultural significance", content: site.culturalSignificance },
  ].filter((c) => c.content);

  const facts = [
    { icon: MapPin, label: "Location", value: `${site.city}, ${site.state}` },
    { icon: Calendar, label: "Period", value: site.historicalPeriod },
    { icon: Landmark, label: "Style", value: site.architecturalStyle },
    { icon: Award, label: "Built", value: site.yearBuilt ? formatYear(site.yearBuilt) : "Unknown" },
    { icon: Globe, label: "UNESCO", value: site.unescoStatus },
  ];

  const navItems = [
    ...chapters.map((c) => ({ id: c.id, label: c.label })),
    ...(media.length > 0 ? [{ id: "gallery", label: "Gallery" }] : []),
    ...(has3D ? [{ id: "3d-experience", label: "3D model" }] : []),
    ...(site.timelineEvents?.length ? [{ id: "timeline", label: "Timeline" }] : []),
  ];

  return (
    <div className="bg-[var(--hv-bg-primary)]">
      <HeritageHero site={site} />

      {/* In-page navigation */}
      <nav
        aria-label="On this page"
        className="sticky top-16 z-30 border-y border-[var(--hv-bg-border)] bg-[var(--hv-bg-primary)]/90 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex gap-1 overflow-x-auto [scrollbar-width:none] py-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium text-[var(--hv-text-secondary)] hover:bg-[var(--hv-bg-secondary)] hover:text-[var(--hv-text-primary)] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Article + key facts */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <article className="lg:col-span-8 space-y-12">
            {chapters.map((c) => (
              <section key={c.id} id={c.id} className="scroll-mt-32">
                <h2 className="font-display text-2xl md:text-3xl font-medium text-[var(--hv-text-primary)] mb-4">
                  {c.label}
                </h2>
                <p className="text-[var(--hv-text-secondary)] leading-[1.85] font-serif text-[17px]">{c.content}</p>
              </section>
            ))}
          </article>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-5">
              <div className="rounded-2xl bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--hv-blue)] mb-4">At a glance</p>
                <dl className="space-y-3.5">
                  {facts.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <Icon size={16} className="mt-0.5 shrink-0 text-[var(--hv-gold-muted)]" />
                      <div className="min-w-0">
                        <dt className="text-[11px] uppercase tracking-wide text-[var(--hv-text-muted)]">{label}</dt>
                        <dd className="text-sm text-[var(--hv-text-primary)]">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              {has3D && (
                <div className="rounded-2xl bg-[var(--hv-blue-dark)] text-white p-6">
                  <Box size={20} className="text-[var(--hv-gold-light)] mb-3" />
                  <p className="font-display text-lg mb-1">Explore it in 3D</p>
                  <p className="text-sm text-white/75 leading-relaxed mb-5">
                    {hasTour(site)
                      ? "Take the guided tour: each landmark zooms in and tells its story."
                      : "Turn and zoom the model, then place it on your table in AR."}
                  </p>
                  <Link
                    href={`/experience/${site.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-[var(--hv-text-primary)] text-xs font-semibold tracking-wide hover:bg-[var(--hv-bg-secondary)] transition-colors"
                  >
                    Open 3D viewer <ArrowRight size={14} />
                  </Link>
                  <p className="mt-4 flex items-center gap-1.5 text-[11px] text-white/60">
                    <Smartphone size={12} /> AR works on Android and iPhone
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </Section>

      {media.length > 0 && (
        <Section id="gallery" className="scroll-mt-28 border-t border-[var(--hv-bg-border)] bg-[var(--hv-bg-secondary)]/50">
          <SectionHeader eyebrow="Gallery" title={`${site.name} in photographs`} centered={false} />
          <HeritageGallery media={media} siteName={site.name} />
        </Section>
      )}

      {has3D && (
        <Section id="3d-experience" className="scroll-mt-28 border-t border-[var(--hv-bg-border)]">
          <SectionHeader eyebrow="Interactive" title="3D model" centered={false} />
          <ExperienceViewer site={site} />
        </Section>
      )}

      {site.timelineEvents && site.timelineEvents.length > 0 && (
        <Section id="timeline" className="scroll-mt-28 border-t border-[var(--hv-bg-border)] bg-[var(--hv-bg-secondary)]/50">
          <SectionHeader eyebrow="Through the centuries" title="Timeline" centered={false} />
          <div className="max-w-3xl">
            <HeritageTimeline events={site.timelineEvents} />
          </div>
        </Section>
      )}

      <Section id="books-section">
        <HeritageBooks site={site} />
      </Section>

      <Section className="border-t border-[var(--hv-bg-border)] bg-[var(--hv-bg-secondary)]/50">
        <RelatedSites sites={related} currentSiteId={site.id} />
      </Section>
    </div>
  );
}
