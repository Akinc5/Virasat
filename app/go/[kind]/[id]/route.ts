// Outbound partner links (Booking.com stays, online bookshops).
// Only known ids are accepted — never a URL from the query string — so
// this can't be used as an open redirect. Each click is counted for the
// admin dashboard's partner report.

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { bookingUrl, findStay } from "@/data/travel";
import { bookshopUrl, findBook } from "@/data/heritage-books";
import { recordClick } from "@/lib/services/commerce";

export async function GET(req: Request, { params }: { params: Promise<{ kind: string; id: string }> }) {
  const { kind, id } = await params;
  const userId = (await auth())?.user?.id;
  const url = new URL(req.url);

  if (kind === "stay") {
    const hit = findStay(id);
    if (!hit) return NextResponse.json({ error: "Unknown stay" }, { status: 404 });
    const dates = [url.searchParams.get("checkin"), url.searchParams.get("checkout")];
    const valid = dates.every((d) => !d || /^\d{4}-\d{2}-\d{2}$/.test(d));
    await recordClick({ kind: "stay", partner: "booking.com", itemId: id, label: hit.stay.name, siteSlug: hit.slug, userId }).catch(() => {});
    return NextResponse.redirect(bookingUrl(hit.stay, valid ? (dates[0] ?? undefined) : undefined, valid ? (dates[1] ?? undefined) : undefined));
  }

  if (kind === "book") {
    const book = findBook(id);
    if (!book) return NextResponse.json({ error: "Unknown book" }, { status: 404 });
    await recordClick({ kind: "book", partner: "amazon.in", itemId: id, label: book.title, siteSlug: book.siteSlug, userId }).catch(() => {});
    return NextResponse.redirect(bookshopUrl(book));
  }

  return NextResponse.json({ error: "Unknown link" }, { status: 404 });
}
