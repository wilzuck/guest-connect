// app/providers.tsx
"use client";

import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { CurrencyProvider } from "@/components/currency/CurrencyProvider";
import type { ReactNode } from "react";
import type { AbstractIntlMessages } from "next-intl";

export function Providers({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: AbstractIntlMessages;
  children: ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      disableTransitionOnChange
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <CurrencyProvider>{children}</CurrencyProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
