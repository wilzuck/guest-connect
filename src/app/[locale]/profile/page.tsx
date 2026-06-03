import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ProfileClient } from "@/components/account/ProfileClient";

export const metadata: Metadata = {
  title: "Profil — GuestConnect",
  description: "Informations du compte, statistiques et préférences.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {isEn ? "Account" : "Compte"}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            {isEn ? "Profile" : "Profil"}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            {isEn
              ? "Manage your personal information, security and preferences."
              : "Gérez vos informations personnelles, votre sécurité et vos préférences."}
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Colonne gauche */}
            <div className="lg:col-span-4">
              <Card className="p-6 shadow-none">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-black text-white">
                    <span className="text-lg font-semibold">{user.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-black">{user.name}</p>
                    <p className="truncate text-sm text-zinc-600">{user.email}</p>
                    <p className="truncate text-xs text-zinc-500">{user.location}</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {stats.map((s) => (
                    <div key={s.k} className="rounded-2xl bg-zinc-50 p-3 text-center">
                      <p className="text-lg font-semibold tracking-tight text-black">{s.v}</p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        {s.k}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-xs text-zinc-500">
                  {isEn
                    ? "Demo page — connect to your auth/profile API later."
                    : "Page démo — à brancher ensuite à votre API d’auth/profil."}
                </p>
              </Card>
            </div>

            {/* Colonne droite */}
            <div className="lg:col-span-8">
              <ProfileClient isEn={isEn} user={user} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
