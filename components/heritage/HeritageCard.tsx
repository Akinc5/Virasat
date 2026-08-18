import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { HeritageCardProps } from "@/types";

export function HeritageCard({
  site,
  variant = "default",
}: HeritageCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/heritage/${site.slug}`}
        className="heritage-card group flex gap-4 p-3 rounded-xl bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] hover:border-amber-600/30 transition-all duration-300"
        aria-label={`View ${site.name}`}
      >
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--hv-bg-elevated)]">
          <Image
            src={site.heroImage}
            alt={site.name}
            fill
            className="heritage-card-img object-cover"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-amber-500 mb-0.5">{site.category}</p>
          <h3 className="font-display font-semibold text-sm text-[var(--hv-text-primary)] truncate group-hover:text-amber-300 transition-colors">
            {site.name}
          </h3>
          <p className="text-xs text-[var(--hv-text-muted)] mt-0.5">
            {site.city}, {site.state}
          </p>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/heritage/${site.slug}`}
        className="heritage-card group relative block rounded-2xl overflow-hidden aspect-[4/5] bg-[var(--hv-bg-elevated)] border border-[var(--hv-bg-border)] hover:border-amber-600/40 transition-all duration-500 shadow-xl"
        aria-label={`Explore ${site.name}`}
      >
        <div className="absolute inset-0">
          <Image
            src={site.heroImage}
            alt={site.name}
            fill
            className="heritage-card-img object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {site.unescoStatus === "World Heritage Site" && (
            <Badge label="UNESCO" variant="unesco" className="w-fit mb-3" />
          )}
          <Badge label={site.category} variant="category" className="w-fit mb-2" />
          <h3 className="font-display font-bold text-xl text-white group-hover:text-amber-300 transition-colors leading-tight">
            {site.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-2 text-white/60 text-xs">
            <MapPin size={12} />
            <span>{site.city}, {site.state}</span>
          </div>
          <p className="text-white/70 text-xs mt-2 line-clamp-2 leading-relaxed">
            {site.shortDescription}
          </p>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-all duration-500" />
      </Link>
    );
  }

  // Default card
  return (
    <Link
      href={`/heritage/${site.slug}`}
      className="heritage-card group block rounded-xl overflow-hidden bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] hover:border-amber-600/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/20 hover:-translate-y-1"
      aria-label={`Explore ${site.name}`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[var(--hv-bg-elevated)]">
        <Image
          src={site.heroImage}
          alt={site.name}
          fill
          className="heritage-card-img object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--hv-bg-card)]/80 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <Badge label={site.category} variant="category" />
          {site.unescoStatus === "World Heritage Site" && (
            <Badge label="UNESCO" variant="unesco" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-base text-[var(--hv-text-primary)] group-hover:text-amber-300 transition-colors leading-snug mb-1">
          {site.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-[var(--hv-text-muted)] mb-3">
          <MapPin size={11} />
          <span>{site.city}, {site.state}</span>
        </div>

        <p className="text-xs text-[var(--hv-text-secondary)] line-clamp-2 leading-relaxed mb-4">
          {site.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[var(--hv-text-muted)]">
            <Calendar size={11} />
            <span>{site.historicalPeriod.split(" (")[0]}</span>
          </div>
          <span className="text-xs font-medium text-amber-500 group-hover:text-amber-300 transition-colors">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}
