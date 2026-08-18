// ============================================================
// HeritageVerse — Heritage Service Layer
//
// These functions abstract data access. Currently they use
// in-memory sample data. When the database is connected,
// swap the implementation to use the Prisma client.
//
// Usage: import { getAllHeritageSites } from "@/lib/services/heritage.service"
// ============================================================

import type {
  HeritageSite,
  HeritageSiteFilters,
  PaginatedResponse,
  PaginationParams,
} from "@/types";
import {
  sampleHeritageSites,
  getSampleSiteBySlug,
} from "@/data/sample-heritage-sites";

// ────────────────────────────────────────────────────────────
// Read Operations
// ────────────────────────────────────────────────────────────

/**
 * Get all heritage sites with optional pagination.
 * TODO: Replace with prisma.heritageSite.findMany() when DB is connected.
 */
export async function getAllHeritageSites(
  params?: PaginationParams
): Promise<PaginatedResponse<HeritageSite>> {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 12;
  const start = (page - 1) * limit;
  const data = sampleHeritageSites.slice(start, start + limit);

  return {
    data,
    total: sampleHeritageSites.length,
    page,
    limit,
    hasMore: start + limit < sampleHeritageSites.length,
  };
}

/**
 * Get a single heritage site by its URL slug.
 * TODO: Replace with prisma.heritageSite.findUnique({ where: { slug } })
 */
export async function getHeritageSiteBySlug(
  slug: string
): Promise<HeritageSite | null> {
  return getSampleSiteBySlug(slug) ?? null;
}

/**
 * Full-text search across name, description, city, and state.
 * TODO: Replace with Prisma full-text search or Postgres tsvector.
 */
export async function searchHeritageSites(
  query: string
): Promise<HeritageSite[]> {
  const q = query.toLowerCase();
  return sampleHeritageSites.filter(
    (site) =>
      site.name.toLowerCase().includes(q) ||
      site.description.toLowerCase().includes(q) ||
      site.city.toLowerCase().includes(q) ||
      site.state.toLowerCase().includes(q)
  );
}

/**
 * Filter heritage sites by one or more criteria.
 * Filters are applied cumulatively (AND logic).
 * TODO: Replace with Prisma where clause.
 */
export async function filterHeritageSites(
  filters: HeritageSiteFilters
): Promise<HeritageSite[]> {
  return sampleHeritageSites.filter((site) => {
    if (filters.state && site.state !== filters.state) return false;
    if (filters.region && site.region !== filters.region) return false;
    if (
      filters.historicalPeriod &&
      site.historicalPeriod !== filters.historicalPeriod
    )
      return false;
    if (
      filters.architecturalStyle &&
      site.architecturalStyle !== filters.architecturalStyle
    )
      return false;
    if (filters.category && site.category !== filters.category) return false;
    if (filters.unescoStatus && site.unescoStatus !== filters.unescoStatus)
      return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      if (
        !site.name.toLowerCase().includes(q) &&
        !site.city.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });
}

/**
 * Get related sites (same category or region, excluding current site).
 */
export async function getRelatedSites(
  siteId: string,
  limit = 3
): Promise<HeritageSite[]> {
  const current = sampleHeritageSites.find((s) => s.id === siteId);
  if (!current) return [];

  return sampleHeritageSites
    .filter(
      (site) =>
        site.id !== siteId &&
        (site.category === current.category || site.region === current.region)
    )
    .slice(0, limit);
}

// ────────────────────────────────────────────────────────────
// Write Operations (stubs — activate when DB is connected)
// ────────────────────────────────────────────────────────────

/**
 * Create a new heritage site.
 * TODO: Implement with prisma.heritageSite.create()
 */
export async function createHeritageSite(
  data: Omit<HeritageSite, "id" | "createdAt" | "updatedAt">
): Promise<HeritageSite> {
  throw new Error("createHeritageSite: Database not connected yet.");
}

/**
 * Update an existing heritage site.
 * TODO: Implement with prisma.heritageSite.update()
 */
export async function updateHeritageSite(
  id: string,
  data: Partial<HeritageSite>
): Promise<HeritageSite> {
  throw new Error("updateHeritageSite: Database not connected yet.");
}

/**
 * Delete a heritage site.
 * TODO: Implement with prisma.heritageSite.delete()
 */
export async function deleteHeritageSite(id: string): Promise<void> {
  throw new Error("deleteHeritageSite: Database not connected yet.");
}
