"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Car, Home, MapPin, Search, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { cn } from "@/lib/utils/cn";

type SearchHomesBarProps = {
  locale: string;
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
};

export function SearchHomesBar({
  locale,
  destination = "",
  checkIn,
  checkOut,
  guests = 2,
}: SearchHomesBarProps) {
  const t = useTranslations("searchPage");

  const [range, setRange] = useState<{ from?: string; to?: string }>({
    from: checkIn,
    to: checkOut,
  });

  return (
    <section className="border-b border-zinc-200 bg-zinc-50/70 dark:border-white/10 dark:bg-zinc-950">
      <Container className="py-6 sm:py-8 lg:py-10">
        <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm shadow-black/5 dark:border-white/10 dark:bg-zinc-950 dark:shadow-none">
          <div className="flex border-b border-zinc-200 bg-zinc-50/70 dark:border-white/10 dark:bg-white/[0.03]">
            <SearchTab href={`/${locale}/services`} icon={<Car className="size-4" />} label="Services" />

            <SearchTab active href={`/${locale}/search`} icon={<Home className="size-4" />} label="Homes" />
          </div>

          <form
            action={`/${locale}/search`}
            method="get"
            className="grid gap-3 p-3 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.4fr)_minmax(120px,0.55fr)_auto] lg:items-end"
          >
            <SearchField label={t("where")} icon={<MapPin className="size-4" />}>
              <input
                name="destination"
                defaultValue={destination}
                placeholder={t("destinationPlaceholder")}
                className="w-full bg-transparent text-sm font-semibold text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-500"
              />
            </SearchField>

            <div className="rounded-2xl border border-zinc-200 bg-white p-3 dark:border-white/10 dark:bg-zinc-950">
              <DateRangePicker
                value={range}
                onChange={setRange}
                startLabel={t("checkIn")}
                endLabel={t("checkOut")}
                fieldVariant="compact"
                size="sm"
              />

              <input type="hidden" name="checkIn" value={range.from ?? ""} />
              <input type="hidden" name="checkOut" value={range.to ?? ""} />
            </div>

            <SearchField label={t("guests")} icon={<Users className="size-4" />}>
              <input
                name="guests"
                type="number"
                min={1}
                defaultValue={Number.isFinite(guests) ? guests : 2}
                className="w-full bg-transparent text-sm font-semibold text-zinc-950 outline-none dark:text-white"
              />
            </SearchField>

            <button
              type="submit"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10 dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:focus-visible:ring-white/20 lg:w-auto"
            >
              <Search className="size-4" aria-hidden="true" />
              {t("updateSearch")}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}

function SearchTab({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex flex-1 items-center justify-center gap-2 border-r border-zinc-200 px-5 py-4 text-sm font-semibold transition last:border-r-0 dark:border-white/10 sm:flex-none",
        active
          ? "bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white"
          : "text-zinc-500 hover:bg-white/70 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-white",
      )}
    >
      {icon}
      {label}
    </a>
  );
}

function SearchField({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="flex min-h-16 items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition focus-within:border-zinc-400 dark:border-white/10 dark:bg-zinc-950 dark:focus-within:border-white/30">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-zinc-50 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400">
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          {label}
        </span>

        <span className="mt-1 block">{children}</span>
      </span>
    </label>
  );
}