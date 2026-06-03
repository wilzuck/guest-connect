import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SearchBar } from "@/components/SearchBar";
import { ButtonLink } from "@/components/ui/Button";
import { africaListings } from "@/lib/mock/africa-listings";
import type { Listing } from "@/types/listing";
import { ListingCard } from "@/components/listings/ListingCard";

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
  const t = await getTranslations("searchPage");
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
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
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
              {t("results", { count: filtered.length })}
              {destination ? t("resultsFor", { destination }) : ""}
            </p>
            <ButtonLink href={`/${locale}/stays`} variant="outline" size="sm">
              {t("browseByInterests")}
            </ButtonLink>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {filtered.map((l) => (
              <ListingCard key={l.id} locale={locale} listing={l} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
