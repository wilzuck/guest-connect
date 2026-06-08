import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SearchBar } from "@/components/SearchBar";
import { ButtonLink } from "@/components/ui/Button";
import { africaListings } from "@/lib/mock/africa-listings";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { FilterSidebarButton } from "@/components/explore/FilterSidebarButton";
import { ExploreFiltersBar } from "@/components/explore/ExploreFiltersBar";
import { CatalogEmptyState } from "@/components/explore/CatalogEmptyState";
import {
  applyListingFilters,
  buildListingChips,
  buildListingFilterSections,
  type ListingFilterParams,
} from "@/lib/listings/listing-filters";

export const metadata: Metadata = {
  title: "Recherche — GuestConnect",
  description: "Recherchez des hébergements sur GuestConnect.",
};

type PageProps = {
  searchParams: Promise<ListingFilterParams & {
    checkIn?: string;
    checkOut?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();
  const t = await getTranslations("searchPage");
  const sp = await searchParams;
  const destination = sp.destination?.trim() ?? "";
  const guests = sp.guests ? Number(sp.guests) : 2;
  const filtered = applyListingFilters(africaListings, sp);
  const filterSections = buildListingFilterSections({ locale, path: "search", params: sp });
  const filterChips = buildListingChips(locale, "search", sp);

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
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <p className="text-sm font-medium text-zinc-600">
              {t("results", { count: filtered.length })}
              {destination ? t("resultsFor", { destination }) : ""}
            </p>
            <ButtonLink href={`/${locale}/stays`} variant="outline" size="sm" className="w-fit">
              {t("browseByInterests")}
            </ButtonLink>
          </div>

          <ExploreFiltersBar
            className="mt-5"
            leading={<FilterSidebarButton sections={filterSections} resetHref={`/${locale}/search`} />}
            chips={filterChips}
          />

          {filtered.length > 0 ? (
            <ListingGrid className="mt-6">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} locale={locale} listing={listing} />
              ))}
            </ListingGrid>
          ) : (
            <CatalogEmptyState
              title="Aucun résultat pour cette recherche"
              description="Essayez une autre destination ou retirez quelques filtres de capacité, budget ou équipements."
              resetHref={`/${locale}/search`}
            />
          )}
        </Container>
      </section>
    </div>
  );
}
