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
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-teal-900/20 to-cyan-900/20 border border-teal-500/20 p-8 text-center"
      role="region"
      aria-label="VR mode — coming soon"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-4 left-4 w-32 h-32 rounded-full border border-teal-400" />
        <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full border border-cyan-400" />
      </div>

      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-5">
          <Glasses size={28} className="text-teal-400" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs text-teal-400 font-medium mb-4">
          <Zap size={11} />
          Coming Soon
        </div>

        <h3 className="font-display text-xl font-bold text-white mb-2">
          VR Tour
        </h3>
        <p className="text-sm text-white/60 max-w-xs mx-auto leading-relaxed">
          Put on your VR headset and walk through{" "}
          {siteName ?? "this heritage site"} as if you were there. An
          immersive journey through India's ancient history.
        </p>

        <div className="mt-6 text-xs text-teal-400/50 font-mono">
          {/* WebXR VR session integration point */}
        </div>
      </div>
    </div>
  );
}
