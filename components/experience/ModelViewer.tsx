"use client";

// ============================================================
// ModelViewer — Renders a self-hosted GLB with Google <model-viewer>
//
// Usage: <ModelViewer src="/models/taj-mahal.glb" title="Taj Mahal" scale={0.01} />
//
// AR: WebXR on Android Chrome, Scene Viewer as Android fallback, and
// Quick Look on iOS (needs a .usdz alongside — pass `iosSrc`).
// ============================================================

import { useEffect, useRef, useState } from "react";
import { Box, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

const MODEL_VIEWER_SRC = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";

interface ModelViewerProps {
  src: string;
  title: string;
  scale?: number;
  iosSrc?: string;
  poster?: string;
  className?: string;
}

export function ModelViewer({ src, title, scale = 1, iosSrc, poster, className }: ModelViewerProps) {
  const viewerRef = useRef<HTMLElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canAR, setCanAR] = useState(false);

  // Load the web component once per page.
  useEffect(() => {
    if (!document.querySelector(`script[src="${MODEL_VIEWER_SRC}"]`)) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = MODEL_VIEWER_SRC;
      document.head.appendChild(script);
    }
  }, []);

  // React doesn't forward custom-element events, so attach them manually.
  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    setIsLoaded(false);
    setProgress(0);
    const onProgress = (e: Event) => setProgress((e as CustomEvent<{ totalProgress: number }>).detail.totalProgress);
    const onLoad = () => {
      setIsLoaded(true);
      setCanAR(Boolean((el as HTMLElement & { canActivateAR?: boolean }).canActivateAR));
    };
    el.addEventListener("progress", onProgress);
    el.addEventListener("load", onLoad);
    return () => {
      el.removeEventListener("progress", onProgress);
      el.removeEventListener("load", onLoad);
    };
  }, [src]);

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
      <model-viewer
        ref={viewerRef}
        src={src}
        ios-src={iosSrc}
        poster={poster}
        alt={`Interactive 3D model of ${title}`}
        scale={`${scale} ${scale} ${scale}`}
        camera-controls
        touch-action="pan-y"
        auto-rotate
        auto-rotate-delay="1500"
        rotation-per-second="12deg"
        camera-orbit="-25deg 72deg auto"
        interaction-prompt="none"
        environment-image="neutral"
        exposure="1.05"
        shadow-intensity="1"
        shadow-softness="0.8"
        ar
        ar-modes="webxr scene-viewer quick-look"
        ar-scale="auto"
        ar-placement="floor"
        style={{ width: "100%", height: "100%", minHeight: "500px", display: "block", background: "transparent" }}
      >
        {/* AR button — model-viewer only shows this slot when AR is available */}
        <button
          slot="ar-button"
          className="absolute bottom-4 right-4 bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-full font-medium text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 z-20 cursor-pointer"
        >
          <Box size={14} />
          View in your space
        </button>
        {/* Hide the default progress bar; we draw our own */}
        <div slot="progress-bar" />
      </model-viewer>

      {/* Loading overlay */}
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
          <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-amber-500 transition-all" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
          <p className="mt-4 text-sm text-[var(--hv-text-muted)]">Loading 3D model…</p>
        </div>
      )}

      {/* Top-right controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <button
          onClick={() => setIsFullscreen((f) => !f)}
          className="w-9 h-9 rounded-lg glass-card hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      {/* Hint for desktop visitors, where AR is unavailable */}
      {isLoaded && !canAR && (
        <div className="absolute bottom-4 right-4 glass-card px-3 py-1.5 rounded-lg z-20">
          <span className="text-xs text-[var(--hv-text-muted)]">Open on a phone to view in AR</span>
        </div>
      )}

      <div className="absolute bottom-4 left-4 glass-card px-3 py-1.5 rounded-lg z-20">
        <span className="text-xs text-[var(--hv-text-muted)]">Procedural model · Virasat</span>
      </div>
    </div>
  );
}
