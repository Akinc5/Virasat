import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-3",
};

export function Spinner({ size = "md", className, label }: SpinnerProps) {
  return (
    <div
      role="status"
      className={cn("flex flex-col items-center gap-3", className)}
    >
      <div
        className={cn(
          "rounded-full border-amber-600/30 border-t-amber-500 animate-spin",
          sizes[size]
        )}
        aria-hidden="true"
      />
      {label && (
        <p className="text-sm text-[var(--hv-text-muted)] animate-pulse">
          {label}
        </p>
      )}
      <span className="sr-only">Loading…</span>
    </div>
  );
}

// ── Page-level loading ────────────────────────────────────────
export function PageLoader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Spinner size="lg" label={label} />
    </div>
  );
}

// ── Skeleton block ────────────────────────────────────────────
export function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)]">
      <div className="skeleton h-52 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded-md" />
        <div className="skeleton h-3 w-1/2 rounded-md" />
        <div className="skeleton h-3 w-full rounded-md" />
      </div>
    </div>
  );
}
