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
    <div>
      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="Hero section"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Taj Mahal at dawn — India's most iconic heritage site"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--hv-bg-primary)]/70 via-[var(--hv-bg-primary)]/50 to-[var(--hv-bg-primary)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--hv-bg-primary)]/80 to-transparent" />
        </div>

        {/* Particle-like decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-amber-400 opacity-40 animate-pulse"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Preserving 5,000 Years of Indian Heritage
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6">
              Explore India's{" "}
              <span className="text-gold-gradient block">
                Cultural Legacy
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10 font-serif">
              Step inside ancient temples, wander through forgotten empires, and
              experience India's most iconic heritage sites through immersive
              digital, AR, and VR experiences.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/explore">
                <Button
                  variant="gold"
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                  id="hero-explore-btn"
                >
                  Explore Heritage Sites
                </Button>
              </Link>
              <Link href="/experience/taj-mahal">
                <Button variant="outline" size="lg" id="hero-experience-btn">
                  Try 3D Experience
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-16">
              {[
                { value: `${allSites.length}+`, label: "Heritage Sites" },
                { value: "5", label: "UNESCO Sites" },
                { value: "3D", label: "Experiences" },
                { value: "3500+", label: "Years of History" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-3xl font-bold text-amber-400">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce"
          aria-hidden="true"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ── FEATURED SITES ───────────────────────────────────── */}
      <Section elevated id="featured-sites">
        <SectionHeader
          eyebrow="Featured Destinations"
          title="Iconic Heritage Sites"
          subtitle="Begin your journey through India's most celebrated cultural treasures — from the heights of Mughal grandeur to the depths of ancient rock-cut caves."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {featured.map((site) => (
            <HeritageCard key={site.id} site={site} variant="featured" />
          ))}
        </div>
        <div className="text-center">
          <Link href="/explore">
            <Button
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight size={16} />}
              id="featured-view-all-btn"
            >
              View All {allSites.length} Heritage Sites
            </Button>
          </Link>
        </div>
      </Section>

      {/* ── WHY DIGITAL PRESERVATION ─────────────────────────── */}
      <Section id="why-preserve">
        <SectionHeader
          eyebrow="Our Mission"
          title="Why Digital Preservation Matters"
          subtitle="India's heritage is at risk. We are building the technology to protect, document, and share it with the world — forever."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {whyPreserve.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group p-6 rounded-2xl bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] hover:border-amber-600/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-500 group-hover:bg-amber-500/20 transition-colors">
                <Icon size={22} />
              </div>
              <h3 className="font-display font-semibold text-lg text-[var(--hv-text-primary)] mb-2">
                {title}
              </h3>
              <p className="text-sm text-[var(--hv-text-secondary)] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 3D EXPERIENCE PREVIEW ────────────────────────────── */}
      <Section elevated id="3d-preview">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
              Immersive Technology
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--hv-text-primary)] leading-tight mb-5">
              Experience Heritage in{" "}
              <span className="text-gold-gradient">3D, AR & VR</span>
            </h2>
            <p className="text-[var(--hv-text-secondary)] leading-relaxed mb-6">
              Our platform is built for the future of cultural exploration. Walk
              through ancient temples in Virtual Reality, place monuments in
              your living room with Augmented Reality, and explore intricate
              architecture in full 3D — all from any device.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Interactive 3D model viewer for every heritage site",
                "AR mode — see monuments in your physical space",
                "VR tours with WebXR for full immersion",
                "Guided audio narration for each experience",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--hv-text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/experience/taj-mahal">
              <Button variant="gold" size="lg" id="3d-preview-cta-btn">
                Try 3D Experience — Taj Mahal
              </Button>
            </Link>
          </div>

          {/* 3D viewer preview card */}
          <div className="relative">
            <div className="rounded-2xl bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] overflow-hidden aspect-square flex items-center justify-center">
              <div className="text-center p-8">
                <div
                  className="w-32 h-32 rounded-full border-2 border-amber-500/30 flex items-center justify-center mx-auto mb-6"
                  aria-hidden="true"
                >
                  <div
                    className="w-20 h-20 rounded-full border-2 border-amber-500/50 animate-spin"
                    style={{ animationDuration: "8s" }}
                  >
                    <div className="w-full h-full rounded-full bg-amber-500/10" />
                  </div>
                </div>
                <p className="font-display text-2xl font-bold text-[var(--hv-text-primary)] mb-2">
                  3D Viewer
                </p>
                <p className="text-sm text-[var(--hv-text-muted)]">
                  Interactive heritage exploration
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  {["3D", "AR", "VR"].map((mode) => (
                    <span
                      key={mode}
                      className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-xl glass-card border border-amber-500/20 text-xs font-medium text-amber-400">
              🚀 AR & VR Coming Soon
            </div>
          </div>
        </div>
      </Section>

      {/* ── CALL TO ACTION ───────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden" id="cta">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-800/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[var(--hv-text-primary)] mb-5">
            Start Exploring India's Heritage
          </h2>
          <p className="text-[var(--hv-text-secondary)] text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Thousands of years of history, architecture, and culture — all in
            one place. Browse all heritage sites, launch 3D experiences, and
            dive deep into India's incredible story.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/explore">
              <Button
                variant="gold"
                size="lg"
                rightIcon={<ArrowRight size={18} />}
                id="cta-explore-btn"
              >
                Explore All Sites
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="secondary" size="lg" id="cta-about-btn">
                Learn About Our Mission
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
