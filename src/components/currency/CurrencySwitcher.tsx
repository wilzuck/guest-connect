"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { useCurrency } from "@/components/currency/CurrencyProvider";
import type { CurrencyCode } from "@/lib/currency/currency";
import { cn } from "@/lib/utils/cn";

const CURRENCIES: CurrencyCode[] = ["XOF", "XAF", "EUR", "USD"];

export function CurrencySwitcher({ className }: { className?: string }) {
  const t = useTranslations("currency");
  const { currency, setCurrency } = useCurrency();

  const label = useMemo(() => {
    if (currency === "EUR") return "€ EUR";
    if (currency === "USD") return "$ USD";
    return currency; // XOF / XAF
  }, [currency]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900",
            className,
          )}
          aria-label={t("label")}
          title={t("label")}
        >
          <span className="truncate">{label}</span>
          <ChevronDown className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-44 p-2 rounded-2xl shadow-lg shadow-black/15">
        <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          {t("title")}
        </p>
        <div className="grid gap-1">
          {CURRENCIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              className={cn(
                "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition",
                c === currency ? "bg-black text-white dark:bg-white dark:text-black" : "text-zinc-800 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900",
              )}
            >
              <span>{t(`codes.${c}`)}</span>
              {c === currency ? <Check className="h-4 w-4" /> : null}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m7 10 5 5 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
