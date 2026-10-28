import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Award, Box } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { realModels } from "@/lib/models";
import type { HeritageSite } from "@/types";

interface HeritageHeroProps {
  site: HeritageSite;
}

export function HeritageHero({ site }: HeritageHeroProps) {
  const has3D = realModels(site).length > 0 || Boolean(site.sketchfabModelId);

  return (
    <section className="relative min-h-[80vh] flex items-end overflow-hidden" aria-label={`${site.name} hero`}>
      <div className="absolute inset-0 select-none">
        <Image src={site.heroImage} alt={site.name} fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--hv-bg-primary)] via-[var(--hv-bg-primary)]/45 to-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--hv-bg-primary)]/65 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 w-full">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-[var(--hv-text-muted)]">
            <li>
              <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/explore" className="hover:text-amber-600 transition-colors">Explore</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-amber-600" aria-current="page">{site.name}</li>
          </ol>
        </nav>

        <div className="max-w-3xl animate-fade-in-up">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge label={site.category} variant="category" />
            {site.unescoStatus === "World Heritage Site" && <Badge label="UNESCO World Heritage Site" variant="unesco" />}
            <Badge label={site.architecturalStyle} variant="period" />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">{site.name}</h1>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--hv-text-primary)] mb-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={15} className="text-amber-600" />
              {site.city}, {site.state}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={15} className="text-amber-600" />
              {site.historicalPeriod}
            </span>
            {site.yearBuilt && (
              <span className="flex items-center gap-1.5">
                <Award size={15} className="text-amber-600" />
                Built {site.yearBuilt > 0 ? `${site.yearBuilt} CE` : `${Math.abs(site.yearBuilt)} BCE`}
              </span>
            )}
          </div>

          <p className="text-[var(--hv-text-secondary)] text-base md:text-lg leading-relaxed mb-8 max-w-2xl font-serif">
            {site.shortDescription}
          </p>

          {has3D && (
            <Link href={`/experience/${site.slug}`}>
              <Button
                variant="gold"
                size="lg"
                leftIcon={<Box size={16} />}
                className="bg-amber-600 hover:bg-amber-500 text-white border-0 shadow-lg"
              >
                Explore in 3D
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
