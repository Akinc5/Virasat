import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-lg border border-[var(--hv-bg-border)] bg-[var(--hv-bg-primary)] px-3.5 py-2.5 text-sm text-[var(--hv-text-primary)] placeholder:text-[var(--hv-text-muted)] focus:outline-none focus:border-[var(--hv-gold)] focus:ring-2 focus:ring-[var(--hv-gold)]/20 transition";

export function Field({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={cn("block text-left", className)}>
      <span className="block text-xs font-medium text-[var(--hv-text-secondary)] mb-1.5">{label}</span>
      <input className={inputClass} {...props} />
    </label>
  );
}
