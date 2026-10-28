"use server";

import { redirect } from "next/navigation";
import { findBook } from "@/data/heritage-books";
import { requireUser } from "@/lib/auth/guards";
import { cancelOwnOrder, createOrder } from "@/lib/services/commerce";
import { revalidatePath } from "next/cache";

function text(form: FormData, name: string, max = 120) {
  const v = form.get(name);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function placeOrder(form: FormData) {
  const bookId = text(form, "bookId", 60);
  const user = await requireUser(`/library/order/${bookId}`);
  const book = findBook(bookId);
  if (!book) redirect("/library");

  const shipping = {
    fullName: text(form, "fullName"),
    phone: text(form, "phone", 20),
    line1: text(form, "line1", 200),
    city: text(form, "city"),
    state: text(form, "state"),
    pincode: text(form, "pincode", 6),
  };
  const quantity = Math.min(10, Math.max(1, Number(text(form, "quantity", 2)) || 1));
  const format = text(form, "format") === "hardcover" ? "hardcover" : "paperback";

  const missing = Object.entries(shipping).find(([, v]) => !v);
  const badPhone = !/^[6-9]\d{9}$/.test(shipping.phone.replace(/\D/g, "").slice(-10));
  const badPin = !/^\d{6}$/.test(shipping.pincode);
  if (missing || badPhone || badPin) {
    const error = missing ? "missing" : badPhone ? "phone" : "pincode";
    redirect(`/library/order/${bookId}?error=${error}`);
  }

  const order = await createOrder({
    userId: user.id,
    userEmail: user.email,
    userName: user.name ?? shipping.fullName,
    bookId: book.id,
    bookTitle: book.title,
    siteSlug: book.siteSlug,
    quantity,
    format,
    shipping,
    note: text(form, "note", 300) || undefined,
  });
  redirect(`/account?ordered=${order.id}`);
}

export async function cancelOrder(form: FormData) {
  const user = await requireUser();
  const id = text(form, "orderId", 40);
  await cancelOwnOrder(id, user.id).catch(() => {});
  revalidatePath("/account");
}
