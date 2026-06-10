"use client";

import Link from "next/link";
import { Home, BriefcaseBusiness, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import type { SearchCategory } from "@/components/SearchBar";

type SearchCategoryTabsProps = {
  locale: string;
  active: SearchCategory;
  params: Record<string, string | undefined>;
};

/**
 * Onglets de catégorie (Logements / Services / Expériences) sous forme de liens.
 * Conserve la recherche texte commune (`q`/`destination`) en changeant d'onglet,
 * et réinitialise la pagination.
 */
export function SearchCategoryTabs({ locale, active, params }: SearchCategoryTabsProps) {
  const t = useTranslations("searchPage");

  const tabs: Array<{ key: SearchCategory; label: string; icon: typeof Home }> = [
    { key: "stays", label: t("tabStays"), icon: Home },
    { key: "services", label: t("tabServices"), icon: BriefcaseBusiness },
    { key: "experiences", label: t("tabExperiences"), icon: Sparkles },
  ];

  // Terme de recherche commun, transmis d'un onglet à l'autre.
  const sharedQuery = params.q?.trim() || params.destination?.trim() || "";

  function hrefFor(category: SearchCategory) {
    const query = new URLSearchParams();
    if (category !== "stays") query.set("category", category);
    if (sharedQuery) {
      query.set(category === "stays" ? "destination" : "q", sharedQuery);
    }
    const qs = query.toString();
    return `/${locale}/search${qs ? `?${qs}` : ""}`;
  }

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white p-1 dark:border-white/15 dark:bg-zinc-900"
      role="tablist"
      aria-label={t("filters")}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.key === active;
        return (
          <Link
            key={tab.key}
            href={hrefFor(tab.key)}
            role="tab"
            aria-selected={isActive}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition",
              isActive
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
