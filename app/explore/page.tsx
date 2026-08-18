"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { SearchInput } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { HeritageGrid } from "@/components/heritage/HeritageGrid";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { sampleHeritageSites, sampleStates } from "@/data/sample-heritage-sites";
import {
  REGIONS,
  HISTORICAL_PERIODS,
  ARCHITECTURAL_STYLES,
  HERITAGE_CATEGORIES,
  UNESCO_STATUSES,
} from "@/lib/utils/filters";
import type { HeritageSiteFilters } from "@/types";

const STATE_OPTIONS = [
  { label: "All States", value: "" },
  ...sampleStates.map((s) => ({ label: s, value: s })),
];

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<HeritageSiteFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: keyof HeritageSiteFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value || undefined }));
  };

  const clearFilters = () => {
    setFilters({});
    setQuery("");
  };

  const hasActiveFilters =
    query ||
    Object.values(filters).some((v) => v && v !== "");

  const filteredSites = useMemo(() => {
    return sampleHeritageSites.filter((site) => {
      if (query) {
        const q = query.toLowerCase();
        if (
          !site.name.toLowerCase().includes(q) &&
          !site.city.toLowerCase().includes(q) &&
          !site.state.toLowerCase().includes(q) &&
          !site.shortDescription.toLowerCase().includes(q)
        )
          return false;
      }
      if (filters.state && site.state !== filters.state) return false;
      if (filters.region && site.region !== filters.region) return false;
      if (filters.historicalPeriod && site.historicalPeriod !== filters.historicalPeriod) return false;
      if (filters.architecturalStyle && site.architecturalStyle !== filters.architecturalStyle) return false;
      if (filters.category && site.category !== filters.category) return false;
      if (filters.unescoStatus && site.unescoStatus !== filters.unescoStatus) return false;
      return true;
    });
  }, [query, filters]);

  return (
    <div className="min-h-screen pt-20">
      {/* Page Header */}
      <div className="bg-[var(--hv-bg-secondary)] border-b border-[var(--hv-bg-border)] py-10">
        <PageWrapper noTopPadding>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2">
              Heritage Directory
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--hv-text-primary)] mb-3">
              Explore India's Heritage
            </h1>
            <p className="text-[var(--hv-text-secondary)] text-sm leading-relaxed">
              Discover temples, forts, caves, and monuments spanning thousands of years of Indian civilization.
            </p>
          </div>
        </PageWrapper>
      </div>

      <PageWrapper className="py-8">
        {/* Search + Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchInput
            id="heritage-search"
            placeholder="Search heritage sites, cities, or states…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            wrapperClassName="flex-1"
            aria-label="Search heritage sites"
          />
          <Button
            variant={showFilters ? "primary" : "secondary"}
            leftIcon={<SlidersHorizontal size={16} />}
            onClick={() => setShowFilters(!showFilters)}
            id="toggle-filters-btn"
          >
            Filters
            {hasActiveFilters && (
              <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
            )}
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              leftIcon={<X size={14} />}
              onClick={clearFilters}
              id="clear-filters-btn"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 p-4 rounded-xl bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)]">
            <Select
              id="filter-state"
              label="State"
              options={STATE_OPTIONS}
              value={filters.state ?? ""}
              onChange={(e) => updateFilter("state", e.target.value)}
            />
            <Select
              id="filter-region"
              label="Region"
              options={REGIONS}
              value={filters.region ?? ""}
              onChange={(e) => updateFilter("region", e.target.value as any)}
            />
            <Select
              id="filter-period"
              label="Period"
              options={HISTORICAL_PERIODS}
              value={filters.historicalPeriod ?? ""}
              onChange={(e) => updateFilter("historicalPeriod", e.target.value as any)}
            />
            <Select
              id="filter-style"
              label="Architecture"
              options={ARCHITECTURAL_STYLES}
              value={filters.architecturalStyle ?? ""}
              onChange={(e) => updateFilter("architecturalStyle", e.target.value as any)}
            />
            <Select
              id="filter-category"
              label="Category"
              options={HERITAGE_CATEGORIES}
              value={filters.category ?? ""}
              onChange={(e) => updateFilter("category", e.target.value as any)}
            />
            <Select
              id="filter-unesco"
              label="UNESCO"
              options={UNESCO_STATUSES}
              value={filters.unescoStatus ?? ""}
              onChange={(e) => updateFilter("unescoStatus", e.target.value as any)}
            />
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[var(--hv-text-muted)]">
            <span className="text-amber-400 font-semibold">{filteredSites.length}</span>{" "}
            {filteredSites.length === 1 ? "site" : "sites"} found
          </p>
        </div>

        {/* Grid */}
        <HeritageGrid sites={filteredSites} />
      </PageWrapper>
    </div>
  );
}
