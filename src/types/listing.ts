import type { CurrencyCode } from "@/lib/currency/currency";

export type Listing = {
  id: string;
  title: string;
  location: string;
  countryCode?: string;
  pricePerNight: number;
  currency: CurrencyCode;
  rating: number; // 0..5
  reviewCount: number;
  imageUrl: string;
  images?: string[];
  floorPlanImages?: string[];
  propertyType?: "Guest house" | "Hotel" | "Apartment" | "Villa" | "Lodge" | string;
  shortDescription?: string;
  badges?: Array<"Nouveau" | "Populaire" | "Recommandé" | string>;
};
