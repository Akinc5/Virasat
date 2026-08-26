"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { LogOut, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface UserMenuProps {
  className?: string;
  /** "dropdown" (default) for the compact navbar avatar, "inline" for stacked mobile menus */
  variant?: "dropdown" | "inline";
}

export function UserMenu({ className, variant = "dropdown" }: UserMenuProps) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <div
        className={cn(
          "w-8 h-8 rounded-full bg-[var(--hv-bg-secondary)] animate-pulse",
          className
        )}
      />
    );
  }

  if (!session?.user) {
    return (
      <Link href="/login" className={className}>
        <Button variant="outline" size="sm" className="text-xs tracking-widest uppercase">
          Sign In
        </Button>
      </Link>
    );
  }

  const { name, email, image } = session.user;

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-3 px-4 py-2.5", className)}>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--hv-bg-border)] shrink-0">
          {image ? (
            <Image src={image} alt={name ?? "User"} width={32} height={32} className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[var(--hv-bg-secondary)] text-[var(--hv-text-secondary)]">
              <UserIcon size={16} />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[var(--hv-text-primary)] truncate">{name}</p>
          <p className="text-xs text-[var(--hv-text-secondary)] truncate">{email}</p>
        </div>
        <button
          onClick={() => signOut({ redirectTo: "/" })}
          className="p-2 rounded-sm text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)] hover:bg-[var(--hv-bg-secondary)] transition-colors cursor-pointer shrink-0"
          aria-label="Sign out"
        >
          <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border border-[var(--hv-bg-border)] hover:border-[var(--hv-gold)] transition-colors cursor-pointer"
        aria-expanded={open}
        aria-label="Account menu"
      >
        {image ? (
          <Image src={image} alt={name ?? "User"} width={32} height={32} className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[var(--hv-bg-secondary)] text-[var(--hv-text-secondary)]">
            <UserIcon size={16} />
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-[var(--hv-bg-border)] bg-[var(--hv-bg-primary)] shadow-lg shadow-black/5 py-2 z-50">
          <div className="px-4 py-2 border-b border-[var(--hv-bg-border)]">
            <p className="text-sm font-semibold text-[var(--hv-text-primary)] truncate">{name}</p>
            <p className="text-xs text-[var(--hv-text-secondary)] truncate">{email}</p>
          </div>
          <button
            onClick={() => {
              setOpen(false);
              signOut({ redirectTo: "/" });
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)] hover:bg-[var(--hv-bg-secondary)] transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
