import { NextRequest, NextResponse } from "next/server";
import {
  getAllHeritageSites,
  filterHeritageSites,
  searchHeritageSites,
  createHeritageSite,
} from "@/lib/services/heritage.service";
import type { HeritageSiteFilters } from "@/types";

// GET /api/heritage
// Query params: page, limit, query, state, region, historicalPeriod, architecturalStyle, category, unescoStatus
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("query");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "12", 10);

    // Build filter object from query params
    const filters: HeritageSiteFilters = {
      state: searchParams.get("state") ?? undefined,
      region: (searchParams.get("region") as any) ?? undefined,
      historicalPeriod: (searchParams.get("historicalPeriod") as any) ?? undefined,
      architecturalStyle: (searchParams.get("architecturalStyle") as any) ?? undefined,
      category: (searchParams.get("category") as any) ?? undefined,
      unescoStatus: (searchParams.get("unescoStatus") as any) ?? undefined,
    };

    const hasFilters = Object.values(filters).some(Boolean);

    if (query) {
      const results = await searchHeritageSites(query);
      return NextResponse.json({ data: results, total: results.length });
    }

    if (hasFilters) {
      const results = await filterHeritageSites(filters);
      return NextResponse.json({ data: results, total: results.length });
    }

    const result = await getAllHeritageSites({ page, limit });
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/heritage error:", error);
    return NextResponse.json(
      { error: "Failed to fetch heritage sites" },
      { status: 500 }
    );
  }
}

// POST /api/heritage — Create a new heritage site
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const site = await createHeritageSite(body);
    return NextResponse.json(site, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create heritage site";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
