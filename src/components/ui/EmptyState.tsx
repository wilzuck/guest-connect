import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

/** Neutral empty-state block — coherent light/dark, reusable across sections. */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-black/10 bg-white px-6 py-12 text-center dark:border-white/10 dark:bg-zinc-950",
        className,
      )}
    >
      {icon ? (
        <span className="grid size-12 place-items-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
          {icon}
        </span>
      ) : null}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-black dark:text-white">{title}</p>
        {description ? (
          <p className="mx-auto max-w-sm text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}
