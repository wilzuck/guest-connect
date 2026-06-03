import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Dashboard — GuestConnect",
  description: "Your space: overview, reservations, and shortcuts.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {isEn ? "Dashboard" : "Tableau de bord"}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            {isEn ? "Your space" : "Votre espace"}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            {isEn
              ? "Quick overview of your activity, favorites and upcoming reservations."
              : "Un aperçu rapide de vos activités, favoris et réservations à venir."}
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <div className="grid gap-4 md:grid-cols-12">
            <Card className="p-6 md:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                {isEn ? "Upcoming" : "À venir"}
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-black">2</p>
              <p className="mt-1 text-sm text-zinc-600">{isEn ? "reservations" : "réservations"}</p>
            </Card>
            <Card className="p-6 md:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                {isEn ? "Saved" : "Enregistrés"}
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-black">6</p>
              <p className="mt-1 text-sm text-zinc-600">{isEn ? "favorites" : "favoris"}</p>
            </Card>
            <Card className="p-6 md:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                {isEn ? "Support" : "Support"}
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-black">24/7</p>
              <p className="mt-1 text-sm text-zinc-600">{isEn ? "help center" : "centre d’aide"}</p>
            </Card>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickLink
              href={`/${locale}/profile`}
              title={isEn ? "Profile" : "Profil"}
              desc={isEn ? "Personal info and preferences" : "Infos personnelles et préférences"}
            />
            <QuickLink
              href={`/${locale}/reservations`}
              title={isEn ? "Reservations" : "Réservations"}
              desc={isEn ? "Upcoming stays and history" : "Séjours à venir et historique"}
            />
            <QuickLink
              href={`/${locale}/favorites`}
              title={isEn ? "Favorites" : "Favoris"}
              desc={isEn ? "Saved listings and notes" : "Annonces enregistrées"}
            />
            <QuickLink
              href={`/${locale}/settings`}
              title={isEn ? "Settings" : "Paramètres"}
              desc={isEn ? "Notifications and security" : "Notifications et sécurité"}
            />
          </div>
        </Container>
      </section>
    </div>
  );
}

function QuickLink({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="block">
      <Card className="h-full p-6 shadow-none transition hover:bg-zinc-50">
        <p className="text-sm font-semibold text-black">{title}</p>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{desc}</p>
      </Card>
    </Link>
  );
}

