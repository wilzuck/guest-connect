import Link from "next/link";
import { ChevronLeft, ChevronLeftIcon, ChevronRight, ChevronRightIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type BackButtonProps = {
  href: string;
  label: string;
  className?: string;
  buttonPosition?: 'start' | 'end';
};

/** Sober "go back" link with a leading chevron. Reusable on detail pages. */
export function BackButton({ href, label, className, buttonPosition = 'start' }: BackButtonProps) {
  return (
     <Link
      href={href}
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-zinc-600 transition-colors",
        "hover:bg-black/4 hover:text-black",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
        "dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white",
        "dark:focus-visible:ring-white/25",
        className,
      )}
    >
      {buttonPosition === "start" ? (
        <>
          <ChevronLeftIcon className="size-4 shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </>
      ) : (
        <>
          <span>{label}</span>
          <ChevronRightIcon className="size-4 shrink-0" aria-hidden="true" />
        </>
      )}
    </Link>
  );
}
