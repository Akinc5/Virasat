// ============================================================
// ARPlaceholder — "AR Mode Coming Soon" overlay
//
// EXTENSION POINT: Replace this component with a real AR
// implementation using WebXR Device API or 8thWall when ready.
// ============================================================

import { Smartphone, Zap } from "lucide-react";

interface ARPlaceholderProps {
  siteName?: string;
}

export function ARPlaceholder({ siteName }: ARPlaceholderProps) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-violet-900/20 border border-purple-500/20 p-8 text-center"
      role="region"
      aria-label="AR mode — coming soon"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-4 right-4 w-32 h-32 rounded-full border border-purple-400" />
        <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full border border-violet-400" />
      </div>

      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-5">
          <Smartphone size={28} className="text-purple-400" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 font-medium mb-4">
          <Zap size={11} />
          Coming Soon
        </div>

        <h3 className="font-display text-xl font-bold text-white mb-2">
          AR Mode
        </h3>
        <p className="text-sm text-white/60 max-w-xs mx-auto leading-relaxed">
          Point your phone at any surface and see{" "}
          {siteName ?? "this heritage site"} appear in augmented reality.
          Experience history in your living room.
        </p>

        <div className="mt-6 text-xs text-purple-400/50 font-mono">
          {/* WebXR / 8thWall integration point */}
        </div>
      </div>
    </div>
  );
}
