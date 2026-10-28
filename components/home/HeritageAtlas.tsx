"use client";

// ============================================================
// HeritageAtlas — interactive map of India with every site
// pinned, plus a clickable list that flies the map to it.
// ============================================================

import { useState } from "react";
import dynamic from "next/dynamic";
import { Box, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AtlasSite {
  slug: string;
  name: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  heroImage: string;
  category: string;
  has3D: boolean;
}

// Leaflet needs `window`, so the map renders on the client only.
const AtlasMap = dynamic(() => import("@/components/home/AtlasMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[var(--hv-bg-secondary)] animate-pulse" />,
});

export function HeritageAtlas({ sites }: { sites: AtlasSite[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ol className="lg:col-span-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 [scrollbar-width:none]">
        {sites.map((s, i) => (
          <li key={s.slug} className="shrink-0 w-64 lg:w-auto">
            <button
              onClick={() => setActive(s.slug)}
              className={cn(
                "w-full text-left flex items-center gap-4 p-3 rounded-2xl border transition-all",
                active === s.slug
                  ? "border-[var(--hv-gold)] bg-[var(--hv-bg-card)] shadow-md"
                  : "border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)]/60 hover:border-[var(--hv-gold)]/60"
              )}
            >
              <span
                className={cn(
                  "w-8 h-8 shrink-0 rounded-full grid place-items-center text-xs font-semibold",
                  active === s.slug ? "bg-[var(--hv-blue-dark)] text-white" : "bg-[var(--hv-gold-muted)] text-white"
                )}
              >
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-sm text-[var(--hv-text-primary)] truncate">{s.name}</span>
                <span className="flex items-center gap-1 text-[11px] text-[var(--hv-text-muted)]">
                  <MapPin size={10} /> {s.city}, {s.state}
                </span>
              </span>
              {s.has3D && (
                <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--hv-blue)]/10 text-[var(--hv-blue-dark)]">
                  <Box size={10} /> 3D·AR
                </span>
              )}
            </button>
          </li>
        ))}
      </ol>
      <div className="lg:col-span-2 h-[460px] rounded-[1.5rem] overflow-hidden border border-[var(--hv-bg-border)] shadow-lg relative z-0">
        <AtlasMap sites={sites} activeSlug={active} onSelect={setActive} />
      </div>
    </div>
  );
}
