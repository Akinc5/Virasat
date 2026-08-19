"use client";

// ============================================================
// SketchfabViewer — Embeds a Sketchfab 3D model via iframe
//
// Usage: <SketchfabViewer modelId="33149233cefd492b9abdd50fe5a8c921" title="Taj Mahal" />
//
// The modelId is the UUID from the Sketchfab model URL, e.g.:
//   https://sketchfab.com/3d-models/taj-mahal-33149233cefd492b9abdd50fe5a8c921
//                                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ============================================================

import { useState } from "react";
import { Maximize2, Minimize2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface SketchfabViewerProps {
  modelId: string;
  title: string;
  className?: string;
}

export function SketchfabViewer({ modelId, title, className }: SketchfabViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const embedUrl = `https://sketchfab.com/models/${modelId}/embed?autospin=0.2&autostart=1&ui_theme=dark&ui_infos=0&ui_watermark_link=0`;
  const modelUrl = `https://sketchfab.com/3d-models/${modelId}`;

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)]",
        isFullscreen && "fixed inset-0 z-50 rounded-none",
        className
      )}
      role="region"
      aria-label={`Interactive 3D model of ${title}`}
    >
      {/* Loading shimmer — shown until iframe fires onLoad */}
      {!isLoaded && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(212,160,23,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="w-40 h-40 rounded-full border-2 border-amber-500/30 flex items-center justify-center">
            <div
              className="w-28 h-28 rounded-full border-2 border-amber-500/50 flex items-center justify-center animate-spin"
              style={{ animationDuration: "8s" }}
            >
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40" />
            </div>
          </div>
          <p className="mt-6 text-sm text-[var(--hv-text-muted)] z-10">Loading 3D model…</p>
        </div>
      )}

      {/* Sketchfab iframe */}
      <iframe
        title={title}
        src={embedUrl}
        frameBorder="0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        className={cn(
          "w-full aspect-video min-h-[400px] transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setIsLoaded(true)}
      />

      {/* Top-right controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <button
          onClick={() => setIsFullscreen((f) => !f)}
          className="w-9 h-9 rounded-lg glass-card hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>

        <a
          href={modelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg glass-card hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
          aria-label="Open on Sketchfab"
        >
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Attribution badge */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 glass-card px-3 py-1.5 rounded-lg z-20">
        <span className="text-xs text-[var(--hv-text-muted)]">
          3D model via{" "}
          <a
            href="https://sketchfab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 transition-colors"
          >
            Sketchfab
          </a>
        </span>
      </div>
    </div>
  );
}
