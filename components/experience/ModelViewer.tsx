"use client";

// ============================================================
// ModelViewer — Renders a self-hosted GLB with Google <model-viewer>
//
// Usage: <ModelViewer src="/models/taj-mahal.glb" title="Taj Mahal" scale={0.01} />
//
// AR: WebXR on Android Chrome, Scene Viewer as Android fallback, and
// Quick Look on iOS (needs a .usdz alongside — pass `iosSrc`).
//
// Tours: pass `hotspots` (positions in the GLB's own metres) and `focus`
// (camera target/orbit, also in model metres); both are scaled here by `scale`.
// ============================================================

import { useEffect, useRef, useState } from "react";
import { Box, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Self-hosted (public/vendor) so models still load on flaky networks
// without reaching Google's CDN; the Draco decoder is served locally too.
const MODEL_VIEWER_SRC = "/vendor/model-viewer/model-viewer-4.0.0.min.js";
const DRACO_DECODER_LOCATION = "/vendor/draco/";
// Daylight sky (Poly Haven "Kloofendal 48d", CC0), colour-balanced to neutral
// in Blender: directional sun for depth without a blue cast
const ENVIRONMENT = "/vendor/env/daylight_neutral_1k.hdr";

export interface ViewerHotspot {
  id: string;
  label: string;
  position: string; // "x y z" in model metres
  normal: string;
}

export interface ViewerFocus {
  target: string; // "x y z" in model metres
  orbit: string; // "theta phi radius", radius in model metres
}

interface ModelViewerProps {
  src: string;
  title: string;
  scale?: number;
  iosSrc?: string;
  poster?: string;
  className?: string;
  hotspots?: ViewerHotspot[];
  activeHotspot?: string | null;
  onHotspotClick?: (id: string) => void;
  focus?: ViewerFocus | null;
  // Overview camera orbit (defaults to a front three-quarter view)
  orbit?: string;
  // Attribution chip; pass null to hide it (e.g. when the page shows it)
  credit?: string | null;
  // Per-model lighting (white marble needs less light than dark stone)
  exposure?: number;
  shadowIntensity?: number;
}

const DEFAULT_ORBIT = "-25deg 72deg 108%";

/** "1m 2m 3m" × s → "0.01m 0.02m 0.03m" */
function scaleVec(v: string, s: number) {
  return v
    .trim()
    .split(/\s+/)
    .map((p) => `${(parseFloat(p) * s).toFixed(4)}m`)
    .join(" ");
}

function scaleOrbit(orbit: string, s: number) {
  const [theta, phi, radius] = orbit.trim().split(/\s+/);
  return `${theta} ${phi} ${(parseFloat(radius) * s).toFixed(4)}m`;
}

export function ModelViewer({
  src,
  title,
  scale = 1,
  iosSrc,
  poster,
  className,
  hotspots = [],
  activeHotspot = null,
  onHotspotClick,
  focus = null,
  orbit = DEFAULT_ORBIT,
  credit = "Prepared in Blender · Virasat",
  exposure = 1,
  shadowIntensity = 1,
}: ModelViewerProps) {
  const viewerRef = useRef<HTMLElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canAR, setCanAR] = useState(false);

  // Load the web component once per page.
  useEffect(() => {
    if (!document.querySelector(`script[src="${MODEL_VIEWER_SRC}"]`)) {
      // Must be set before the element class is defined
      const w = window as unknown as { ModelViewerElement?: Record<string, unknown> };
      w.ModelViewerElement = { ...(w.ModelViewerElement ?? {}), dracoDecoderLocation: DRACO_DECODER_LOCATION };
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

  // Fly the camera to the focused tour stop, or back to the overview.
  useEffect(() => {
    const el = viewerRef.current as (HTMLElement & { cameraTarget: string; cameraOrbit: string }) | null;
    if (!el || !isLoaded) return;
    if (focus) {
      el.cameraTarget = scaleVec(focus.target, scale);
      el.cameraOrbit = scaleOrbit(focus.orbit, scale);
    } else {
      el.cameraTarget = "auto auto auto";
      el.cameraOrbit = orbit;
    }
  }, [focus, scale, isLoaded, orbit]);

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
        auto-rotate={focus ? undefined : true}
        auto-rotate-delay="1500"
        rotation-per-second="12deg"
        camera-orbit={orbit}
        interpolation-decay="120"
        interaction-prompt="none"
        environment-image={ENVIRONMENT}
        tone-mapping="neutral"
        exposure={String(exposure)}
        shadow-intensity={String(shadowIntensity)}
        shadow-softness="0.7"
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
        {/* Tour pins, anchored to the model surface */}
        {isLoaded &&
          hotspots.map((h, i) => (
            <button
              key={h.id}
              slot={`hotspot-${h.id}`}
              data-position={scaleVec(h.position, scale)}
              data-normal={h.normal}
              data-visibility-attribute="visible"
              onClick={() => onHotspotClick?.(h.id)}
              className={cn("hv-hotspot", activeHotspot === h.id && "hv-hotspot--active")}
              aria-label={`Tour stop ${i + 1}: ${h.label}`}
            >
              <span className="hv-hotspot__dot">{i + 1}</span>
              <span className="hv-hotspot__label">{h.label}</span>
            </button>
          ))}
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

      {/* Bottom chips share one row so they can never overlap each other */}
      <div className="absolute bottom-4 inset-x-4 flex items-end justify-between gap-3 z-20 pointer-events-none">
        {credit ? (
          <div className="glass-card px-3 py-1.5 rounded-lg min-w-0 max-w-[55%]">
            <span className="block text-xs text-[var(--hv-text-muted)] truncate">{credit}</span>
          </div>
        ) : (
          <span />
        )}
        {/* Hint for desktop visitors, where AR is unavailable */}
        {isLoaded && !canAR && (
          <div className="glass-card px-3 py-1.5 rounded-lg shrink-0">
            <span className="text-xs text-[var(--hv-text-muted)]">Open on a phone to view in AR</span>
          </div>
        )}
      </div>
    </div>
  );
}
