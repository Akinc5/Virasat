import Link from "next/link";
import { ArrowUpRight, BookOpen, ShoppingBag } from "lucide-react";
import type { HeritageBook } from "@/data/heritage-books";
import { cn } from "@/lib/utils";

// Deterministic cover colour per monument so the shelf reads as a set
const COVER: Record<string, string> = {
  "taj-mahal": "from-[#a89878] to-[#6f6249]",
  hampi: "from-[#c99a6b] to-[#8a5a3a]",
  "konark-sun-temple": "from-[#a98b6d] to-[#6f5641]",
  "ajanta-caves": "from-[#b37a4c] to-[#6e3f22]",
  "ellora-caves": "from-[#8e8b84] to-[#55524c]",
  "red-fort": "from-[#b4523c] to-[#7a2e20]",
};

export function BookCard({ book, siteName, compact = false }: { book: HeritageBook; siteName?: string; compact?: boolean }) {
  return (
    <article className="group h-full flex flex-col rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] overflow-hidden hover:border-[var(--hv-gold)]/60 hover:shadow-lg hover:shadow-[#6B5E52]/5 transition-all">
      <div className="flex gap-4 p-5">
        {/* Generated cover */}
        <div
          className={cn(
            "relative shrink-0 w-20 h-28 rounded-md bg-gradient-to-br shadow-md shadow-black/15 overflow-hidden",
            COVER[book.siteSlug] ?? "from-[#c5a059] to-[#8a6d3b]"
          )}
          aria-hidden="true"
        >
          <span className="absolute inset-y-0 left-1.5 w-px bg-black/15" />
          <span className="absolute inset-x-2 top-2.5 h-px bg-white/50" />
          <span className="absolute inset-x-2 bottom-2.5 h-px bg-white/50" />
          <span className="absolute inset-0 grid place-items-center px-2 text-center font-display text-[9px] leading-tight text-white/95 drop-shadow">
            {book.title.split(":")[0]}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--hv-gold-muted)] mb-1">{book.badge}</p>
          <h3 className="font-display text-base leading-snug text-[var(--hv-text-primary)]">{book.title}</h3>
          <p className="mt-1 text-xs text-[var(--hv-text-secondary)]">
            {book.author} · {book.year}
            {book.publisher && <> · {book.publisher}</>}
          </p>
          {siteName && <p className="mt-1.5 text-[11px] text-[var(--hv-blue-dark)]">{siteName}</p>}
        </div>
      </div>

      <div className="px-5 pb-5 flex-1 flex flex-col">
        <p className="text-sm text-[var(--hv-text-secondary)] leading-relaxed">{book.description}</p>
        {!compact && (
          <p className="mt-3 text-[13px] font-serif italic text-[var(--hv-text-secondary)] border-l-2 border-[var(--hv-gold)]/50 pl-3">
            {book.whyRead}
          </p>
        )}
        <div className="mt-auto pt-5 flex flex-wrap items-center gap-2">
          <Link
            href={`/library/order/${book.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--hv-text-primary)] text-[var(--hv-bg-primary)] text-xs font-semibold hover:bg-[var(--hv-blue-dark)] transition-colors"
          >
            <ShoppingBag size={13} /> Order through Virasat
          </Link>
          <a
            href={`/go/book/${book.id}`}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="inline-flex items-center gap-1 px-3 py-2 rounded-full border border-[var(--hv-bg-border)] text-xs font-medium text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)] hover:border-[var(--hv-gold)] transition-colors"
          >
            <BookOpen size={13} /> Buy online <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}
