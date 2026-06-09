"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("localeSwitcher");
  const pathname = usePathname() || `/${locale}`;

  const base = pathname.replace(/^\/(fr|en)(?=\/|$)/, "");
  const frHref = base ? `/fr${base}` : "/fr";
  const enHref = base ? `/en${base}` : "/en";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-black/10 bg-white p-1 shadow-sm shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/30",
        className,
      )}
    >
      <Link
        href={frHref}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-semibold transition",
          locale === "fr" ? "bg-black text-white dark:bg-white dark:text-black" : "text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white",
        )}
        aria-label={t("ariaFr")}
      >
        FR
      </Link>
      <Link
        href={enHref}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-semibold transition",
          locale === "en" ? "bg-black text-white dark:bg-white dark:text-black" : "text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white",
        )}
        aria-label={t("ariaEn")}
      >
        EN
      </Link>
    </div>
  );
}
