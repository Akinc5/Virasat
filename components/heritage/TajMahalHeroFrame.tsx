"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Box, 
  Info, 
  Sparkles, 
  X, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Compass,
  MapPin,
  Calendar,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HotspotHint {
  id: string;
  label: string;
  xPercent: number;
  yPercent: number;
  description: string;
}

const HERO_HOTSPOTS: HotspotHint[] = [
  {
    id: "dome",
    label: "Main Onion Dome",
    xPercent: 50,
    yPercent: 28,
    description: "73m towering double-dome of pure Makrana white marble.",
  },
  {
    id: "minaret",
    label: "Outward-Leaning Minaret",
    xPercent: 82,
    yPercent: 44,
    description: "Intentionally tilted 2° outward to protect the central tomb.",
  },
  {
    id: "pool",
    label: "Charbagh Reflection Pool",
    xPercent: 50,
    yPercent: 82,
    description: "Mirror pool aligned to reflect the monument on still waters.",
  },
];

export function TajMahalHeroFrame() {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<HotspotHint | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowDetailsModal(false);
        setActiveHotspot(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div 
        ref={containerRef}
        className="w-full max-w-sm bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] p-4 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setActiveHotspot(null);
        }}
        onClick={() => setIsHovered(true)}
      >
        {/* Arched Picture Frame */}
        <div className="aspect-[4/5] relative arch-frame p-2 bg-[var(--hv-bg-secondary)] overflow-hidden">
          <div className="arch-image-mask w-full h-full relative">
            <Image
              src="/images/hero-bg.jpg"
              alt="Taj Mahal at dawn — Indian architectural heritage"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
            />

            {/* Subtle Gradient Shade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300" />

            {/* Interactive Image Hotspots */}
            {HERO_HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                type="button"
                aria-label={`Hotspot: ${spot.label}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(activeHotspot?.id === spot.id ? null : spot);
                }}
                className="absolute z-20 group/spot focus:outline-none"
                style={{ top: `${spot.yPercent}%`, left: `${spot.xPercent}%`, transform: "translate(-50%, -50%)" }}
              >
                <span className="relative flex items-center justify-center w-6 h-6">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400 border border-white shadow-sm" />
                </span>

                {/* Hotspot Tooltip */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover/spot:block z-30 px-2.5 py-1 bg-black/90 text-[10px] text-amber-200 rounded whitespace-nowrap border border-amber-400/30 shadow-lg pointer-events-none">
                  {spot.label}
                </span>
              </button>
            ))}

            {/* Hotspot Info Bubble if clicked */}
            {activeHotspot && (
              <div 
                className="absolute z-30 bottom-24 inset-x-3 p-3 bg-stone-900/95 border border-amber-500/40 rounded text-left shadow-2xl backdrop-blur-md animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1">
                    <Sparkles size={11} />
                    {activeHotspot.label}
                  </span>
                  <button 
                    onClick={() => setActiveHotspot(null)} 
                    className="text-stone-400 hover:text-white"
                    aria-label="Dismiss hotspot hint"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p className="text-[11px] text-stone-200 leading-snug">
                  {activeHotspot.description}
                </p>
              </div>
            )}

            {/* Permanent visual badge: Hover indicator */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Hover for 3D & Facts</span>
            </div>

            {/* ── THE HOVER POP-UP CARD ── */}
            <div 
              className={`absolute inset-x-2 bottom-2 z-20 p-4 rounded-sm bg-stone-950/90 backdrop-blur-md border border-amber-500/30 text-white shadow-2xl transition-all duration-300 ease-out transform ${
                isHovered 
                  ? "opacity-100 translate-y-0 pointer-events-auto" 
                  : "opacity-0 translate-y-4 pointer-events-none sm:opacity-0"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-amber-400 font-semibold">
                  UNESCO #252 • AGRA
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 font-medium">
                  <Box size={10} />
                  3D Available
                </span>
              </div>

              <h4 className="font-display text-sm font-semibold text-white tracking-wide mb-1">
                Taj Mahal
              </h4>
              <p className="text-[11px] text-stone-300 line-clamp-2 leading-relaxed mb-3">
                Experience the 73m white marble mausoleum in interactive 3D, or inspect its architectural secrets.
              </p>

              {/* Action Buttons inside the Pop-up */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
                <Link 
                  href="/experience/taj-mahal" 
                  className="w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full text-[10px] tracking-wider uppercase font-semibold py-1.5 h-auto flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white border-0 shadow-md"
                  >
                    <Box size={12} />
                    Explore 3D
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetailsModal(true);
                  }}
                  className="w-full text-[10px] tracking-wider uppercase font-semibold py-1.5 h-auto flex items-center justify-center gap-1.5 border-stone-600 hover:border-amber-400 text-stone-200 hover:text-white"
                >
                  <Info size={12} />
                  Details
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* Archival Bottom Plate Inscription */}
        <div className="mt-3.5 text-center border-t border-[var(--hv-bg-border)] pt-2.5 flex items-center justify-between px-1">
          <span className="text-[8px] font-mono text-[var(--hv-text-secondary)] uppercase tracking-[0.25em]">
            PLATE I. TAJ MAHAL MAUSOLEUM
          </span>
          <span className="text-[9px] text-[var(--hv-gold)] font-medium flex items-center gap-1">
            <Sparkles size={10} />
            Interactive
          </span>
        </div>
      </div>

      {/* ── MONUMENT DETAILS POP-UP MODAL ── */}
      {showDetailsModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowDetailsModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="taj-modal-title"
        >
          <div 
            className="relative w-full max-w-2xl bg-[var(--hv-bg-card)] border border-[var(--hv-gold)]/40 shadow-2xl rounded-sm p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[var(--hv-bg-border)] pb-4 mb-5">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] font-semibold text-[var(--hv-gold)] uppercase mb-1">
                  <ShieldCheck size={12} />
                  UNESCO World Heritage Profile
                </div>
                <h3 id="taj-modal-title" className="font-display text-2xl sm:text-3xl font-medium text-[var(--hv-text-primary)]">
                  Taj Mahal — The Crown of Palaces
                </h3>
                <p className="text-xs text-[var(--hv-text-secondary)] mt-0.5 flex items-center gap-3">
                  <span className="flex items-center gap-1"><MapPin size={11} /> Agra, Uttar Pradesh</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar size={11} /> Commissioned 1632 CE</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Layers size={11} /> Mughal Architecture</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="w-8 h-8 rounded-full border border-[var(--hv-bg-border)] hover:border-[var(--hv-gold)] flex items-center justify-center text-[var(--hv-text-muted)] hover:text-[var(--hv-text-primary)] transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)] rounded-sm mb-6">
              <div>
                <p className="text-[10px] uppercase font-mono text-[var(--hv-text-muted)]">Dome Height</p>
                <p className="font-display text-base font-semibold text-[var(--hv-gold)]">73 Metres</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-mono text-[var(--hv-text-muted)]">Construction</p>
                <p className="font-display text-base font-semibold text-[var(--hv-gold)]">1632 – 1648</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-mono text-[var(--hv-text-muted)]">Artisans</p>
                <p className="font-display text-base font-semibold text-[var(--hv-gold)]">20,000+</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-mono text-[var(--hv-text-muted)]">UNESCO Inscribed</p>
                <p className="font-display text-base font-semibold text-[var(--hv-gold)]">1983</p>
              </div>
            </div>

            {/* Architectural & Historical Breakdown */}
            <div className="space-y-4 text-xs sm:text-sm text-[var(--hv-text-secondary)] leading-relaxed mb-8">
              <div className="p-3.5 rounded bg-[var(--hv-bg-primary)] border border-[var(--hv-bg-border)]">
                <h5 className="font-display text-xs font-semibold text-[var(--hv-text-primary)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Compass size={13} className="text-[var(--hv-gold)]" />
                  Bilateral Symmetry & Optical Illusions
                </h5>
                <p>
                  Every element of the Taj complex — from the red sandstone mosque and jawab flanking the tomb to the Charbagh water canals — is designed with strict bilateral symmetry along a central north-south axis. The four minarets stand 40 meters tall and were purposefully angled slightly outward so that in an earthquake, they would fall away from the mausoleum rather than into the dome.
                </p>
              </div>

              <div className="p-3.5 rounded bg-[var(--hv-bg-primary)] border border-[var(--hv-bg-border)]">
                <h5 className="font-display text-xs font-semibold text-[var(--hv-text-primary)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[var(--hv-gold)]" />
                  Pietra Dura (Parchin Kari) Gemstone Inlay
                </h5>
                <p>
                  The translucent white Makrana marble is inlaid with 28 varieties of precious and semi-precious stones: lapis lazuli from Afghanistan, turquoise from Tibet, jade from China, and carnelian from Arabia. Under moonlight, the marble subtly glows with warm phosphorescence.
                </p>
              </div>

              <div className="p-3.5 rounded bg-[var(--hv-bg-primary)] border border-[var(--hv-bg-border)]">
                <h5 className="font-display text-xs font-semibold text-[var(--hv-text-primary)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Layers size={13} className="text-[var(--hv-gold)]" />
                  The Architect & The Vision
                </h5>
                <p>
                  Commissioned by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, the architectural board was led by master court architect Ustad Ahmad Lahauri. The monument stands today as the pinnacle of Mughal craftsmanship.
                </p>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[var(--hv-bg-border)]">
              <Link 
                href="/heritage/taj-mahal" 
                className="text-xs text-[var(--hv-text-muted)] hover:text-[var(--hv-gold)] transition-colors flex items-center gap-1.5"
                onClick={() => setShowDetailsModal(false)}
              >
                <span>Read Full Catalog Archive</span>
                <ArrowRight size={13} />
              </Link>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetailsModal(false)}
                  className="text-xs"
                >
                  Close
                </Button>

                <Link href="/experience/taj-mahal" onClick={() => setShowDetailsModal(false)}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-xs tracking-wider uppercase font-semibold flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white"
                  >
                    <Box size={14} />
                    Explore in 3D
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
