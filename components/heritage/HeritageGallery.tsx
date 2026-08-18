"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Media } from "@/types";

interface HeritageGalleryProps {
  media: Media[];
  siteName: string;
}

export function HeritageGallery({ media, siteName }: HeritageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = media.filter((m) => m.type === "image");

  if (images.length === 0) {
    return (
      <div className="rounded-xl bg-[var(--hv-bg-elevated)] border border-dashed border-[var(--hv-bg-border)] py-16 text-center">
        <p className="text-[var(--hv-text-muted)] text-sm">
          No gallery images available yet.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Gallery Grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        role="list"
        aria-label={`${siteName} photo gallery`}
      >
        {images.map((image, index) => (
          <button
            key={image.id}
            id={`gallery-image-${index}`}
            className="group relative aspect-video rounded-xl overflow-hidden bg-[var(--hv-bg-elevated)] cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-amber-500"
            onClick={() => setLightboxIndex(index)}
            aria-label={`View ${image.title ?? `image ${index + 1}`} in full size`}
            role="listitem"
          >
            <Image
              src={image.url}
              alt={image.title ?? `${siteName} - image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <ZoomIn
                size={24}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
          <div
            className="relative max-w-4xl max-h-[80vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].title ?? `${siteName} image`}
              fill
              className="object-contain"
              sizes="80vw"
            />
          </div>
          {images[lightboxIndex].title && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-serif italic">
              {images[lightboxIndex].title}
            </p>
          )}
        </div>
      )}
    </>
  );
}
