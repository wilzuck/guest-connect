// app/providers.tsx
"use client";

import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { CurrencyProvider } from "@/components/currency/CurrencyProvider";
import type { ReactNode } from "react";

export function Providers({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: any;
  children: ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <CurrencyProvider>{children}</CurrencyProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}