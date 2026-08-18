import { NextRequest, NextResponse } from "next/server";
import {
  getHeritageSiteBySlug,
  updateHeritageSite,
  deleteHeritageSite,
} from "@/lib/services/heritage.service";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

// GET /api/heritage/[slug]
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const site = await getHeritageSiteBySlug(slug);

    if (!site) {
      return NextResponse.json(
        { error: `Heritage site '${slug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(site);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch heritage site" },
      { status: 500 }
    );
  }
}

// PUT /api/heritage/[slug]
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const existing = await getHeritageSiteBySlug(slug);

    if (!existing) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    const body = await request.json();
    const updated = await updateHeritageSite(existing.id, body);
    return NextResponse.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update site";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/heritage/[slug]
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const existing = await getHeritageSiteBySlug(slug);

    if (!existing) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    await deleteHeritageSite(existing.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete site";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
