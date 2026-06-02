export type Listing = {
  id: string;
  title: string;
  location: string;
  countryCode?: string;
  pricePerNight: number;
  currency: "USD" | "EUR" | "GBP" | string;
  rating: number; // 0..5
  reviewCount: number;
  imageUrl: string;
  images?: string[];
  propertyType?: "Guest house" | "Hotel" | "Apartment" | "Villa" | "Lodge" | string;
  shortDescription?: string;
  badges?: Array<"Nouveau" | "Populaire" | "Recommandé" | string>;
};
