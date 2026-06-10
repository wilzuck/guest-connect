"use client";

import { useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Building2, Landmark, Leaf, Sparkles, Trees, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { cn } from "@/lib/utils/cn";
import type { Listing } from "@/types/listing";

// Logement enrichi avec ses centres d'intérêt (cf. africa-listings.ts).
export type HomeListing = Listing & {
  interests?: string[];
};

// Clé de catégorie -> libellé i18n + valeur "interest" présente dans les données.
type CategoryKey = "all" | "beach" | "city" | "culture" | "nature" | "business";

const CATEGORIES: { key: CategoryKey; icon: LucideIcon; interest?: string }[] = [
  { key: "all", icon: Sparkles },
  { key: "beach", icon: Waves, interest: "Bord de mer" },
  { key: "city", icon: Building2, interest: "Centre-ville" },
  { key: "culture", icon: Landmark, interest: "Patrimoine & culture" },
  { key: "nature", icon: Trees, interest: "Nature" },
  { key: "business", icon: Leaf, interest: "Business" },
];

type HomeListingsExplorerProps = {
  listings: HomeListing[];
};

export function HomeListingsExplorer({ listings }: HomeListingsExplorerProps) {
  const locale = useLocale();
  const t = useTranslations("homeListings");
  const tc = useTranslations("homeCategories");
  const [active, setActive] = useState<CategoryKey>("all");

  const filtered = useMemo(() => {
    if (active === "all") return listings;
    const interest = CATEGORIES.find((c) => c.key === active)?.interest;
    if (!interest) return listings;
    return listings.filter((l) => l.interests?.includes(interest));
  }, [active, listings]);

  return (
    <section id="listings">
      <Container className="py-16 sm:py-20">
        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/80">
            {t("eyebrow")}
          </p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl">
              {t("title")}
            </h2>
            <div className="flex justify-center sm:justify-end">
              <ButtonLink href={`/${locale}/stays`} variant="outline" size="md">
                {t("viewAll")}
              </ButtonLink>
            </div>
          </div>
          <p className="mt-3 max-w-xl text-balance text-sm leading-6 text-zinc-600 dark:text-zinc-300 sm:mt-4 sm:max-w-2xl sm:text-base sm:leading-7 lg:text-lg">
            {t("description")}
          </p>
        </div>

        <CategoryBar
          active={active}
          onChange={setActive}
          label={tc("label")}
          getLabel={(key) => tc(key)}
        />

        {filtered.length > 0 ? (
          <ListingGrid className="mt-8">
            {filtered.map((l) => (
              <div key={l.id} className="min-w-0">
                <ListingCard locale={locale} listing={l} variant="plain" />
              </div>
            ))}
          </ListingGrid>
        ) : (
          <p className="mt-10 rounded-2xl border border-dashed border-black/10 p-8 text-center text-sm text-zinc-500 dark:border-white/15 dark:text-zinc-400">
            {tc("empty")}
          </p>
        )}
      </Container>
    </section>
  );
}

type CategoryBarProps = {
  active: CategoryKey;
  onChange: (key: CategoryKey) => void;
  label: string;
  getLabel: (key: CategoryKey) => string;
};

function CategoryBar({ active, onChange, label, getLabel }: CategoryBarProps) {
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div
      role="group"
      aria-label={label}
      className="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      ref={listRef}
    >
      {CATEGORIES.map(({ key, icon: Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-pressed={isActive}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black",
              isActive
                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                : "border-black/10 bg-white text-zinc-700 hover:border-black/30 dark:border-white/15 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-white/40",
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            {getLabel(key)}
          </button>
        );
      })}
    </div>
  );
}
