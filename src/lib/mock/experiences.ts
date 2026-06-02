import type { CurrencyCode } from "@/lib/currency/currency";

export type Experience = {
  id: string;
  title: string;
  location: string;
  city: string;
  priceFrom: number;
  currency: CurrencyCode;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  tag: "Culture" | "Food" | "Nature" | "Nightlife" | "Business";
};

export const experiences: Experience[] = [
  {
    id: "exp-dakar-food-01",
    title: "Street food à Dakar — dégustation premium",
    location: "Dakar, Sénégal",
    city: "Dakar",
    priceFrom: 28,
    currency: "EUR",
    rating: 4.9,
    reviewCount: 412,
    tag: "Food",
    imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "exp-marrakech-culture-02",
    title: "Médina de Marrakech — visite privée au coucher du soleil",
    location: "Marrakech, Maroc",
    city: "Marrakech",
    priceFrom: 35,
    currency: "EUR",
    rating: 4.86,
    reviewCount: 980,
    tag: "Culture",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "exp-zanzibar-nature-03",
    title: "Zanzibar — snorkeling & lagon turquoise",
    location: "Zanzibar, Tanzanie",
    city: "Zanzibar",
    priceFrom: 42,
    currency: "EUR",
    rating: 4.88,
    reviewCount: 523,
    tag: "Nature",
    imageUrl: "https://images.unsplash.com/photo-1510414696678-2415ad8474aa?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "exp-cotonou-culture-04",
    title: "Cotonou — art & artisanat (atelier + marché)",
    location: "Cotonou, Bénin",
    city: "Cotonou",
    priceFrom: 18,
    currency: "EUR",
    rating: 4.84,
    reviewCount: 188,
    tag: "Culture",
    imageUrl: "https://images.unsplash.com/photo-1520975682031-ae9f4dbb8b76?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "exp-cape-town-nightlife-05",
    title: "Cape Town — rooftop night & jazz",
    location: "Le Cap, Afrique du Sud",
    city: "Le Cap",
    priceFrom: 30,
    currency: "EUR",
    rating: 4.83,
    reviewCount: 266,
    tag: "Nightlife",
    imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "exp-ouidah-culture-06",
    title: "Ouidah — parcours patrimoine & histoire",
    location: "Ouidah, Bénin",
    city: "Ouidah",
    priceFrom: 16,
    currency: "EUR",
    rating: 4.79,
    reviewCount: 144,
    tag: "Culture",
    imageUrl: "https://images.unsplash.com/photo-1526657782461-9fe13402a841?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "exp-porto-novo-food-07",
    title: "Porto‑Novo — cuisine locale & secrets de chef",
    location: "Porto‑Novo, Bénin",
    city: "Porto‑Novo",
    priceFrom: 22,
    currency: "EUR",
    rating: 4.87,
    reviewCount: 205,
    tag: "Food",
    imageUrl: "https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "exp-dakar-business-08",
    title: "Dakar — business city tour (chauffeur + spots clés)",
    location: "Dakar, Sénégal",
    city: "Dakar",
    priceFrom: 55,
    currency: "EUR",
    rating: 4.81,
    reviewCount: 119,
    tag: "Business",
    imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=80",
  },
];

