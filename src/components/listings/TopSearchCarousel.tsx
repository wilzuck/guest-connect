"use client";

import type { Listing } from "@/types/listing";
import { TopListingsMiniCarousel } from "@/components/listings/TopListingsMiniCarousel";
import { useTranslations } from "next-intl";

export function TopSearchCarousel({ locale, items }: { locale: string; items: Listing[] }) {
  const t = useTranslations("home");
  return (
    <TopListingsMiniCarousel
      locale={locale}
      title={t("topSearchTitle")}
      items={items}
    />
  );
}
