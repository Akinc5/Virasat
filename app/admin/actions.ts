"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guards";
import { setUserRole } from "@/lib/auth/users";
import { ORDER_STATUSES, updateOrderStatus, type OrderStatus } from "@/lib/services/commerce";

export async function setOrderStatus(form: FormData) {
  await requireAdmin();
  const id = String(form.get("orderId") ?? "");
  const status = String(form.get("status") ?? "") as OrderStatus;
  if (!ORDER_STATUSES.includes(status)) return;
  await updateOrderStatus(id, status).catch(() => {});
  revalidatePath("/admin");
}

export async function changeUserRole(form: FormData) {
  const admin = await requireAdmin();
  const email = String(form.get("email") ?? "");
  const role = form.get("role") === "admin" ? "admin" : "user";
  // Don't let an admin remove their own access by accident
  if (email === admin.email && role !== "admin") return;
  await setUserRole(email, role).catch(() => {});
  revalidatePath("/admin");
}
