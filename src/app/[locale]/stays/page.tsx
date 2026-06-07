import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SearchBar } from "@/components/SearchBar";
import { africaListings } from "@/lib/mock/africa-listings";
import { ListingCard } from "@/components/listings/ListingCard";
import { ExploreFiltersBar } from "@/components/explore/ExploreFiltersBar";
import { FilterSidebarButton } from "@/components/explore/FilterSidebarButton";

export const metadata: Metadata = {
  title: "Stays — GuestConnect",
  description: "Browse stays by interests and filters.",
};

type PageProps = {
  searchParams?: Promise<{
    type?: string;
    price?: string;
    sort?: string;
  }>;
};

function buildHref(locale: string, sp: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (v) params.set(k, v);
  }
  const qs = params.toString();
  return `/${locale}/stays${qs ? `?${qs}` : ""}`;
}

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();
  const t = await getTranslations("explore");
  const sp = (await searchParams) ?? {};

  const type = sp.type ?? "all";
  const price = sp.price ?? "all";
  const sort = sp.sort ?? "recommended";

  let items = [...africaListings];
  if (type !== "all") {
    const rx =
      type === "guesthouse"
        ? /maison d’hôtes|guest house|house/i
        : type === "hotel"
          ? /hotel|hôtel/i
          : /appartement|apartment/i;
    items = items.filter((l) => rx.test(`${l.title} ${l.location}`));
  }
  if (price !== "all") {
    items =
      price === "budget"
        ? items.filter((l) => l.pricePerNight <= 50)
        : price === "mid"
          ? items.filter((l) => l.pricePerNight > 50 && l.pricePerNight <= 80)
          : items.filter((l) => l.pricePerNight > 80);
  }

  items.sort((a, b) => {
    if (sort === "price") return a.pricePerNight - b.pricePerNight;
    if (sort === "rating") return b.rating - a.rating;
    // recommended
    return b.rating * 10 + b.reviewCount / 10 - (a.rating * 10 + a.reviewCount / 10);
  });

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{t("eyebrow")}</p>
          <h1 className="mt-4 text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-black">
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
          <div className="mb-4 flex items-center gap-2">
            <FilterSidebarButton
              sections={[
                {
                  title: "Type",
                  options: [
                    { href: buildHref(locale, { ...sp, type: "all" }), active: type === "all", label: "Tous les hébergements" },
                    { href: buildHref(locale, { ...sp, type: "guesthouse" }), active: type === "guesthouse", label: t("filters.guesthouses") },
                    { href: buildHref(locale, { ...sp, type: "hotel" }), active: type === "hotel", label: t("filters.hotels") },
                    { href: buildHref(locale, { ...sp, type: "apartment" }), active: type === "apartment", label: t("filters.apartments") },
                  ],
                },
                {
                  title: "Budget",
                  options: [
                    { href: buildHref(locale, { ...sp, price: "all" }), active: price === "all", label: t("filters.anyPrice") },
                    { href: buildHref(locale, { ...sp, price: "budget" }), active: price === "budget", label: t("filters.budget") },
                    { href: buildHref(locale, { ...sp, price: "mid" }), active: price === "mid", label: t("filters.mid") },
                    { href: buildHref(locale, { ...sp, price: "high" }), active: price === "high", label: t("filters.premium") },
                  ],
                },
                {
                  title: "Tri",
                  options: [
                    { href: buildHref(locale, { ...sp, sort: "recommended" }), active: sort === "recommended", label: t("filters.recommended") },
                    { href: buildHref(locale, { ...sp, sort: "rating" }), active: sort === "rating", label: t("filters.topRated") },
                    { href: buildHref(locale, { ...sp, sort: "price" }), active: sort === "price", label: t("filters.lowestPrice") },
                  ],
                },
              ]}
            />
          </div>
          <ExploreFiltersBar
            chips={[
              {
                href: buildHref(locale, { ...sp, type: "guesthouse" }),
                active: type === "guesthouse",
                label: t("filters.guesthouses"),
              },
              { href: buildHref(locale, { ...sp, type: "hotel" }), active: type === "hotel", label: t("filters.hotels") },
              {
                href: buildHref(locale, { ...sp, type: "apartment" }),
                active: type === "apartment",
                label: t("filters.apartments"),
              },
              { divider: true },
              { href: buildHref(locale, { ...sp, price: "budget" }), active: price === "budget", label: t("filters.budget") },
              { href: buildHref(locale, { ...sp, price: "mid" }), active: price === "mid", label: t("filters.mid") },
              { href: buildHref(locale, { ...sp, price: "high" }), active: price === "high", label: t("filters.premium") },
              { href: buildHref(locale, { ...sp, price: "all" }), active: price === "all", label: t("filters.anyPrice") },
              { divider: true },
              {
                href: buildHref(locale, { ...sp, sort: "recommended" }),
                active: sort === "recommended",
                label: t("filters.recommended"),
              },
              { href: buildHref(locale, { ...sp, sort: "rating" }), active: sort === "rating", label: t("filters.topRated") },
              { href: buildHref(locale, { ...sp, sort: "price" }), active: sort === "price", label: t("filters.lowestPrice") },
            ]}
          />

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {items.map((l) => (
              <ListingCard key={l.id} locale={locale} listing={l} variant="outlined" />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
