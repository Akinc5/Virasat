import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore heritage sites",
  description: "Browse India's heritage sites by region, period, style and UNESCO status.",
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
