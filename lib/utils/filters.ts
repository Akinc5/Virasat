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
  Temple: "bg-[#FDF6E2] text-[#8C6D39] border-[#EAD8B1]/40",
  Fort: "bg-[#FAF0ED] text-[#9A5B4D] border-[#ECC8C0]/40",
  Palace: "bg-[#F8F1F5] text-[#8A6D7C] border-[#E1D1DC]/40",
  Cave: "bg-[#F3F5F6] text-[#5A6D7C] border-[#D7DFE3]/40",
  Monument: "bg-[#EDF2F4] text-[#4C697B] border-[#CFDCE3]/40",
  Mosque: "bg-[#EDF5F2] text-[#467868] border-[#CFE6DD]/40",
  Ruins: "bg-[#FAF7F2] text-[#6B5E52] border-[#E1D8CC]/40",
  "Archaeological Site": "bg-[#F3F5ED] text-[#5C6E43] border-[#D6DFCA]/40",
  Other: "bg-[#FAF9F5] text-[#8A7F73] border-[#EBE8DF]/40",
};
