"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";

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

function writeFavorites(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function FavoriteButton({
  listingId,
  locale: _locale,
  className,
}: {
  listingId: string;
  locale: string;
  className?: string;
}) {
  const t = useTranslations("favorites");
  const [active, setActive] = useState(false);

  useEffect(() => {
    // évite setState synchronisé dans l’effet (lint)
    const t = setTimeout(() => {
      const ids = readFavorites();
      setActive(ids.includes(listingId));
    }, 0);
    return () => clearTimeout(t);
  }, [listingId]);

  const label = useMemo(() => (active ? t("remove") : t("add")), [active, t]);

  function toggle() {
    const ids = readFavorites();
    const next = ids.includes(listingId) ? ids.filter((id) => id !== listingId) : [...ids, listingId];
    writeFavorites(next);
    setActive(next.includes(listingId));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-11 w-11 place-items-center rounded-2xl border border-black/10 bg-white shadow-sm shadow-black/10 transition hover:bg-zinc-50 active:scale-[0.98]",
        className,
      )}
    >
      <Heart className={cn("h-5 w-5", active ? "fill-black text-black" : "text-zinc-700")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}

function Heart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
