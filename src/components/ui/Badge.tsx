import { cn } from "@/lib/utils/cn";
import type { PropsWithChildren } from "react";

type BadgeProps = PropsWithChildren<{ className?: string }>;

export function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm shadow-black/5",
        className,
      )}
    >
      {children}
    </span>
  );
}
