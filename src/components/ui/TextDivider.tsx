import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type TextDividerProps = {
  children: ReactNode;
  className?: string;
};

export function TextDivider({ children, className }: TextDividerProps) {
  return (
    <div className={cn("my-2 flex items-center gap-3", className)}>
      <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
        {children}
      </p>
      <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
    </div>
  );
}
