import { formatYear } from "@/lib/utils";
import type { TimelineEvent } from "@/types";

interface HeritageTimelineProps {
  events: TimelineEvent[];
}

export function HeritageTimeline({ events }: HeritageTimelineProps) {
  const sorted = [...events].sort((a, b) => a.year - b.year);

  return (
    <div className="relative" aria-label="Heritage site timeline">
      {/* Vertical line */}
      <div className="absolute left-[19px] top-0 bottom-0 timeline-line" aria-hidden="true" />

      <ol className="space-y-8">
        {sorted.map((event, index) => (
          <li key={event.id} className="relative flex gap-6">
            {/* Dot */}
            <div className="relative z-10 flex-shrink-0">
              <div
                className="w-10 h-10 rounded-full bg-[var(--hv-bg-elevated)] border-2 border-amber-600/60 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              </div>
            </div>

            {/* Content */}
            <div
              className="flex-1 pb-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-400 text-xs font-mono font-bold border border-amber-500/20">
                  {formatYear(event.year)}
                </span>
                <h3 className="font-display font-semibold text-[var(--hv-text-primary)] text-sm">
                  {event.title}
                </h3>
              </div>
              <p className="text-sm text-[var(--hv-text-secondary)] leading-relaxed">
                {event.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
