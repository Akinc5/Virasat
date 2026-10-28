import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Box, MapPin, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeritageCard } from "@/components/heritage/HeritageCard";
import { Section, SectionHeader } from "@/components/layout/PageWrapper";
import { getFeaturedSites, sampleHeritageSites } from "@/data/sample-heritage-sites";
import { MONUMENT_HOTSPOTS } from "@/data/monument-hotspots";
import { MonumentShowcase, type ShowcaseMonument } from "@/components/home/MonumentShowcase";
import { HeritageAtlas, type AtlasSite } from "@/components/home/HeritageAtlas";
import { Reveal } from "@/components/ui/Reveal";
import { realModels, hasTour } from "@/lib/models";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virasat — India's Heritage in 3D and AR",
  description:
    "Explore India's most iconic heritage sites as interactive 3D models, take guided tours and place them in your room with AR.",
};

export default async function HomePage() {
  const featured = getFeaturedSites(3);
  const allSites = sampleHeritageSites;
  const heroSite = allSites.find((s) => s.slug === "taj-mahal") ?? allSites[0];

  // Show the most realistic model each site has: a detailed model or scan
  // when there is one, otherwise our Blender reconstruction.
  const showcase: ShowcaseMonument[] = allSites
    .filter((site) => realModels(site).length > 0)
    .map((site) => {
      const models = realModels(site);
      const model = models.find((m) => m.source === "scan") ?? models[0];
      return {
        slug: site.slug,
        name: site.name,
        place: `${site.city}, ${site.state}`,
        shortDescription: site.shortDescription,
        modelUrl: model.modelUrl,
        displayScale: model.displayScale ?? 1,
        orbit: model.cameraOrbit,
        credit: "Prepared in Blender · Virasat",
        tourStops: hasTour(site) ? (MONUMENT_HOTSPOTS[site.slug] ?? []).filter((h) => h.onModel !== false).length : 0,
        modelCount: models.length + (site.sketchfabModelId ? 1 : 0),
        period: site.yearBuilt ? `c. ${site.yearBuilt} CE` : site.historicalPeriod,
      };
    });

  const atlas: AtlasSite[] = allSites.map((site) => ({
    slug: site.slug,
    name: site.name,
    city: site.city,
    state: site.state,
    latitude: site.latitude,
    longitude: site.longitude,
    heroImage: site.heroImage,
    category: site.category,
    has3D: realModels(site).length > 0,
  }));

  const stats = [
    { icon: MapPin, value: allSites.length, label: "Heritage sites" },
    { icon: Box, value: showcase.length, label: "Interactive 3D models" },
    { icon: Smartphone, value: "AR", label: "On your phone" },
  ];

  return (
    <div className="relative bg-[var(--hv-bg-primary)]">
      <div className="ambient-texture-layer" />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24" aria-label="Introduction">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 animate-fade-in-up">
              <p className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] font-semibold text-[var(--hv-blue)] uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--hv-gold)]" />
                India&apos;s heritage in 3D
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-wide text-[var(--hv-text-primary)] leading-[1.1]">
                Explore India&apos;s
                <span className="block mt-2 italic font-serif text-[var(--hv-gold)] tracking-normal">Cultural Legacy</span>
              </h1>
              <p className="mt-6 text-base text-[var(--hv-text-secondary)] font-serif italic max-w-lg leading-relaxed">
                Turn, zoom and walk around the monuments in 3D, hear their stories, then place them on your table in AR.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/explore">
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight size={16} />}
                    className="text-xs tracking-widest uppercase font-semibold"
                  >
                    Explore sites
                  </Button>
                </Link>
                <Link href={`/experience/${heroSite.slug}`}>
                  <Button variant="outline" size="lg" className="text-xs tracking-widest uppercase font-semibold">
                    Open 3D viewer
                  </Button>
                </Link>
              </div>

              <dl className="mt-12 pt-8 grid grid-cols-3 gap-4 max-w-lg border-t border-[var(--hv-bg-border)]">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label}>
                    <dt className="sr-only">{label}</dt>
                    <dd className="flex items-center gap-2 font-display text-2xl text-[var(--hv-text-primary)]">
                      <Icon size={16} className="text-[var(--hv-gold-muted)]" />
                      {value}
                    </dd>
                    <p className="mt-1 text-[11px] text-[var(--hv-text-muted)]">{label}</p>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-5 hidden sm:block">
              <Link
                href={`/heritage/${heroSite.slug}`}
                className="group block max-w-sm mx-auto arch-frame-tall shadow-xl shadow-[#6B5E52]/10"
                aria-label={`Read about ${heroSite.name}`}
              >
                <div className="arch-image-mask aspect-[4/5]">
                  <Image
                    src={heroSite.heroImage}
                    alt={heroSite.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 384px, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                  <p className="absolute bottom-5 inset-x-0 text-center text-white">
                    <span className="block font-display text-lg tracking-wide">{heroSite.name}</span>
                    <span className="text-[11px] tracking-[0.2em] uppercase text-white/80">
                      {heroSite.city}, {heroSite.state}
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE 3D SHOWCASE ─────────────────────────────────── */}
      <Section id="3d-preview" className="border-t border-[var(--hv-bg-border)] bg-[var(--hv-bg-secondary)]/40">
        <Reveal>
          <MonumentShowcase monuments={showcase} />
        </Reveal>
      </Section>

      {/* ── FEATURED SITES ───────────────────────────────────── */}
      <Section id="featured-sites" className="border-t border-[var(--hv-bg-border)]">
        <SectionHeader eyebrow="Featured" title="Iconic heritage sites" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((site) => (
            <HeritageCard key={site.id} site={site} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/explore">
            <Button
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight size={14} />}
              className="text-xs tracking-widest uppercase font-semibold"
            >
              View all {allSites.length} sites
            </Button>
          </Link>
        </div>
      </Section>

      {/* ── HERITAGE ATLAS ───────────────────────────────────── */}
      <Section id="heritage-atlas" className="border-t border-[var(--hv-bg-border)] bg-[var(--hv-bg-secondary)]/40">
        <SectionHeader eyebrow="Atlas" title="Journey across India" />
        <Reveal>
          <HeritageAtlas sites={atlas} />
        </Reveal>
      </Section>
    </div>
  );
}
