"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { SearchParams } from "@/types/search";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { DatePicker } from "@/components/ui/DatePicker";

type SearchBarProps = {
  onSearch?: (params: SearchParams) => void | Promise<void>;
  defaultValues?: SearchParams;
};

export function SearchBar({ onSearch, defaultValues }: SearchBarProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("searchBar");
  const [destination, setDestination] = useState(defaultValues?.destination ?? "");
  const [checkIn, setCheckIn] = useState(defaultValues?.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(defaultValues?.checkOut ?? "");
  const [guests, setGuests] = useState(defaultValues?.guests ?? 2);

  const params = useMemo<SearchParams>(
    () => ({
      destination: destination.trim() || undefined,
      checkIn: checkIn || undefined,
      checkOut: checkOut || undefined,
      guests,
    }),
    [destination, checkIn, checkOut, guests],
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (onSearch) {
      await onSearch(params);
      return;
    }

    // Fallback: redirige vers la page /search (le template de recherche vit là-bas)
    const query = new URLSearchParams();
    if (params.destination) query.set("destination", params.destination);
    if (params.checkIn) query.set("checkIn", params.checkIn);
    if (params.checkOut) query.set("checkOut", params.checkOut);
    if (typeof params.guests === "number") query.set("guests", String(params.guests));
    router.push(`/${locale}/search${query.toString() ? `?${query.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-black/10 bg-white p-2 shadow-lg shadow-black/10"
    >
      {/* Une seule ligne (style Booking) ; sur mobile on garde une ligne avec scroll horizontal */}
      <div className="flex items-stretch gap-2 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Destination */}
        <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-2xl border border-black/10 bg-white px-4">
          <PinIcon className="h-4 w-4 text-zinc-400" />
          <Input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder={t("placeholderDestination")}
            aria-label="Destination"
            className="h-12 border-0 bg-transparent px-0 shadow-none focus:ring-0 focus:border-transparent"
          />
        </div>

        {/* Arrivée */}
        <div className="min-w-[190px]">
          <DatePicker value={checkIn} onChange={(v) => setCheckIn(v ?? "")} label={t("arrival")} />
        </div>

        {/* Départ */}
        <div className="min-w-[190px]">
          <DatePicker value={checkOut} onChange={(v) => setCheckOut(v ?? "")} label={t("departure")} />
        </div>

        {/* Voyageurs */}
        <div className="flex min-w-[190px] items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4">
          <div className="grid">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {t("guests")}
            </p>
            <span className="text-sm font-semibold text-black">{guests}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-full border border-black/10"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              aria-label="Retirer un voyageur"
            >
              −
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-full border border-black/10"
              onClick={() => setGuests((g) => g + 1)}
              aria-label="Ajouter un voyageur"
            >
              +
            </Button>
          </div>
        </div>

        {/* CTA */}
        <Button type="submit" className="h-12 min-w-[150px] rounded-2xl px-6">
          <SearchIcon className="h-4 w-4" />
          {t("search")}
        </Button>
      </div>
    </form>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-6.2 7-12A7 7 0 1 0 5 10c0 5.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
