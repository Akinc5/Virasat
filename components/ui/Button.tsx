"use client";

import { cn } from "@/lib/utils";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "gold";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--hv-text-primary)] hover:bg-[var(--hv-text-secondary)] text-[var(--hv-bg-primary)] shadow-sm hover:shadow-md",
  secondary:
    "bg-[var(--hv-bg-secondary)] hover:bg-[var(--hv-bg-elevated)] text-[var(--hv-text-primary)] border border-[var(--hv-bg-border)]",
  ghost:
    "bg-transparent hover:bg-[var(--hv-bg-secondary)] text-[var(--hv-text-secondary)] hover:text-[var(--hv-text-primary)]",
  outline:
    "bg-transparent border border-[var(--hv-blue)]/40 text-[var(--hv-blue-dark)] hover:border-[var(--hv-blue)] hover:bg-[var(--hv-blue)]/5",
  gold:
    "bg-[var(--hv-gold)] hover:bg-[var(--hv-gold-light)] text-[var(--hv-bg-primary)] font-medium shadow-sm hover:shadow-md",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3.5 text-base gap-2.5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium",
          "transition-all duration-200 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hv-bg-primary)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
