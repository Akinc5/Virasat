import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { findBook } from "@/data/heritage-books";
import { sampleHeritageSites } from "@/data/sample-heritage-sites";
import { BookCard } from "@/components/books/BookCard";
import { Field, inputClass } from "@/components/ui/FormField";
import { requireUser } from "@/lib/auth/guards";
import { placeOrder } from "../../actions";

export const metadata: Metadata = { title: "Order a book" };

const ERRORS: Record<string, string> = {
  missing: "Please fill in every delivery field.",
  phone: "Please enter a valid 10-digit Indian mobile number.",
  pincode: "Please enter a valid 6-digit PIN code.",
};

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ bookId: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { bookId } = await params;
  const book = findBook(bookId);
  if (!book) notFound();
  const user = await requireUser(`/library/order/${bookId}`);
  const { error } = await searchParams;
  const site = sampleHeritageSites.find((s) => s.slug === book.siteSlug);

  return (
    <div className="bg-[var(--hv-bg-primary)] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/library" className="inline-flex items-center gap-1.5 text-sm text-[var(--hv-text-muted)] hover:text-[var(--hv-text-primary)] mb-6">
          <ArrowLeft size={15} /> Back to the library
        </Link>
        <h1 className="font-display text-3xl md:text-4xl font-medium text-[var(--hv-text-primary)] mb-8">Order this book</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <BookCard book={book} siteName={site?.name} compact />
            <p className="mt-4 flex gap-2 text-xs text-[var(--hv-text-muted)] leading-relaxed">
              <ShieldCheck size={15} className="shrink-0 text-[var(--hv-gold-muted)]" />
              No payment now. We confirm the price and stock by email within 24 hours; you pay on confirmation or on delivery.
            </p>
          </div>

          <form action={placeOrder} className="lg:col-span-3 rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] p-6 space-y-5">
            <input type="hidden" name="bookId" value={book.id} />
            {error && (
              <p role="alert" className="rounded-lg border border-rose-300/60 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                {ERRORS[error] ?? ERRORS.missing}
              </p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-xs font-medium text-[var(--hv-text-secondary)] mb-1.5">Format</span>
                <select name="format" className={inputClass} defaultValue="paperback">
                  <option value="paperback">Paperback</option>
                  <option value="hardcover">Hardcover</option>
                </select>
              </label>
              <Field label="Quantity" name="quantity" type="number" min={1} max={10} defaultValue={1} required />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--hv-blue)] pt-2">Deliver to</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name" name="fullName" autoComplete="name" defaultValue={user.name ?? ""} required />
              <Field label="Mobile number" name="phone" type="tel" autoComplete="tel" inputMode="numeric" placeholder="10-digit mobile" required />
              <Field label="Address" name="line1" autoComplete="street-address" className="sm:col-span-2" required />
              <Field label="City" name="city" autoComplete="address-level2" required />
              <Field label="State" name="state" autoComplete="address-level1" required />
              <Field label="PIN code" name="pincode" inputMode="numeric" maxLength={6} autoComplete="postal-code" required />
            </div>
            <label className="block">
              <span className="block text-xs font-medium text-[var(--hv-text-secondary)] mb-1.5">Note (optional)</span>
              <textarea name="note" rows={2} maxLength={300} className={inputClass} placeholder="For a school library? Need an invoice? Tell us here." />
            </label>
            <button
              type="submit"
              className="w-full rounded-lg px-5 py-3 text-xs font-semibold uppercase tracking-widest bg-[var(--hv-text-primary)] text-[var(--hv-bg-primary)] hover:bg-[var(--hv-blue-dark)] transition-colors cursor-pointer"
            >
              Place order request
            </button>
            <p className="text-[11px] text-[var(--hv-text-muted)] text-center">Signed in as {user.email}</p>
          </form>
        </div>
      </div>
    </div>
  );
}
