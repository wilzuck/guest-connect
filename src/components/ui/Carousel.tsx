import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Carousel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex snap-x gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] scrollbar-none *:snap-start [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
