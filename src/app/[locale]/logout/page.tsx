import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Log out — GuestConnect",
  description: "Log out page.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <div >
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/80">
            {isEn ? "Log out" : "Déconnexion"}
          </p>
          <h1 className="mt-4 text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            {isEn ? "See you soon" : "À bientôt"}
          </h1>
          <p className="mt-3 max-w-xl text-balance text-sm leading-6 text-zinc-600 dark:text-zinc-300 sm:mt-4 sm:max-w-2xl sm:text-base sm:leading-7 lg:text-lg">
            {isEn
              ? "This demo doesn’t manage real sessions yet. Use this page as a placeholder for your sign-out flow."
              : "Cette démo ne gère pas encore de sessions réelles. Utilise cette page comme placeholder pour ton flow de déconnexion."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/login`}
              className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition"
            >
              {isEn ? "Go to login" : "Aller à la connexion"}
            </Link>
            <Link
              href={`/${locale}/stays`}
              className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold  hover:bg-zinc-50 transition"
            >
              {isEn ? "Browse stays" : "Voir les hébergements"}
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

