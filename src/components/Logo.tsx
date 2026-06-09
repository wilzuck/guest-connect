"use client";

import Image from "next/image";
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
      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-white dark:bg-zinc-900 aspect-square">
        <Image
          src="/brand/guestconnect-mark.jpg"
          alt="GuestConnect"
          fill
          className="object-cover object-center"
          sizes="36px"
          priority
        />
      </span>
      <span className="hidden text-sm font-semibold tracking-tight lg:block">
        Guest-Connect
      </span>
    </Link>
  );
}
