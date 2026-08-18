import { cn } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/utils/filters";

type BadgeVariant = "category" | "unesco" | "period" | "default";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ label, variant = "default", className }: BadgeProps) {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border";

  if (variant === "category") {
    const colorClass =
      CATEGORY_COLORS[label] ??
      "bg-gray-500/20 text-gray-300 border-gray-500/30";
    return (
      <span className={cn(baseClasses, colorClass, className)}>{label}</span>
    );
  }

  if (variant === "unesco") {
    return (
      <span
        className={cn(
          baseClasses,
          "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
          className
        )}
      >
        🏛 {label}
      </span>
    );
  }

  if (variant === "period") {
    return (
      <span
        className={cn(
          baseClasses,
          "bg-amber-500/10 text-amber-400 border-amber-500/20",
          className
        )}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={cn(
        baseClasses,
        "bg-white/5 text-[var(--hv-text-secondary)] border-white/10",
        className
      )}
    >
      {label}
    </span>
  );
}
