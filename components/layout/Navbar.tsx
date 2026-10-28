"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { UserMenu } from "@/components/auth/UserMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/experience/taj-mahal", label: "3D Viewer" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so navigating closes it
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const mobileOpen = menuOpenOn === pathname;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--hv-bg-primary)]/90 backdrop-blur-md border-b border-[var(--hv-bg-border)] shadow-sm shadow-[#6B5E52]/5"
          : "bg-[var(--hv-bg-primary)]/70 backdrop-blur-sm"
      )}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group"
          aria-label="Virasat home"
        >
          <Logo />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href.split("/").slice(0, 2).join("/"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 text-xs font-semibold tracking-widest uppercase whitespace-nowrap relative transition-all duration-200",
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
        <div className="hidden lg:flex items-center">
          <UserMenu />
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          className="lg:hidden p-2 rounded-sm text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)] hover:bg-[var(--hv-bg-secondary)] transition-colors"
          onClick={() => setMenuOpenOn(mobileOpen ? null : pathname)}
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
          "lg:hidden overflow-hidden transition-all duration-300",
          "bg-[var(--hv-bg-primary)] border-b border-[var(--hv-bg-border)]",
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href.split("/").slice(0, 2).join("/"));
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
            <Link href="/explore" className="w-full">
              <Button variant="outline" size="sm" className="w-full text-xs uppercase tracking-wider">
                Explore Heritage
              </Button>
            </Link>
            <UserMenu
              variant="inline"
              className="w-full bg-[var(--hv-bg-secondary)] rounded-sm [&>a]:block [&>a]:w-full [&_button]:w-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
