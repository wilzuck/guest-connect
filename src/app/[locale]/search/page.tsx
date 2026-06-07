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
import { FilterSidebarButton } from "@/components/explore/FilterSidebarButton";

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
    price?: string;
    sort?: string;
  }>;
};

function buildHref(locale: string, sp: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(sp)) {
    if (value) params.set(key, value);
  }
  const qs = params.toString();
  return `/${locale}/search${qs ? `?${qs}` : ""}`;
}

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();
  const t = await getTranslations("searchPage");
  const sp = await searchParams;

  const destination = sp.destination?.trim() ?? "";
  const guests = sp.guests ? Number(sp.guests) : 2;
  const price = sp.price ?? "all";
  const sort = sp.sort ?? "recommended";

  let filtered: Listing[] = destination
    ? africaListings.filter((l) =>
        `${l.title} ${l.location}`.toLowerCase().includes(destination.toLowerCase()),
      )
    : africaListings;

  if (price !== "all") {
    filtered =
      price === "budget"
        ? filtered.filter((l) => l.pricePerNight <= 50)
        : price === "mid"
          ? filtered.filter((l) => l.pricePerNight > 50 && l.pricePerNight <= 80)
          : filtered.filter((l) => l.pricePerNight > 80);
  }

  filtered.sort((a, b) => {
    if (sort === "price") return a.pricePerNight - b.pricePerNight;
    if (sort === "rating") return b.rating - a.rating;
    return b.rating * 10 + b.reviewCount / 10 - (a.rating * 10 + a.reviewCount / 10);
  });

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
            <div className="flex items-center gap-2">
              <FilterSidebarButton
                sections={[
                  {
                    title: "Budget",
                    options: [
                      { href: buildHref(locale, { ...sp, price: "all" }), active: price === "all", label: "Tous les prix" },
                      { href: buildHref(locale, { ...sp, price: "budget" }), active: price === "budget", label: "Budget" },
                      { href: buildHref(locale, { ...sp, price: "mid" }), active: price === "mid", label: "Intermédiaire" },
                      { href: buildHref(locale, { ...sp, price: "high" }), active: price === "high", label: "Premium" },
                    ],
                  },
                  {
                    title: "Tri",
                    options: [
                      { href: buildHref(locale, { ...sp, sort: "recommended" }), active: sort === "recommended", label: "Recommandé" },
                      { href: buildHref(locale, { ...sp, sort: "rating" }), active: sort === "rating", label: "Mieux notés" },
                      { href: buildHref(locale, { ...sp, sort: "price" }), active: sort === "price", label: "Prix bas" },
                    ],
                  },
                ]}
              />
              <ButtonLink href={`/${locale}/stays`} variant="outline" size="sm">
                {t("browseByInterests")}
              </ButtonLink>
            </div>
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
