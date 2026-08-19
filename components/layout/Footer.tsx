import Link from "next/link";
import { Globe, ExternalLink, Star, Heart } from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "All Heritage Sites", href: "/explore" },
    { label: "UNESCO Sites", href: "/explore?unescoStatus=World+Heritage+Site" },
    { label: "North India", href: "/explore?region=North+India" },
    { label: "South India", href: "/explore?region=South+India" },
  ],
  Features: [
    { label: "3D Experiences", href: "/experience/taj-mahal" },
    { label: "AR Mode (Soon)", href: "#" },
    { label: "VR Tours (Soon)", href: "#" },
  ],
  Project: [
    { label: "About HeritageVerse", href: "/about" },
    { label: "Admin Dashboard", href: "/admin" },
    { label: "GitHub", href: "https://github.com" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--hv-bg-border)] bg-[var(--hv-bg-secondary)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-[var(--hv-blue)] to-[var(--hv-blue-dark)] flex items-center justify-center">
                <Globe size={13} className="text-[var(--hv-bg-primary)]" />
              </div>
              <span className="font-display tracking-widest text-sm sm:text-base font-semibold text-[var(--hv-text-primary)] uppercase flex flex-col items-start leading-none gap-0.5">
                VIRASAT
                <span className="text-[8px] font-serif italic text-[var(--hv-gold)] uppercase tracking-[0.25em] font-normal">Digital Heritage Archive</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--hv-text-secondary)] leading-relaxed mb-6 font-serif">
              *Digitally documenting and preserving India's cultural architectural legacy for generations.*
            </p>
            <div className="flex gap-2.5">
              {[
                { icon: ExternalLink, href: "#", label: "GitHub" },
                { icon: Star, href: "#", label: "Twitter" },
                { icon: Heart, href: "#", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-sm border border-[var(--hv-bg-border)] hover:border-[var(--hv-gold)] flex items-center justify-center text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)] hover:bg-[var(--hv-bg-primary)]/50 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--hv-text-secondary)] mb-5">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)] hover:underline decoration-[var(--hv-gold)] underline-offset-4 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar with double border styling */}
        <div className="border-t border-[var(--hv-bg-border)] pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--hv-text-muted)]">
          <p>© {new Date().getFullYear()} HeritageVerse. Preserving India's Legacy for the Digital Age.</p>
          <p className="font-display tracking-widest text-[var(--hv-text-secondary)]">🇮🇳 DIGITAL ARCHIVE</p>
        </div>
      </div>
    </footer>
  );
}
