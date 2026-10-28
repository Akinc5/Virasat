"use client";

// ============================================================
// TourPanel — Story card + stop rail for the guided 3D tour.
// State lives in ExperienceViewer; this component only renders.
// ============================================================

import { ChevronLeft, ChevronRight, Compass, Pause, Play, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MonumentHotspot } from "@/data/monument-hotspots";

interface TourPanelProps {
  stops: MonumentHotspot[];
  activeIndex: number | null;
  playing: boolean;
  narrate: boolean;
  onSelect: (index: number | null) => void;
  onTogglePlay: () => void;
  onToggleNarrate: () => void;
}

export function TourStoryCard({
  stop,
  index,
  total,
  onSelect,
}: {
  stop: MonumentHotspot;
  index: number;
  total: number;
  onSelect: (index: number | null) => void;
}) {
  return (
    <div
      key={stop.id}
      className="absolute top-4 left-4 z-20 w-[min(22rem,calc(100%-2rem))] max-h-[calc(100%-5rem)] overflow-y-auto rounded-2xl bg-[var(--hv-bg-card)]/95 backdrop-blur-md border border-[var(--hv-border-gold)] shadow-xl p-5 hv-story-in"
      role="dialog"
      aria-label={stop.title}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[var(--hv-gold-muted)]">
            Stop {index + 1} / {total} · {stop.category}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--hv-blue)]/10 text-[var(--hv-blue-dark)] font-medium">
            {stop.badgeText}
          </span>
        </div>
        <button
          onClick={() => onSelect(null)}
          className="shrink-0 w-7 h-7 rounded-full grid place-items-center text-[var(--hv-text-muted)] hover:bg-[var(--hv-bg-elevated)]"
          aria-label="Close and return to overview"
        >
          <X size={14} />
        </button>
      </div>
      <h3 className="font-display text-lg leading-snug text-[var(--hv-text-primary)] mb-2">{stop.title}</h3>
      <p className="font-serif text-[15px] leading-relaxed text-[var(--hv-text-secondary)] mb-3">{stop.explanation}</p>
      <div className="rounded-xl bg-[var(--hv-bg-secondary)] border border-[var(--hv-border-gold)] p-3 mb-4">
        <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-[var(--hv-gold-muted)] mb-1">
          <Sparkles size={12} /> Did you know?
        </p>
        <p className="text-sm text-[var(--hv-text-secondary)] leading-relaxed">{stop.trivia}</p>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => onSelect(index > 0 ? index - 1 : null)}
          className="flex items-center gap-1 text-xs font-medium text-[var(--hv-text-muted)] hover:text-[var(--hv-text-primary)]"
        >
          <ChevronLeft size={14} /> {index > 0 ? "Previous" : "Overview"}
        </button>
        <button
          onClick={() => onSelect(index < total - 1 ? index + 1 : null)}
          className="flex items-center gap-1 text-xs font-semibold text-[var(--hv-blue-dark)] hover:text-[var(--hv-text-primary)]"
        >
          {index < total - 1 ? "Next stop" : "Finish tour"} <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export function TourRail({ stops, activeIndex, playing, narrate, onSelect, onTogglePlay, onToggleNarrate }: TourPanelProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 px-4 py-3 bg-[var(--hv-bg-card)] border-t border-[var(--hv-bg-border)]">
      <button
        onClick={onTogglePlay}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm",
          playing
            ? "bg-[var(--hv-blue-dark)] text-white"
            : "bg-[var(--hv-text-primary)] text-[var(--hv-bg-primary)] hover:bg-[var(--hv-blue-dark)]"
        )}
      >
        {playing ? <Pause size={14} /> : <Play size={14} />}
        {playing ? "Pause tour" : activeIndex === null ? "Start guided tour" : "Resume tour"}
      </button>
      <button
        onClick={onToggleNarrate}
        className={cn(
          "w-9 h-9 rounded-full grid place-items-center border transition-colors",
          narrate
            ? "border-[var(--hv-gold)] text-[var(--hv-gold-muted)] bg-[var(--hv-gold)]/10"
            : "border-[var(--hv-bg-border)] text-[var(--hv-text-muted)]"
        )}
        aria-label={narrate ? "Mute landmark audio" : "Play landmark audio"}
        aria-pressed={narrate}
        title={narrate ? "Mute landmark audio" : "Play landmark audio"}
      >
        {narrate ? <Volume2 size={15} /> : <VolumeX size={15} />}
      </button>
      <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto [scrollbar-width:none]">
        <button
          onClick={() => onSelect(null)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap border transition-colors",
            activeIndex === null
              ? "border-[var(--hv-gold)] bg-[var(--hv-gold)]/10 text-[var(--hv-text-primary)]"
              : "border-[var(--hv-bg-border)] text-[var(--hv-text-muted)] hover:text-[var(--hv-text-primary)]"
          )}
        >
          <Compass size={12} /> Overview
        </button>
        {stops.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onSelect(i)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap border transition-colors",
              activeIndex === i
                ? "border-[var(--hv-gold)] bg-[var(--hv-gold)]/10 text-[var(--hv-text-primary)]"
                : "border-[var(--hv-bg-border)] text-[var(--hv-text-muted)] hover:text-[var(--hv-text-primary)]"
            )}
          >
            <span className="w-4 h-4 rounded-full grid place-items-center text-[10px] font-semibold bg-[var(--hv-gold-muted)] text-white">
              {i + 1}
            </span>
            {s.title.replace(/\s*\(.*\)$/, "")}
          </button>
        ))}
      </div>
    </div>
  );
}
