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
  // Extract number from id (e.g. site_01 -> 01)
  const indexStr = site.id.startsWith("site_")
    ? site.id.replace("site_", "")
    : "01";

  if (variant === "compact") {
    return (
      <Link
        href={`/heritage/${site.slug}`}
        className="heritage-card group flex gap-4 p-3 rounded-sm bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] hover:border-[var(--hv-gold)] transition-all duration-300"
        aria-label={`View ${site.name}`}
      >
        <div className="relative w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 bg-[var(--hv-bg-elevated)] border border-[var(--hv-bg-border)]">
          <Image
            src={site.heroImage}
            alt={site.name}
            fill
            className="heritage-card-img object-cover"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <p className="text-[9px] font-semibold tracking-wider text-[var(--hv-blue)] uppercase">{site.category}</p>
          <h3 className="font-display font-medium text-xs text-[var(--hv-text-primary)] truncate group-hover:text-[var(--hv-blue)] transition-colors mt-0.5">
            {site.name}
          </h3>
          <p className="text-[10px] text-[var(--hv-text-secondary)] font-serif italic mt-0.5">
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
        className="heritage-card group block bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] p-4 hover:border-[var(--hv-gold)] transition-all duration-500 hover:-translate-y-1 hover:shadow-sm hover:shadow-[#6B5E52]/5"
        aria-label={`Explore ${site.name}`}
      >
        {/* Custom Framing Variations based on Monument Slugs */}
        {site.slug === "taj-mahal" && (
          <div className="arch-frame-tall aspect-[4/5] w-full overflow-hidden mb-5">
            <div className="arch-image-mask w-full h-full relative">
              <Image
                src={site.heroImage}
                alt={site.name}
                fill
                className="heritage-card-img object-cover object-center"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--hv-bg-primary)]/10 to-transparent" />
            </div>
          </div>
        )}

        {site.slug === "hampi" && (
          <div className="rect-frame-double aspect-[16/10] w-full overflow-hidden mb-5">
            <div className="relative w-full h-full">
              <Image
                src={site.heroImage}
                alt={site.name}
                fill
                className="heritage-card-img object-cover object-center"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--hv-bg-primary)]/10 to-transparent" />
            </div>
          </div>
        )}

        {site.slug === "konark-sun-temple" && (
          <div className="geo-frame-bracket aspect-square w-full overflow-hidden mb-5">
            <div className="relative w-full h-full">
              <div className="museum-bracket-top-left" />
              <div className="museum-bracket-top-right" />
              <div className="museum-bracket-bottom-left" />
              <div className="museum-bracket-bottom-right" />
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={site.heroImage}
                  alt={site.name}
                  fill
                  className="heritage-card-img object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--hv-bg-primary)]/10 to-transparent" />
              </div>
            </div>
          </div>
        )}

        {site.slug !== "taj-mahal" && site.slug !== "hampi" && site.slug !== "konark-sun-temple" && (
          <div className="border border-[var(--hv-bg-border)] aspect-[4/5] w-full overflow-hidden mb-5 relative">
            <Image
              src={site.heroImage}
              alt={site.name}
              fill
              className="heritage-card-img object-cover object-center"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
        )}

        {/* Card Metadata */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-[9px] tracking-[0.25em] font-semibold text-[var(--hv-blue)] uppercase">
            {site.category}
          </span>
          <span className="font-serif italic text-xs tracking-wider text-[var(--hv-gold)]">
            No. {indexStr}
          </span>
        </div>

        {/* Card Title */}
        <h3 className="font-display font-medium text-lg text-[var(--hv-text-primary)] group-hover:text-[var(--hv-blue-dark)] transition-colors leading-tight">
          {site.name}
        </h3>

        {/* Location Info */}
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[var(--hv-text-secondary)]">
          <MapPin size={11} className="text-[var(--hv-blue)]" />
          <span>{site.city}, {site.state}</span>
        </div>

        {/* Short description */}
        <p className="text-xs text-[var(--hv-text-secondary)] font-serif italic mt-3.5 leading-relaxed line-clamp-3">
          {site.shortDescription}
        </p>

        {/* Explore indicator */}
        <div className="border-t border-[var(--hv-bg-border)] mt-4 pt-3 flex items-center justify-between text-[10px] font-semibold tracking-widest uppercase text-[var(--hv-text-secondary)] group-hover:text-[var(--hv-gold)] transition-colors">
          <span>Catalog Entry</span>
          <span>View Archive →</span>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link
      href={`/heritage/${site.slug}`}
      className="heritage-card group block rounded-sm overflow-hidden bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] hover:border-[var(--hv-gold)] transition-all duration-500 hover:shadow-sm hover:shadow-[#6B5E52]/5 hover:-translate-y-1"
      aria-label={`Explore ${site.name}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-[var(--hv-bg-elevated)] border-b border-[var(--hv-bg-border)]">
        <Image
          src={site.heroImage}
          alt={site.name}
          fill
          className="heritage-card-img object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--hv-bg-primary)]/40 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <Badge label={site.category} variant="category" />
          {site.unescoStatus === "World Heritage Site" && (
            <Badge label="UNESCO" variant="unesco" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-medium text-base text-[var(--hv-text-primary)] group-hover:text-[var(--hv-blue-dark)] transition-colors leading-snug mb-1">
          {site.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-[var(--hv-text-secondary)] mb-3">
          <MapPin size={11} className="text-[var(--hv-blue)]" />
          <span>{site.city}, {site.state}</span>
        </div>

        <p className="text-xs text-[var(--hv-text-secondary)] font-serif italic line-clamp-2 leading-relaxed mb-4">
          {site.shortDescription}
        </p>

        <div className="flex items-center justify-between border-t border-[var(--hv-bg-border)] pt-3 text-[10px] font-semibold tracking-wider uppercase">
          <div className="flex items-center gap-1.5 text-[var(--hv-text-secondary)]">
            <Calendar size={11} className="text-[var(--hv-blue)]" />
            <span>{site.historicalPeriod.split(" (")[0]}</span>
          </div>
          <span className="text-[var(--hv-gold)] group-hover:text-[var(--hv-blue-dark)] transition-colors">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}
