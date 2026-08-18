// ============================================================
// HeritageVerse — Filter Constants
// Centralized filter options for reuse across components
// ============================================================

import type {
  Region,
  HistoricalPeriod,
  ArchitecturalStyle,
  HeritageCategory,
  UnescoStatus,
  FilterOption,
} from "@/types";

export const REGIONS: FilterOption[] = [
  { label: "All Regions", value: "" },
  { label: "North India", value: "North India" as Region },
  { label: "South India", value: "South India" as Region },
  { label: "East India", value: "East India" as Region },
  { label: "West India", value: "West India" as Region },
  { label: "Central India", value: "Central India" as Region },
  { label: "Northeast India", value: "Northeast India" as Region },
];

export const HISTORICAL_PERIODS: FilterOption[] = [
  { label: "All Periods", value: "" },
  { label: "Ancient (Before 600 CE)", value: "Ancient (Before 600 CE)" as HistoricalPeriod },
  { label: "Early Medieval (600–1200 CE)", value: "Early Medieval (600–1200 CE)" as HistoricalPeriod },
  { label: "Medieval (1200–1526 CE)", value: "Medieval (1200–1526 CE)" as HistoricalPeriod },
  { label: "Mughal Era (1526–1857 CE)", value: "Mughal Era (1526–1857 CE)" as HistoricalPeriod },
  { label: "Colonial Era (1857–1947)", value: "Colonial Era (1857–1947)" as HistoricalPeriod },
  { label: "Modern (Post 1947)", value: "Modern (Post 1947)" as HistoricalPeriod },
];

export const ARCHITECTURAL_STYLES: FilterOption[] = [
  { label: "All Styles", value: "" },
  { label: "Dravidian", value: "Dravidian" as ArchitecturalStyle },
  { label: "Nagara", value: "Nagara" as ArchitecturalStyle },
  { label: "Vesara", value: "Vesara" as ArchitecturalStyle },
  { label: "Mughal", value: "Mughal" as ArchitecturalStyle },
  { label: "Indo-Islamic", value: "Indo-Islamic" as ArchitecturalStyle },
  { label: "Buddhist", value: "Buddhist" as ArchitecturalStyle },
  { label: "Jain", value: "Jain" as ArchitecturalStyle },
  { label: "Rock-Cut", value: "Rock-Cut" as ArchitecturalStyle },
  { label: "Rajput", value: "Rajput" as ArchitecturalStyle },
  { label: "Colonial", value: "Colonial" as ArchitecturalStyle },
  { label: "Kerala", value: "Kerala" as ArchitecturalStyle },
];

export const HERITAGE_CATEGORIES: FilterOption[] = [
  { label: "All Categories", value: "" },
  { label: "Temple", value: "Temple" as HeritageCategory },
  { label: "Fort", value: "Fort" as HeritageCategory },
  { label: "Palace", value: "Palace" as HeritageCategory },
  { label: "Cave", value: "Cave" as HeritageCategory },
  { label: "Monument", value: "Monument" as HeritageCategory },
  { label: "Mosque", value: "Mosque" as HeritageCategory },
  { label: "Church", value: "Church" as HeritageCategory },
  { label: "Ruins", value: "Ruins" as HeritageCategory },
  { label: "Archaeological Site", value: "Archaeological Site" as HeritageCategory },
];

export const UNESCO_STATUSES: FilterOption[] = [
  { label: "All", value: "" },
  { label: "UNESCO World Heritage Site", value: "World Heritage Site" as UnescoStatus },
  { label: "Tentative List", value: "Tentative List" as UnescoStatus },
  { label: "No Status", value: "None" as UnescoStatus },
];

export const CATEGORY_COLORS: Record<string, string> = {
  Temple: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Fort: "bg-red-500/20 text-red-300 border-red-500/30",
  Palace: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Cave: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Monument: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Mosque: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  Ruins: "bg-stone-500/20 text-stone-300 border-stone-500/30",
  "Archaeological Site": "bg-green-500/20 text-green-300 border-green-500/30",
  Other: "bg-gray-500/20 text-gray-300 border-gray-500/30",
};
