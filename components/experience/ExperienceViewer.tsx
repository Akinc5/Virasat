"use client";

// ============================================================
// ExperienceViewer — 3D Model Viewer Placeholder
//
// This component is designed as a DROP-IN container for a real
// Three.js / React Three Fiber / WebXR experience.
//
// TO ADD A REAL 3D EXPERIENCE:
//  1. Install: npm install three @react-three/fiber @react-three/drei
//  2. Replace the placeholder div below with a <Canvas> component
//  3. Load your .glb model using useGLTF from @react-three/drei
//  4. See /docs/3D_INTEGRATION.md for full guide
// ============================================================

import { useState } from "react";
import { Maximize2, Minimize2, RotateCcw, Info } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";
import type { HeritageSite } from "@/types";

interface ExperienceViewerProps {
  site: HeritageSite;
  className?: string;
}

export function ExperienceViewer({ site, className }: ExperienceViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hasModel = site.threeDModels && site.threeDModels.length > 0;

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)]",
        isFullscreen && "fixed inset-0 z-50 rounded-none",
        className
      )}
      role="region"
      aria-label={`3D viewer for ${site.name}`}
    >
      {/* Viewer Area */}
      <div className="aspect-video relative flex items-center justify-center min-h-[400px]">
        {isLoading ? (
          <Spinner size="lg" label="Loading 3D model…" />
        ) : (
          <>
            {/* ── REPLACE THIS SECTION WITH <Canvas> FOR REAL 3D ── */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(212,160,23,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.4) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
                aria-hidden="true"
              />

              {/* Rotating placeholder object */}
              <div className="relative">
                <div
                  className="w-40 h-40 rounded-full border-2 border-amber-500/30 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="w-28 h-28 rounded-full border-2 border-amber-500/50 flex items-center justify-center animate-spin"
                    style={{ animationDuration: "8s" }}>
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40" />
                  </div>
                </div>
                {/* Orbit ring */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-amber-500/20 animate-spin"
                  style={{ animationDuration: "12s", animationDirection: "reverse" }}
                  aria-hidden="true"
                />
              </div>

              <div className="mt-8 text-center z-10">
                <p className="font-display text-xl font-semibold text-[var(--hv-text-primary)] mb-2">
                  {site.name}
                </p>
                <p className="text-sm text-[var(--hv-text-muted)] mb-1">
                  {hasModel
                    ? "3D model ready — connect renderer to display"
                    : "3D model not yet available for this site"}
                </p>
                <p className="text-xs text-amber-500/70 font-mono">
                  {/* Extension point marker for developers */}
                  {"/* Three.js Canvas goes here */"}
                </p>
              </div>
            </div>
            {/* ── END PLACEHOLDER ── */}
          </>
        )}
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="w-9 h-9 rounded-lg glass-card hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
        <button
          onClick={() => setIsLoading(true)}
          className="w-9 h-9 rounded-lg glass-card hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
          aria-label="Reset view"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Info badge */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 glass-card px-3 py-1.5 rounded-lg">
        <Info size={13} className="text-amber-400" />
        <span className="text-xs text-[var(--hv-text-muted)]">
          3D experience placeholder — see README for integration guide
        </span>
      </div>
    </div>
  );
}
