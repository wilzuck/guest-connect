import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function ButtonGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm shadow-black/5 [&>*]:rounded-none [&>*]:border-0 [&>*:not(:last-child)]:border-r [&>*:not(:last-child)]:border-black/10",
        className,
      )}
    >
      {children}
    </div>
  );
}
