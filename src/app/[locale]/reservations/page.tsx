import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { africaListings } from "@/lib/mock/africa-listings";

export const metadata: Metadata = {
  title: "Réservations — GuestConnect",
  description: "Vos réservations à venir et l’historique.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  const upcoming = [
    {
      id: "rsv-001",
      title: isEn ? "Premium Guest House" : "Maison d’hôtes premium",
      location: isEn ? "Dakar, Senegal" : "Dakar, Sénégal",
      dates: isEn ? "12–15 Jun 2026" : "12–15 Juin 2026",
      status: isEn ? "Confirmed" : "Confirmée",
      imageUrl: africaListings[0]?.imageUrl,
    },
    {
      id: "rsv-002",
      title: isEn ? "Boutique Stay" : "Séjour boutique",
      location: isEn ? "Marrakech, Morocco" : "Marrakech, Maroc",
      dates: isEn ? "01–04 Jul 2026" : "01–04 Juil 2026",
      status: isEn ? "Pending" : "En attente",
      imageUrl: africaListings[1]?.imageUrl ?? africaListings[0]?.imageUrl,
    },
  ];

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {isEn ? "Trips" : "Voyages"}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            {isEn ? "Reservations" : "Réservations"}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            {isEn
              ? "Track upcoming stays and your booking history."
              : "Suivez vos séjours à venir et votre historique."}
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <div className="grid gap-4 md:grid-cols-12">
            <Card className="p-6 shadow-none md:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                {isEn ? "Upcoming" : "À venir"}
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-black">{upcoming.length}</p>
              <p className="mt-1 text-sm text-zinc-600">{isEn ? "stays" : "séjours"}</p>
            </Card>
            <Card className="p-6 shadow-none md:col-span-8">
              <p className="text-sm font-semibold text-black">{isEn ? "Quick actions" : "Actions rapides"}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {isEn
                  ? "Need ideas? Browse stays or check your saved listings."
                  : "Besoin d’inspiration ? Parcourez les hébergements ou consultez vos favoris."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/stays`}
                  className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition"
                >
                  {isEn ? "Browse stays" : "Voir les hébergements"}
                </Link>
                <Link
                  href={`/${locale}/favorites`}
                  className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-50 transition"
                >
                  {isEn ? "Favorites" : "Favoris"}
                </Link>
              </div>
            </Card>
          </div>

          <div className="mt-10">
            <p className="text-sm font-semibold text-black">{isEn ? "Upcoming reservations" : "Réservations à venir"}</p>
            <div className="mt-4 grid gap-3">
              {upcoming.map((r) => (
                <Card key={r.id} className="p-6 shadow-none">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 gap-4">
                      {/* Miniature */}
                      <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-2xl bg-zinc-100">
                        {r.imageUrl ? (
                          <Image
                            src={r.imageUrl}
                            alt={r.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                            quality={70}
                          />
                        ) : null}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-base font-semibold text-black">{r.title}</p>
                        <p className="mt-1 text-sm text-zinc-600">{r.location}</p>
                        <p className="mt-2 text-sm font-semibold text-black">{r.dates}</p>
                      </div>
                    </div>
                    <span
                      className={[
                        "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold",
                        r.status.toLowerCase().includes("confirm") || r.status.toLowerCase().includes("confirmée")
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700",
                      ].join(" ")}
                    >
                      {r.status}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <p className="mt-10 text-xs text-zinc-500">
            {isEn
              ? "Demo UI — connect this to your bookings API (history, invoices, cancellations)."
              : "UI démo — à connecter à votre API de réservations (historique, factures, annulations)."}
          </p>
        </Container>
      </section>
    </div>
  );
}
