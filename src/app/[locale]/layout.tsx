import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
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
  const messages = await getMessages();

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
