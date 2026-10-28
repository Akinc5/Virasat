"use server";

import { auth } from "@/auth";
import { findPlace, findStay } from "@/data/travel";
import { listSaved, toggleSaved } from "@/lib/services/commerce";

/** Saves or unsaves a nearby place or stay to the visitor's trip. */
export async function toggleSaveItem(itemId: string): Promise<{ saved: boolean } | { login: true }> {
  const session = await auth();
  if (!session?.user?.id) return { login: true };
  const place = findPlace(itemId);
  const stay = place ? null : findStay(itemId);
  if (!place && !stay) return { saved: false };
  const saved = await toggleSaved({
    userId: session.user.id,
    itemId,
    kind: place ? "place" : "stay",
    siteSlug: (place ?? stay)!.slug,
    name: place ? place.place.name : stay!.stay.name,
  });
  return { saved };
}

export async function savedItemIds(siteSlug: string): Promise<string[]> {
  const session = await auth();
  if (!session?.user?.id) return [];
  return (await listSaved(session.user.id)).filter((s) => s.siteSlug === siteSlug).map((s) => s.itemId);
}
