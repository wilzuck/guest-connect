import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes, ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex cursor-pointer w-fit max-w-full shrink-0 items-center justify-center gap-2 rounded-full whitespace-nowrap text-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-white/25";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-black bg-black text-white shadow-sm shadow-black/10 hover:bg-zinc-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:shadow-none",
  secondary:
    "border border-black/10 bg-white text-black shadow-sm shadow-black/5 hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 dark:shadow-none",
  outline:
    "border border-black/15 bg-transparent text-black hover:bg-black/[0.04] dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900/70",
  ghost:
    "bg-transparent text-black hover:bg-black/[0.04] dark:text-white dark:hover:bg-zinc-900/70",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3.5 text-xs sm:px-4 sm:text-sm",
  md: "min-h-10 px-4 text-sm sm:min-h-11 sm:px-5",
  lg: "min-h-11 px-5 text-sm sm:min-h-12 sm:px-6 sm:text-base",
  icon: "h-10 w-10 min-h-0 min-w-10 p-0",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  );
}

export type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
};

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  );
}
