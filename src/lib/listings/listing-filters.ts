import type { FilterSidebarSection } from "@/components/explore/FilterSidebarButton";
import type { ListingWithMeta } from "@/lib/mock/africa-listings";

export type ListingFilterParams = {
  type?: string;
  price?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  bathrooms?: string;
  guests?: string;
  amenity?: string;
  availableDay?: string;
  sort?: string;
  destination?: string;
};

const AMENITY_OPTIONS = ["WiFi", "Climatisation", "Cuisine équipée", "Parking", "Piscine", "Jardin"];
const WEEKDAY_OPTIONS = [
  { value: "mon", label: "Lundi" },
  { value: "tue", label: "Mardi" },
  { value: "wed", label: "Mercredi" },
  { value: "thu", label: "Jeudi" },
  { value: "fri", label: "Vendredi" },
  { value: "sat", label: "Samedi" },
  { value: "sun", label: "Dimanche" },
];

export type ListingSpecs = {
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  squareFeet: number;
  amenities: string[];
  availableWeekdays: string[];
};

export function getListingSpecs(listing: ListingWithMeta, index: number): ListingSpecs {
  const title = listing.title.toLowerCase();
  const isVilla = title.includes("villa") || title.includes("riad");
  const isStudio = title.includes("studio");
  const isEco = title.includes("eco") || title.includes("lodge") || title.includes("bungalow");
  const bedrooms = isVilla ? 4 : isStudio ? 1 : isEco ? 2 : (index % 3) + 1;
  const bathrooms = Math.max(1, Math.min(bedrooms, (index % 2) + 1));
  const maxGuests = isStudio ? 2 : bedrooms * 2 + (isVilla ? 2 : 0);
  const squareFeet = bedrooms * 38 + bathrooms * 12 + 24;
  const amenities = [
    "WiFi",
    index % 2 === 0 ? "Climatisation" : "Jardin",
    listing.pricePerNight > 70 ? "Piscine" : "Cuisine équipée",
    listing.pricePerNight > 55 ? "Parking" : "Petit-déjeuner inclus",
  ];
  const availableWeekdays = index % 3 === 0
    ? ["mon", "tue", "wed", "thu", "fri"]
    : ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  return { bedrooms, bathrooms, maxGuests, squareFeet, amenities, availableWeekdays };
}

export function applyListingFilters(items: ListingWithMeta[], params: ListingFilterParams) {
  const destination = params.destination?.trim().toLowerCase() ?? "";
  const type = params.type ?? "all";
  const sort = params.sort ?? "recommended";
  const minPrice = readNumber(params.minPrice);
  const maxPrice = readNumber(params.maxPrice);
  const bedrooms = readNumber(params.bedrooms);
  const bathrooms = readNumber(params.bathrooms);
  const guests = readNumber(params.guests);

  let filtered = items
    .map((listing, index) => ({ listing, index, specs: getListingSpecs(listing, index) }))
    .filter(({ listing, specs }) => {
      if (destination && !`${listing.title} ${listing.location}`.toLowerCase().includes(destination)) return false;
      if (type !== "all" && !matchesType(listing, type)) return false;
      if (!matchesLegacyPrice(listing.pricePerNight, params.price ?? "all")) return false;
      if (minPrice !== undefined && listing.pricePerNight < minPrice) return false;
      if (maxPrice !== undefined && listing.pricePerNight > maxPrice) return false;
      if (bedrooms !== undefined && specs.bedrooms < bedrooms) return false;
      if (bathrooms !== undefined && specs.bathrooms < bathrooms) return false;
      if (guests !== undefined && specs.maxGuests < guests) return false;
      if (params.amenity && params.amenity !== "all" && !specs.amenities.includes(params.amenity)) return false;
      if (
        params.availableDay &&
        params.availableDay !== "all" &&
        !specs.availableWeekdays.includes(params.availableDay)
      ) {
        return false;
      }
      return true;
    });

  filtered = filtered.sort((a, b) => {
    if (sort === "price") return a.listing.pricePerNight - b.listing.pricePerNight;
    if (sort === "rating") return b.listing.rating - a.listing.rating;
    return b.listing.rating * 10 + b.listing.reviewCount / 10 - (a.listing.rating * 10 + a.listing.reviewCount / 10);
  });

  return filtered.map(({ listing }) => listing);
}

export function buildListingFilterSections({
  locale,
  path,
  params,
  includeType = true,
}: {
  locale: string;
  path: "stays" | "search";
  params: ListingFilterParams;
  includeType?: boolean;
}): FilterSidebarSection[] {
  const href = (next: ListingFilterParams) => buildHref(locale, path, { ...params, ...next });
  const activePriceInterval = `${params.minPrice ?? ""}-${params.maxPrice ?? ""}`;

  return [
    ...(includeType
      ? [
          {
            title: "Type de logement",
            options: [
              { href: href({ type: "all" }), active: (params.type ?? "all") === "all", label: "Tous les hébergements" },
              { href: href({ type: "guesthouse" }), active: params.type === "guesthouse", label: "Maisons d'hôtes" },
              { href: href({ type: "hotel" }), active: params.type === "hotel", label: "Hôtels" },
              { href: href({ type: "apartment" }), active: params.type === "apartment", label: "Appartements" },
            ],
          },
        ]
      : []),
    {
      title: "Prix par nuit",
      options: [
        { href: href({ price: "all", minPrice: undefined, maxPrice: undefined }), active: !params.minPrice && !params.maxPrice && (params.price ?? "all") === "all", label: "Tous les prix" },
        { href: href({ price: undefined, minPrice: "0", maxPrice: "50" }), active: activePriceInterval === "0-50", label: "0 - 50" },
        { href: href({ price: undefined, minPrice: "50", maxPrice: "80" }), active: activePriceInterval === "50-80", label: "50 - 80" },
        { href: href({ price: undefined, minPrice: "80", maxPrice: "120" }), active: activePriceInterval === "80-120", label: "80 - 120" },
        { href: href({ price: undefined, minPrice: "120", maxPrice: undefined }), active: params.minPrice === "120" && !params.maxPrice, label: "120+" },
      ],
    },
    {
      title: "Capacité",
      options: [
        { href: href({ bedrooms: undefined, bathrooms: undefined, guests: undefined }), active: !params.bedrooms && !params.bathrooms && !params.guests, label: "Toutes capacités" },
        { href: href({ bedrooms: "1" }), active: params.bedrooms === "1", label: "1+ chambre" },
        { href: href({ bedrooms: "2" }), active: params.bedrooms === "2", label: "2+ chambres" },
        { href: href({ bathrooms: "1" }), active: params.bathrooms === "1", label: "1+ douche" },
        { href: href({ bathrooms: "2" }), active: params.bathrooms === "2", label: "2+ douches" },
        { href: href({ guests: "4" }), active: params.guests === "4", label: "4+ voyageurs" },
        { href: href({ guests: "6" }), active: params.guests === "6", label: "6+ voyageurs" },
      ],
    },
    {
      title: "Équipements",
      options: [
        { href: href({ amenity: "all" }), active: !params.amenity || params.amenity === "all", label: "Tous les équipements" },
        ...AMENITY_OPTIONS.map((amenity) => ({
          href: href({ amenity }),
          active: params.amenity === amenity,
          label: amenity,
        })),
      ],
    },
    {
      title: "Disponibilité",
      options: [
        { href: href({ availableDay: "all" }), active: !params.availableDay || params.availableDay === "all", label: "Tous les jours" },
        ...WEEKDAY_OPTIONS.map((day) => ({
          href: href({ availableDay: day.value }),
          active: params.availableDay === day.value,
          label: day.label,
        })),
      ],
    },
    {
      title: "Tri",
      options: [
        { href: href({ sort: "recommended" }), active: (params.sort ?? "recommended") === "recommended", label: "Recommandé" },
        { href: href({ sort: "rating" }), active: params.sort === "rating", label: "Mieux notés" },
        { href: href({ sort: "price" }), active: params.sort === "price", label: "Prix bas" },
      ],
    },
  ];
}

export function buildListingChips(locale: string, path: "stays" | "search", params: ListingFilterParams) {
  const href = (next: ListingFilterParams) => buildHref(locale, path, { ...params, ...next });
  return [
    { href: href({ type: "guesthouse" }), active: params.type === "guesthouse", label: "Maisons d'hôtes" },
    { href: href({ type: "hotel" }), active: params.type === "hotel", label: "Hôtels" },
    { href: href({ type: "apartment" }), active: params.type === "apartment", label: "Appartements" },
    { divider: true },
    { href: href({ minPrice: "0", maxPrice: "50", price: undefined }), active: params.minPrice === "0" && params.maxPrice === "50", label: "0 - 50" },
    { href: href({ minPrice: "50", maxPrice: "80", price: undefined }), active: params.minPrice === "50" && params.maxPrice === "80", label: "50 - 80" },
    { href: href({ bedrooms: "2" }), active: params.bedrooms === "2", label: "2+ chambres" },
    { href: href({ bathrooms: "2" }), active: params.bathrooms === "2", label: "2+ douches" },
    { href: href({ guests: "4" }), active: params.guests === "4", label: "4+ voyageurs" },
    { divider: true },
    { href: href({ sort: "recommended" }), active: (params.sort ?? "recommended") === "recommended", label: "Recommandé" },
    { href: href({ sort: "rating" }), active: params.sort === "rating", label: "Mieux notés" },
    { href: href({ sort: "price" }), active: params.sort === "price", label: "Prix bas" },
  ];
}

function buildHref(locale: string, path: "stays" | "search", params: ListingFilterParams) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value && value !== "all") query.set(key, value);
  }
  const qs = query.toString();
  return `/${locale}/${path}${qs ? `?${qs}` : ""}`;
}

function readNumber(value?: string) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function matchesType(listing: ListingWithMeta, type: string) {
  const haystack = `${listing.title} ${listing.location}`.toLowerCase();
  if (type === "guesthouse") return /maison|guest|house/.test(haystack);
  if (type === "hotel") return /hotel|hôtel|riad|lodge/.test(haystack);
  if (type === "apartment") return /appartement|apartment|studio/.test(haystack);
  return true;
}

function matchesLegacyPrice(price: number, bucket: string) {
  if (bucket === "all") return true;
  if (bucket === "budget") return price <= 50;
  if (bucket === "mid") return price > 50 && price <= 80;
  return price > 80;
}
