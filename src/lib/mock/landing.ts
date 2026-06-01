import type { Listing } from "@/types/listing";
import { africaListings } from "@/lib/mock/africa-listings";

export const listingPreviewMock: Listing[] = africaListings.slice(0, 6);

export const partnerLogos = ["Nomadly", "StayWise", "HorizonPay", "VoyageCo", "HostPro"];

export const testimonials = [
  {
    name: "Sofia M.",
    role: "Voyageuse",
    quote:
      "GuestConnect rend la recherche de maisons d’hôtes vraiment simple : tout est vérifié, rapide et présenté avec soin.",
  },
  {
    name: "James R.",
    role: "Hôte",
    quote:
      "Le dashboard hôte est moderne et vraiment utile. Je gère mes tarifs, mes disponibilités et mes messages sans friction.",
  },
  {
    name: "Amina K.",
    role: "Voyageuse",
    quote:
      "Les paiements sécurisés et les avis transparents m’ont mise en confiance. La réservation est plus fluide que sur la plupart des grandes plateformes.",
  },
  {
    name: "Lucas D.",
    role: "Voyageur",
    quote:
      "J’ai trouvé une maison d’hôtes incroyable en 2 minutes. L’interface est claire et la recherche est super efficace.",
  },
  {
    name: "Chloé P.",
    role: "Voyageuse",
    quote:
      "On sent le côté premium : photos, infos, avis… tout est lisible. Ça donne envie de réserver.",
  },
  {
    name: "Nadia S.",
    role: "Hôte",
    quote:
      "Le processus d’ajout d’établissement est simple et on se sent accompagné. Très pro.",
  },
  {
    name: "Thomas B.",
    role: "Voyageur",
    quote:
      "J’adore le look éditorial et l’espace. Ça change des plateformes trop chargées.",
  },
  {
    name: "Eva L.",
    role: "Voyageuse",
    quote:
      "Les filtres et la sélection sont pertinents. J’ai réservé en confiance et tout s’est déroulé parfaitement.",
  },
];

export const pricingPlans = [
  {
    name: "Basique",
    price: "0 €",
    description: "Parfait pour démarrer.",
    features: ["Explorer des annonces vérifiées", "Paiement sécurisé", "Support par email"],
    cta: "Commencer",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "19 €",
    description: "Pour les voyageurs réguliers & petits hôtes.",
    features: ["Support prioritaire", "Recherches sauvegardées", "Outils hôtes (starter)"],
    cta: "Passer Pro",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "49 €",
    description: "Pour les hôtes qui se développent.",
    features: [
      "Dashboard hôte avancé",
      "Paiements automatisés",
      "Détection fraude",
      "Onboarding dédié",
    ],
    cta: "Démarrer Premium",
    highlighted: false,
  },
];
