"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Media } from "@/types";

// On the 4-column grid the feature photo fills a 2×2 block beside four
// small ones; widen the last photo so the final row has no empty cell.
const TAIL_SPAN: Record<number, string> = { 1: "md:col-span-4", 2: "md:col-span-3", 3: "md:col-span-2" };

interface HeritageGalleryProps {
  media: Media[];
  siteName: string;
}

export function HeritageGallery({ media, siteName }: HeritageGalleryProps) {
  const images = media.filter((m) => m.type === "image");
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  if (images.length === 0) {
    return (
      <div className="rounded-2xl bg-[var(--hv-bg-elevated)] border border-dashed border-[var(--hv-bg-border)] py-16 text-center">
        <p className="text-[var(--hv-text-muted)] text-sm">Photographs for this site are being added.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mosaic: one feature photo, the rest in an even grid */}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" aria-label={`${siteName} photo gallery`}>
        {images.map((image, index) => (
          <li
            key={image.id}
            className={cn(
              index === 0 && "col-span-2 row-span-2",
              index === images.length - 1 && TAIL_SPAN[(images.length - 5) % 4]
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(index)}
              className="group relative block w-full h-full min-h-32 aspect-[4/3] md:aspect-auto md:min-h-44 rounded-xl overflow-hidden bg-[var(--hv-bg-elevated)] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hv-gold)] focus-visible:ring-offset-2"
              aria-label={`Open photo: ${image.title ?? `image ${index + 1}`}`}
            >
              <Image
                src={image.url}
                alt={image.title ?? `${siteName}, photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              />
              <span className="absolute inset-x-0 bottom-0 p-3 pt-10 bg-gradient-to-t from-black/70 to-transparent text-left opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <span className={cn("block text-white font-medium leading-snug", index === 0 ? "text-sm" : "text-xs")}>
                  {image.title}
                </span>
              </span>
              <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm grid place-items-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand size={13} />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] text-[var(--hv-text-muted)]">
        Photographs from Wikimedia Commons under open licences.{" "}
        <Link href="/credits" className="underline underline-offset-2 hover:text-[var(--hv-text-primary)]">
          Photo credits
        </Link>
      </p>

      {open !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={`${siteName} photo viewer`}
          onClick={() => setOpen(null)}
        >
          <div className="flex items-center justify-between px-4 sm:px-6 h-14 text-white/80 text-sm shrink-0">
            <span>
              {open + 1} / {images.length}
            </span>
            <button
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white"
              onClick={() => setOpen(null)}
              aria-label="Close photo viewer"
            >
              <X size={20} />
            </button>
          </div>
          <div className="relative flex-1 mx-4 sm:mx-16" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[open].url}
              alt={images[open].title ?? `${siteName} photo`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <p className="shrink-0 px-6 py-5 text-center text-white/85 text-sm font-serif italic">{images[open].title}</p>
          {images.length > 1 && (
            <>
              <button
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next photo"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
