import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type InfoCardProps = {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  href?: string;
  className?: string;
  compact?: boolean;
  interactive?: boolean;
  children?: ReactNode;
};

export function InfoCard({
  title,
  description,
  icon,
  href,
  className,
  compact = false,
  interactive,
  children,
}: InfoCardProps) {
  const isInteractive = interactive ?? Boolean(href);
  const content = (
    <>
      {icon ? (
        <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-black/10 bg-white text-black dark:border-zinc-800 dark:bg-zinc-950 dark:text-white">
          {icon}
        </div>
      ) : null}
      <p className="text-sm font-semibold text-black dark:text-white">{title}</p>
      {description ? (
        <p className={cn("text-sm leading-6 text-zinc-600 dark:text-zinc-400", compact ? "mt-1" : "mt-2")}>
          {description}
        </p>
      ) : null}
      {children}
    </>
  );
  const classes = cn(
    "rounded-2xl border border-black/5 bg-white shadow-none dark:border-zinc-800 dark:bg-zinc-950",
    compact ? "p-4" : "p-6",
    isInteractive && "transition hover:border-black/10 hover:bg-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
