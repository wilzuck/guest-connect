import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PricingSection } from "@/sections/PricingSection";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Pricing — GuestConnect",
  description: "Plans and pricing.",
};

export default async function Page() {
  const locale = await getLocale();
  const t = await getTranslations("pricingPage");

  return (
    <div >
      {/* Header premium (marketplace-like) */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <Container className="py-12 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/80">{t("eyebrow")}</p>
          <h1 className="mt-4 text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-xl text-balance text-sm leading-6 text-zinc-600 dark:text-zinc-300 sm:mt-4 sm:max-w-2xl sm:text-base sm:leading-7 lg:text-lg">
            {t("subtitle")}
          </p>
          <p className="mt-6 text-xs text-zinc-500">{t("note")}</p>
        </Container>
      </section>

      {/* Plans */}
      <PricingSection />

      {/* CTA bas */}
      <section >
        <Container className="py-14">
          <div className="rounded-3xl border border-black/10 bg-zinc-50 p-8">
            <p className="text-sm font-semibold ">{t("ctaTitle")}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{t("ctaBody")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`/${locale}/signup`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition"
              >
                {t("ctaPrimary")}
              </a>
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold  hover:bg-zinc-50 transition"
              >
                {t("ctaSecondary")}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
