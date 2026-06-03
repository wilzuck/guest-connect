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
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {isEn ? "Log out" : "Déconnexion"}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            {isEn ? "See you soon" : "À bientôt"}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
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
              className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-50 transition"
            >
              {isEn ? "Browse stays" : "Voir les hébergements"}
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

