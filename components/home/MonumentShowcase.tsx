"use client";

// ============================================================
// MonumentShowcase — live, rotating 3D model on the home page
// with a switcher across every monument that has a 3D model.
// The model only loads once the section scrolls into view, so
// the home page stays fast for visitors who never reach it.
// ============================================================

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Layers, MapPin, Smartphone } from "lucide-react";
import { ModelViewer } from "@/components/experience/ModelViewer";
import { cn } from "@/lib/utils";

export interface ShowcaseMonument {
  slug: string;
  name: string;
  place: string;
  shortDescription: string;
  modelUrl: string;
  displayScale: number;
  orbit?: string;
  credit: string;
  tourStops: number;
  modelCount: number;
  period: string;
}

export function MonumentShowcase({ monuments }: { monuments: ShowcaseMonument[] }) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (monuments.length === 0) return null;
  const m = monuments[active];

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
      <div className="lg:col-span-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--hv-blue)] mb-3">
          Now in 3D &amp; AR
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-medium text-[var(--hv-text-primary)] leading-tight mb-4">
          Hold a monument in your hands
        </h2>
        <p className="text-sm text-[var(--hv-text-secondary)] font-serif italic leading-relaxed mb-6">
          Detailed models and photogrammetry scans, prepared in Blender for the web. Drag to turn one, pinch to
          zoom, take a guided tour, or place it on your table in augmented reality.
        </p>

        <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Choose a monument">
          {monuments.map((mon, i) => (
            <button
              key={mon.slug}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-medium border transition-all",
                i === active
                  ? "bg-[var(--hv-text-primary)] text-[var(--hv-bg-primary)] border-transparent"
                  : "border-[var(--hv-bg-border)] text-[var(--hv-text-secondary)] hover:border-[var(--hv-gold)]"
              )}
            >
              {mon.name}
            </button>
          ))}
        </div>

        <div key={m.slug} className="hv-story-in">
          <p className="flex items-center gap-1.5 text-xs text-[var(--hv-text-muted)] mb-2">
            <MapPin size={12} /> {m.place} · {m.period}
          </p>
          <p className="text-sm text-[var(--hv-text-secondary)] leading-relaxed mb-5">{m.shortDescription}</p>
          <div className="grid grid-cols-2 gap-3 mb-7">
            {m.tourStops > 0 ? (
              <div className="rounded-xl border border-[var(--hv-border-gold)] bg-[var(--hv-bg-card)] p-3">
                <Compass size={16} className="text-[var(--hv-gold-muted)] mb-1.5" />
                <p className="text-sm font-semibold text-[var(--hv-text-primary)]">{m.tourStops} tour stops</p>
                <p className="text-[11px] text-[var(--hv-text-muted)]">Stories pinned to the model</p>
              </div>
            ) : (
              <div className="rounded-xl border border-[var(--hv-border-gold)] bg-[var(--hv-bg-card)] p-3">
                <Layers size={16} className="text-[var(--hv-gold-muted)] mb-1.5" />
                <p className="text-sm font-semibold text-[var(--hv-text-primary)]">
                  {m.modelCount} {m.modelCount === 1 ? "model" : "models"}
                </p>
                <p className="text-[11px] text-[var(--hv-text-muted)]">Switch views in the viewer</p>
              </div>
            )}
            <div className="rounded-xl border border-[var(--hv-border-gold)] bg-[var(--hv-bg-card)] p-3">
              <Smartphone size={16} className="text-[var(--hv-gold-muted)] mb-1.5" />
              <p className="text-sm font-semibold text-[var(--hv-text-primary)]">AR ready</p>
              <p className="text-[11px] text-[var(--hv-text-muted)]">Tabletop size on your phone</p>
            </div>
          </div>
          <Link
            href={`/experience/${m.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--hv-text-primary)] text-[var(--hv-bg-primary)] text-xs tracking-widest uppercase font-semibold hover:bg-[var(--hv-blue-dark)] transition-colors"
          >
            {m.tourStops > 0 ? "Take the guided tour" : "Explore in 3D"} <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="lg:col-span-3 relative">
        <div className="absolute -inset-3 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.18),transparent_70%)] pointer-events-none" />
        {inView ? (
          <ModelViewer
            key={m.slug}
            src={m.modelUrl}
            title={m.name}
            scale={m.displayScale}
            orbit={m.orbit}
            credit={m.credit}
            className="relative h-[480px] rounded-[1.5rem] shadow-xl"
          />
        ) : (
          <div className="relative h-[480px] rounded-[1.5rem] border border-[var(--hv-bg-border)] bg-[var(--hv-bg-secondary)]" />
        )}
      </div>
    </div>
  );
}
