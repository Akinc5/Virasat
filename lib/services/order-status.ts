import type { OrderStatus } from "@/lib/services/commerce";

export const STATUS_STYLE: Record<OrderStatus, string> = {
  requested: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-sky-50 text-sky-700 border-sky-200",
  shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-stone-100 text-stone-500 border-stone-200",
};
