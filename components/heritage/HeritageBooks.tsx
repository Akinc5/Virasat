import { BookOpen, ExternalLink, Sparkles, Bookmark, Library, ArrowUpRight } from "lucide-react";
import type { HeritageSite } from "@/types";
import { HERITAGE_BOOKS, HeritageBook } from "@/data/heritage-books";

interface HeritageBooksProps {
  site: HeritageSite;
}

export function HeritageBooks({ site }: HeritageBooksProps) {
  const books = HERITAGE_BOOKS[site.slug] || [];

  if (!books.length) return null;

  return (
    <section 
      id="recommended-books" 
      className="py-12 border-t border-[var(--hv-bg-border)]"
      aria-labelledby="books-section-heading"
    >
      {/* ── SECTION HEADER ── */}
      <div className="mb-10 text-left">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--hv-gold)]" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-[var(--hv-blue)] uppercase font-semibold">
            CURATED BIBLIOGRAPHY & ARCHIVAL LITERATURE
          </span>
        </div>

        <h2 
          id="books-section-heading" 
          className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--hv-text-primary)] tracking-wide mb-2"
        >
          Books to Know {site.name} Better
        </h2>

        <p className="text-sm md:text-base text-[var(--hv-text-secondary)] font-serif italic max-w-2xl leading-relaxed">
          Deepen your architectural and historical understanding through seminal monographs, Archaeological Survey of India (ASI) records, and cultural chronicles by renowned scholars.
        </p>

        {/* Refined floral divider */}
        <div className="w-24 h-3 my-4 text-[var(--hv-gold)] opacity-70" aria-hidden="true">
          <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0 10 Q25 4, 50 10 T100 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            <path d="M25 8 C20 4, 15 5, 25 8Z" fill="currentColor"/>
            <path d="M50 6 C46 2, 42 3, 50 6Z" fill="currentColor"/>
            <path d="M75 8 C71 4, 67 5, 75 8Z" fill="currentColor"/>
            <circle cx="50" cy="10" r="1.5" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* ── BOOKS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book: HeritageBook, index: number) => {
          const searchUrl = `https://www.google.com/search?tbm=bks&q=${encodeURIComponent(book.googleBooksQuery)}`;

          return (
            <div
              key={book.id}
              className="group rounded-sm bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] hover:border-[var(--hv-gold)] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden text-left"
            >
              {/* Museum card corner brackets */}
              <span className="museum-bracket-top-left opacity-40 group-hover:opacity-100 transition-opacity" />
              <span className="museum-bracket-top-right opacity-40 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--hv-bg-border)]">
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-mono tracking-wider uppercase px-2.5 py-1 rounded bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)] text-[var(--hv-text-secondary)] font-semibold">
                    <Library size={11} className="text-[var(--hv-gold)]" />
                    VOL. {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-amber-500/10 text-[var(--hv-gold)] border border-[var(--hv-gold)]/25">
                    <Bookmark size={10} />
                    {book.badge}
                  </span>
                </div>

                {/* Book Title & Author */}
                <h3 className="font-display text-lg sm:text-xl font-medium text-[var(--hv-text-primary)] group-hover:text-[var(--hv-gold)] transition-colors leading-snug mb-1.5">
                  {book.title}
                </h3>

                <p className="text-xs text-[var(--hv-text-secondary)] font-serif italic mb-3">
                  by <span className="font-semibold text-[var(--hv-text-primary)]">{book.author}</span> ({book.year})
                  {book.publisher && <span className="text-[var(--hv-text-muted)] not-italic"> • {book.publisher}</span>}
                </p>

                {/* Synopsis */}
                <p className="text-xs text-[var(--hv-text-secondary)] leading-relaxed mb-4">
                  {book.description}
                </p>

                {/* "Why Read" Highlight Callout Box */}
                <div className="p-3 rounded bg-[var(--hv-bg-primary)] border border-[var(--hv-bg-border)] mb-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--hv-gold)] font-semibold uppercase tracking-wider mb-1">
                    <Sparkles size={11} />
                    <span>Why It Matters</span>
                  </div>
                  <p className="text-[11px] text-[var(--hv-text-secondary)] font-serif italic leading-relaxed">
                    "{book.whyRead}"
                  </p>
                </div>

                {/* Key Topics Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {book.keyTopics.map((topic: string) => (
                    <span
                      key={topic}
                      className="text-[10px] px-2 py-0.5 rounded bg-[var(--hv-bg-secondary)] text-[var(--hv-text-muted)] border border-[var(--hv-bg-border)] font-mono"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action: Find on Google Books / Search */}
              <div className="pt-3 border-t border-[var(--hv-bg-border)] flex items-center justify-between">
                <a
                  href={searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--hv-text-primary)] hover:text-[var(--hv-gold)] transition-colors group/link"
                >
                  <BookOpen size={13} className="text-[var(--hv-gold)]" />
                  <span>Search in Google Books</span>
                  <ArrowUpRight size={12} className="opacity-70 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>

                <span className="text-[9px] font-mono text-[var(--hv-text-muted)] uppercase">
                  ARCHIVAL REF
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── ARCHIVIST RESEARCH NOTE ── */}
      <div className="mt-8 p-4 rounded bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[var(--hv-bg-secondary)] border border-[var(--hv-bg-border)] flex items-center justify-center shrink-0">
            <Library size={15} className="text-[var(--hv-gold)]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--hv-text-primary)] font-display">
              Scholarly Research & Primary Inscriptions
            </p>
            <p className="text-[11px] text-[var(--hv-text-secondary)]">
              Looking for epigraphical surveys? Many original ASI survey memoirs and Sanskrit/Persian epigraphs are cataloged at the National Archives of India.
            </p>
          </div>
        </div>

        <a
          href="https://asi.nic.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--hv-gold)] hover:underline whitespace-nowrap font-medium flex items-center gap-1 shrink-0"
        >
          <span>Archaeological Survey of India</span>
          <ExternalLink size={11} />
        </a>
      </div>
    </section>
  );
}
