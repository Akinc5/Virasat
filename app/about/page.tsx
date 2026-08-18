import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/layout/PageWrapper";
import { Shield, Globe, Eye, Layers, Code, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About — HeritageVerse",
  description:
    "Learn about HeritageVerse's mission to digitally preserve India's cultural heritage through modern web, AR, and VR technology.",
};

const roadmapItems = [
  {
    phase: "Phase 1",
    title: "Web Platform",
    status: "current",
    description:
      "Rich, searchable heritage directory with detailed site pages, timelines, and image galleries.",
  },
  {
    phase: "Phase 2",
    title: "3D Viewer",
    status: "development",
    description:
      "Interactive Three.js / React Three Fiber viewer for GLTF/GLB models of heritage sites.",
  },
  {
    phase: "Phase 3",
    title: "AR Experience",
    status: "planned",
    description:
      "WebXR augmented reality — place heritage monuments in your physical environment.",
  },
  {
    phase: "Phase 4",
    title: "VR Tours",
    status: "planned",
    description:
      "Full virtual reality walkthroughs of heritage sites using WebXR Device API.",
  },
  {
    phase: "Phase 5",
    title: "Community",
    status: "planned",
    description:
      "User contributions, expert commentary, and collaborative heritage documentation.",
  },
];

const teamValues = [
  {
    icon: Shield,
    title: "Preservation First",
    description:
      "Every decision is guided by the imperative to protect and document India's heritage before it's too late.",
  },
  {
    icon: Globe,
    title: "Radical Accessibility",
    description:
      "Heritage belongs to all of humanity. We build for every device, every connection speed, every language.",
  },
  {
    icon: Code,
    title: "Open Architecture",
    description:
      "Built by developers for developers. Our codebase is designed to be extended, forked, and improved.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "We partner with archaeologists, historians, and local communities to ensure accuracy and cultural respect.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--hv-bg-secondary)] to-[var(--hv-bg-primary)] border-b border-[var(--hv-bg-border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-4">
            Our Mission
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-[var(--hv-text-primary)] leading-tight mb-6">
            Preserving India's Past{" "}
            <span className="text-gold-gradient">for Tomorrow</span>
          </h1>
          <p className="text-[var(--hv-text-secondary)] text-lg leading-relaxed max-w-3xl mx-auto font-serif">
            HeritageVerse is a digital platform dedicated to documenting,
            preserving, and making accessible India's extraordinary cultural
            heritage through modern web technology, augmented reality, and
            virtual reality.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
              The Problem
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--hv-text-primary)] mb-5">
              Heritage at Risk
            </h2>
            <div className="space-y-4 text-[var(--hv-text-secondary)] leading-relaxed">
              <p>
                India is home to over 3,500 centrally protected monuments, 32 UNESCO World Heritage Sites,
                and countless local heritage structures — many of which face serious threats from climate change,
                urban encroachment, and inadequate preservation resources.
              </p>
              <p>
                Millions of people never get to visit these sites due to geographical distance, physical
                limitations, or financial constraints. The stories these places hold risk being lost to future
                generations.
              </p>
              <p>
                Digital preservation creates a permanent, accessible record — and makes it available to everyone
                with a smartphone or browser.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "3,500+", label: "Protected Monuments" },
              { value: "32", label: "UNESCO Sites in India" },
              { value: "5,000+", label: "Years of Documented History" },
              { value: "1.4B", label: "People Deserve Access" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-5 rounded-2xl bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] text-center"
              >
                <p className="font-display text-3xl font-black text-amber-400 mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--hv-text-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section elevated>
        <SectionHeader
          eyebrow="Our Values"
          title="How We Work"
          subtitle="HeritageVerse is built on four core principles that guide every product decision."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {teamValues.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-6 rounded-2xl bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)]"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 text-amber-500">
                <Icon size={20} />
              </div>
              <h3 className="font-display font-semibold text-[var(--hv-text-primary)] mb-2">
                {title}
              </h3>
              <p className="text-sm text-[var(--hv-text-secondary)] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* AR/VR Roadmap */}
      <Section>
        <SectionHeader
          eyebrow="Technology Roadmap"
          title="The AR & VR Vision"
          subtitle="We're building towards a future where anyone can walk through India's ancient wonders from anywhere on Earth."
          centered={false}
        />

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-amber-600 via-amber-600/30 to-transparent hidden sm:block" />

          <div className="space-y-6">
            {roadmapItems.map((item) => (
              <div key={item.phase} className="relative flex gap-6">
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0 hidden sm:block">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold font-display ${
                      item.status === "current"
                        ? "border-amber-500 bg-amber-500 text-[var(--hv-brown)]"
                        : item.status === "development"
                        ? "border-amber-500/60 bg-amber-500/20 text-amber-400"
                        : "border-[var(--hv-bg-border)] bg-[var(--hv-bg-elevated)] text-[var(--hv-text-muted)]"
                    }`}
                  >
                    {item.phase.split(" ")[1]}
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 p-5 rounded-2xl bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)]">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-xs font-mono text-amber-500/70">
                      {item.phase}
                    </span>
                    <h3 className="font-display font-semibold text-[var(--hv-text-primary)]">
                      {item.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${
                        item.status === "current"
                          ? "bg-green-500/10 border-green-500/20 text-green-400"
                          : item.status === "development"
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          : "bg-[var(--hv-bg-elevated)] border-[var(--hv-bg-border)] text-[var(--hv-text-muted)]"
                      }`}
                    >
                      {item.status === "current"
                        ? "Live"
                        : item.status === "development"
                        ? "In Development"
                        : "Planned"}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--hv-text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section elevated>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--hv-text-primary)] mb-4">
            Join the Preservation Mission
          </h2>
          <p className="text-[var(--hv-text-secondary)] mb-7 leading-relaxed">
            Whether you're a developer, historian, photographer, or simply someone who loves India's culture —
            there's a place for you in the HeritageVerse community.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/explore">
              <Button variant="gold" rightIcon={<ArrowRight size={16} />} id="about-explore-btn">
                Start Exploring
              </Button>
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" id="about-github-btn">
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
