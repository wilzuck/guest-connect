import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { MapPin, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FilterSidebarButton } from "@/components/explore/FilterSidebarButton";
import { ExploreFiltersBar } from "@/components/explore/ExploreFiltersBar";
import { CatalogEmptyState } from "@/components/explore/CatalogEmptyState";
import {
  ServiceCard,
  serviceCategoryMeta,
  type ServiceItem,
} from "@/components/services/ServiceCard";
import servicesData from "../../../../data/services.json";

type ServicesSearchParams = {
  category?: string;
  location?: string;
  q?: string;
  price?: string;
  sort?: string;
};

type PageProps = {
  searchParams?: Promise<ServicesSearchParams>;
};

const categoryOptions: Array<{ key: string; label: string }> = [
  { key: "photography", label: "Photographie" },
  { key: "tailoring", label: "Couture" },
  { key: "repair", label: "Reparation" },
  { key: "play", label: "Lieux de jeux" },
  { key: "entertainment", label: "Distraction" },
  { key: "cleaning", label: "Menage" },
  { key: "hospitality", label: "Accueil" },
];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("servicesPage");

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  };
}

function buildHref(locale: string, values: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value && value !== "all") params.set(key, value);
  }
  const query = params.toString();
  return `/${locale}/services${query ? `?${query}` : ""}`;
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();
  const t = await getTranslations("servicesPage");
  const params = (await searchParams) ?? {};
  const category = params.category ?? "all";
  const location = params.location?.trim() ?? "";
  const query = params.q?.trim() ?? "";
  const price = params.price ?? "all";
  const sort = params.sort ?? "recommended";
  const allServices = servicesData as ServiceItem[];
  const locations = Array.from(new Set(allServices.map((service) => service.location))).sort();

  let services = allServices;

  if (category !== "all") {
    services = services.filter((service) => service.category === category);
  }

  if (location) {
    const locationQuery = normalize(location);
    services = services.filter((service) => normalize(service.location).includes(locationQuery));
  }

  if (query) {
    const textQuery = normalize(query);
    services = services.filter((service) =>
      normalize(`${service.title} ${service.category} ${service.description}`).includes(textQuery),
    );
  }

  if (price !== "all") {
    services =
      price === "budget"
        ? services.filter((service) => service.priceFrom <= 25)
        : price === "mid"
          ? services.filter((service) => service.priceFrom > 25 && service.priceFrom <= 45)
          : services.filter((service) => service.priceFrom > 45);
  }

  services = [...services].sort((a, b) => {
    if (sort === "price") return a.priceFrom - b.priceFrom;
    if (sort === "rating") return b.rating - a.rating;
    return b.rating * 10 + b.reviewCount / 10 - (a.rating * 10 + a.reviewCount / 10);
  });

  const filterSections = [
    {
      title: "Categories",
      options: [
        {
          href: buildHref(locale, { ...params, category: "all" }),
          active: category === "all",
          label: "Tous les services",
        },
        ...categoryOptions.map((item) => ({
          href: buildHref(locale, { ...params, category: item.key }),
          active: category === item.key,
          label: item.label,
        })),
      ],
    },
    {
      title: "Localisation",
      options: [
        {
          href: buildHref(locale, { ...params, location: undefined }),
          active: !location,
          label: "Toutes les localisations",
        },
        ...locations.map((item) => ({
          href: buildHref(locale, { ...params, location: item }),
          active: location === item,
          label: item,
        })),
      ],
    },
    {
      title: "Budget",
      options: [
        { href: buildHref(locale, { ...params, price: "all" }), active: price === "all", label: "Tous les prix" },
        { href: buildHref(locale, { ...params, price: "budget" }), active: price === "budget", label: "Budget" },
        { href: buildHref(locale, { ...params, price: "mid" }), active: price === "mid", label: "Intermediaire" },
        { href: buildHref(locale, { ...params, price: "high" }), active: price === "high", label: "Premium" },
      ],
    },
    {
      title: "Tri",
      options: [
        {
          href: buildHref(locale, { ...params, sort: "recommended" }),
          active: sort === "recommended",
          label: "Recommande",
        },
        { href: buildHref(locale, { ...params, sort: "rating" }), active: sort === "rating", label: "Mieux notes" },
        { href: buildHref(locale, { ...params, sort: "price" }), active: sort === "price", label: "Prix bas" },
      ],
    },
  ];

  const filterChips = [
    ...categoryOptions.map((item) => ({
      href: buildHref(locale, { ...params, category: item.key }),
      active: category === item.key,
      label: item.label,
    })),
    { divider: true as const },
    ...locations.map((item) => ({
      href: buildHref(locale, { ...params, location: item }),
      active: location === item,
      label: item,
    })),
    { divider: true as const },
    { href: buildHref(locale, { ...params, price: "budget" }), active: price === "budget", label: "Budget" },
    { href: buildHref(locale, { ...params, price: "mid" }), active: price === "mid", label: "Intermediaire" },
    { href: buildHref(locale, { ...params, price: "high" }), active: price === "high", label: "Premium" },
  ];

  const activeCategoryLabel =
    category === "all" ? "toutes categories" : serviceCategoryMeta[category]?.label ?? category;

  return (
    <div>
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 max-w-4xl text-balance text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-5xl">
            Services pour voyageurs et hotes
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Trouvez des services locaux par ville ou pays : photographie, couture, reparation,
            jeux, distraction, accueil et preparation de logement.
          </p>
          <form action={`/${locale}/services`} className="mt-8">
            <div className="grid gap-2 rounded-2xl border border-zinc-200 bg-white/80 p-2 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80 sm:grid-cols-[minmax(0,1fr)_minmax(180px,0.7fr)_auto]">
              <label className="flex h-14 min-w-0 items-center gap-3 rounded-xl bg-white px-4 dark:bg-zinc-950">
                <Search className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                <input
                  name="q"
                  defaultValue={query}
                  placeholder="Service ou categorie"
                  maxLength={250}
                  className="min-w-0 flex-1 bg-transparent text-sm text-black outline-none placeholder:text-zinc-500 dark:text-white dark:placeholder:text-zinc-500"
                />
              </label>
              <label className="flex h-14 min-w-0 items-center gap-3 rounded-xl bg-white px-4 dark:bg-zinc-950">
                <MapPin className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                <input
                  name="location"
                  defaultValue={location}
                  placeholder="Ville ou pays"
                  maxLength={250}
                  className="min-w-0 flex-1 bg-transparent text-sm text-black outline-none placeholder:text-zinc-500 dark:text-white dark:placeholder:text-zinc-500"
                />
              </label>
              {category !== "all" ? <input type="hidden" name="category" value={category} /> : null}
              {price !== "all" ? <input type="hidden" name="price" value={price} /> : null}
              {sort !== "recommended" ? <input type="hidden" name="sort" value={sort} /> : null}
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Rechercher
              </button>
            </div>
          </form>
        </Container>
      </section>

      <section>
        <Container className="py-12 sm:py-14">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {services.length} service(s) disponible(s)
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
            Filtres actifs : {activeCategoryLabel}
            {location ? ` - ${location}` : ""}
          </p>

          <ExploreFiltersBar
            className="mt-5"
            leading={<FilterSidebarButton sections={filterSections} resetHref={`/${locale}/services`} />}
            chips={filterChips}
          />

          {services.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {services.map((service) => (
                <ServiceCard key={service.id} locale={locale} service={service} />
              ))}
            </div>
          ) : (
            <CatalogEmptyState
              title="Aucun service ne correspond a ces filtres"
              description="Essayez une autre localisation, une autre categorie ou un budget plus large."
              resetHref={`/${locale}/services`}
            />
          )}
        </Container>
      </section>
    </div>
  );
}
