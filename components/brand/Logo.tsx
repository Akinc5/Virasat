// ============================================================
// Virasat brand mark — a gold ogee (Mughal / Indic) arch with
// a sun rising through the doorway, on the site's deep blue.
// The same drawing is used for the favicon (app/icon.svg).
// ============================================================

import { cn } from "@/lib/utils";

export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("w-9 h-9", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="40" height="40" rx="10" fill="#4C697B" />
      <rect x="1.5" y="1.5" width="37" height="37" rx="8.5" fill="none" stroke="#C5A059" strokeOpacity="0.35" />
      {/* rising sun inside the doorway */}
      <path d="M14.5 31.5a5.5 5.5 0 0 1 11 0z" fill="#D9B775" />
      <path d="M20 23.2v-2.2M14.9 25.4l-1.5-1.5M25.1 25.4l1.5-1.5" stroke="#D9B775" strokeWidth="1.3" strokeLinecap="round" />
      {/* ogee arch */}
      <path
        d="M11 31.5V19.5c0-4.6 3.9-6.4 6.6-8.4 1.4-1 2.2-2.3 2.4-4.1.2 1.8 1 3.1 2.4 4.1 2.7 2 6.6 3.8 6.6 8.4v12"
        fill="none"
        stroke="#C5A059"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* finial + plinth */}
      <circle cx="20" cy="4.6" r="1.25" fill="#C5A059" />
      <path d="M8 31.5h24" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.5 34.5h19" stroke="#C5A059" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[17px] font-semibold tracking-[0.18em] text-[var(--hv-text-primary)]">
            VIRASAT
          </span>
          <span className="mt-1 text-[8.5px] font-serif italic uppercase tracking-[0.28em] text-[var(--hv-gold-muted)]">
            India&apos;s living heritage
          </span>
        </span>
      )}
    </span>
  );
}
