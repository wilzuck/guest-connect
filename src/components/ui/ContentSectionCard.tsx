import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";

type ContentSectionCardProps = {
  id?: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

export function ContentSectionCard({ id, title, children, className }: ContentSectionCardProps) {
  return (
    <Card className={cn("p-6 shadow-none", className)}>
      <h2 id={id} className="text-lg font-semibold tracking-tight text-black dark:text-white">
        {title}
      </h2>
      <div className="mt-4 grid gap-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </Card>
  );
}
