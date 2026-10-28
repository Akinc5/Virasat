import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { HERITAGE_GALLERY } from "@/data/heritage-gallery";
import { sampleHeritageSites } from "@/data/sample-heritage-sites";

export const metadata: Metadata = {
  title: "Credits and Licences",
  description: "Photo credits and licences for the images and 3D models used on Virasat.",
};

export default function CreditsPage() {
  return (
    <div className="bg-[var(--hv-bg-primary)] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--hv-blue)] mb-3">Credits</p>
        <h1 className="font-display text-3xl md:text-4xl font-medium text-[var(--hv-text-primary)]">Credits and licences</h1>
        <p className="mt-4 text-[var(--hv-text-secondary)] font-serif leading-relaxed max-w-2xl">
          Virasat is free for educational use. The photographs come from Wikimedia Commons and are shared under the
          open licences listed below; each links to its original page. 3D models are prepared in Blender by Virasat.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-xl text-[var(--hv-text-primary)] mb-4">3D models</h2>
          <ul className="text-sm text-[var(--hv-text-secondary)] space-y-2 rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)] p-5">
            <li>
              Red Fort — based on{" "}
              <a
                className="underline underline-offset-2 hover:text-[var(--hv-text-primary)]"
                href="https://sketchfab.com/3d-models/red-fort-model-2ad9ae0a1b524a37a2c3ab245b0e5423"
                target="_blank"
                rel="noopener noreferrer"
              >
                &ldquo;Red Fort Model&rdquo;
              </a>{" "}
              by vfx_review, licensed under{" "}
              <a
                className="underline underline-offset-2 hover:text-[var(--hv-text-primary)]"
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY 4.0
              </a>
              ; textured and optimised in Blender by Virasat.
            </li>
            <li>All other models are prepared in Blender by Virasat.</li>
          </ul>
        </section>

        {sampleHeritageSites.map((site) => {
          const photos = HERITAGE_GALLERY[site.slug] ?? [];
          if (photos.length === 0) return null;
          return (
            <section key={site.slug} className="mt-12">
              <h2 className="font-display text-xl text-[var(--hv-text-primary)] mb-4">
                <Link href={`/heritage/${site.slug}`} className="hover:text-[var(--hv-blue-dark)]">
                  {site.name}
                </Link>
              </h2>
              <ul className="divide-y divide-[var(--hv-bg-border)] rounded-2xl border border-[var(--hv-bg-border)] bg-[var(--hv-bg-card)]">
                {photos.map((p) => (
                  <li key={p.url} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 py-3 text-sm">
                    <span className="flex-1 min-w-0 text-[var(--hv-text-primary)]">{p.title}</span>
                    <span className="text-[var(--hv-text-muted)] sm:text-right">
                      {p.author} · {p.license}
                    </span>
                    <a
                      href={p.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[var(--hv-blue-dark)] hover:underline shrink-0"
                      aria-label={`Source for ${p.title}`}
                    >
                      Source <ExternalLink size={11} />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
