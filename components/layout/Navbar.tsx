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
    if (mobileOpen) setMobileOpen(false);
  }, [pathname, mobileOpen]);
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--hv-bg-primary)]/90 backdrop-blur-md border-b border-[var(--hv-bg-border)] shadow-sm shadow-[#6B5E52]/5"
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
          aria-label="Virasat home"
        >
          <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-[var(--hv-blue)] to-[var(--hv-blue-dark)] flex items-center justify-center shadow-sm shadow-[var(--hv-blue)]/20">
            <Globe size={13} className="text-[var(--hv-bg-primary)]" />
          </div>
          <span className="font-display tracking-widest text-sm sm:text-base font-semibold text-[var(--hv-text-primary)] uppercase flex flex-col items-start leading-none gap-0.5">
            VIRASAT
            <span className="text-[8px] font-serif italic text-[var(--hv-gold)] uppercase tracking-[0.25em] font-normal">Digital Heritage Archive</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-xs font-semibold tracking-widest uppercase relative transition-all duration-200",
                  isActive
                    ? "text-[var(--hv-blue-dark)]"
                    : "text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)]"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-[2px] left-4 right-4 h-[1px] bg-[var(--hv-gold)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/admin" className="text-[10px] tracking-[0.2em] uppercase text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)] transition-colors font-semibold mr-2">
            Admin
          </Link>
          <Link href="/explore">
            <Button variant="outline" size="sm" className="text-xs tracking-widest uppercase">
              Explore Heritage
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden p-2 rounded-sm text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)] hover:bg-[var(--hv-bg-secondary)] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          "bg-[var(--hv-bg-primary)] border-b border-[var(--hv-bg-border)]",
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2.5 text-xs font-semibold tracking-widest uppercase relative transition-all",
                  isActive
                    ? "text-[var(--hv-blue-dark)] bg-[var(--hv-bg-secondary)]"
                    : "text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)] hover:bg-[var(--hv-bg-secondary)]/50"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--hv-gold)]" />
                )}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-[var(--hv-bg-border)] mt-3 flex flex-col gap-2">
            <Link href="/admin" className="w-full">
              <Button variant="secondary" size="sm" className="w-full text-xs uppercase tracking-wider">
                Admin Dashboard
              </Button>
            </Link>
            <Link href="/explore" className="w-full">
              <Button variant="outline" size="sm" className="w-full text-xs uppercase tracking-wider">
                Explore Heritage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
