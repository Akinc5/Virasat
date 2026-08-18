import { MapPin, Calendar, Landmark, Award, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatYear } from "@/lib/utils";
import type { HeritageSite } from "@/types";

interface HeritageInfoProps {
  site: HeritageSite;
}

interface InfoChipProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoChip({ icon, label, value }: InfoChipProps) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--hv-bg-elevated)] border border-[var(--hv-bg-border)]">
      <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 text-amber-500">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[var(--hv-text-muted)] uppercase tracking-wide mb-0.5">
          {label}
        </p>
        <p className="text-sm font-medium text-[var(--hv-text-primary)]">{value}</p>
      </div>
    </div>
  );
}

export function HeritageInfo({ site }: HeritageInfoProps) {
  const chips = [
    {
      icon: <MapPin size={16} />,
      label: "Location",
      value: `${site.city}, ${site.state}`,
    },
    {
      icon: <Calendar size={16} />,
      label: "Historical Period",
      value: site.historicalPeriod,
    },
    {
      icon: <Landmark size={16} />,
      label: "Architectural Style",
      value: site.architecturalStyle,
    },
    {
      icon: <Award size={16} />,
      label: "Year Built",
      value: site.yearBuilt
        ? formatYear(site.yearBuilt)
        : "Ancient / Unknown",
    },
    {
      icon: <Globe size={16} />,
      label: "Region",
      value: site.region,
    },
    {
      icon: <Globe size={16} />,
      label: "UNESCO Status",
      value: site.unescoStatus,
    },
  ];

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      aria-label={`${site.name} information`}
    >
      {chips.map((chip) => (
        <InfoChip key={chip.label} {...chip} />
      ))}
    </div>
  );
}
