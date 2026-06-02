import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SearchBar } from "@/components/SearchBar";
import { africaListings } from "@/lib/mock/africa-listings";
import { ListingCard } from "@/components/listings/ListingCard";

export const metadata: Metadata = {
  title: "Explorer — GuestConnect",
  description: "Explorez des hébergements par centres d’intérêt.",
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
  return `/${locale}/explore${qs ? `?${qs}` : ""}`;
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
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <div className="mt-8">
            <SearchBar />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          {/* Filtres (avant la liste) */}
          <div className="relative -mx-[15px] px-[15px]">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />

            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <FilterChip
                href={buildHref(locale, { ...sp, type: "all" })}
                active={type === "all"}
                label={t("filters.all")}
              />
              <FilterChip
                href={buildHref(locale, { ...sp, type: "guesthouse" })}
                active={type === "guesthouse"}
                label={t("filters.guesthouses")}
              />
              <FilterChip
                href={buildHref(locale, { ...sp, type: "hotel" })}
                active={type === "hotel"}
                label={t("filters.hotels")}
              />
              <FilterChip
                href={buildHref(locale, { ...sp, type: "apartment" })}
                active={type === "apartment"}
                label={t("filters.apartments")}
              />

              <span className="mx-1 h-5 w-px bg-black/10" />

              <FilterChip
                href={buildHref(locale, { ...sp, price: "budget" })}
                active={price === "budget"}
                label={t("filters.budget")}
              />
              <FilterChip
                href={buildHref(locale, { ...sp, price: "mid" })}
                active={price === "mid"}
                label={t("filters.mid")}
              />
              <FilterChip
                href={buildHref(locale, { ...sp, price: "high" })}
                active={price === "high"}
                label={t("filters.premium")}
              />
              <FilterChip
                href={buildHref(locale, { ...sp, price: "all" })}
                active={price === "all"}
                label={t("filters.anyPrice")}
              />

              <span className="mx-1 h-5 w-px bg-black/10" />

              <FilterChip
                href={buildHref(locale, { ...sp, sort: "recommended" })}
                active={sort === "recommended"}
                label={t("filters.recommended")}
              />
              <FilterChip
                href={buildHref(locale, { ...sp, sort: "rating" })}
                active={sort === "rating"}
                label={t("filters.topRated")}
              />
              <FilterChip
                href={buildHref(locale, { ...sp, sort: "price" })}
                active={sort === "price"}
                label={t("filters.lowestPrice")}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {items.map((l) => (
              <ListingCard key={l.id} locale={locale} listing={l} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

function FilterChip({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={
        active
          ? "rounded-full bg-black px-4 py-2 text-sm font-semibold text-white"
          : "rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-200 hover:text-black"
      }
    >
      {label}
    </Link>
  );
}
