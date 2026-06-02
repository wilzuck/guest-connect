export type CurrencyCode = "XOF" | "XAF" | "EUR" | "USD";

// Taux indicatifs (mock) : conversion via EUR comme base.
// Remplacer plus tard par un service réel / API.
const EUR_RATES: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.08,
  XOF: 655.957,
  XAF: 655.957,
};

export function convertCurrency(amount: number, from: CurrencyCode, to: CurrencyCode): number {
  if (!Number.isFinite(amount)) return 0;
  if (from === to) return amount;

  const fromRate = EUR_RATES[from];
  const toRate = EUR_RATES[to];
  // amount(from) -> EUR -> to
  const inEur = amount / fromRate;
  return inEur * toRate;
}

export function formatCurrency(amount: number, currency: CurrencyCode, locale?: string) {
  // UX Afrique: pour XOF/XAF on préfère "10 000 XOF" (code après)
  if (currency === "XOF" || currency === "XAF") {
    const n = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(amount);
    return `${n} ${currency}`;
  }
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

