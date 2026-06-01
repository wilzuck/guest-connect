"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { useLocale } from "next-intl";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  const locale = useLocale();
  return (
    <Link href={`/${locale}`} className={cn("inline-flex items-center gap-2", className)}>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white shadow-sm shadow-black/10">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 2l7 5v7c0 4.418-3.134 7.418-7 8-3.866-.582-7-3.582-7-8V7l7-5Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M8.5 12.5 11 15l4.5-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-sm font-semibold tracking-tight text-black">
        GuestConnect
      </span>
    </Link>
  );
}
