import Link from "next/link";
import { HeritageCard } from "./HeritageCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import type { HeritageSite } from "@/types";

interface RelatedSitesProps {
  sites: HeritageSite[];
  currentSiteId: string;
}

export function RelatedSites({ sites, currentSiteId }: RelatedSitesProps) {
  const filtered = sites.filter((s) => s.id !== currentSiteId).slice(0, 3);

  if (filtered.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-[var(--hv-text-primary)]">
          Related Heritage Sites
        </h2>
        <Link href="/explore">
          <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={14} />}>
            View All
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((site) => (
          <HeritageCard key={site.id} site={site} variant="default" />
        ))}
      </div>
    </div>
  );
}
