import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Heading, Text, Eyebrow } from "@/components/ui/Text";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar, type SearchCategory } from "@/components/SearchBar";
import { africaListings } from "@/lib/mock/africa-listings";
import { experiences } from "@/lib/mock/experiences";
import { ListingCard } from "@/components/listings/ListingCard";
import { ServiceCard, type ServiceItem } from "@/components/services/ServiceCard";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { CatalogEmptyState } from "@/components/explore/CatalogEmptyState";
import { SearchCategoryTabs } from "@/components/search/SearchCategoryTabs";
import { applyListingFilters, type ListingFilterParams } from "@/lib/listings/listing-filters";
import servicesData from "../../../../data/services.json";

export const metadata: Metadata = {
  title: "Recherche - GuestConnect",
  description: "Recherchez des hébergements, services et expériences sur GuestConnect.",
};

type SearchPageParams = ListingFilterParams & {
  checkIn?: string;
  checkOut?: string;
  category?: string;
  q?: string;
  page?: string;
};

type PageProps = {
  searchParams: Promise<SearchPageParams>;
};

const RESULTS_PER_PAGE = 12;

function normalizeCategory(value?: string): SearchCategory {
  if (value === "services" || value === "experiences") return value;
  return "stays";
}

function matchesText(haystack: string, query: string) {
  if (!query) return true;
  return haystack.toLowerCase().includes(query.toLowerCase());
}

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();
  const t = await getTranslations("searchPage");
  const sp = await searchParams;
  const category = normalizeCategory(sp.category);
  const query = sp.q?.trim() ?? "";
  const destination = sp.destination?.trim() ?? "";

  // Sélectionne et filtre selon la catégorie active.
  let total = 0;
  let resultsNode: React.ReactNode = null;

  if (category === "stays") {
    const filtered = applyListingFilters(africaListings, sp);
    total = filtered.length;
    const { items, currentPage, totalPages } = paginate(filtered, sp.page);
    resultsNode =
      total > 0 ? (
        <>
          <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((listing) => (
              <ListingCard
                key={listing.id}
                locale={locale}
                listing={listing}
                variant="outlined"
                badge={listing.rating >= 4.8 ? listing.rating.toFixed(1) : undefined}
                className="[&>div]:rounded-2xl [&>div]:p-3"
              />
            ))}
          </div>
          <Pagination
            className="mt-10"
            page={currentPage}
            totalPages={totalPages}
            hrefTemplate={buildHrefTemplate(locale, sp)}
          />
        </>
      ) : (
        <CatalogEmptyState
          title={t("emptyTitle")}
          description={t("emptyDescription")}
          resetHref={`/${locale}/search`}
        />
      );
  } else if (category === "services") {
    const allServices = servicesData as ServiceItem[];
    const filtered = allServices.filter((service) =>
      matchesText(`${service.title} ${service.location} ${service.description}`, query),
    );
    total = filtered.length;
    const { items, currentPage, totalPages } = paginate(filtered, sp.page);
    resultsNode =
      total > 0 ? (
        <>
          <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((service) => (
              <ServiceCard key={service.id} locale={locale} service={service} />
            ))}
          </div>
          <Pagination
            className="mt-10"
            page={currentPage}
            totalPages={totalPages}
            hrefTemplate={buildHrefTemplate(locale, sp)}
          />
        </>
      ) : (
        <CatalogEmptyState
          title={t("emptyTitle")}
          description={t("emptyDescription")}
          resetHref={`/${locale}/search?category=services`}
        />
      );
  } else {
    const filtered = experiences.filter((experience) =>
      matchesText(`${experience.title} ${experience.location} ${experience.tag}`, query),
    );
    total = filtered.length;
    const { items, currentPage, totalPages } = paginate(filtered, sp.page);
    resultsNode =
      total > 0 ? (
        <>
          <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
          <Pagination
            className="mt-10"
            page={currentPage}
            totalPages={totalPages}
            hrefTemplate={buildHrefTemplate(locale, sp)}
          />
        </>
      ) : (
        <CatalogEmptyState
          title={t("emptyTitle")}
          description={t("emptyDescription")}
          resetHref={`/${locale}/search?category=experiences`}
        />
      );
  }

  const countLabel =
    category === "stays"
      ? t("resultsStays", { count: total })
      : category === "services"
        ? t("resultsServices", { count: total })
        : t("resultsExperiences", { count: total });

  const activeQuery = category === "stays" ? destination : query;

  return (
    <div className="min-h-dvh bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
      {/* Hero de recherche multifonction */}
      <section className="border-b border-black/10 bg-zinc-50 dark:border-white/10 dark:bg-zinc-900/40">
        <Container className="py-8 sm:py-10">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Heading level={2} className="mt-2">
            {t("title")}
          </Heading>
          <div className="mt-6 rounded-3xl border border-black/10 bg-white p-4 shadow-sm shadow-black/5 dark:border-white/10 dark:bg-zinc-950 dark:shadow-black/30">
            <SearchBar
              variant="auto"
              category={category}
              showCategories={false}
              defaultValues={{
                destination: activeQuery || undefined,
                checkIn: sp.checkIn || undefined,
                checkOut: sp.checkOut || undefined,
                guests: sp.guests ? Number(sp.guests) : undefined,
              }}
            />
          </div>
        </Container>
      </section>

      {/* Résultats */}
      <section>
        <Container className="py-8 sm:py-10">
          <div className="flex flex-col gap-4 border-b border-black/10 pb-5 dark:border-white/10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SearchCategoryTabs locale={locale} active={category} params={sp} />
            </div>
            <Text tone="muted" weight="medium">
              {countLabel}
              {activeQuery ? t("resultsFor", { destination: activeQuery }) : null}
            </Text>
          </div>

          <div className="mt-8">{resultsNode}</div>
        </Container>
      </section>
    </div>
  );
}

function paginate<T>(items: T[], pageParam?: string) {
  const totalPages = Math.max(1, Math.ceil(items.length / RESULTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const start = (currentPage - 1) * RESULTS_PER_PAGE;
  return { items: items.slice(start, start + RESULTS_PER_PAGE), currentPage, totalPages };
}

/**
 * Gabarit d'URL sérialisable (jeton `{page}`) — transmissible à un Client Component
 * depuis ce Server Component, contrairement à une fonction.
 */
function buildHrefTemplate(locale: string, params: SearchPageParams) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (key === "page") continue;
    if (value && value !== "all") query.set(key, String(value));
  }
  query.set("page", "__PAGE__");
  const qs = query.toString().replace("__PAGE__", "{page}");
  return `/${locale}/search?${qs}`;
}
