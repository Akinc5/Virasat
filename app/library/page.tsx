import type { Metadata } from "next";
import Link from "next/link";
import { Search, Truck, ShieldCheck, BookMarked } from "lucide-react";
import { ALL_BOOKS } from "@/data/heritage-books";
import { sampleHeritageSites } from "@/data/sample-heritage-sites";
import { BookCard } from "@/components/books/BookCard";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Heritage Library — Books on India's Monuments",
  description: "Hand-picked books on the Taj Mahal, Hampi, Konark, Ajanta, Ellora and the Red Fort. Order through Virasat or buy online.",
};

export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ site?: string; q?: string }> }) {
  const { site, q } = await searchParams;
  const names = Object.fromEntries(sampleHeritageSites.map((s) => [s.slug, s.name]));
  const query = (q ?? "").trim().toLowerCase();
  const books = ALL_BOOKS.filter(
    (b) =>
      (!site || b.siteSlug === site) &&
      (!query || [b.title, b.author, b.description, ...b.keyTopics].join(" ").toLowerCase().includes(query))
  );
  const chip = (slug?: string) => {
    const p = new URLSearchParams();
    if (slug) p.set("site", slug);
    if (q) p.set("q", q);
    const s = p.toString();
    return s ? `/library?${s}` : "/library";
  };

  return (
    <div className="bg-[var(--hv-bg-primary)]">
      <section className="pt-28 pb-12 border-b border-[var(--hv-bg-border)] bg-[var(--hv-bg-secondary)]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--hv-blue)] mb-3">Heritage library</p>
          <h1 className="font-display text-3xl md:text-5xl font-medium text-[var(--hv-text-primary)] max-w-2xl leading-tight">
            The best books on India&apos;s monuments
          </h1>
          <p className="mt-4 max-w-xl text-[var(--hv-text-secondary)] font-serif italic">
            Chosen for students, teachers and travellers. Order through Virasat and we deliver across India, or buy from an
            online bookshop.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl text-sm">
            {[
              { icon: BookMarked, t: `${ALL_BOOKS.length} titles across ${Object.keys(names).length} monuments` },
              { icon: Truck, t: "Delivery anywhere in India" },
              { icon: ShieldCheck, t: "Pay only after we confirm price and stock" },
            ].map(({ icon: Icon, t }) => (
              <p key={t} className="flex items-center gap-2 text-[var(--hv-text-secondary)]">
                <Icon size={16} className="text-[var(--hv-gold-muted)] shrink-0" /> {t}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse xl:flex-row xl:items-center gap-4 justify-between mb-8">
            <nav aria-label="Filter by monument" className="flex flex-wrap gap-2">
              {[{ slug: undefined, name: "All" }, ...sampleHeritageSites.map((s) => ({ slug: s.slug, name: s.name }))].map((s) => (
                <Link
                  key={s.name}
                  href={chip(s.slug)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium border transition-colors",
                    site === s.slug || (!site && !s.slug)
                      ? "bg-[var(--hv-text-primary)] text-[var(--hv-bg-primary)] border-transparent"
                      : "border-[var(--hv-bg-border)] text-[var(--hv-text-secondary)] hover:border-[var(--hv-gold)]"
                  )}
                >
                  {s.name}
                </Link>
              ))}
            </nav>
            <form action="/library" className="relative w-full xl:w-72 shrink-0">
              {site && <input type="hidden" name="site" value={site} />}
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--hv-text-muted)]" />
              <input
                name="q"
                defaultValue={q}
                placeholder="Search title, author or topic"
                className="w-full rounded-full border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[var(--hv-gold)]"
                aria-label="Search books"
              />
            </form>
          </div>

          {books.length === 0 ? (
            <p className="py-20 text-center text-[var(--hv-text-muted)]">No books match your search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((b) => (
                <BookCard key={b.id} book={b} siteName={names[b.siteSlug]} compact />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
