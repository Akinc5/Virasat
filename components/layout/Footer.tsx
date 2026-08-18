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
    <footer className="border-t border-[var(--hv-bg-border)] bg-[var(--hv-bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                <Globe size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg text-[var(--hv-text-primary)]">
                Heritage<span className="text-gold-gradient">Verse</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--hv-text-muted)] leading-relaxed mb-5 max-w-xs">
              Digitally preserving India's cultural heritage through immersive web, AR, and VR experiences.
            </p>
            <div className="flex gap-3">
              {[
                { icon: ExternalLink, href: "#", label: "GitHub" },
                { icon: Star, href: "#", label: "Twitter" },
                { icon: Heart, href: "#", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-amber-500/20 flex items-center justify-center text-[var(--hv-text-muted)] hover:text-amber-400 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--hv-text-muted)] mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--hv-text-secondary)] hover:text-amber-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="gold-divider mt-10 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--hv-text-muted)]">
          <p>© {new Date().getFullYear()} HeritageVerse. Preserving India's Legacy for the Digital Age.</p>
          <p className="font-display tracking-wider">🇮🇳 Made for India</p>
        </div>
      </div>
    </footer>
  );
}
