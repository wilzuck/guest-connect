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
      className="w-full"
    >
      {/* Inspiré des références: bar pill segmentée, fluide, micro-animations. */}
      <div className="rounded-[28px] bg-zinc-100/70 p-2 backdrop-blur-sm">
        <div className="grid gap-2 md:grid-cols-12 md:items-stretch md:gap-0 md:overflow-hidden md:rounded-[22px] md:bg-white">
          {/* Destination */}
          <div className="group md:col-span-4 md:px-2 md:py-1">
            <div className="relative flex h-14 items-center gap-2 rounded-2xl bg-white px-4 transition-all duration-200 md:bg-transparent md:hover:bg-zinc-50 md:focus-within:bg-zinc-50">
              <PinIcon className="h-4 w-4 text-zinc-400 transition-colors group-focus-within:text-black" />
              <Input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={t("placeholderDestination")}
                aria-label={t("ariaDestination")}
                className="h-12 flex-1 border-0 bg-transparent px-0 shadow-none outline-none focus:ring-0 focus:border-transparent"
              />

              <button
                type="button"
                onClick={() => setDestination("")}
                className={[
                  "grid h-9 w-9 place-items-center rounded-full text-zinc-500 transition",
                  destination ? "opacity-100 hover:bg-black/5 hover:text-black" : "pointer-events-none opacity-0",
                ].join(" ")}
                aria-label={t("ariaClearDestination")}
              >
                <XIcon className="h-4 w-4" />
              </button>

              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-black/10 transition group-focus-within:ring-2" />
            </div>
          </div>

          {/* Séparateur */}
          <div className="hidden md:block md:col-span-1 md:w-px md:justify-self-center md:bg-black/5" />

          {/* Arrivée */}
          <div className="md:col-span-2 md:px-2 md:py-1">
            <DatePicker
              value={checkIn}
              onChange={(v) => setCheckIn(v ?? "")}
              label={t("arrival")}
              className="h-14 md:border-0 md:bg-transparent md:hover:bg-zinc-50 md:focus:ring-0"
            />
          </div>

          {/* Séparateur */}
          <div className="hidden md:block md:col-span-1 md:w-px md:justify-self-center md:bg-black/5" />

          {/* Départ */}
          <div className="md:col-span-2 md:px-2 md:py-1">
            <DatePicker
              value={checkOut}
              onChange={(v) => setCheckOut(v ?? "")}
              label={t("departure")}
              className="h-14 md:border-0 md:bg-transparent md:hover:bg-zinc-50 md:focus:ring-0"
            />
          </div>

          {/* Séparateur */}
          <div className="hidden md:block md:col-span-1 md:w-px md:justify-self-center md:bg-black/5" />

          {/* Voyageurs */}
          <div className="md:col-span-3 md:px-2 md:py-1">
            <div className="group relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white px-4 transition-all duration-200 md:bg-transparent md:hover:bg-zinc-50 md:focus-within:bg-zinc-50">
              <div className="grid">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {t("guests")}
                </p>
                <span className="text-sm font-semibold text-black">{guests}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="grid h-9 w-9 place-items-center rounded-full bg-black/[0.04] text-black transition hover:bg-black/[0.08] active:scale-[0.96]"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  aria-label={t("ariaRemoveGuest")}
                >
                  −
                </button>
                <button
                  type="button"
                  className="grid h-9 w-9 place-items-center rounded-full bg-black/[0.04] text-black transition hover:bg-black/[0.08] active:scale-[0.96]"
                  onClick={() => setGuests((g) => g + 1)}
                  aria-label={t("ariaAddGuest")}
                >
                  +
                </button>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-black/10 transition group-focus-within:ring-2" />
            </div>
          </div>

          {/* CTA */}
          <div className="md:col-span-12 md:p-1">
            <div className="flex md:justify-end">
              <Button
                type="submit"
                className="h-14 w-full rounded-2xl px-6 justify-center transition active:scale-[0.99] md:w-auto md:min-w-[160px]"
              >
                <SearchIcon className="h-4 w-4" />
                {t("search")}
              </Button>
            </div>
          </div>
        </div>
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

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
