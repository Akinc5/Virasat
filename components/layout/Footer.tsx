import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const footerLinks = {
  Explore: [
    { label: "All Heritage Sites", href: "/explore" },
    { label: "UNESCO Sites", href: "/explore?unescoStatus=World+Heritage+Site" },
    { label: "North India", href: "/explore?region=North+India" },
    { label: "South India", href: "/explore?region=South+India" },
  ],
  Features: [
    { label: "3D Experiences", href: "/experience/taj-mahal" },
    { label: "Guided 3D Tours", href: "/experience/taj-mahal" },
    { label: "View in AR", href: "/experience/hampi" },
    { label: "Heritage Library", href: "/library" },
  ],
  Project: [
    { label: "About Virasat", href: "/about" },
    { label: "Credits & licences", href: "/credits" },
    { label: "My account", href: "/account" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--hv-bg-border)] bg-[var(--hv-bg-secondary)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex mb-5" aria-label="Virasat home">
              <Logo />
            </Link>
            <p className="text-sm text-[var(--hv-text-secondary)] leading-relaxed mb-6 font-serif">
              Digitally preserving India&apos;s architectural legacy for generations.
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--hv-border-gold)] bg-[var(--hv-bg-primary)] px-3 py-1.5 text-xs text-[var(--hv-text-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--hv-gold)]" />
              Free for schools, teachers and students
            </p>
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
          <p>© {new Date().getFullYear()} Virasat · Free for educational use</p>
          <p className="tracking-wide">Made in India for learners everywhere</p>
        </div>
      </div>
    </footer>
  );
}
