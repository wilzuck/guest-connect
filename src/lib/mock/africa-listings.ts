import type { Listing } from "@/types/listing";

export type ListingInterest =
  | "Bord de mer"
  | "Centre-ville"
  | "Patrimoine & culture"
  | "Nature"
  | "Business";

export type ListingWithMeta = Listing & {
  city: string;
  country: string;
  interests: ListingInterest[];
  images?: string[];
};

export const africaListings: ListingWithMeta[] = [
  // Bénin
  {
    id: "ben-cotonou-marina-01",
    title: "Maison d’hôtes Marina Cotonou",
    location: "Cotonou, Bénin",
    city: "Cotonou",
    country: "Bénin",
    pricePerNight: 48,
    currency: "EUR",
    rating: 4.86,
    reviewCount: 212,
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2000&q=80",
    ],
    interests: ["Centre-ville", "Business"],
  },
  {
    id: "ben-cotonou-haie-vive-02",
    title: "Villa Haie Vive — calme & design",
    location: "Cotonou, Bénin",
    city: "Cotonou",
    country: "Bénin",
    pricePerNight: 62,
    currency: "EUR",
    rating: 4.92,
    reviewCount: 148,
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80",
    ],
    interests: ["Centre-ville", "Business"],
  },
  {
    id: "ben-grand-popo-eco-03",
    title: "Eco Lodge Grand-Popo",
    location: "Grand-Popo, Bénin",
    city: "Grand-Popo",
    country: "Bénin",
    pricePerNight: 54,
    currency: "EUR",
    rating: 4.81,
    reviewCount: 97,
    imageUrl:
      "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=2000&q=80",
    ],
    interests: ["Bord de mer", "Nature"],
  },
  {
    id: "ben-ouidah-heritage-04",
    title: "Maison d’hôtes Ouidah Heritage",
    location: "Ouidah, Bénin",
    city: "Ouidah",
    country: "Bénin",
    pricePerNight: 46,
    currency: "EUR",
    rating: 4.74,
    reviewCount: 131,
    imageUrl:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80",
    ],
    interests: ["Patrimoine & culture", "Centre-ville"],
  },
  {
    id: "ben-porto-novo-art-05",
    title: "Maison d’hôtes Porto-Novo — art & patio",
    location: "Porto-Novo, Bénin",
    city: "Porto-Novo",
    country: "Bénin",
    pricePerNight: 44,
    currency: "EUR",
    rating: 4.77,
    reviewCount: 88,
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2000&q=80",
    ],
    interests: ["Patrimoine & culture", "Centre-ville"],
  },
  {
    id: "ben-abomey-palace-06",
    title: "Abomey — séjour patrimoine",
    location: "Abomey, Bénin",
    city: "Abomey",
    country: "Bénin",
    pricePerNight: 38,
    currency: "EUR",
    rating: 4.69,
    reviewCount: 63,
    imageUrl:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=2000&q=80",
    ],
    interests: ["Patrimoine & culture", "Nature"],
  },

  // Afrique (quelques destinations fortes)
  {
    id: "sen-dakar-plateau-07",
    title: "Dakar — studio premium Plateau",
    location: "Dakar, Sénégal",
    city: "Dakar",
    country: "Sénégal",
    pricePerNight: 72,
    currency: "EUR",
    rating: 4.88,
    reviewCount: 201,
    imageUrl:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=2000&q=80",
    ],
    interests: ["Centre-ville", "Business"],
  },
  {
    id: "mar-marrakech-riad-08",
    title: "Riad Noor — cœur de la médina",
    location: "Marrakech, Maroc",
    city: "Marrakech",
    country: "Maroc",
    pricePerNight: 79,
    currency: "EUR",
    rating: 4.91,
    reviewCount: 356,
    imageUrl:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
    ],
    interests: ["Patrimoine & culture", "Centre-ville"],
  },
  {
    id: "tan-zanzibar-beach-09",
    title: "Zanzibar — bungalow bord de mer",
    location: "Zanzibar, Tanzanie",
    city: "Zanzibar",
    country: "Tanzanie",
    pricePerNight: 95,
    currency: "EUR",
    rating: 4.84,
    reviewCount: 189,
    imageUrl:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80",
    ],
    interests: ["Bord de mer", "Nature"],
  },
  {
    id: "rsa-cape-town-views-10",
    title: "Cape Town — vue & design",
    location: "Le Cap, Afrique du Sud",
    city: "Le Cap",
    country: "Afrique du Sud",
    pricePerNight: 110,
    currency: "EUR",
    rating: 4.9,
    reviewCount: 244,
    imageUrl:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=2000&q=80",
    ],
    interests: ["Centre-ville", "Nature"],
  },
  {
    id: "tgo-lome-plage-11",
    title: "Lomé — villa bord de plage",
    location: "Lomé, Togo",
    city: "Lomé",
    country: "Togo",
    pricePerNight: 58,
    currency: "EUR",
    rating: 4.81,
    reviewCount: 167,
    imageUrl:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2000&q=80",
    ],
    interests: ["Bord de mer", "Centre-ville"],
  }
];

export const interestSections: Array<{
  title: string;
  description: string;
  interest: ListingInterest;
}> = [
  {
    title: "Bord de mer",
    description: "Pour se réveiller au son des vagues et finir la journée au coucher du soleil.",
    interest: "Bord de mer",
  },
  {
    title: "Centre-ville",
    description: "Tout à pied : marchés, restaurants, quartiers vivants et adresses incontournables.",
    interest: "Centre-ville",
  },
  {
    title: "Patrimoine & culture",
    description: "Maisons d’hôtes au plus près de l’histoire, de l’artisanat et des lieux emblématiques.",
    interest: "Patrimoine & culture",
  },
  {
    title: "Nature",
    description: "Éco-lodges, jardins, calme — pour respirer et ralentir.",
    interest: "Nature",
  }
];

export function listingsByInterest(interest: ListingInterest) {
  return africaListings.filter((l) => l.interests.includes(interest));
}
