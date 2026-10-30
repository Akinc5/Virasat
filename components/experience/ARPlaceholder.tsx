// ============================================================
// ARPlaceholder — AR status card under the 3D viewer.
//
// `arReady` sites have a self-hosted GLB, so <model-viewer>'s
// "View in your space" button works on AR-capable phones.
// ============================================================

import { Check, Smartphone, Zap } from "lucide-react";

interface ARPlaceholderProps {
  siteName?: string;
  arReady?: boolean;
}

export function ARPlaceholder({ siteName, arReady = false }: ARPlaceholderProps) {
  const name = siteName ?? "this heritage site";
  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] p-8 text-center"
      role="region"
      aria-label={arReady ? "AR mode — available" : "AR mode — coming soon"}
    >
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-4 right-4 w-32 h-32 rounded-full border border-[var(--hv-gold)]" />
        <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full border border-[var(--hv-blue)]" />
      </div>

      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-[var(--hv-blue)]/10 border border-[var(--hv-blue)]/25 flex items-center justify-center mx-auto mb-5">
          <Smartphone size={28} className="text-[var(--hv-blue-dark)]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--hv-blue)]/10 border border-[var(--hv-blue)]/25 text-xs text-[var(--hv-blue-dark)] font-medium mb-4">
          {arReady ? <Check size={11} /> : <Zap size={11} />}
          {arReady ? "Available now" : "Coming Soon"}
        </div>

        <h3 className="font-display text-xl font-bold text-[var(--hv-text-primary)] mb-2">AR Mode</h3>
        {arReady ? (
          <>
            <p className="text-sm text-[var(--hv-text-secondary)] max-w-sm mx-auto leading-relaxed">
              Place a tabletop {name} on your floor or desk and walk around it.
            </p>
            <ol className="mt-4 text-left text-sm text-[var(--hv-text-secondary)] max-w-xs mx-auto space-y-1.5">
              <li>1. Open this page on an AR-capable phone.</li>
              <li>2. Tap <strong className="text-[var(--hv-text-primary)]">View in your space</strong> on the model.</li>
              <li>3. Point at the floor, then pinch to resize and drag to turn.</li>
            </ol>
          </>
        ) : (
          <p className="text-sm text-[var(--hv-text-secondary)] max-w-xs mx-auto leading-relaxed">
            Point your phone at any surface and see {name} appear in augmented reality. Experience history in your
            living room.
          </p>
        )}
      </div>
    </div>
  );
}
