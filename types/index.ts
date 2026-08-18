// ============================================================
// HeritageVerse — Shared TypeScript Types & Interfaces
// These types are the single source of truth for the entire app.
// All components, services, and API routes should import from here.
// ============================================================

export type HeritageCategory =
  | "Temple"
  | "Fort"
  | "Palace"
  | "Cave"
  | "Monument"
  | "Mosque"
  | "Church"
  | "Stepwell"
  | "Ruins"
  | "Archaeological Site"
  | "Nature & Heritage"
  | "Other";

export type Region =
  | "North India"
  | "South India"
  | "East India"
  | "West India"
  | "Central India"
  | "Northeast India";

export type HistoricalPeriod =
  | "Ancient (Before 600 CE)"
  | "Early Medieval (600–1200 CE)"
  | "Medieval (1200–1526 CE)"
  | "Mughal Era (1526–1857 CE)"
  | "Colonial Era (1857–1947)"
  | "Modern (Post 1947)";

export type ArchitecturalStyle =
  | "Dravidian"
  | "Nagara"
  | "Vesara"
  | "Mughal"
  | "Indo-Islamic"
  | "Buddhist"
  | "Jain"
  | "Colonial"
  | "Rock-Cut"
  | "Rajput"
  | "Kerala"
  | "Other";

export type UnescoStatus = "World Heritage Site" | "Tentative List" | "None";

export type MediaType = "image" | "video" | "panorama" | "360";

export type ModelFormat = "glb" | "gltf" | "obj" | "fbx";

// ────────────────────────────────────────────────────────────
// Core Data Models (mirrors Prisma schema)
// ────────────────────────────────────────────────────────────

export interface TimelineEvent {
  id: string;
  heritageSiteId: string;
  year: number;
  title: string;
  description: string;
}

export interface Media {
  id: string;
  heritageSiteId: string;
  type: MediaType;
  url: string;
  title?: string;
  description?: string;
  createdAt: Date | string;
}

export interface ThreeDModel {
  id: string;
  heritageSiteId: string;
  modelUrl: string;
  thumbnailUrl?: string;
  format: ModelFormat;
  fileSize?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface HeritageSite {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  state: string;
  city: string;
  region: Region;
  latitude: number;
  longitude: number;
  historicalPeriod: HistoricalPeriod;
  architecturalStyle: ArchitecturalStyle;
  category: HeritageCategory;
  unescoStatus: UnescoStatus;
  yearBuilt?: number;
  history: string;
  architecture: string;
  culturalSignificance: string;
  heroImage: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  // Relations (optional — may not always be loaded)
  media?: Media[];
  threeDModels?: ThreeDModel[];
  timelineEvents?: TimelineEvent[];
}

// ────────────────────────────────────────────────────────────
// API / Service Layer Types
// ────────────────────────────────────────────────────────────

export interface HeritageSiteFilters {
  state?: string;
  region?: Region;
  historicalPeriod?: HistoricalPeriod;
  architecturalStyle?: ArchitecturalStyle;
  category?: HeritageCategory;
  unescoStatus?: UnescoStatus;
  query?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ────────────────────────────────────────────────────────────
// Component Prop Types (shared across components)
// ────────────────────────────────────────────────────────────

export interface HeritageCardProps {
  site: HeritageSite;
  variant?: "default" | "compact" | "featured";
}

export interface FilterOption {
  label: string;
  value: string;
}

// ────────────────────────────────────────────────────────────
// Admin Types
// ────────────────────────────────────────────────────────────

export interface AdminStats {
  totalSites: number;
  totalMedia: number;
  totalModels: number;
  totalUsers: number;
}

export type AdminSection =
  | "dashboard"
  | "heritage-sites"
  | "media"
  | "3d-models"
  | "users"
  | "analytics";
