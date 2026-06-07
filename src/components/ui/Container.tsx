import { cn } from "@/lib/utils/cn";
import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-3.75", className)}>
      {children}
    </div>
  );
}
