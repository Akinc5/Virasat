// ============================================================
// Book orders, saved trip items and partner (affiliate) clicks.
// Server-only: all reads and writes go through lib/store.
// ============================================================

import { randomUUID } from "node:crypto";
import { collection } from "@/lib/store";

// ── Book orders ─────────────────────────────────────────────
export const ORDER_STATUSES = ["requested", "confirmed", "shipped", "delivered", "cancelled"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface BookOrder {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  bookId: string;
  bookTitle: string;
  siteSlug: string;
  quantity: number;
  format: "paperback" | "hardcover";
  shipping: { fullName: string; phone: string; line1: string; city: string; state: string; pincode: string };
  note?: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

const orders = collection<BookOrder>("orders");

export async function createOrder(input: Omit<BookOrder, "id" | "status" | "createdAt" | "updatedAt">) {
  const now = new Date().toISOString();
  const order: BookOrder = { ...input, id: `VRS-${Date.now().toString(36).toUpperCase()}`, status: "requested", createdAt: now, updatedAt: now };
  await orders.set(order.id, order);
  return order;
}

export async function listOrders(filter?: { userId?: string }) {
  const all = await orders.list();
  return all.filter((o) => !filter?.userId || o.userId === filter.userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const order = await orders.get(id);
  if (!order) throw new Error("NOT_FOUND");
  await orders.set(id, { ...order, status, updatedAt: new Date().toISOString() });
}

export async function cancelOwnOrder(id: string, userId: string) {
  const order = await orders.get(id);
  if (!order || order.userId !== userId) throw new Error("NOT_FOUND");
  if (order.status !== "requested") throw new Error("LOCKED");
  await orders.set(id, { ...order, status: "cancelled", updatedAt: new Date().toISOString() });
}

// ── Saved trip items ────────────────────────────────────────
export interface SavedItem {
  userId: string;
  itemId: string; // place or stay id from data/travel.ts
  kind: "place" | "stay";
  siteSlug: string;
  name: string;
  savedAt: string;
}

const saved = collection<SavedItem>("saved");
const savedKey = (userId: string, itemId: string) => `${userId}__${itemId}`;

export async function toggleSaved(item: Omit<SavedItem, "savedAt">) {
  const key = savedKey(item.userId, item.itemId);
  if (await saved.get(key)) {
    await saved.delete(key);
    return false;
  }
  await saved.set(key, { ...item, savedAt: new Date().toISOString() });
  return true;
}

export async function listSaved(userId?: string) {
  return (await saved.list())
    .filter((s) => !userId || s.userId === userId)
    .sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

// ── Partner clicks (Booking.com, bookshops) ─────────────────
export interface PartnerClick {
  id: string;
  kind: "stay" | "book";
  partner: string;
  itemId: string;
  label: string;
  siteSlug: string;
  userId?: string;
  at: string;
}

const clicks = collection<PartnerClick>("clicks");

export async function recordClick(click: Omit<PartnerClick, "id" | "at">) {
  const id = randomUUID();
  await clicks.set(id, { ...click, id, at: new Date().toISOString() });
}

export async function listClicks(sinceDays?: number) {
  const since = sinceDays ? Date.now() - sinceDays * 864e5 : 0;
  return (await clicks.list()).filter((c) => new Date(c.at).getTime() > since).sort((a, b) => b.at.localeCompare(a.at));
}
