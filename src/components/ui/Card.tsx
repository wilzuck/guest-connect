import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes, PropsWithChildren } from "react";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-black/10 bg-white shadow-sm shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
