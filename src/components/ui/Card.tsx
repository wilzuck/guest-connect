import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes, PropsWithChildren } from "react";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
