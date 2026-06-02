import { cn } from "@/lib/utils/cn";
import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-[15px]", className)}>
      {children}
    </div>
  );
}
