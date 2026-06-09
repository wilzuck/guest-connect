import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ActionTileProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ActionTile({ href, children, className }: ActionTileProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900",
        className,
      )}
    >
      {children}
    </Link>
  );
}
