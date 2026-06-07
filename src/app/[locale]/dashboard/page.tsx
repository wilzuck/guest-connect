import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { AccountShell } from "@/components/account/AccountShell";

export const metadata: Metadata = {
  title: "Dashboard — GuestConnect",
  description: "Your space: overview, reservations, and shortcuts.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <AccountShell
      locale={locale}
      title={isEn ? "Your space" : "Votre espace"}
      subtitle={
        isEn
          ? "Quick overview of your activity, favorites and upcoming reservations."
          : "Un aperçu rapide de vos activités, favoris et réservations à venir."
      }
      activeHref={`/${locale}/dashboard`}
    >
      <div className="grid gap-4 md:grid-cols-12">
        <Card className="p-6 shadow-none md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{isEn ? "Upcoming" : "À venir"}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-black">2</p>
          <p className="mt-1 text-sm text-zinc-600">{isEn ? "reservations" : "réservations"}</p>
        </Card>
        <Card className="p-6 shadow-none md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{isEn ? "Saved" : "Enregistrés"}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-black">6</p>
          <p className="mt-1 text-sm text-zinc-600">{isEn ? "favorites" : "favoris"}</p>
        </Card>
        <Card className="p-6 shadow-none md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{isEn ? "Support" : "Support"}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-black">24/7</p>
          <p className="mt-1 text-sm text-zinc-600">{isEn ? "help center" : "centre d’aide"}</p>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickLink href={`/${locale}/profile`} title={isEn ? "Profile" : "Profil"} desc={isEn ? "Personal info and preferences" : "Infos personnelles et préférences"} />
        <QuickLink href={`/${locale}/reservations`} title={isEn ? "Reservations" : "Réservations"} desc={isEn ? "Upcoming stays and history" : "Séjours à venir et historique"} />
        <QuickLink href={`/${locale}/favorites`} title={isEn ? "Favorites" : "Favoris"} desc={isEn ? "Saved listings and notes" : "Annonces enregistrées"} />
        <QuickLink href={`/${locale}/settings`} title={isEn ? "Settings" : "Paramètres"} desc={isEn ? "Notifications and security" : "Notifications et sécurité"} />
      </div>

      <div className="mt-10">
        <p className="text-sm font-semibold text-black">{isEn ? "Management" : "Gestion"}</p>
        <p className="mt-2 text-sm text-zinc-600">{isEn ? "Host and admin dashboards (demo)." : "Accès aux espaces Hôte et Admin (démo)."}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <QuickLink href={`/${locale}/dashboard/host`} title={isEn ? "Host dashboard" : "Espace hôte"} desc={isEn ? "Create and manage your listings" : "Créer et gérer vos logements"} />
          <QuickLink href={`/${locale}/dashboard/service-management`} title={isEn ? "Admin back-office" : "Back-office admin"} desc={isEn ? "Manage categories, locations, services…" : "Gérer catégories, lieux, services…"} />
        </div>
      </div>
    </AccountShell>
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
