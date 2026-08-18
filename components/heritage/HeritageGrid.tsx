import { HeritageCard } from "./HeritageCard";
import { SkeletonCard } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import type { HeritageSite } from "@/types";

interface HeritageGridProps {
  sites: HeritageSite[];
  isLoading?: boolean;
  className?: string;
}

export function HeritageGrid({
  sites,
  isLoading = false,
  className,
}: HeritageGridProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          className
        )}
        aria-busy="true"
        aria-label="Loading heritage sites"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (sites.length === 0) {
    return (
      <EmptyState
        title="No heritage sites found"
        description="Try adjusting your search or filters to discover more of India's incredible heritage."
        icon={Search}
      />
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
      aria-label={`${sites.length} heritage sites`}
    >
      {sites.map((site) => (
        <HeritageCard key={site.id} site={site} variant="default" />
      ))}
    </div>
  );
}
