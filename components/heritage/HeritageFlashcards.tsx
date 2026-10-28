"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Box, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Sparkles, 
  LayoutGrid, 
  Layers,
  ArrowRight,
  MapPin,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { HeritageSite } from "@/types";
import { HERITAGE_BOOKS } from "@/data/heritage-books";

interface HeritageFlashcardsProps {
  sites: HeritageSite[];
}

interface SiteFlashcardData {
  didYouKnow: string;
  architecturalSecret: string;
  highlightFact: string;
  builderOrDynasty: string;
}

const FLASHCARD_EXTRA_DATA: Record<string, SiteFlashcardData> = {
  "taj-mahal": {
    didYouKnow: "The calligraphy running up the archways is optically enlarged near the top so it appears perfectly uniform to a viewer on the ground.",
    architecturalSecret: "The 40-meter corner minarets lean outward by 2° to 3° so that in an earthquake, they will fall away from the mausoleum.",
    highlightFact: "28 different types of semi-precious stones were inlaid into the white Makrana marble using the intricate Parchin Kari technique.",
    builderOrDynasty: "Mughal Emperor Shah Jahan (Arch: Ustad Ahmad Lahauri)",
  },
  "hampi": {
    didYouKnow: "The 56 cluster pillars in Vittala Temple emit distinct musical notes matching Indian instruments when tapped gently.",
    architecturalSecret: "The world-famous Stone Chariot is actually a shrine to Garuda, built from carved granite blocks with disguised interlocking joints.",
    highlightFact: "In the 15th century, Vijayanagara was the second-largest city in the medieval world after Beijing, housing over 500,000 people.",
    builderOrDynasty: "Vijayanagara Empire (Sangama & Tuluva Dynasties)",
  },
  "konark-sun-temple": {
    didYouKnow: "The 24 colossal chariot wheels function as precise sundials, capable of calculating exact solar time down to within 60 seconds.",
    architecturalSecret: "Legend says a heavy 52-ton lodestone magnet was once mounted atop the spire, causing passing European ships to run aground.",
    highlightFact: "Designed as a celestial chariot with 12 pairs of wheels pulled by 7 galloping horses, symbolizing the days of the week.",
    builderOrDynasty: "Eastern Ganga King Narasimhadeva I (1250 CE)",
  },
  "ajanta-caves": {
    didYouKnow: "The 30 caves were hidden under dense jungle overgrowth for over a millennium until rediscovered accidentally by a British tiger-hunting party in 1819.",
    architecturalSecret: "Cave 26 houses a 7-meter reclining Buddha whose facial expression shifts from grieving to transcendent serenity depending on your viewpoint.",
    highlightFact: "The vibrant fresco murals were painted using ground minerals, lapis lazuli, and plant resins applied over a clay-and-cow-dung plaster base.",
    builderOrDynasty: "Satavahana & Vakataka Dynasties (2nd BCE – 5th CE)",
  },
  "ellora-caves": {
    didYouKnow: "Kailasa Temple (Cave 16) is the largest monolithic rock excavation on Earth, carved top-to-bottom from a single volcanic basalt cliff.",
    architecturalSecret: "Over 200,000 tons of rock were manually chiseled away with zero room for error—once carved, a mistake could never be patched.",
    highlightFact: "Features 34 monumental caves carved side-by-side representing Buddhist, Hindu, and Jain faiths in peaceful coexistence.",
    builderOrDynasty: "Rashtrakuta King Krishna I (757–783 CE)",
  },
};

export function HeritageFlashcards({ sites }: HeritageFlashcardsProps) {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"deck" | "grid">("deck");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredSites = useMemo(() => {
    if (selectedFilter === "all") return sites;
    if (selectedFilter === "unesco") return sites.filter(s => s.unescoStatus === "World Heritage Site");
    if (selectedFilter === "caves") return sites.filter(s => s.category.toLowerCase().includes("cave"));
    if (selectedFilter === "monuments") return sites.filter(s => !s.category.toLowerCase().includes("cave"));
    return sites;
  }, [sites, selectedFilter]);

  // Handle Flipping
  const toggleFlip = (siteId: string) => {
    setFlippedCards(prev => ({ ...prev, [siteId]: !prev[siteId] }));
  };

  const handleNext = () => {
    setActiveDeckIndex((prev) => (prev + 1) % filteredSites.length);
  };

  const handlePrev = () => {
    setActiveDeckIndex((prev) => (prev - 1 + filteredSites.length) % filteredSites.length);
  };

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * filteredSites.length);
    setActiveDeckIndex(randomIndex);
    setFlippedCards({});
  };

  const activeSite = filteredSites[activeDeckIndex] || filteredSites[0];
  const isCurrentFlipped = Boolean(flippedCards[activeSite?.id]);

  return (
    <div className="w-full">
      {/* ── Toolbar: Modes and Filters ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--hv-bg-border)]">
        {/* Category Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: "all", label: "All Heritage Sites" },
            { id: "monuments", label: "Temples & Palaces" },
            { id: "caves", label: "Rock-Cut Caves" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedFilter(tab.id);
                setActiveDeckIndex(0);
              }}
              className={`text-xs px-3.5 py-1.5 rounded-full transition-all font-medium cursor-pointer ${
                selectedFilter === tab.id
                  ? "bg-[var(--hv-gold)] text-white shadow-sm"
                  : "bg-[var(--hv-bg-secondary)] text-[var(--hv-text-secondary)] hover:bg-[var(--hv-bg-border)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* View Mode Toggle & Shuffle */}
        <div className="flex items-center gap-2">
          {viewMode === "deck" && (
            <button
              onClick={handleShuffle}
              className="text-xs px-3 py-1.5 rounded border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] text-[var(--hv-text-secondary)] hover:text-[var(--hv-gold)] hover:border-[var(--hv-gold)] transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Shuffle card deck"
            >
              <Shuffle size={13} />
              <span>Shuffle</span>
            </button>
          )}

          <div className="flex items-center rounded border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] p-0.5">
            <button
              onClick={() => setViewMode("deck")}
              className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === "deck" 
                  ? "bg-[var(--hv-gold)] text-white" 
                  : "text-[var(--hv-text-muted)] hover:text-[var(--hv-text-primary)]"
              }`}
              title="Deck Carousel Mode"
            >
              <Layers size={14} />
              <span className="hidden sm:inline text-[11px] font-medium pr-1">Study Deck</span>
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === "grid" 
                  ? "bg-[var(--hv-gold)] text-white" 
                  : "text-[var(--hv-text-muted)] hover:text-[var(--hv-text-primary)]"
              }`}
              title="Grid View Mode"
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline text-[11px] font-medium pr-1">All Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── MODE 1: STUDY DECK (CAROUSEL VIEW) ── */}
      {viewMode === "deck" && activeSite && (
        <div className="max-w-xl mx-auto flex flex-col items-center">
          {/* Card Meta Indicator */}
          <div className="w-full flex items-center justify-between text-xs text-[var(--hv-text-muted)] font-mono mb-3">
            <span className="uppercase tracking-widest text-[10px]">
              FLASHCARD {String(activeDeckIndex + 1).padStart(2, "0")} / {String(filteredSites.length).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-[var(--hv-gold)] font-medium flex items-center gap-1">
              <RotateCw size={11} className={isCurrentFlipped ? "rotate-180 transition-transform duration-500" : ""} />
              {isCurrentFlipped ? "Viewing Back (Details)" : "Click card to flip"}
            </span>
          </div>

          {/* Flashcard container with 3D perspective flip */}
          <div 
            className="w-full h-[460px] flashcard-container cursor-pointer select-none"
            onClick={() => toggleFlip(activeSite.id)}
          >
            <div className={`flashcard-inner ${isCurrentFlipped ? "flashcard-flipped" : ""}`}>
              
              {/* ── CARD FRONT ── */}
              <div className="flashcard-face flashcard-front bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden">
                {/* Decorative museum corner brackets */}
                <span className="museum-bracket-top-left" />
                <span className="museum-bracket-top-right" />
                <span className="museum-bracket-bottom-left" />
                <span className="museum-bracket-bottom-right" />

                {/* Top Badges */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)] text-[var(--hv-text-secondary)] font-semibold flex items-center gap-1">
                    <MapPin size={10} className="text-[var(--hv-gold)]" />
                    {activeSite.state}
                  </span>
                  <span className="text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-amber-500/10 text-[var(--hv-gold)] border border-[var(--hv-gold)]/30 flex items-center gap-1">
                    <Box size={10} />
                    3D Walkthrough
                  </span>
                </div>

                {/* Monument Artwork Crop */}
                <div className="relative w-full h-44 my-4 rounded arch-frame overflow-hidden bg-[var(--hv-bg-secondary)]">
                  <div className="arch-image-mask w-full h-full relative">
                    <Image
                      src={activeSite.heroImage}
                      alt={activeSite.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Main Content */}
                <div className="text-left z-10">
                  <h3 className="font-display text-2xl font-medium text-[var(--hv-text-primary)] mb-1">
                    {activeSite.name}
                  </h3>
                  <p className="text-xs text-[var(--hv-text-secondary)] line-clamp-2 leading-relaxed mb-3">
                    {activeSite.shortDescription}
                  </p>

                  {/* Teaser Question */}
                  <div className="p-2.5 rounded bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles size={13} className="text-[var(--hv-gold)] shrink-0" />
                      <p className="text-[11px] text-[var(--hv-text-primary)] italic font-serif">
                        {FLASHCARD_EXTRA_DATA[activeSite.slug]?.didYouKnow.substring(0, 75)}…
                      </p>
                    </div>
                    <span className="text-[10px] text-[var(--hv-gold)] font-semibold shrink-0 ml-2">
                      Flip ↻
                    </span>
                  </div>
                </div>
              </div>

              {/* ── CARD BACK ── */}
              <div 
                className="flashcard-face flashcard-back bg-[var(--hv-bg-card)] border border-[var(--hv-gold)]/40 shadow-xl p-6 flex flex-col justify-between text-left overflow-y-auto"
                onClick={(e) => {
                  // If clicking interactive buttons, prevent card flip
                  const target = e.target as HTMLElement;
                  if (target.closest("a") || target.closest("button")) {
                    e.stopPropagation();
                  }
                }}
              >
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between border-b border-[var(--hv-bg-border)] pb-2 mb-3">
                    <div>
                      <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-[var(--hv-gold)] font-semibold">
                        ARCHITECTURAL SPECIFICATION
                      </span>
                      <h4 className="font-display text-lg font-medium text-[var(--hv-text-primary)]">
                        {activeSite.name}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFlip(activeSite.id)}
                      className="p-1.5 rounded-full hover:bg-[var(--hv-bg-secondary)] text-[var(--hv-text-muted)] hover:text-[var(--hv-text-primary)]"
                      title="Flip back to front"
                    >
                      <RotateCw size={13} />
                    </button>
                  </div>

                  {/* Curated Factoids */}
                  <div className="space-y-3 text-xs leading-relaxed">
                    <div className="p-2.5 rounded bg-[var(--hv-bg-primary)] border border-[var(--hv-bg-border)]">
                      <p className="text-[10px] font-mono text-[var(--hv-gold)] uppercase font-semibold mb-0.5">
                        Architectural Marvel
                      </p>
                      <p className="text-[var(--hv-text-secondary)] text-[11px]">
                        {FLASHCARD_EXTRA_DATA[activeSite.slug]?.architecturalSecret || activeSite.architecture.substring(0, 160)}
                      </p>
                    </div>

                    <div className="p-2.5 rounded bg-[var(--hv-bg-primary)] border border-[var(--hv-bg-border)]">
                      <p className="text-[10px] font-mono text-[var(--hv-blue)] uppercase font-semibold mb-0.5">
                        Did You Know?
                      </p>
                      <p className="text-[var(--hv-text-secondary)] text-[11px]">
                        {FLASHCARD_EXTRA_DATA[activeSite.slug]?.didYouKnow}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 border-t border-[var(--hv-bg-border)] text-[var(--hv-text-muted)]">
                      <div>
                        <span className="font-semibold block text-[var(--hv-text-primary)]">Built:</span>
                        <span>{activeSite.yearBuilt ? `${activeSite.yearBuilt} CE` : "Ancient Era"}</span>
                      </div>
                      <div>
                        <span className="font-semibold block text-[var(--hv-text-primary)]">Style:</span>
                        <span>{activeSite.architecturalStyle}</span>
                      </div>
                    </div>

                    {/* Book Recommendation Note */}
                    {HERITAGE_BOOKS[activeSite.slug]?.[0] && (
                      <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          <BookOpen size={12} className="text-[var(--hv-gold)] shrink-0" />
                          <span className="text-[10px] text-[var(--hv-text-primary)] truncate font-serif italic">
                            Book: &quot;{HERITAGE_BOOKS[activeSite.slug][0].title}&quot;
                          </span>
                        </div>
                        <Link 
                          href={`/heritage/${activeSite.slug}#recommended-books`} 
                          className="text-[9px] text-[var(--hv-gold)] hover:underline shrink-0 ml-1 font-mono uppercase font-semibold"
                        >
                          Books →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct Action Buttons on Flashcard Back */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[var(--hv-bg-border)] mt-2">
                  <Link href={`/experience/${activeSite.slug}`} className="w-full">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full text-[10px] tracking-wider uppercase font-semibold py-1.5 h-auto flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white border-0 shadow-sm"
                    >
                      <Box size={12} />
                      Explore 3D
                    </Button>
                  </Link>

                  <Link href={`/heritage/${activeSite.slug}`} className="w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-[10px] tracking-wider uppercase font-semibold py-1.5 h-auto flex items-center justify-center gap-1.5 border-[var(--hv-bg-border)] hover:border-[var(--hv-gold)] text-[var(--hv-text-secondary)]"
                    >
                      <span>Full Story</span>
                      <ArrowRight size={11} />
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-[var(--hv-bg-border)] hover:border-[var(--hv-gold)] bg-[var(--hv-bg-card)] flex items-center justify-center text-[var(--hv-text-primary)] hover:text-[var(--hv-gold)] transition-colors shadow-sm cursor-pointer"
              aria-label="Previous card"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Jump Dots */}
            <div className="flex items-center gap-1.5">
              {filteredSites.map((site, idx) => (
                <button
                  key={site.id}
                  onClick={() => {
                    setActiveDeckIndex(idx);
                    setFlippedCards({});
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeDeckIndex === idx 
                      ? "w-6 bg-[var(--hv-gold)]" 
                      : "w-2 bg-[var(--hv-bg-border)] hover:bg-[var(--hv-text-muted)]"
                  }`}
                  aria-label={`Go to card ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-[var(--hv-bg-border)] hover:border-[var(--hv-gold)] bg-[var(--hv-bg-card)] flex items-center justify-center text-[var(--hv-text-primary)] hover:text-[var(--hv-gold)] transition-colors shadow-sm cursor-pointer"
              aria-label="Next card"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── MODE 2: ALL SITES GRID VIEW ── */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => {
            const isFlipped = Boolean(flippedCards[site.id]);
            const extra = FLASHCARD_EXTRA_DATA[site.slug];

            return (
              <div 
                key={site.id}
                className="w-full h-[440px] flashcard-container cursor-pointer select-none"
                onClick={() => toggleFlip(site.id)}
              >
                <div className={`flashcard-inner ${isFlipped ? "flashcard-flipped" : ""}`}>
                  
                  {/* FRONT */}
                  <div className="flashcard-face flashcard-front bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] shadow-sm hover:shadow-lg transition-all p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-mono tracking-wider uppercase text-[var(--hv-text-muted)]">
                          {site.state}
                        </span>
                        <span className="text-[9px] font-medium px-2 py-0.5 rounded bg-amber-500/10 text-[var(--hv-gold)] border border-[var(--hv-gold)]/20 flex items-center gap-1">
                          <Box size={10} />
                          3D
                        </span>
                      </div>

                      <div className="relative w-full h-36 rounded overflow-hidden arch-frame mb-3 bg-[var(--hv-bg-secondary)]">
                        <div className="arch-image-mask w-full h-full relative">
                          <Image
                            src={site.heroImage}
                            alt={site.name}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, 350px"
                          />
                        </div>
                      </div>

                      <h4 className="font-display text-lg font-medium text-[var(--hv-text-primary)] mb-1">
                        {site.name}
                      </h4>
                      <p className="text-[11px] text-[var(--hv-text-secondary)] line-clamp-2 leading-relaxed">
                        {site.shortDescription}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[var(--hv-bg-border)] flex items-center justify-between text-[10px] text-[var(--hv-gold)] font-medium">
                      <span>{site.historicalPeriod.split("(")[0]}</span>
                      <span className="flex items-center gap-1">
                        <RotateCw size={10} />
                        Flip to Read
                      </span>
                    </div>
                  </div>

                  {/* BACK */}
                  <div 
                    className="flashcard-face flashcard-back bg-[var(--hv-bg-card)] border border-[var(--hv-gold)]/40 shadow-lg p-5 flex flex-col justify-between text-left"
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.closest("a") || target.closest("button")) {
                        e.stopPropagation();
                      }
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-[var(--hv-bg-border)] pb-1.5 mb-2.5">
                        <h4 className="font-display text-sm font-semibold text-[var(--hv-text-primary)]">
                          {site.name} — Quick Facts
                        </h4>
                        <span className="text-[9px] text-[var(--hv-gold)] font-mono">
                          {site.yearBuilt ? `${site.yearBuilt} CE` : "Ancient"}
                        </span>
                      </div>

                      <div className="space-y-2 text-[11px] leading-relaxed text-[var(--hv-text-secondary)]">
                        <div className="p-2 rounded bg-[var(--hv-bg-primary)] border border-[var(--hv-bg-border)]">
                          <p className="font-semibold text-[10px] text-[var(--hv-gold)] uppercase">Secret</p>
                          <p className="line-clamp-3">{extra?.architecturalSecret}</p>
                        </div>
                        <div className="p-2 rounded bg-[var(--hv-bg-primary)] border border-[var(--hv-bg-border)]">
                          <p className="font-semibold text-[10px] text-[var(--hv-blue)] uppercase">Did You Know?</p>
                          <p className="line-clamp-3">{extra?.didYouKnow}</p>
                        </div>

                        {/* Top Book Reference */}
                        {HERITAGE_BOOKS[site.slug]?.[0] && (
                          <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/20 flex items-center gap-1.5">
                            <BookOpen size={11} className="text-[var(--hv-gold)] shrink-0" />
                            <span className="text-[9px] text-[var(--hv-text-primary)] truncate font-serif italic">
                              &quot;{HERITAGE_BOOKS[site.slug][0].title.split(":")[0]}&quot;
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--hv-bg-border)]">
                      <Link href={`/experience/${site.slug}`} className="w-full">
                        <Button
                          variant="primary"
                          size="sm"
                          className="w-full text-[10px] tracking-wider uppercase font-semibold py-1 h-auto flex items-center justify-center gap-1 bg-amber-600 hover:bg-amber-500 text-white"
                        >
                          <Box size={10} />
                          3D
                        </Button>
                      </Link>
                      <Link href={`/heritage/${site.slug}`} className="w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-[10px] tracking-wider uppercase font-semibold py-1 h-auto flex items-center justify-center gap-1 text-[var(--hv-text-secondary)]"
                        >
                          Details
                          <ArrowRight size={10} />
                        </Button>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
