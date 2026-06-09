import Link from "next/link";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Plan du site — GuestConnect",
  description: "Toutes les pages principales de GuestConnect : hébergements, services, compte, support et informations légales.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  const groups = [
    {
      title: isEn ? "Explore" : "Explorer",
      desc: isEn ? "Find stays, services, and experiences." : "Trouver un hébergement, un service ou une expérience.",
      items: [
        { label: isEn ? "Home" : "Accueil", href: `/${locale}` },
        { label: isEn ? "Stays" : "Hébergements", href: `/${locale}/stays` },
        { label: isEn ? "Search" : "Recherche", href: `/${locale}/search` },
        { label: isEn ? "Services" : "Services", href: `/${locale}/services` },
        { label: isEn ? "Experiences" : "Expériences", href: `/${locale}/experiences` },
        { label: isEn ? "Pricing" : "Tarifs", href: `/${locale}/pricing` },
      ],
    },
    {
      title: isEn ? "Trust and company" : "Confiance et entreprise",
      desc: isEn ? "Learn how GuestConnect works." : "Comprendre GuestConnect et ses garanties.",
      items: [
        { label: isEn ? "About" : "À propos", href: `/${locale}/about` },
        { label: isEn ? "Company" : "Entreprise", href: `/${locale}/company` },
        { label: isEn ? "Safety" : "Sécurité", href: `/${locale}/safety` },
        { label: isEn ? "Blog" : "Blog", href: `/${locale}/blog` },
        { label: isEn ? "Careers" : "Carrières", href: `/${locale}/careers` },
        { label: isEn ? "Contact" : "Contact", href: `/${locale}/contact` },
      ],
    },
    {
      title: isEn ? "Your account" : "Votre compte",
      desc: isEn ? "Manage travel, messages, and settings." : "Gérer voyages, messages et paramètres.",
      items: [
        { label: isEn ? "Dashboard" : "Tableau de bord", href: `/${locale}/dashboard` },
        { label: isEn ? "Profile" : "Profil", href: `/${locale}/profile` },
        { label: isEn ? "Favorites" : "Favoris", href: `/${locale}/favorites` },
        { label: isEn ? "My reservations" : "Mes réservations", href: `/${locale}/reservations` },
        { label: isEn ? "Messages" : "Messages", href: `/${locale}/messages` },
        { label: isEn ? "Settings" : "Paramètres", href: `/${locale}/settings` },
      ],
    },
    {
      title: isEn ? "Host and administration" : "Hôte et administration",
      desc: isEn ? "Publish and manage marketplace content." : "Publier et administrer les contenus de la marketplace.",
      items: [
        { label: isEn ? "Become a host" : "Devenir hôte", href: `/${locale}/host` },
        { label: isEn ? "Add a property" : "Ajouter un logement", href: `/${locale}/add-property` },
        { label: isEn ? "Service management" : "Gestion des services", href: `/${locale}/dashboard/service-management` },
        { label: isEn ? "Documentation" : "Documentation", href: `/${locale}/dashboard/service-management/docs/usage` },
      ],
    },
    {
      title: isEn ? "Help and legal" : "Aide et légal",
      desc: isEn ? "Support and legal information." : "Support et informations légales.",
      items: [
        { label: isEn ? "Support center" : "Centre d'aide", href: `/${locale}/support` },
        { label: isEn ? "Terms" : "Conditions", href: `/${locale}/terms` },
        { label: isEn ? "Privacy" : "Confidentialité", href: `/${locale}/privacy` },
        { label: isEn ? "Cookies" : "Cookies", href: `/${locale}/cookies` },
      ],
    },
  ];

  return (
    <div >
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/80">
            {isEn ? "Navigation" : "Navigation"}
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {isEn ? "Sitemap" : "Plan du site"}
          </h1>
          <p className="mt-3 max-w-xl text-balance text-sm leading-6 text-zinc-600 dark:text-zinc-300 sm:mt-4 sm:max-w-2xl sm:text-base sm:leading-7 lg:text-lg">
            {isEn
              ? "Quick access to the main GuestConnect pages, from discovery to account management and legal information."
              : "Accès rapide aux principales pages GuestConnect, de la découverte aux espaces compte, hôte et légal."}
          </p>
        </Container>
      </section>

      <section >
        <Container className="py-12 sm:py-14">
          <div className="grid gap-4 lg:grid-cols-12">
            {groups.map((group) => (
              <Card key={group.title} className="p-6 shadow-none lg:col-span-6">
                <p className="text-base font-semibold tracking-tight">{group.title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-500">{group.desc}</p>
                <ul className="mt-5 grid gap-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-flex text-sm font-semibold text-zinc-700 transition hover:text-black hover:underline"
                      >
                        {item.label}
                      </Link>
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
