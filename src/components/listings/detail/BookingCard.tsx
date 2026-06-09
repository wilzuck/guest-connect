"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { ButtonLink } from "@/components/ui/Button";
import { useCurrency } from "@/components/currency/CurrencyProvider";
import type { CurrencyCode } from "@/lib/currency/currency";

export function BookingCard({
  locale,
  listingId,
  pricePerNight,
  currency,
}: {
  locale: string;
  listingId: string;
  pricePerNight: number;
  currency: CurrencyCode;
}) {
  const t = useTranslations("bookingCard");
  const { formatFrom } = useCurrency();
  const [range, setRange] = useState<{ from?: string; to?: string }>({});
  const [error, setError] = useState<string | null>(null);

  const price = useMemo(() => formatFrom(pricePerNight, currency), [formatFrom, pricePerNight, currency]);
  const canReserve = Boolean(range.from && range.to);
  const checkoutHref = `/${locale}/checkout?listingId=${encodeURIComponent(listingId)}&checkIn=${encodeURIComponent(
    range.from ?? "",
  )}&checkOut=${encodeURIComponent(range.to ?? "")}`;

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm shadow-black/10 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{t("from")}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-black dark:text-white">
            {price}
          </p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{t("perNight")}</p>
        </div>
      </div>

      <div className="mt-6">
        <DateRangePicker
          value={range}
          onChange={(next) => {
            setRange(next);
            if (next.from && next.to) setError(null);
          }}
          startLabel={t("checkIn")}
          endLabel={t("checkOut")}
          fieldVariant="bordered"
        />
      </div>

      <div className="mt-5 grid gap-3">
        <ButtonLink
          href={canReserve ? checkoutHref : "#"}
          variant="primary"
          size="lg"
          className="w-full"
          aria-disabled={!canReserve}
          onClick={(event) => {
            if (canReserve) return;
            event.preventDefault();
            setError("Choisissez les dates d'arrivée et de départ pour réserver.");
          }}
        >
          {t("cta")}
        </ButtonLink>
      </div>

      {error ? <p className="mt-3 text-xs font-medium text-red-600 dark:text-red-300">{error}</p> : null}

      <p className="mt-4 text-xs leading-5 text-zinc-500 dark:text-zinc-400">{t("note")}</p>
    </div>
  );
}
