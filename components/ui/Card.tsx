import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "elevated";
}

export function Card({ children, className, variant = "default" }: CardProps) {
  const variants = {
    default:
      "bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)] rounded-xl",
    glass: "glass-card rounded-xl",
    elevated:
      "bg-[var(--hv-bg-elevated)] border border-[var(--hv-bg-border)] rounded-xl",
  };

  return (
    <div className={cn(variants[variant], className)}>{children}</div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("p-6 pb-0", className)}>{children}</div>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("p-6 pt-0", className)}>{children}</div>
  );
}
