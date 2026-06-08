"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { africaListings } from "@/lib/mock/africa-listings";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { AccountShell } from "@/components/account/AccountShell";
import { Card } from "@/components/ui";

const STORAGE_KEY = "guestconnect_favorites";

function readFavorites(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const arr = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(arr)
      ? arr.filter((x): x is string => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

export default function Page() {
  const locale = useLocale();
  const isEn = locale === "en";
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => setIds(readFavorites()), 0);
  }, []);

  const favorites = useMemo(
    () => africaListings.filter((l) => ids.includes(l.id)),
    [ids],
  );
  const items = useMemo(() => {
    const base = favorites.length > 0 ? favorites : africaListings.slice(0, 4);
    return base.slice(0, 4);
  }, [favorites]);

  return (
    <AccountShell
      locale={locale}
      title={isEn ? "Favorites" : "Favoris"}
      subtitle={
        isEn
          ? "Track upcoming stays and your booking history."
          : "Suivez vos séjours à venir et votre historique."
      }
      activeHref={`/${locale}/favorites`}
    >
      <Card className="p-5 xl:p-8">
        <ListingGrid className="mt-6">
          {items.map((l) => (
            <ListingCard
              key={l.id}
              locale={locale}
              listing={l}
              variant="outlined"
            />
          ))}
        </ListingGrid>
      </Card>
    </AccountShell>
  );
}
