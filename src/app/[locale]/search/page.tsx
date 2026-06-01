import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SearchBar } from "@/components/SearchBar";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { africaListings } from "@/lib/mock/africa-listings";
import type { Listing } from "@/types/listing";

export const metadata: Metadata = {
  title: "Recherche — GuestConnect",
  description: "Recherchez des hébergements sur GuestConnect.",
};

type PageProps = {
  searchParams: Promise<{
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();
  const sp = await searchParams;

  const destination = sp.destination?.trim() ?? "";
  const guests = sp.guests ? Number(sp.guests) : 2;

  const filtered: Listing[] = destination
    ? africaListings.filter((l) =>
        `${l.title} ${l.location}`.toLowerCase().includes(destination.toLowerCase()),
      )
    : africaListings;

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <SectionHeading
            eyebrow={locale === "en" ? "Search" : "Recherche"}
            title={locale === "en" ? "Search stays" : "Rechercher un hébergement"}
            description={
              locale === "en"
                ? "Use the Booking/Airbnb-like bar to refine your search."
                : "Utilisez la barre de recherche (style Booking/Airbnb) pour affiner votre recherche."
            }
          />
          <div className="mt-8">
            <SearchBar
              defaultValues={{
                destination: destination || undefined,
                guests: Number.isFinite(guests) ? guests : 2,
                checkIn: sp.checkIn,
                checkOut: sp.checkOut,
              }}
            />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <div className="flex items-end justify-between gap-4">
            <p className="text-sm font-medium text-zinc-600">
              {locale === "en"
                ? `${filtered.length} result(s)`
                : `${filtered.length} résultat(s)`}
              {destination ? (locale === "en" ? ` for “${destination}”` : ` pour « ${destination} »`) : ""}
            </p>
            <ButtonLink href={`/${locale}/explore`} variant="outline" size="sm">
              {locale === "en" ? "Browse by interests" : "Explorer par centres d’intérêt"}
            </ButtonLink>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((l) => (
              <Card
                key={l.id}
                className="group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                  <Image
                    src={l.imageUrl}
                    alt={l.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-base font-semibold tracking-tight text-black">{l.title}</p>
                  <p className="mt-1 text-sm text-zinc-600">{l.location}</p>
                  <div className="mt-3 flex items-baseline justify-between">
                    <p className="text-sm font-semibold text-black">
                      {l.pricePerNight} {l.currency} <span className="text-zinc-500">/ nuit</span>
                    </p>
                    <ButtonLink href={`/${locale}/listings/${l.id}`} variant="ghost" size="sm">
                      {locale === "en" ? "View" : "Voir"}
                    </ButtonLink>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
