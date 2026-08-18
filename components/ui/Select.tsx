import { cn } from "@/lib/utils";
import type { FilterOption } from "@/types";
import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: FilterOption[];
  label?: string;
  wrapperClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, className, wrapperClassName, id, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-medium text-[var(--hv-text-muted)] uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(
              "w-full appearance-none",
              "bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)]",
              "text-[var(--hv-text-primary)] text-sm",
              "rounded-lg px-4 py-2.5 pr-9",
              "focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-600/50",
              "transition-all duration-200 cursor-pointer",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-[#1a1410]"
              >
                {opt.label}
              </option>
            ))}
          </select>
          {/* Chevron icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--hv-text-muted)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
