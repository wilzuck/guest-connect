import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type FieldLabelProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export function FieldLabel({ children, className, ...props }: FieldLabelProps) {
  return (
    <span
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
