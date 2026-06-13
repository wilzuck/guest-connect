"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils/cn";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export function Logo({ className, showWordmark = true }: LogoProps) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}`}
      aria-label="GuestConnect — Accueil"
      className={cn("inline-flex shrink-0 items-center gap-2", className)}
    >
      <span className="relative size-6 shrink-0">
        <Image
          src="/brand/guestconnect-mark_symbol.png"
          alt="GuestConnect"
          fill
          priority
          sizes="20px"
          className="h-6 object-contain"
        />
      </span>

      {showWordmark ? (
        <span className="whitespace-nowrap hidden md:inline text-sm font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
          GuestConnect
        </span>
      ) : null}
    </Link>
  );
}