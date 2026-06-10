import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import {
  Bath,
  BedDouble,
  CalendarDays,
  Car,
  ChevronDown,
  Grid2X2,
  Home,
  Map,
  MapPin,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { africaListings } from "@/lib/mock/africa-listings";
import { ListingCard } from "@/components/listings/ListingCard";
import { FilterSidebarButton } from "@/components/explore/FilterSidebarButton";
import { ExploreFiltersBar } from "@/components/explore/ExploreFiltersBar";
import { CatalogEmptyState } from "@/components/explore/CatalogEmptyState";
import {
  applyListingFilters,
  buildListingChips,
  buildListingFilterControls,
  buildListingFilterSections,
  type ListingFilterParams,
} from "@/lib/listings/listing-filters";
import {
  AMENITY_OPTIONS,
  LISTING_SORT_OPTIONS,
  LISTING_TYPE_OPTIONS,
  WEEKDAY_OPTIONS,
} from "@/constants/listing-filters";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Recherche - GuestConnect",
  description: "Recherchez des hebergements sur GuestConnect.",
};

type SearchPageParams = ListingFilterParams & {
  checkIn?: string;
  checkOut?: string;
};

type PageProps = {
  searchParams: Promise<SearchPageParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();
  const t = await getTranslations("searchPage");
  const sp = await searchParams;
  const destination = sp.destination?.trim() ?? "";
  const guests = sp.guests ? Number(sp.guests) : 2;
  const filtered = applyListingFilters(africaListings, sp);
  const filterSections = buildListingFilterSections({ locale, path: "search", params: sp });
  const filterControls = buildListingFilterControls(sp);
  const filterChips = buildListingChips(locale, "search", sp);
  const resultPlace = destination || "GuestConnect";

  return (
    <div className="bg-zinc-100  text-zinc-950 dark:bg-black dark:text-white">
      <section className="border-b border-black/10 bg-zinc-10__dark:bg-zinc-950">
        <Container className="py-8 sm:py-10">
          <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-sm shadow-black/5 dark:bg-zinc-950 dark:shadow-black/30">
            <div className="grid grid-cols-2 border-b border-black/10 sm:flex sm:w-fit sm:border-r">
              <SearchTab href={`/${locale}/services`} icon={<Car className="h-4 w-4" />} label="Services" />
              <SearchTab active href={`/${locale}/search`} icon={<Home className="h-4 w-4" />} label="Homes" />
            </div>

            <form action={`/${locale}/search`} method="get" className="grid lg:grid-cols-[1.4fr_0.9fr_0.9fr_0.8fr_auto]">
              <SearchField label={t("where")} icon={<MapPin className="h-4 w-4" />}>
                <input
                  name="destination"
                  defaultValue={destination}
                  placeholder={t("destinationPlaceholder")}
                  className="w-full bg-transparent text-sm font-semibold text-black outline-none placeholder:text-zinc-400 dark:text-white"
                />
              </SearchField>
              <SearchField label={t("checkIn")} icon={<CalendarDays className="h-4 w-4" />}>
                <input
                  name="checkIn"
                  type="date"
                  defaultValue={sp.checkIn}
                  className="w-full bg-transparent text-sm font-semibold text-black outline-none dark:text-white"
                />
              </SearchField>
              <SearchField label={t("checkOut")} icon={<CalendarDays className="h-4 w-4" />}>
                <input
                  name="checkOut"
                  type="date"
                  defaultValue={sp.checkOut}
                  className="w-full bg-transparent text-sm font-semibold text-black outline-none dark:text-white"
                />
              </SearchField>
              <SearchField label={t("guests")} icon={<Users className="h-4 w-4" />}>
                <input
                  name="guests"
                  type="number"
                  min={1}
                  defaultValue={Number.isFinite(guests) ? guests : 2}
                  className="w-full bg-transparent text-sm font-semibold text-black outline-none dark:text-white"
                />
              </SearchField>
              <button
                type="submit"
                className="m-2 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                {t("updateSearch")}
              </button>
            </form>
          </div>
        </Container>
      </section>

      <section className="bg-white dark:bg-black">
        <Container className="py-8 sm:py-10">
          <div className="flex flex-col gap-4 border-b border-black/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-base font-medium text-zinc-700 dark:text-zinc-300">
              {t("foundNear", { count: filtered.length, destination: resultPlace })}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <PillButton icon={<SlidersHorizontal className="h-4 w-4" />}>{t("latest")}</PillButton>
              <PillButton icon={<Map className="h-4 w-4" />}>{t("mapView")}</PillButton>
              <PillButton active icon={<Grid2X2 className="h-4 w-4" />}>{t("cardView")}</PillButton>
            </div>
          </div>

          <ExploreFiltersBar
            className="mt-4"
            leading={
              <div className="lg:hidden">
                <FilterSidebarButton
                  sections={filterSections}
                  controls={filterControls}
                  actionHref={`/${locale}/search`}
                  resetHref={`/${locale}/search`}
                />
              </div>
            }
            chips={filterChips}
          />

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0">
              {filtered.length > 0 ? (
                <>
                  <div className="grid gap-x-5 gap-y-7 sm:grid-cols-2">
                    {filtered.map((listing) => (
                      <ListingCard
                        key={listing.id}
                        locale={locale}
                        listing={listing}
                        variant="outlined"
                        badge={listing.rating >= 4.8 ? "4.8" : undefined}
                        className="[&>div]:rounded-2xl [&>div]:p-3"
                      />
                    ))}
                  </div>
                  <PaginationBar locale={locale} params={sp} />
                </>
              ) : (
                <CatalogEmptyState
                  title={t("emptyTitle")}
                  description={t("emptyDescription")}
                  resetHref={`/${locale}/search`}
                />
              )}
            </div>

            <SearchFiltersPanel locale={locale} params={sp} />
          </div>
        </Container>
      </section>
    </div>
  );
}

function SearchTab({
  active,
  href,
  icon,
  label,
}: {
  active?: boolean;
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 px-8 text-sm font-semibold transition",
        active
          ? "bg-zinc-100 text-black dark:bg-white/10 dark:text-white"
          : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-white/5",
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

function SearchField({ label, icon, children }: { label: string; icon: ReactNode; children: ReactNode }) {
  return (
    <label className="flex min-h-20 items-center gap-3 border-t border-black/10 px-5 py-3 dark:border-black/10 lg:border-l lg:border-t-0">
      <span className="text-zinc-500 dark:text-zinc-400">{icon}</span>
      <span className="grid min-w-0 flex-1 gap-1">
        <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
        {children}
      </span>
    </label>
  );
}

function PillButton({ active, icon, children }: { active?: boolean; icon: ReactNode; children: ReactNode }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-black/10 px-4 text-sm font-semibold transition dark:border-black/10",
        active
          ? "bg-zinc-100 text-black dark:bg-white dark:text-black"
          : "bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900",
      )}
    >
      {icon}
      {children}
      {!active ? <ChevronDown className="h-4 w-4" aria-hidden="true" /> : null}
    </button>
  );
}

function SearchFiltersPanel({ locale, params }: { locale: string; params: SearchPageParams }) {
  const activeTypes = readList(params.type);
  const activeAmenities = readList(params.amenity);
  const activeDays = readList(params.availableDay);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 overflow-hidden rounded-3xl border border-black/10 bg-white dark:bg-zinc-950">
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <h2 className="text-lg font-semibold tracking-tight text-black dark:text-white">Filters</h2>
          <ButtonLink href={`/${locale}/search`} variant="ghost" size="sm">
            Clear all
          </ButtonLink>
        </div>

        <div className="grid gap-6 p-5">
          <form action={`/${locale}/search`} method="get" className="grid gap-3">
            <input type="hidden" name="destination" value={params.destination ?? ""} />
            <FilterTitle title="Price range" description="Average nightly price for selected stays" />
            <div className="grid grid-cols-2 gap-3">
              <NumberInput name="minPrice" label="Minimum" defaultValue={params.minPrice ?? "0"} />
              <NumberInput name="maxPrice" label="Maximum" defaultValue={params.maxPrice ?? "250"} />
            </div>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-full bg-black px-4 text-sm font-semibold text-white dark:bg-white dark:text-black"
            >
              Apply price
            </button>
          </form>

          <FilterGroup title="Type de logement">
            <div className="grid grid-cols-2 gap-2">
              {LISTING_TYPE_OPTIONS.map((option) => (
                <FilterOptionLink
                  key={option.value}
                  href={toggleListHref(locale, params, "type", option.value)}
                  active={activeTypes.includes(option.value)}
                  label={option.label}
                  icon={<Home className="h-4 w-4" />}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Rooms and beds">
            <FilterNumberRow label="Bedrooms" icon={<BedDouble className="h-4 w-4" />} name="bedrooms" params={params} locale={locale} />
            <FilterNumberRow label="Bathrooms" icon={<Bath className="h-4 w-4" />} name="bathrooms" params={params} locale={locale} />
            <FilterNumberRow label="Guests" icon={<Users className="h-4 w-4" />} name="guests" params={params} locale={locale} />
          </FilterGroup>

          <FilterGroup title="Equipements">
            <div className="grid gap-2">
              {AMENITY_OPTIONS.map((option) => (
                <CheckLink
                  key={option.value}
                  href={toggleListHref(locale, params, "amenity", option.value)}
                  active={activeAmenities.includes(option.value)}
                  label={option.label}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Disponibilite">
            <div className="grid grid-cols-2 gap-2">
              {WEEKDAY_OPTIONS.map((option) => (
                <FilterOptionLink
                  key={option.value}
                  href={toggleListHref(locale, params, "availableDay", option.value)}
                  active={activeDays.includes(option.value)}
                  label={option.label}
                  icon={<CalendarDays className="h-4 w-4" />}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Tri">
            <div className="grid gap-2">
              {LISTING_SORT_OPTIONS.map((option) => (
                <CheckLink
                  key={option.value}
                  href={searchHref(locale, params, { sort: option.value })}
                  active={(params.sort ?? "recommended") === option.value}
                  label={option.label}
                />
              ))}
            </div>
          </FilterGroup>
        </div>
      </div>
    </aside>
  );
}

function FilterTitle({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-black dark:text-white">{title}</p>
      <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">{description}</p>
    </div>
  );
}

function NumberInput({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
      <input
        name={name}
        type="number"
        min={0}
        defaultValue={defaultValue}
        className="h-11 rounded-full border border-black/10 bg-white px-4 text-sm font-semibold text-black outline-none focus:ring-2 focus:ring-black/10 dark:bg-black dark:text-white dark:focus:ring-white/15"
      />
    </label>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-black/10 pt-5">
      <h3 className="text-sm font-semibold text-black dark:text-white">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function FilterOptionLink({
  href,
  active,
  label,
  icon,
}: {
  href: string;
  active: boolean;
  label: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex min-h-14 items-center gap-3 rounded-2xl border px-3 py-2 text-sm font-semibold transition",
        active
          ? "border-black bg-zinc-50 text-black dark:border-white dark:bg-white/10 dark:text-white"
          : "border-black/10 bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900",
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

function CheckLink({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link href={href} className="flex items-start gap-3 rounded-2xl p-2 text-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-900">
      <span
        className={cn(
          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border text-xs",
          active ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black" : "border-black/10",
        )}
      >
        {active ? "✓" : ""}
      </span>
      <span>
        <span className="font-semibold text-black dark:text-white">{label}</span>
        <span className="block text-xs leading-5 text-zinc-500 dark:text-zinc-400">Filtre associe au formulaire d'ajout de logement.</span>
      </span>
    </Link>
  );
}

function FilterNumberRow({
  label,
  icon,
  name,
  params,
  locale,
}: {
  label: string;
  icon: ReactNode;
  name: "bedrooms" | "bathrooms" | "guests";
  params: SearchPageParams;
  locale: string;
}) {
  const current = params[name];
  return (
    <div className="mt-3">
      <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300">
        {icon}
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {["", "1", "2", "3", "4", "5"].map((value) => (
          <Link
            key={`${name}-${value || "any"}`}
            href={searchHref(locale, params, { [name]: value || undefined })}
            className={cn(
              "grid h-9 min-w-9 place-items-center rounded-full border border-black/10 px-3 text-sm font-semibold transition",
              (current ?? "") === value
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900",
            )}
          >
            {value || "Any"}
          </Link>
        ))}
      </div>
    </div>
  );
}

function PaginationBar({ locale, params }: { locale: string; params: SearchPageParams }) {
  return (
    <div className="mt-8 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((page) => (
          <Link
            key={page}
            href={searchHref(locale, params, {})}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full font-semibold transition",
              page === 2 ? "bg-zinc-100 text-black dark:bg-white/10 dark:text-white" : "hover:bg-zinc-50 dark:hover:bg-zinc-900",
            )}
          >
            {page}
          </Link>
        ))}
        <span>...</span>
        <span>10</span>
      </div>
      <button type="button" className="inline-flex items-center gap-2 font-semibold">
        Show: 9
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  );
}

function toggleListHref(
  locale: string,
  params: SearchPageParams,
  key: "type" | "amenity" | "availableDay",
  value: string,
) {
  const values = readList(params[key]);
  const next = values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
  return searchHref(locale, params, { [key]: next.length > 0 ? next.join(",") : undefined });
}

function searchHref(locale: string, params: SearchPageParams, patch: Partial<SearchPageParams>) {
  const next = { ...params, ...patch };
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(next)) {
    if (value && value !== "all") query.set(key, value);
  }
  const qs = query.toString();
  return `/${locale}/search${qs ? `?${qs}` : ""}`;
}

function readList(value?: string) {
  if (!value || value === "all") return [];
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}
