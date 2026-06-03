"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { africaListings } from "@/lib/mock/africa-listings";
import { ListingCard } from "@/components/listings/ListingCard";

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

export default function Page() {
  const locale = useLocale();
  const isEn = locale === "en";
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => setIds(readFavorites()), 0);
  }, []);

  const items = useMemo(() => africaListings.filter((l) => ids.includes(l.id)), [ids]);

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {isEn ? "Saved" : "Enregistrés"}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            {isEn ? "Favorites" : "Favoris"}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            {isEn
              ? "Keep your favorite stays in one place."
              : "Retrouvez vos hébergements favoris au même endroit."}
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          {items.length === 0 ? (
            <Card className="p-8 shadow-none">
              <p className="text-sm font-semibold text-black">{isEn ? "No favorites yet" : "Aucun favori"}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {isEn
                  ? "Browse stays and tap the heart to save listings."
                  : "Parcourez les hébergements et cliquez sur le cœur pour enregistrer une annonce."}
              </p>
              <div className="mt-6">
                <Link
                  href={`/${locale}/stays`}
                  className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition"
                >
                  {isEn ? "Browse stays" : "Voir les hébergements"}
                </Link>
              </div>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((l) => (
                <ListingCard key={l.id} locale={locale} listing={l} variant="outlined" />
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
