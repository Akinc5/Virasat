import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Shield, Eye, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeritageCard } from "@/components/heritage/HeritageCard";
import { Section, SectionHeader } from "@/components/layout/PageWrapper";
import { getFeaturedSites, sampleHeritageSites } from "@/data/sample-heritage-sites";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HeritageVerse — Digital Preservation of India's Cultural Heritage",
  description:
    "Explore India's most iconic heritage sites through immersive digital, AR, and VR experiences. Start your journey today.",
};

const whyPreserve = [
  {
    icon: Shield,
    title: "Protect Against Loss",
    description:
      "Climate change, urbanization, and neglect threaten thousands of heritage sites. Digital preservation creates a permanent record for future generations.",
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description:
      "Anyone on Earth can explore India's ancient wonders without barriers of cost, distance, or ability. Heritage belongs to everyone.",
  },
  {
    icon: Eye,
    title: "Immersive Discovery",
    description:
      "Go beyond photographs. Walk through temples, study intricate carvings, and experience architecture in three dimensions.",
  },
  {
    icon: Layers,
    title: "Living History",
    description:
      "Timeline events, architectural analysis, and cultural context make each site come alive with stories that connect past and present.",
  },
];

export default async function HomePage() {
  const featured = getFeaturedSites(3);
  const allSites = sampleHeritageSites;

  return (
    <div className="relative bg-[var(--hv-bg-primary)]">
      {/* Subtle texture layout layer for the entire page background */}
      <div className="ambient-texture-layer" />

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
        aria-label="Hero section"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Typography Layout */}
            <div className="lg:col-span-7 animate-fade-in-up text-left">
              <div className="flex flex-col gap-1.5 mb-6">
                <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] font-semibold text-[var(--hv-blue)] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--hv-gold)]" />
                  Preserving India's Cultural Memory
                </div>
                <div className="flex gap-3 text-[8px] font-mono text-[var(--hv-text-muted)] uppercase tracking-[0.2em] mt-0.5">
                  <span>CATALOG REF: VR-2026-N1</span>
                  <span>•</span>
                  <span>PLATE REF: 01 / 05</span>
                </div>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-wide text-[var(--hv-text-primary)] leading-[1.1] mb-4">
                Explore India's <br />
                <span className="italic font-serif text-[var(--hv-gold)] tracking-normal normal-case block mt-2">
                  Cultural Legacy
                </span>
              </h1>

              {/* Refined Mughal-inspired floral line art ornament */}
              <div className="w-24 h-4 my-5 text-[var(--hv-gold)] opacity-70" aria-hidden="true">
                <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M0 10 Q25 4, 50 10 T100 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M25 8 C20 4, 15 5, 25 8Z" fill="currentColor"/>
                  <path d="M45 9 C41 4, 37 5, 45 9Z" fill="currentColor"/>
                  <path d="M65 10 C61 5, 57 6, 65 10Z" fill="currentColor"/>
                  <path d="M35 12 C37 16, 42 15, 35 12Z" fill="currentColor"/>
                  <path d="M55 11 C57 15, 62 14, 55 11Z" fill="currentColor"/>
                  <circle cx="50" cy="10" r="1.5" fill="currentColor"/>
                </svg>
              </div>

              <p className="text-sm md:text-base text-[var(--hv-text-secondary)] font-serif italic max-w-xl leading-relaxed mb-8">
                Step inside ancient temples, wander through forgotten empires, and experience India's most iconic architectural achievements through detailed digital archives.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/explore">
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight size={16} />}
                    id="hero-explore-btn"
                    className="text-xs tracking-widest uppercase font-semibold"
                  >
                    Explore Directory
                  </Button>
                </Link>
                <Link href="/experience/taj-mahal">
                  <Button variant="outline" size="lg" id="hero-experience-btn" className="text-xs tracking-widest uppercase font-semibold">
                    3D Experience
                  </Button>
                </Link>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4 pt-10 mt-12 border-t border-[var(--hv-bg-border)]">
                {[
                  { value: `${allSites.length}+`, label: "Archived Sites" },
                  { value: "5", label: "UNESCO Sites" },
                  { value: "3D", label: "Interactive Models" },
                  { value: "3500+", label: "Years of History" },
                ].map((stat) => (
                  <div key={stat.label} className="pr-2 border-r border-[var(--hv-bg-border)] last:border-none">
                    <p className="font-display text-lg sm:text-xl font-medium text-[var(--hv-gold)]">
                      {stat.value}
                    </p>
                    <p className="text-[9px] font-semibold text-[var(--hv-text-secondary)] uppercase tracking-wider mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Portal-Style Arched Image Frame in Archival Catalog layout */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center">
              <div className="w-full max-w-sm bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] p-4 shadow-sm hover:shadow-md transition-all duration-500 rounded-sm">
                <div className="aspect-[4/5] relative arch-frame p-2 bg-[var(--hv-bg-secondary)]">
                  <div className="arch-image-mask w-full h-full relative">
                    <Image
                      src="/images/hero-bg.jpg"
                      alt="Taj Mahal at dawn — Indian architectural heritage"
                      fill
                      className="object-cover object-center"
                      priority
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--hv-bg-primary)]/10 via-transparent to-transparent" />
                  </div>
                </div>
                <div className="mt-3.5 text-center border-t border-[var(--hv-bg-border)] pt-2.5">
                  <span className="text-[8px] font-mono text-[var(--hv-text-secondary)] uppercase tracking-[0.25em]">
                    PLATE I. SUBCONTINENTAL ARCHITECTURAL PROJECTION
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURED SITES ───────────────────────────────────── */}
      <Section id="featured-sites" className="border-t border-[var(--hv-bg-border)]">
        <SectionHeader
          eyebrow="Featured Directory"
          title="Iconic Heritage Sites"
          subtitle="A curated digital collection preserving key architectural wonders of the subcontinent — presented with equal visual importance and historical reverence."
        />

        {/* Mughal-inspired botanical divider line ornament */}
        <div className="floral-divider mb-14 -mt-6" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--hv-gold)] w-5 h-5">
            <path d="M12 2C12 2 10.5 6 12 8.5C13.5 6 12 2 12 2Z" fill="currentColor"/>
            <path d="M12 22C12 22 13.5 18 12 15.5C10.5 18 12 22 12 22Z" fill="currentColor"/>
            <path d="M2 12C2 12 6 10.5 8.5 12C6 13.5 2 12 2 12Z" fill="currentColor"/>
            <path d="M22 12C22 12 18 13.5 15.5 12C18 10.5 22 12 22 12Z" fill="currentColor"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Editorial Offset Grid to establish visual rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16 items-start">
          {featured.map((site, index) => {
            // Apply subtle offsets: Card 1 (0), Card 2 (+8), Card 3 (+4)
            const offsets = ["translate-y-0", "md:translate-y-8", "md:translate-y-4"];
            return (
              <div key={site.id} className={offsets[index % 3]}>
                <HeritageCard site={site} variant="featured" />
              </div>
            );
          })}
        </div>
        
        <div className="text-center pt-8">
          <Link href="/explore">
            <Button
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight size={14} />}
              id="featured-view-all-btn"
              className="text-xs tracking-widest uppercase font-semibold"
            >
              Browse Complete Catalog ({allSites.length} entries)
            </Button>
          </Link>
        </div>
      </Section>

      {/* ── WHY DIGITAL PRESERVATION ─────────────────────────── */}
      <Section id="why-preserve" className="border-t border-[var(--hv-bg-border)] bg-[var(--hv-bg-secondary)]">
        <SectionHeader
          eyebrow="Archival Mission"
          title="Why Digital Preservation Matters"
          subtitle="We document cultural architecture to ensure permanent global accessibility and safeguard historical monuments against loss."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {whyPreserve.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className="flex items-start gap-5 p-2"
            >
              <div className="w-10 h-10 rounded-sm border border-[var(--hv-blue)]/30 flex items-center justify-center flex-shrink-0 text-[var(--hv-blue)] bg-[var(--hv-bg-primary)]">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display font-medium text-base text-[var(--hv-text-primary)] mb-1.5 flex items-center gap-2">
                  <span className="text-xs font-serif italic text-[var(--hv-gold)]">0{index + 1}.</span>
                  {title}
                </h3>
                <p className="text-xs text-[var(--hv-text-secondary)] font-serif italic leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 3D EXPERIENCE PREVIEW ────────────────────────────── */}
      <Section id="3d-preview" className="border-t border-[var(--hv-bg-border)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--hv-blue)] mb-3">
              Technical Preservation
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[var(--hv-text-primary)] leading-tight mb-5">
              Immersive Spatial Records
            </h2>
            <p className="text-sm text-[var(--hv-text-secondary)] font-serif italic leading-relaxed mb-6">
              Our digital archive uses WebGL meshes and high-resolution spatial recordings. Explore heritage sites in full three dimensions, walk through interactive wireframe models, and analyze architectural structures from any browser.
            </p>
            <ul className="space-y-3.5 mb-8">
              {[
                "High-fidelity 3D structural mesh rendering",
                "Scalable layouts optimized for low bandwidth connections",
                "Contextual historical timelines linked to blueprints",
                "Educational descriptions with vector map projections",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-xs text-[var(--hv-text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--hv-gold)] mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/experience/taj-mahal">
              <Button variant="primary" size="lg" id="3d-preview-cta-btn" className="text-xs tracking-widest uppercase font-semibold">
                Launch 3D Model Explorer
              </Button>
            </Link>
          </div>

          {/* 3D Wireframe Viewer Card with blueprint technical design */}
          <div className="relative">
            <div className="rounded-sm bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)] overflow-hidden aspect-square flex items-center justify-center p-6 relative">
              {/* Technical Blueprint grid */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(to_right,var(--hv-blue)_1px,transparent_1px),linear-gradient(to_bottom,var(--hv-blue)_1px,transparent_1px)] bg-[size:16px_16px]" />
              
              {/* Technical markers */}
              <div className="absolute top-4 left-4 text-[8px] font-mono text-[var(--hv-blue-dark)] opacity-60">
                SYS.REF: 3D-GLTF-LOD3
              </div>
              <div className="absolute top-4 right-4 text-[8px] font-mono text-[var(--hv-blue-dark)] opacity-60 flex gap-2">
                <span>AZIMUTH: 180°</span>
                <span>ELEV: 45°</span>
              </div>
              <div className="absolute bottom-4 left-4 text-[8px] font-mono text-[var(--hv-blue-dark)] opacity-60">
                SCALE: 1:250
              </div>
              <div className="absolute bottom-4 right-4 text-[8px] font-mono text-[var(--hv-blue-dark)] opacity-60">
                LIDAR POINT MESH
              </div>
              
              <div className="text-center relative z-10">
                <div
                  className="w-28 h-28 rounded-full border border-[var(--hv-blue)]/20 flex items-center justify-center mx-auto mb-6 relative"
                  aria-hidden="true"
                >
                  {/* Rotating technical rings */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-[var(--hv-blue)]/15 animate-spin" style={{ animationDuration: "25s" }} />
                  <div className="absolute inset-2 rounded-full border border-[var(--hv-gold)]/20 animate-spin" style={{ animationDuration: "12s", animationDirection: "reverse" }} />
                  
                  {/* X and Y coordinate lines */}
                  <div className="absolute left-0 right-0 h-[1px] bg-[var(--hv-blue)]/20" />
                  <div className="absolute top-0 bottom-0 w-[1px] bg-[var(--hv-blue)]/20" />
                  
                  {/* Outer wireframe diamond */}
                  <div className="w-14 h-14 border border-[var(--hv-blue)]/40 rotate-45 flex items-center justify-center bg-[var(--hv-bg-primary)]/40 backdrop-blur-[1px]">
                    <div className="w-8 h-8 border border-dashed border-[var(--hv-gold)]/40 rotate-45" />
                  </div>
                </div>
                <p className="font-display text-base font-semibold tracking-wider text-[var(--hv-text-primary)] mb-1">
                  Spatial Mesh Viewer
                </p>
                <p className="text-[10px] text-[var(--hv-text-secondary)] font-serif italic">
                  WebGL Blueprint Rendering
                </p>
                <div className="flex flex-wrap gap-1.5 justify-center mt-5">
                  {["OBJ_MESH", "360_SCAN", "LIDAR_POINT"].map((mode) => (
                    <span
                      key={mode}
                      className="px-2 py-0.5 rounded-none text-[8px] font-mono bg-[var(--hv-bg-primary)]/80 border border-[var(--hv-bg-border)] text-[var(--hv-text-secondary)]"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-none bg-[var(--hv-text-primary)] text-[var(--hv-bg-primary)] border border-[var(--hv-bg-border)] text-[8px] tracking-wider uppercase font-semibold">
              🏛 Spatial Record Ref: IN-3D
            </div>
          </div>

        </div>
      </Section>

      {/* ── CALL TO ACTION ───────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden border-t border-[var(--hv-bg-border)] bg-[var(--hv-bg-secondary)]" id="cta">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--hv-blue)] mb-4 block">
            Digital Collections
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-[var(--hv-text-primary)] mb-5">
            Start Exploring India's Heritage Archive
          </h2>
          <p className="text-[var(--hv-text-secondary)] font-serif italic text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            Walk through the corridors of history. Browse our curated digital catalog of monuments, interact with 3D structural models, and read expert commentary.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/explore">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={16} />}
                id="cta-explore-btn"
                className="text-xs tracking-widest uppercase font-semibold"
              >
                Explore Collection
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" id="cta-about-btn" className="text-xs tracking-widest uppercase font-semibold">
                Read Mission
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
