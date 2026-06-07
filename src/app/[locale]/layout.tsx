import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { Footer, Navbar } from "@/sections";
import type { ReactNode } from "react";
import { CurrencyProvider } from "@/components/currency/CurrencyProvider";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";
import { getMessages } from "@/lib/i18n/getMessages";

const locales = ["fr", "en"] as const;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = (locales as readonly string[]).includes(locale)
    ? (locale as (typeof locales)[number])
    : "fr";
  // Charge explicitement le bon fichier JSON (évite les soucis de fallback/cache en dev).
  const messages = await getMessages(safeLocale);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <NextIntlClientProvider locale={safeLocale} messages={messages}>
        <CurrencyProvider>
          <div className="min-h-dvh overflow-x-hidden flex flex-col">
            <Navbar />
            <main className="flex-1 overflow-x-hidden">{children}</main>
            <ScrollToTopButton />
            <Footer />
          </div>
        </CurrencyProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
