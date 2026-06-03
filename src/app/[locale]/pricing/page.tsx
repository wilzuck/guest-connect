import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PricingSection } from "@/sections/PricingSection";

export const metadata: Metadata = {
  title: "Pricing — GuestConnect",
  description: "Plans and pricing.",
};

export default async function Page() {
  const locale = await getLocale();
  const t = await getTranslations("pricingPage");

  return (
    <div className="bg-white">
      {/* Header premium (marketplace-like) */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{t("eyebrow")}</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            {t("subtitle")}
          </p>
          <p className="mt-6 text-xs text-zinc-500">{t("note")}</p>
        </div>
      </section>

      {/* Plans */}
      <PricingSection />

      {/* CTA bas */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <div className="rounded-3xl border border-black/10 bg-zinc-50 p-8">
            <p className="text-sm font-semibold text-black">{t("ctaTitle")}</p>
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
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-50 transition"
              >
                {t("ctaSecondary")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

