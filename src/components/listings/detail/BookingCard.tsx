"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { ButtonLink } from "@/components/ui/Button";
import { useCurrency } from "@/components/currency/CurrencyProvider";
import type { CurrencyCode } from "@/lib/currency/currency";

type BookingCardProps = {
  locale: string;
  listingId: string;
  pricePerNight: number;
  currency: CurrencyCode;
  vatRate?: number;
  serviceFeeRate?: number;
};

type DateRange = {
  from?: string;
  to?: string;
};

const DEFAULT_VAT_RATE = 0.18;
const DEFAULT_SERVICE_FEE_RATE = 0.013;

export function BookingCard({
  locale,
  listingId,
  pricePerNight,
  currency,
  vatRate = DEFAULT_VAT_RATE,
  serviceFeeRate = DEFAULT_SERVICE_FEE_RATE,
}: BookingCardProps) {
  const t = useTranslations("bookingCard");
  const { formatFrom } = useCurrency();

  const [range, setRange] = useState<DateRange>({});
  const [error, setError] = useState<string | null>(null);

  const nights = useMemo(
    () => getNightsCount(range.from, range.to),
    [range.from, range.to],
  );

  const price = useMemo(
    () => formatFrom(pricePerNight, currency),
    [formatFrom, pricePerNight, currency],
  );

  const totals = useMemo(() => {
    const subtotal = pricePerNight * nights;
    const serviceFee = subtotal * serviceFeeRate;
    const vat = subtotal * vatRate;
    const total = subtotal + serviceFee + vat;

    return {
      subtotal,
      serviceFee,
      vat,
      total,
    };
  }, [pricePerNight, nights, serviceFeeRate, vatRate]);

  const canReserve = Boolean(range.from && range.to && nights > 0);

  const checkoutHref = useMemo(() => {
    const params = new URLSearchParams({
      listingId,
      checkIn: range.from ?? "",
      checkOut: range.to ?? "",
      nights: String(nights),
      subtotal: String(Math.round(totals.subtotal)),
      serviceFee: String(Math.round(totals.serviceFee)),
      vat: String(Math.round(totals.vat)),
      total: String(Math.round(totals.total)),
    });

    return `/${locale}/checkout?${params.toString()}`;
  }, [locale, listingId, range.from, range.to, nights, totals]);

  return (
    <div className="rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-sm shadow-black/5 dark:border-white/10 dark:bg-zinc-950 dark:shadow-none sm:p-6">
      <div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {t("from")}
        </p>

        <div className="mt-2 flex items-end gap-2">
          <p className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            {price}
          </p>

          <p className="pb-1 text-sm text-zinc-500 dark:text-zinc-400">
            {t("perNight")}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <DateRangePicker
          value={range}
          onChange={(next) => {
            setRange(next);

            if (next.from && next.to) {
              setError(null);
            }
          }}
          startLabel={t("checkIn")}
          endLabel={t("checkOut")}
          fieldVariant="compact"
        />
      </div>

      {canReserve ? (
        <div className="mt-5 space-y-3 rounded-2xl bg-zinc-50 p-4 dark:bg-white/[0.04]">
          <PriceRow
            label={`${price} × ${nights} ${nights > 1 ? t("nights") : t("night")}`}
            value={formatFrom(totals.subtotal, currency)}
          />

          <PriceRow
            label={t("serviceFee", { rate: serviceFeeRate * 100 })}
            value={formatFrom(totals.serviceFee, currency)}
          />

          <PriceRow
            label={t("vat", { rate: vatRate * 100 })}
            value={formatFrom(totals.vat, currency)}
          />

          <div className="border-t border-zinc-200 pt-3 dark:border-white/10">
            <PriceRow
              label={t("total")}
              value={formatFrom(totals.total, currency)}
              strong
            />
          </div>
        </div>
      ) : null}

      <div className="mt-5">
        <ButtonLink
          href={canReserve ? checkoutHref : "#"}
          variant="primary"
          size="lg"
          className={[
            "h-12 w-full rounded-full text-sm font-semibold transition",
            !canReserve ? "cursor-not-allowed opacity-80" : "",
          ].join(" ")}
          aria-disabled={!canReserve}
          onClick={(event) => {
            if (canReserve) return;

            event.preventDefault();
            setError(t("dateRequired"));
          }}
        >
          {t("cta")}
        </ButtonLink>
      </div>

      {error ? (
        <p className="mt-3 text-xs font-medium leading-5 text-red-600 dark:text-red-300">
          {error}
        </p>
      ) : null}

      <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
        <ShieldIcon className="mt-0.5 size-4 shrink-0" />
        <p>{t("note")}</p>
      </div>
    </div>
  );
}

function PriceRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span
        className={
          strong
            ? "font-semibold text-zinc-950 dark:text-white"
            : "text-zinc-600 dark:text-zinc-400"
        }
      >
        {label}
      </span>

      <span
        className={
          strong
            ? "font-semibold text-zinc-950 dark:text-white"
            : "font-medium text-zinc-950 dark:text-white"
        }
      >
        {value}
      </span>
    </div>
  );
}

function getNightsCount(from?: string, to?: string) {
  if (!from || !to) return 0;

  const start = new Date(from);
  const end = new Date(to);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;

  const diff = end.getTime() - start.getTime();
  const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return Math.max(0, nights);
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3 19 7v6c0 4.2-2.9 7.3-7 8-4.1-.7-7-3.8-7-8V7l7-4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
