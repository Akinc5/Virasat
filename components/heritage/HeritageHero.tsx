"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Calendar, 
  Award, 
  Box, 
  Sparkles, 
  X, 
  Compass, 
  Info, 
  ArrowRight,
  Eye,
  EyeOff
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { HeritageSite } from "@/types";

interface HeroHotspot {
  id: string;
  title: string;
  category: string;
  xPercent: number; // percentage from left
  yPercent: number; // percentage from top
  description: string;
  secret: string;
}

const HERITAGE_HERO_HOTSPOTS: Record<string, HeroHotspot[]> = {
  "taj-mahal": [
    {
      id: "dome",
      title: "Main Marble Dome (Amrud)",
      category: "Architectural Marvel",
      xPercent: 50,
      yPercent: 25,
      description: "A 73-meter double dome of pure Makrana white marble, capped with an Islamic crescent and Hindu lotus finial.",
      secret: "Engineered as an inner dome for human acoustic scale and an outer dome for imposing monumental proportion.",
    },
    {
      id: "left-minaret",
      title: "Western Minaret (Seismic Angle)",
      category: "Engineering Defense",
      xPercent: 34,
      yPercent: 36,
      description: "One of four 40-meter towers framing the central tomb with perfect bilateral symmetry.",
      secret: "Deliberately angled 2° to 3° outward so an earthquake will cause them to collapse away from the central mausoleum.",
    },
    {
      id: "right-minaret",
      title: "Eastern Minaret",
      category: "Bilateral Symmetry",
      xPercent: 66,
      yPercent: 36,
      description: "Three-tiered minaret divided by balconies that frames the mausoleum on the Yamuna riverbank.",
      secret: "The entire monument is erected on deep timber-and-masonry wells sunk into the riverbank to keep the foundation moist and stable.",
    },
    {
      id: "pool",
      title: "Charbagh Mirror Pool (Al-Kawthar)",
      category: "Sacred Geometry",
      xPercent: 50,
      yPercent: 64,
      description: "Central lotus pond fed by water channels, representing the four rivers of Paradise.",
      secret: "Mathematically positioned at the exact midpoint to cast an undistorted mirror reflection of the Taj upon still water.",
    },
    {
      id: "mosque",
      title: "Kau Ban Mosque (Red Sandstone)",
      category: "Mughal Architecture",
      xPercent: 17,
      yPercent: 44,
      description: "Red sandstone mosque facing Mecca (west), balanced on the eastern side by an identical guest hall (Jawab).",
      secret: "The contrasting red sandstone accentuates the ethereal, floating whiteness of the central marble tomb.",
    },
  ],

  "konark-sun-temple": [
    {
      id: "wheel",
      title: "24 Astronomical Sundial Wheels",
      category: "Astronomical Engineering",
      xPercent: 48,
      yPercent: 58,
      description: "10-foot stone wheels carved with spokes that cast shadows to read exact solar time down to minutes.",
      secret: "Calculates solar hours, quarters, and minutes accurate to within 60 seconds even today.",
    },
    {
      id: "spire",
      title: "Jagamohana (Assembly Hall)",
      category: "Kalinga Architecture",
      xPercent: 54,
      yPercent: 32,
      description: "Surviving 38-meter tiered pyramidal sanctuary built from ferruginous sandstone blocks.",
      secret: "Filled with sand by British engineers in 1903 to preserve the massive ceiling from falling inward.",
    },
  ],

  "hampi": [
    {
      id: "chariot",
      title: "The Garuda Stone Chariot",
      category: "Monolithic Shrine",
      xPercent: 50,
      yPercent: 48,
      description: "Iconic shrine dedicated to Garuda, constructed from modular carved granite blocks with concealed joints.",
      secret: "The carved granite wheels originally rotated freely around stone axles until pinned for conservation.",
    },
    {
      id: "pillars",
      title: "56 Musical Cluster Pillars",
      category: "Acoustic Engineering",
      xPercent: 28,
      yPercent: 42,
      description: "Slender granite columns tuned to resonate with musical notes of Indian classical instruments.",
      secret: "British colonizers cut open two pillars expecting hollow bells, but found only homogenous solid rock.",
    },
  ],

  "ajanta-caves": [
    {
      id: "facade",
      title: "Chaitya Cave 26 Horseshoe Façade",
      category: "Rock-Cut Buddhist Art",
      xPercent: 48,
      yPercent: 38,
      description: "Carved into the crescent basalt cliff above the Waghora river, dating to the 5th century CE.",
      secret: "The interior houses a 7-meter reclining Buddha whose facial expression transforms with vantage angle.",
    },
  ],

  "ellora-caves": [
    {
      id: "kailasa",
      title: "Kailasa Monolithic Temple (Cave 16)",
      category: "Megastructure",
      xPercent: 50,
      yPercent: 42,
      description: "The world's largest monolithic structure, chiseled top-to-bottom from a single volcanic basalt cliff.",
      secret: "Over 200,000 tons of rock were manually excavated with zero room for architectural correction.",
    },
  ],
};

interface HeritageHeroProps {
  site: HeritageSite;
}

export function HeritageHero({ site }: HeritageHeroProps) {
  const hotspots = HERITAGE_HERO_HOTSPOTS[site.slug] || [];
  const [activeHotspot, setActiveHotspot] = useState<HeroHotspot | null>(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  // Close active popup on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveHotspot(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[85vh] flex items-end overflow-hidden" 
      aria-label={`${site.name} hero`}
    >
      {/* ── BACKGROUND IMAGE & INTERACTIVE HOTSPOT LAYER ── */}
      <div className="absolute inset-0 select-none">
        <Image
          src={site.heroImage}
          alt={site.name}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--hv-bg-primary)] via-[var(--hv-bg-primary)]/45 to-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--hv-bg-primary)]/65 via-transparent to-transparent pointer-events-none" />

        {/* ── INTERACTIVE POINTS ON THE HERO IMAGE ── */}
        {showHotspots && hotspots.map((spot) => (
          <div
            key={spot.id}
            className="absolute z-20 group"
            style={{ 
              top: `${spot.yPercent}%`, 
              left: `${spot.xPercent}%`, 
              transform: "translate(-50%, -50%)" 
            }}
          >
            <button
              type="button"
              onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
              className="relative flex items-center justify-center w-8 h-8 focus:outline-none cursor-pointer group-hover:scale-125 transition-transform"
              aria-label={`Inspect landmark: ${spot.title}`}
            >
              {/* Radar beacon glow */}
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
              
              {/* Solid center dot with gold ring */}
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 border-2 border-white shadow-lg shadow-black/50" />
            </button>

            {/* Hover Tooltip Label */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden md:group-hover:flex flex-col items-center pointer-events-none z-30 transition-opacity">
              <span className="px-2.5 py-1 bg-stone-950/90 text-amber-200 text-[11px] font-medium tracking-wide rounded border border-amber-500/30 whitespace-nowrap shadow-xl">
                {spot.title}
              </span>
              <span className="w-1.5 h-1.5 bg-stone-950 rotate-45 -mt-0.5 border-r border-b border-amber-500/30" />
            </div>
          </div>
        ))}

        {/* ── EXPLANATORY POP-UP CARD ON THE HERO IMAGE ── */}
        {activeHotspot && (
          <div 
            className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:top-28 md:right-10 w-[92%] sm:w-96 bg-stone-950/95 backdrop-blur-md border border-amber-500/40 text-white rounded-lg p-5 shadow-2xl animate-fade-in-up"
            role="dialog"
            aria-label={activeHotspot.title}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2.5 mb-3">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-400/30 block w-fit mb-1">
                  {activeHotspot.category}
                </span>
                <h4 className="font-display text-base font-semibold text-white tracking-wide">
                  {activeHotspot.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveHotspot(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed mb-3">
              {activeHotspot.description}
            </p>

            <div className="p-3 rounded bg-amber-950/30 border border-amber-500/20 mb-4">
              <p className="text-[10px] font-mono text-amber-400 font-semibold uppercase flex items-center gap-1 mb-0.5">
                <Sparkles size={11} />
                Architectural Secret
              </p>
              <p className="text-[11px] text-amber-100/90 leading-snug italic">
                "{activeHotspot.secret}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <Link
                href={`/experience/${site.slug}`}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1.5 transition-colors"
              >
                <Box size={13} />
                <span>Explore in 3D</span>
                <ArrowRight size={12} />
              </Link>

              <button
                type="button"
                onClick={() => setActiveHotspot(null)}
                className="text-xs text-stone-400 hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── TOP RIGHT: INTERACTIVE POINTS TOGGLE BADGE ── */}
      {hotspots.length > 0 && (
        <div className="absolute top-20 right-4 sm:right-8 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setShowHotspots(!showHotspots);
              if (showHotspots) setActiveHotspot(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-amber-500/30 text-xs text-amber-200 hover:bg-stone-900 transition-all shadow-md cursor-pointer"
          >
            {showHotspots ? <Eye size={13} /> : <EyeOff size={13} />}
            <span>{showHotspots ? `${hotspots.length} Landmark Points Active` : "Show Points"}</span>
          </button>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-[var(--hv-text-muted)]">
            <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/explore" className="hover:text-amber-400 transition-colors">Explore</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-amber-400" aria-current="page">{site.name}</li>
          </ol>
        </nav>

        <div className="max-w-3xl animate-fade-in-up">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge label={site.category} variant="category" />
            {site.unescoStatus === "World Heritage Site" && (
              <Badge label="UNESCO World Heritage Site" variant="unesco" />
            )}
            <Badge label={site.architecturalStyle} variant="period" />
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-sm">
            {site.name}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap gap-5 text-sm text-white/80 mb-6 drop-shadow-sm">
            <div className="flex items-center gap-1.5">
              <MapPin size={15} className="text-amber-400" />
              <span>{site.city}, {site.state}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={15} className="text-amber-400" />
              <span>{site.historicalPeriod}</span>
            </div>
            {site.yearBuilt && (
              <div className="flex items-center gap-1.5">
                <Award size={15} className="text-amber-400" />
                <span>Built {site.yearBuilt > 0 ? `${site.yearBuilt} CE` : `${Math.abs(site.yearBuilt)} BCE`}</span>
              </div>
            )}
          </div>

          {/* Short description */}
          <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-2xl font-serif drop-shadow-sm">
            {site.shortDescription}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link href={`/experience/${site.slug}`}>
              <Button 
                variant="gold" 
                size="lg" 
                leftIcon={<Box size={16} />}
                className="bg-amber-600 hover:bg-amber-500 text-white border-0 shadow-lg"
              >
                Launch 3D Experience
              </Button>
            </Link>

            {hotspots.length > 0 && (
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  setShowHotspots(true);
                  setActiveHotspot(hotspots[0]);
                }}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Inspect Landmark Points
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
