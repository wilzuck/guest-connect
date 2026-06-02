"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CurrencyCode } from "@/lib/currency/currency";
import { convertCurrency, formatCurrency } from "@/lib/currency/currency";
import { useLocale } from "next-intl";

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (next: CurrencyCode) => void;
  formatFrom: (amount: number, fromCurrency: CurrencyCode) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = "guestconnect_currency";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const [currency, setCurrencyState] = useState<CurrencyCode>("XOF");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw === "XOF" || raw === "XAF" || raw === "EUR" || raw === "USD") setCurrencyState(raw);
    } catch {
      // ignore
    }
  }, []);

  function setCurrency(next: CurrencyCode) {
    setCurrencyState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }

  const value = useMemo<CurrencyContextValue>(() => {
    return {
      currency,
      setCurrency,
      formatFrom: (amount: number, fromCurrency: CurrencyCode) => {
        const converted = convertCurrency(amount, fromCurrency, currency);
        return formatCurrency(converted, currency, locale);
      },
    };
  }, [currency, locale]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}

