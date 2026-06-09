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
  buildListingFilterControls,
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
  const filterControls = buildListingFilterControls(sp);
  const filterChips = buildListingChips(locale, "stays", sp);

  return (
    <div >
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/80">{t("eyebrow")}</p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-xl text-balance text-sm leading-6 text-zinc-600 dark:text-zinc-300 sm:mt-4 sm:max-w-2xl sm:text-base sm:leading-7 lg:text-lg">
            {t("description")}
          </p>
          <div className="mt-8">
            <SearchBar />
          </div>
        </Container>
      </section>

      <section >
        <Container className="py-12 sm:py-14">
          <ExploreFiltersBar
            leading={
              <FilterSidebarButton
                sections={filterSections}
                controls={filterControls}
                actionHref={`/${locale}/stays`}
                resetHref={`/${locale}/stays`}
              />
            }
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
