import Image from "next/image";
import { MapPin, Calendar, Award } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { HeritageSite } from "@/types";

interface HeritageHeroProps {
  site: HeritageSite;
}

export function HeritageHero({ site }: HeritageHeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-end" aria-label={`${site.name} hero`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={site.heroImage}
          alt={site.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--hv-bg-primary)] via-[var(--hv-bg-primary)]/50 to-[var(--hv-bg-primary)]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--hv-bg-primary)]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-[var(--hv-text-muted)]">
            <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/explore" className="hover:text-amber-400 transition-colors">Explore</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-amber-400" aria-current="page">{site.name}</li>
          </ol>
        </nav>

        <div className="max-w-3xl animate-fade-in-up">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge label={site.category} variant="category" />
            {site.unescoStatus === "World Heritage Site" && (
              <Badge label="UNESCO World Heritage Site" variant="unesco" />
            )}
            <Badge label={site.architecturalStyle} variant="period" />
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
            {site.name}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap gap-5 text-sm text-white/70 mb-6">
            <div className="flex items-center gap-1.5">
              <MapPin size={15} className="text-amber-400" />
              <span>{site.city}, {site.state}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={15} className="text-amber-400" />
              <span>{site.historicalPeriod}</span>
            </div>
            {site.yearBuilt && (
              <div className="flex items-center gap-1.5">
                <Award size={15} className="text-amber-400" />
                <span>Built {site.yearBuilt > 0 ? `${site.yearBuilt} CE` : `${Math.abs(site.yearBuilt)} BCE`}</span>
              </div>
            )}
          </div>

          {/* Short description */}
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl font-serif">
            {site.shortDescription}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link href={`/experience/${site.slug}`}>
              <Button variant="gold" size="lg" leftIcon={<span aria-hidden>🎮</span>}>
                Launch 3D Experience
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              View Gallery
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
