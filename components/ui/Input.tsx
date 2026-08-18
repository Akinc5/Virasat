"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, rightIcon, className, wrapperClassName, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center", wrapperClassName)}>
        {leftIcon && (
          <div className="absolute left-3 text-[var(--hv-text-muted)] pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-[var(--hv-bg-card)] border border-[var(--hv-bg-border)]",
            "text-[var(--hv-text-primary)] placeholder:text-[var(--hv-text-muted)]",
            "rounded-lg py-2.5 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-600/50",
            "transition-all duration-200",
            leftIcon ? "pl-10 pr-4" : "px-4",
            rightIcon ? "pr-10" : "",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 text-[var(--hv-text-muted)]">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// ── Search Input (convenience wrapper) ──────────────────────
interface SearchInputProps extends Omit<InputProps, "leftIcon"> {
  onClear?: () => void;
}

export function SearchInput({ onClear, ...props }: SearchInputProps) {
  return (
    <Input
      leftIcon={<Search size={16} />}
      type="search"
      {...props}
    />
  );
}
