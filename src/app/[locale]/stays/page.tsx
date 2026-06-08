import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SearchBar } from "@/components/SearchBar";
import { africaListings } from "@/lib/mock/africa-listings";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { ExploreFiltersBar } from "@/components/explore/ExploreFiltersBar";
import { FilterSidebarButton } from "@/components/explore/FilterSidebarButton";
import { CatalogEmptyState } from "@/components/explore/CatalogEmptyState";
import {
  applyListingFilters,
  buildListingChips,
  buildListingFilterSections,
  type ListingFilterParams,
} from "@/lib/listings/listing-filters";

export const metadata: Metadata = {
  title: "Stays — GuestConnect",
  description: "Browse stays by interests and filters.",
};

type PageProps = {
  searchParams?: Promise<ListingFilterParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();
  const t = await getTranslations("explore");
  const sp = (await searchParams) ?? {};
  const items = applyListingFilters(africaListings, sp);
  const filterSections = buildListingFilterSections({ locale, path: "stays", params: sp });
  const filterChips = buildListingChips(locale, "stays", sp);

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{t("eyebrow")}</p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            {t("description")}
          </p>
          <div className="mt-8">
            <SearchBar />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <ExploreFiltersBar
            leading={<FilterSidebarButton sections={filterSections} resetHref={`/${locale}/stays`} />}
            chips={filterChips}
          />

          <p className="mt-5 text-sm font-medium text-zinc-600">
            {items.length} hébergement(s) trouvé(s)
          </p>

          {items.length > 0 ? (
            <ListingGrid className="mt-6">
              {items.map((listing) => (
                <ListingCard key={listing.id} locale={locale} listing={listing} variant="outlined" />
              ))}
            </ListingGrid>
          ) : (
            <CatalogEmptyState
              title="Aucun hébergement ne correspond à ces filtres"
              description="Essayez d’élargir votre budget, de réduire le nombre de chambres ou de retirer un équipement."
              resetHref={`/${locale}/stays`}
            />
          )}
        </Container>
      </section>
    </div>
  );
}
