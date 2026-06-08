import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Camera, Gamepad2, Gift, Leaf, Music, Scissors, Sparkles, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SearchBar } from "@/components/SearchBar";
import { FilterSidebarButton } from "@/components/explore/FilterSidebarButton";
import { ExploreFiltersBar } from "@/components/explore/ExploreFiltersBar";
import { CatalogEmptyState } from "@/components/explore/CatalogEmptyState";
import servicesData from "../../../../data/services.json";

type ServiceItem = {
  id: string;
  title: string;
  category: string;
  location: string;
  priceFrom: number;
  currency: "EUR" | "USD" | "XOF";
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
};

type PageProps = {
  searchParams?: Promise<{
    category?: string;
    price?: string;
    sort?: string;
  }>;
};

const categoryLabels: Record<string, { label: string; icon: typeof Camera }> = {
  photography: { label: "Photographie", icon: Camera },
  tailoring: { label: "Couture", icon: Scissors },
  repair: { label: "Réparation", icon: Wrench },
  play: { label: "Lieux de jeux", icon: Gamepad2 },
  entertainment: { label: "Distraction", icon: Music },
  cleaning: { label: "Ménage", icon: Sparkles },
  hospitality: { label: "Accueil", icon: Gift },
  garden: { label: "Extérieur", icon: Leaf },
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("servicesPage");

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  };
}

function buildHref(locale: string, sp: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(sp)) {
    if (value && value !== "all") params.set(key, value);
  }
  const qs = params.toString();
  return `/${locale}/services${qs ? `?${qs}` : ""}`;
}

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();
  const t = await getTranslations("servicesPage");
  const sp = (await searchParams) ?? {};
  const category = sp.category ?? "all";
  const price = sp.price ?? "all";
  const sort = sp.sort ?? "recommended";

  let services = [...(servicesData as ServiceItem[])];

  if (category !== "all") {
    services = services.filter((service) => service.category === category);
  }

  if (price !== "all") {
    services =
      price === "budget"
        ? services.filter((service) => service.priceFrom <= 25)
        : price === "mid"
          ? services.filter((service) => service.priceFrom > 25 && service.priceFrom <= 45)
          : services.filter((service) => service.priceFrom > 45);
  }

  services.sort((a, b) => {
    if (sort === "price") return a.priceFrom - b.priceFrom;
    if (sort === "rating") return b.rating - a.rating;
    return b.rating * 10 + b.reviewCount / 10 - (a.rating * 10 + a.reviewCount / 10);
  });

  const categories = [
    { key: "photography", label: "Photographie" },
    { key: "tailoring", label: "Couture" },
    { key: "repair", label: "Réparation" },
    { key: "play", label: "Lieux de jeux" },
    { key: "entertainment", label: "Distraction" },
    { key: "cleaning", label: "Ménage" },
    { key: "hospitality", label: "Accueil" },
  ];

  const filterSections = [
    {
      title: "Catégories",
      options: [
        { href: buildHref(locale, { ...sp, category: "all" }), active: category === "all", label: "Tous les services" },
        ...categories.map((item) => ({
          href: buildHref(locale, { ...sp, category: item.key }),
          active: category === item.key,
          label: item.label,
        })),
      ],
    },
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
  ];

  const filterChips = [
    ...categories.map((item) => ({
      href: buildHref(locale, { ...sp, category: item.key }),
      active: category === item.key,
      label: item.label,
    })),
    { divider: true as const },
    { href: buildHref(locale, { ...sp, price: "budget" }), active: price === "budget", label: "Budget" },
    { href: buildHref(locale, { ...sp, price: "mid" }), active: price === "mid", label: "Intermédiaire" },
    { href: buildHref(locale, { ...sp, price: "high" }), active: price === "high", label: "Premium" },
    { divider: true as const },
    { href: buildHref(locale, { ...sp, sort: "recommended" }), active: sort === "recommended", label: "Recommandé" },
    { href: buildHref(locale, { ...sp, sort: "rating" }), active: sort === "rating", label: "Mieux notés" },
    { href: buildHref(locale, { ...sp, sort: "price" }), active: sort === "price", label: "Prix bas" },
  ];

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 max-w-4xl text-balance text-3xl font-semibold tracking-tight text-black sm:text-5xl">
            Services pour voyageurs et hôtes
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            Trouvez des services locaux inspirés des meilleures marketplaces : photographie,
            couture, réparation, jeux, distraction, accueil et préparation de logement.
          </p>
          <div className="mt-8">
            <SearchBar />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <p className="text-sm font-medium text-zinc-600">
            {services.length} service(s) disponible(s)
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Filtres actifs : {category === "all" ? "toutes catégories" : categoryLabels[category]?.label ?? category}
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
              title="Aucun service ne correspond à ces filtres"
              description="Essayez une autre catégorie ou élargissez votre budget."
              resetHref={`/${locale}/services`}
            />
          )}
        </Container>
      </section>
    </div>
  );
}

function ServiceCard({ locale, service }: { locale: string; service: ServiceItem }) {
  const meta = categoryLabels[service.category] ?? categoryLabels.hospitality;
  const Icon = meta.icon;

  return (
    <Link
      href={`/${locale}/services/${service.id}`}
      className="group block overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm shadow-black/5 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-zinc-100">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-black shadow-sm shadow-black/10">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          {meta.label}
        </div>
      </div>

      <div className="p-4">
        <p className="truncate text-sm font-semibold text-black" title={service.title}>
          {service.title}
        </p>
        <p className="mt-1 truncate text-sm text-zinc-600">{service.location}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600">{service.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-black">
            Dès {service.priceFrom} {service.currency}
          </p>
          <p className="text-xs font-semibold text-zinc-600">
            ★ {service.rating.toFixed(1)} ({service.reviewCount})
          </p>
        </div>
        <p className="mt-4 text-sm font-semibold text-black">
          Voir le service →
        </p>
      </div>
    </Link>
  );
}
