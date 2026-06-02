"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { ButtonLink } from "@/components/ui/Button";
import { useCurrency } from "@/components/currency/CurrencyProvider";
import type { CurrencyCode } from "@/lib/currency/currency";

export function BookingCard({
  locale,
  pricePerNight,
  currency,
}: {
  locale: string;
  pricePerNight: number;
  currency: CurrencyCode;
}) {
  const t = useTranslations("bookingCard");
  const { formatFrom } = useCurrency();
  const [range, setRange] = useState<{ from?: string; to?: string }>({});

  const price = useMemo(() => formatFrom(pricePerNight, currency), [formatFrom, pricePerNight, currency]);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_18px_60px_-45px_rgba(0,0,0,0.55)]">
      <div className="flex items-end justify-between gap-4">
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
        <ButtonLink href={`/${locale}/favorites`} variant="outline" size="lg" className="w-full">
          {t("save")}
        </ButtonLink>
      </div>

      <p className="mt-4 text-xs leading-5 text-zinc-500">{t("note")}</p>
    </div>
  );
}

