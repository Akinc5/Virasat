import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Remove the default top padding (useful for hero sections) */
  noTopPadding?: boolean;
}

export function PageWrapper({
  children,
  className,
  noTopPadding = false,
}: PageWrapperProps) {
  return (
    <div
      className={cn(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        !noTopPadding && "pt-24",
        className
      )}
    >
      {children}
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  elevated?: boolean;
}

export function Section({ children, className, id, elevated }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        elevated ? "section-elevated" : "section-dark",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-14", centered && "text-center")}>
      {eyebrow && (
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--hv-blue)] mb-3.5">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-wide text-[var(--hv-text-primary)] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm md:text-base font-serif italic text-[var(--hv-text-secondary)] max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
