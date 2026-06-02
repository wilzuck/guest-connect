import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Footer, Navbar } from "@/sections";
import type { ReactNode } from "react";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Important: synchronise la locale côté serveur pour que getMessages() charge le bon JSON.
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div className="min-h-dvh overflow-x-hidden flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <Footer />
        </div>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
