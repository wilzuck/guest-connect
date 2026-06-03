import Link from "next/link";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Plan du site — GuestConnect",
  description: "Accès rapide à toutes les pages fonctionnelles du projet.",
};

export default async function Page() {
  const locale = await getLocale();

  const groups: Array<{ title: string; items: Array<{ label: string; href: string; desc?: string }> }> = [
    {
      title: "Découvrir",
      items: [
        { label: "Accueil", href: `/${locale}` },
        { label: "Hébergements", href: `/${locale}/stays` },
        { label: "Recherche", href: `/${locale}/search` },
        { label: "Destinations populaires", href: `/${locale}/services` },
        { label: "Expériences", href: `/${locale}/experiences` },
        { label: "Tarifs", href: `/${locale}/pricing` },
      ],
    },
    {
      title: "Contenu & confiance",
      items: [
        { label: "Notre histoire", href: `/${locale}/about` },
        { label: "Blog", href: `/${locale}/blog` },
        { label: "Presse", href: `/${locale}/press` },
        { label: "Sécurité", href: `/${locale}/safety` },
        { label: "Centre d’aide", href: `/${locale}/support` },
        { label: "Contact", href: `/${locale}/contact` },
      ],
    },
    {
      title: "Espace utilisateur",
      items: [
        { label: "Dashboard", href: `/${locale}/dashboard` },
        { label: "Profil", href: `/${locale}/profile` },
        { label: "Favoris", href: `/${locale}/favorites` },
        { label: "Réservations", href: `/${locale}/reservations` },
        { label: "Activités", href: `/${locale}/activities` },
        { label: "Messages", href: `/${locale}/messages` },
        { label: "Notifications", href: `/${locale}/notifications` },
        { label: "Paramètres", href: `/${locale}/settings` },
      ],
    },
    {
      title: "Back-office (démo)",
      items: [
        { label: "Espace hôte", href: `/${locale}/dashboard/host`, desc: "CRUD logements (démo JSON)" },
        { label: "Back-office admin", href: `/${locale}/dashboard/admin`, desc: "CRUD complet (démo JSON)" },
      ],
    },
    {
      title: "Flux (démo)",
      items: [
        { label: "Checkout", href: `/${locale}/checkout` },
        { label: "Confirmation", href: `/${locale}/checkout/success` },
      ],
    },
    {
      title: "Légal",
      items: [
        { label: "Conditions", href: `/${locale}/terms` },
        { label: "Confidentialité", href: `/${locale}/privacy` },
        { label: "Cookies", href: `/${locale}/cookies` },
      ],
    },
  ];

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Navigation</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">Plan du site</h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            Accédez rapidement à toutes les pages fonctionnelles (public, compte, back-office, checkout).
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <div className="grid gap-4 lg:grid-cols-12">
            {groups.map((g) => (
              <Card key={g.title} className="p-6 shadow-none lg:col-span-6">
                <p className="text-sm font-semibold text-black">{g.title}</p>
                <ul className="mt-4 grid gap-2">
                  {g.items.map((i) => (
                    <li key={i.href} className="flex items-start justify-between gap-4">
                      <Link href={i.href} className="text-sm font-semibold text-black hover:underline">
                        {i.label}
                      </Link>
                      {i.desc ? <span className="text-xs text-zinc-500">{i.desc}</span> : null}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

