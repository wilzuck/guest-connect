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

  const price = useMemo(() => formatFrom(pricePerNight, currency), [formatFrom, pricePerNight, currency]);

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm shadow-black/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-zinc-600">{t("from")}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-black">
            {price}
          </p>
          <p className="mt-1 text-sm text-zinc-600">{t("perNight")}</p>
        </div>
      </div>

      <div className="mt-6">
        <DateRangePicker
          value={range}
          onChange={setRange}
          startLabel={t("checkIn")}
          endLabel={t("checkOut")}
        />
      </div>

      <div className="mt-5 grid gap-3">
        <ButtonLink href={`/${locale}/search`} variant="primary" size="lg" className="w-full">
          {t("cta")}
        </ButtonLink>
      </div>

      <p className="mt-4 text-xs leading-5 text-zinc-500">{t("note")}</p>
    </div>
  );
}
