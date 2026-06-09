"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { africaListings } from "@/lib/mock/africa-listings";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { Card } from "@/components/ui/Card";

const STORAGE_KEY = "guestconnect_favorites";

function readFavorites(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const arr = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function FavoritesClient() {
  const locale = useLocale();
  const isEn = locale === "en";
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setIds(readFavorites()), 0);
    return () => clearTimeout(t);
  }, []);

  const favorites = useMemo(() => africaListings.filter((l) => ids.includes(l.id)), [ids]);
  const items = useMemo(() => {
    const base = favorites.length > 0 ? favorites : africaListings.slice(0, 4);
    return base.slice(0, 4);
  }, [favorites]);

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold ">
            {favorites.length > 0 ? (isEn ? "Your saved stays" : "Vos favoris") : isEn ? "Recommended for you" : "Suggestions"}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {favorites.length > 0
              ? isEn
                ? "Showing up to 4 saved listings."
                : "Affichage de 4 favoris maximum."
              : isEn
                ? "You don’t have favorites yet — here are 4 picks to start."
                : "Vous n’avez pas encore de favoris — voici 4 suggestions pour commencer."}
          </p>
        </div>
        <Link href={`/${locale}/stays`} className="text-sm font-semibold  hover:underline">
          {isEn ? "Browse stays" : "Voir les hébergements"}
        </Link>
      </div>

      <ListingGrid className="mt-6">
        {items.map((l) => (
          <ListingCard key={l.id} locale={locale} listing={l} variant="outlined" />
        ))}
      </ListingGrid>

      <Card className="mt-8 p-5 shadow-none">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {isEn
            ? "Favorites are stored in your browser for now (localStorage)."
            : "Les favoris sont stockés dans ton navigateur pour l’instant (localStorage)."}
        </p>
      </Card>
    </div>
  );
}

