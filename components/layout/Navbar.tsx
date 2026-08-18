"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--hv-bg-primary)]/95 backdrop-blur-lg border-b border-[var(--hv-bg-border)] shadow-xl shadow-black/20"
          : "bg-transparent"
      )}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="HeritageVerse home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/30">
            <Globe size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg text-[var(--hv-text-primary)] group-hover:text-amber-400 transition-colors">
            Heritage<span className="text-gold-gradient">Verse</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                pathname === link.href
                  ? "text-amber-400 bg-amber-500/10"
                  : "text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)] hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              Admin
            </Button>
          </Link>
          <Link href="/explore">
            <Button variant="gold" size="sm">
              Explore Heritage
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden p-2 rounded-lg text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)] hover:bg-white/5 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          "bg-[var(--hv-bg-primary)]/98 backdrop-blur-xl border-b border-[var(--hv-bg-border)]",
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-3 rounded-lg text-sm font-medium transition-all",
                pathname === link.href
                  ? "text-amber-400 bg-amber-500/10"
                  : "text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)] hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[var(--hv-bg-border)] mt-2 flex flex-col gap-2">
            <Link href="/admin" className="w-full">
              <Button variant="secondary" size="sm" className="w-full">
                Admin Dashboard
              </Button>
            </Link>
            <Link href="/explore" className="w-full">
              <Button variant="gold" size="sm" className="w-full">
                Explore Heritage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
