import { MapPin, Calendar, Layers } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { HeritageSite } from "@/types";

interface ExperienceInfoProps {
  site: HeritageSite;
}

export function ExperienceInfo({ site }: ExperienceInfoProps) {
  return (
    <aside
      className="bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] rounded-2xl p-6 h-full"
      aria-label={`Information about ${site.name}`}
    >
      <div className="mb-1">
        <Badge label={site.category} variant="category" />
      </div>
      <h2 className="font-display text-2xl font-bold text-[var(--hv-text-primary)] mt-3 mb-2 leading-tight">
        {site.name}
      </h2>
      <p className="text-sm text-[var(--hv-text-secondary)] leading-relaxed mb-6 font-serif">
        {site.shortDescription}
      </p>

      <div className="gold-divider mb-5" />

      <dl className="space-y-4">
        <div className="flex items-start gap-3">
          <dt className="flex items-center gap-1.5 text-xs text-[var(--hv-text-muted)] w-28 flex-shrink-0 pt-0.5">
            <MapPin size={12} className="text-amber-500" />
            Location
          </dt>
          <dd className="text-sm text-[var(--hv-text-primary)]">
            {site.city}, {site.state}
          </dd>
        </div>
        <div className="flex items-start gap-3">
          <dt className="flex items-center gap-1.5 text-xs text-[var(--hv-text-muted)] w-28 flex-shrink-0 pt-0.5">
            <Calendar size={12} className="text-amber-500" />
            Period
          </dt>
          <dd className="text-sm text-[var(--hv-text-primary)]">
            {site.historicalPeriod}
          </dd>
        </div>
        <div className="flex items-start gap-3">
          <dt className="flex items-center gap-1.5 text-xs text-[var(--hv-text-muted)] w-28 flex-shrink-0 pt-0.5">
            <Layers size={12} className="text-amber-500" />
            Style
          </dt>
          <dd className="text-sm text-[var(--hv-text-primary)]">
            {site.architecturalStyle}
          </dd>
        </div>
      </dl>

      {site.threeDModels && site.threeDModels.length > 0 && (
        <>
          <div className="gold-divider my-5" />
          <div>
            <p className="text-xs text-[var(--hv-text-muted)] uppercase tracking-wider mb-2">
              3D Model Info
            </p>
            {site.threeDModels.map((model) => (
              <div key={model.id} className="text-xs text-[var(--hv-text-secondary)] space-y-1">
                <p>Format: <span className="text-amber-400 uppercase">{model.format}</span></p>
                {model.fileSize && (
                  <p>Size: <span className="text-[var(--hv-text-primary)]">{(model.fileSize / 1024 / 1024).toFixed(1)} MB</span></p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
