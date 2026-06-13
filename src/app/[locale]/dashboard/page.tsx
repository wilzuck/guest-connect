import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { AccountShell } from "@/components/account/AccountShell";
import { ProfileClient } from "@/components/account/ProfileClient";

export const metadata: Metadata = {
  title: "Dashboard — GuestConnect",
  description: "Your space: overview, reservations, and shortcuts.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  // Démo: utilisateur “connecté”
  const user = {
    name: "Amina Kouyaté",
    email: "amina@example.com",
    phone: "+221 77 000 00 00",
    location: isEn ? "Dakar, Senegal" : "Dakar, Sénégal",
    bio: isEn
      ? "I love curated stays, local food and design-led experiences."
      : "J’aime les séjours sélectionnés, la cuisine locale et les expériences premium.",
  };

  const stats = [
    { k: isEn ? "Reservations" : "Réservations", v: "2" },
    { k: isEn ? "Favorites" : "Favoris", v: "6" },
    { k: isEn ? "Reviews" : "Avis", v: "1" },
  ];

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
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">{isEn ? "Upcoming" : "À venir"}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">2</p>
          <p className="mt-1 text-sm text-zinc-600">{isEn ? "reservations" : "réservations"}</p>
        </Card>
        <Card className="p-6 shadow-none md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">{isEn ? "Saved" : "Enregistrés"}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">6</p>
          <p className="mt-1 text-sm text-zinc-600">{isEn ? "favorites" : "favoris"}</p>
        </Card>
        <Card className="p-6 shadow-none md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">{isEn ? "Support" : "Support"}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">24/7</p>
          <p className="mt-1 text-sm text-zinc-600">{isEn ? "help center" : "centre d’aide"}</p>
        </Card>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Card className="p-6 shadow-none">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-black text-white">
                <span className="text-lg font-semibold">{user.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}</span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-base font-semibold ">{user.name}</p>
                <p className="truncate text-sm text-zinc-600">{user.email}</p>
                <p className="truncate text-xs text-zinc-500">{user.location}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.k} className="rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-900 text-center">
                  <p className="text-lg font-semibold tracking-tight">{s.v}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">{s.k}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs text-zinc-500">
              {isEn ? "Demo page — connect to your auth/profile API later." : "Page démo — à brancher ensuite à votre API d’auth/profil."}
            </p>
          </Card>
        </div>

        <div className="lg:col-span-8">
          <ProfileClient isEn={isEn} user={user} />
        </div>
      </div>
    </AccountShell>
  );
}

function QuickLink({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="block">
      <Card className="h-full p-6 shadow-none transition hover:bg-zinc-50 dark:hover:bg-zinc-800">
        <p className="text-sm font-semibold ">{title}</p>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{desc}</p>
      </Card>
    </Link>
  );
}
