"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { SearchParams } from "@/types/search";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { Calendar1, Users } from "lucide-react";

type SearchBarProps = {
  onSearch?: (params: SearchParams) => void | Promise<void>;
  defaultValues?: SearchParams;
  variant?: "auto" | "mobile" | "desktop" | "compact";
};

export function SearchBar({
  onSearch,
  defaultValues,
  variant = "auto",
}: SearchBarProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("searchBar");
  const [destination, setDestination] = useState(
    defaultValues?.destination ?? "",
  );
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
    if (typeof params.guests === "number")
      query.set("guests", String(params.guests));
    router.push(
      `/${locale}/search${query.toString() ? `?${query.toString()}` : ""}`,
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Desktop: une seule ligne fluide. Mobile: layout optimisé. Compact: version hero (petite). */}
      <div
        className={[
          // Compact (hero) : transparent premium, pas de shadow
          variant === "compact"
            ? "rounded-2xl border border-black/10 bg-white/80 p-4 backdrop-blur"
            : // Full width : pas de shadow, radius plus petit
              "rounded-2xl border border-black/10 bg-white/80 p-2 backdrop-blur-sm dark:border-black/10 dark:bg-zinc-900/80",
        ].join(" ")}
      >
        {/* Desktop */}
        <div
          className={[
            "items-stretch gap-2 rounded-2xl md:flex",
            variant === "desktop" ? "flex" : "",
            variant === "auto" ? "md:flex" : "",
            variant === "mobile" || variant === "compact" ? "hidden" : "",
          ].join(" ")}
        >
          <div className="group relative flex h-14 border border-black/10 items-center gap-2 rounded-xl px-4 transition-all duration-200 flex-[1.7]">
            <PinIcon className="h-4 w-4 text-zinc-400" />
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={t("placeholderDestination")}
              aria-label={t("ariaDestination")}
              className="h-11 w-full rounded-md bg-white px-4 text-sm text-black placeholder:text-zinc-500 transition h-12 min-w-0 flex-1 border-0 bg-transparent px-0 !shadow-none outline-none placeholder:text-zinc-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setDestination("")}
              className={[
                "relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full text-zinc-500 transition",
                destination
                  ? "opacity-100 hover:bg-black/5 hover:text-black"
                  : "pointer-events-none opacity-0",
              ].join(" ")}
              aria-label={t("ariaClearDestination")}
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>

          <div className=" border border-black/10 my-2 md:my-0 rounded-xl  transition-all duration-200 flex-[1.8]">
            <DateRangePicker
              value={{
                from: checkIn || undefined,
                to: checkOut || undefined,
              }}
              onChange={(next) => {
                setCheckIn(next.from ?? "");
                setCheckOut(next.to ?? "");
              }}
              startLabel={t("arrival")}
              endLabel={t("departure")}
            />
          </div>

          <FieldShell className=" border border-black/10 rounded-xl px-2 transition-all duration-200 flex-[0.85]">
            <div className="flex items-start gap-2">
              <Users className="h-4 w-4 md:hidden lg:block text-zinc-400 shrink-0" />
              <div className="grid">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {t("guests")}
                </p>
                <span className="text-sm font-semibold ">
                  {guests}
                </span>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
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
          </FieldShell>

          <Button
            type="submit"
            className="h-14 w-full md:w-fit mt-4 md:mt-0 rounded-xl px-6 justify-center transition active:scale-[0.99] md:min-w-[160px]"
          >
            <SearchIcon className="h-4 w-4" />
            {t("search")}
          </Button>
        </div>

        {/* Mobile */}
        <div
          className={[
            "grid gap-2",
            variant === "auto" ? "md:hidden" : "",
            variant === "mobile" || variant === "compact" ? "" : "hidden",
          ].join(" ")}
        >
          <div
            className={[
              "group relative flex items-center gap-2 rounded-2xl transition-all duration-200 hover:bg-zinc-50",
              variant === "compact"
                ? "h-12 bg-white px-3"
                : "h-14 bg-white px-4",
            ].join(" ")}
          >
            <PinIcon className="h-4 w-4 text-zinc-400" />
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={t("placeholderDestination")}
              aria-label={t("ariaDestination")}
              className="h-12 w-full min-w-0 flex-1 border-0 bg-transparent px-0 !shadow-none outline-none text-sm text-black placeholder:text-zinc-500 transition focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setDestination("")}
              className={[
                "relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full text-zinc-500 transition",
                destination
                  ? "opacity-100 hover:bg-black/5 hover:text-black"
                  : "pointer-events-none opacity-0",
              ].join(" ")}
              aria-label={t("ariaClearDestination")}
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>

          <DateRangePicker
            value={{
              from: checkIn || undefined,
              to: checkOut || undefined,
            }}
            onChange={(next) => {
              setCheckIn(next.from ?? "");
              setCheckOut(next.to ?? "");
            }}
            startLabel={t("arrival")}
            endLabel={t("departure")}
            size={variant === "compact" ? "sm" : "md"}
          />

          <FieldShell
            className={
              variant === "compact" ? "h-12 bg-white px-3" : "h-14 bg-white"
            }
          >
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <Calendar1 className="h-4 w-4 text-zinc-400 shrink-0" />

              <div className="grid">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {t("guests")}
                </p>
                <span className="text-sm font-semibold ">
                  {guests}
                </span>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
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
          </FieldShell>

          <Button
            type="submit"
            className={[
              "w-full rounded-2xl px-6 justify-center transition active:scale-[0.99]",
              variant === "compact" ? "h-12" : "h-14",
            ].join(" ")}
          >
            <SearchIcon className="h-4 w-4" />
            {t("search")}
          </Button>
        </div>
      </div>
    </form>
  );
}

function FieldShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "group relative flex h-14 flex-1 items-center gap-2 rounded-2xl border border-zinc-200 px-4 transition-all duration-200 hover:bg-zinc-50 focus-within:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:focus-within:bg-zinc-800",
        className ?? "",
      ].join(" ")}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-black/10 transition group-focus-within:ring-2" />
    </div>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
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
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
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
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
