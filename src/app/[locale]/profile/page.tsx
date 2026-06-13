import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { ProfileClient } from "@/components/account/ProfileClient";
import { AccountShell } from "@/components/account/AccountShell";

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
    <div>kljklkl</div>
  );
}
