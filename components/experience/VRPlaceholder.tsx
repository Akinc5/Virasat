// ============================================================
// VRPlaceholder — "VR Mode Coming Soon" overlay
//
// EXTENSION POINT: Replace this component with a real VR
// implementation using WebXR Device API, A-Frame, or Three.js
// VR mode when ready.
// ============================================================

import { Glasses, Zap } from "lucide-react";

interface VRPlaceholderProps {
  siteName?: string;
}

export function VRPlaceholder({ siteName }: VRPlaceholderProps) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] p-8 text-center"
      role="region"
      aria-label="VR mode — coming soon"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-4 left-4 w-32 h-32 rounded-full border border-[var(--hv-gold)]" />
        <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full border border-[var(--hv-blue)]" />
      </div>

      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-[var(--hv-gold)]/15 border border-[var(--hv-gold)]/30 flex items-center justify-center mx-auto mb-5">
          <Glasses size={28} className="text-[var(--hv-gold-muted)]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)] text-xs text-[var(--hv-text-muted)] font-medium mb-4">
          <Zap size={11} />
          Coming Soon
        </div>

        <h3 className="font-display text-xl font-bold text-[var(--hv-text-primary)] mb-2">
          VR Tour
        </h3>
        <p className="text-sm text-[var(--hv-text-secondary)] max-w-xs mx-auto leading-relaxed">
          Put on your VR headset and walk through{" "}
          {siteName ?? "this heritage site"} as if you were there. An
          immersive journey through India&apos;s ancient history.
        </p>

      </div>
    </div>
  );
}
