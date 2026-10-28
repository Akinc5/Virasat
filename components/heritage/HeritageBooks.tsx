import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HERITAGE_BOOKS } from "@/data/heritage-books";
import { BookCard } from "@/components/books/BookCard";
import type { HeritageSite } from "@/types";

export function HeritageBooks({ site }: { site: HeritageSite }) {
  const books = HERITAGE_BOOKS[site.slug] ?? [];
  if (!books.length) return null;

  return (
    <section aria-labelledby="books-heading">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--hv-blue)] mb-3">Further reading</p>
          <h2 id="books-heading" className="font-display text-2xl md:text-3xl font-medium text-[var(--hv-text-primary)]">
            Books about {site.name}
          </h2>
        </div>
        <Link
          href={`/library?site=${site.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--hv-blue-dark)] hover:text-[var(--hv-text-primary)]"
        >
          Open the library <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
