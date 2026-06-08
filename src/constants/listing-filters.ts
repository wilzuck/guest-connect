import type { FilterOption } from "@/types/filters";

export const LISTING_TYPE_OPTIONS: FilterOption[] = [
  { value: "guesthouse", label: "Maisons d'hôtes" },
  { value: "hotel", label: "Hôtels" },
  { value: "apartment", label: "Appartements" },
];

export const AMENITY_OPTIONS: FilterOption[] = [
  { value: "WiFi", label: "WiFi" },
  { value: "Climatisation", label: "Climatisation" },
  { value: "Cuisine équipée", label: "Cuisine équipée" },
  { value: "Parking", label: "Parking" },
  { value: "Piscine", label: "Piscine" },
  { value: "Jardin", label: "Jardin" },
];

export const WEEKDAY_OPTIONS: FilterOption[] = [
  { value: "mon", label: "Lundi" },
  { value: "tue", label: "Mardi" },
  { value: "wed", label: "Mercredi" },
  { value: "thu", label: "Jeudi" },
  { value: "fri", label: "Vendredi" },
  { value: "sat", label: "Samedi" },
  { value: "sun", label: "Dimanche" },
];

export const LISTING_SORT_OPTIONS: FilterOption[] = [
  { value: "recommended", label: "Recommandé" },
  { value: "rating", label: "Mieux notés" },
  { value: "price", label: "Prix bas" },
];
