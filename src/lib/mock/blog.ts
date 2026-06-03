export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  coverImage: string;
  tags: string[];
  content: string[]; // paragraphes
};

export const blogPosts: BlogPost[] = [
  {
    slug: "comment-reconnaitre-une-maison-dhotes-vraiment-premium",
    title: "Comment reconnaître une maison d’hôtes vraiment premium",
    excerpt:
      "Derrière une belle photo, il y a des signaux simples: propreté, literie, accueil, et transparence des conditions. Voici nos repères concrets.",
    date: "2026-05-18",
    readingTime: "6 min",
    coverImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    tags: ["Conseils", "Qualité", "Séjour"],
    content: [
      "Une annonce premium ne se résume pas à une décoration “instagrammable”. Ce qui fait la différence, ce sont des fondamentaux: une literie impeccable, une salle de bain fonctionnelle, et une communication claire avant l’arrivée.",
      "Regardez les détails: photos cohérentes (même style de lumière), description précise des pièces, et conditions de séjour faciles à comprendre (horaires, caution, annulation). Un hôte sérieux préfère la transparence aux promesses vagues.",
      "Enfin, les petits plus comptent: un check-in fluide, un wifi fiable, et des recommandations locales personnalisées. Ce sont ces éléments qui transforment un séjour “correct” en expérience mémorable.",
    ],
  },
  {
    slug: "les-5-services-qui-font-vraiment-la-difference",
    title: "Les 5 services qui font vraiment la différence (et pourquoi)",
    excerpt:
      "Transfert, ménage, petit-déjeuner… Oui, mais pas seulement. On vous partage les services qui augmentent la satisfaction et les avis 5★.",
    date: "2026-05-02",
    readingTime: "5 min",
    coverImage:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=80",
    tags: ["Hôtes", "Services", "Expérience"],
    content: [
      "Le service le plus rentable n’est pas forcément le plus coûteux. Un transfert aéroport bien organisé réduit le stress d’arrivée, surtout de nuit, et évite le premier “mauvais moment”.",
      "Un ménage régulier (avec standards visibles) protège la note globale. C’est souvent le point le plus sensible dans les commentaires: ce qui est “ok” pour un hôte peut sembler insuffisant pour un voyageur exigeant.",
      "Ajoutez un vrai plus: un chef à domicile, un panier d’accueil local, ou une conciergerie WhatsApp. Ces attentions génèrent des avis détaillés, donc plus de confiance pour les futurs voyageurs.",
    ],
  },
  {
    slug: "itineraire-week-end-a-dakar",
    title: "Un week-end à Dakar: itinéraire simple, efficace, local",
    excerpt:
      "Deux jours, zéro stress: quartiers, restos, coucher de soleil, et les bonnes pratiques pour se déplacer en toute sérénité.",
    date: "2026-04-11",
    readingTime: "7 min",
    coverImage:
      "https://images.unsplash.com/photo-1542317854-ec13b5a58783?auto=format&fit=crop&w=1600&q=80",
    tags: ["Destinations", "Dakar", "Guide"],
    content: [
      "Jour 1: commencez par une balade douce, puis un déjeuner simple dans une adresse qui travaille des produits frais. L’objectif: prendre le rythme de la ville sans vouloir tout faire.",
      "En fin d’après-midi, réservez votre moment “coucher de soleil” — c’est le meilleur repère pour organiser la journée. Préparez un plan B: un café avec vue ou une promenade au bord de l’eau.",
      "Jour 2: privilégiez une expérience guidée (culture, artisanat, gastronomie). En petit groupe, vous gagnez du temps, vous évitez les pièges touristiques et vous repartez avec des recommandations fiables.",
    ],
  },
  {
    slug: "photo-annonce-3-erreurs-frequentes",
    title: "Photo d’annonce: les 3 erreurs les plus fréquentes",
    excerpt:
      "Des photos trop sombres, trop “grand angle”, ou incohérentes. Voici comment corriger rapidement et rendre votre annonce plus crédible.",
    date: "2026-03-24",
    readingTime: "4 min",
    coverImage:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80",
    tags: ["Hôtes", "Photos", "Conversion"],
    content: [
      "Erreur #1: la lumière. Une photo sombre est interprétée comme un manque de propreté ou d’entretien. Photographiez en journée, rideaux ouverts, sans lumière artificielle “jaune”.",
      "Erreur #2: le grand angle excessif. Oui, la pièce paraît plus grande, mais la confiance baisse. Préférez un grand angle léger, et montrez un repère (table, lit, canapé) pour donner l’échelle.",
      "Erreur #3: l’incohérence. Mélanger des styles de photos (couleurs, qualité, cadrage) donne une impression d’annonce “recomposée”. Restez sur une même ambiance et une même qualité.",
    ],
  },
  {
    slug: "cotonou-artisanat-atelier-marche",
    title: "Cotonou: atelier + marché, l’artisanat sans perdre de temps",
    excerpt:
      "Un parcours simple: atelier le matin, marché l’après-midi. Les bonnes questions à poser, quoi acheter, et comment repartir avec du beau — sans se faire avoir.",
    date: "2026-03-10",
    readingTime: "6 min",
    coverImage:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1600&q=80",
    tags: ["Cotonou", "Culture", "Artisanat"],
    content: [
      "Pour vivre l’artisanat de Cotonou, la règle #1 est de choisir un atelier où l’on voit la main du créateur. On comprend le temps de fabrication, on voit les matériaux, et on apprend à reconnaître la qualité.",
      "Ensuite, le marché: allez-y avec une idée claire (2–3 achats maximum) et un budget. Prenez le temps de comparer, mais restez respectueux — la négociation fait partie du jeu, sans être agressive.",
      "Enfin, pensez au transport: privilégiez les objets faciles à protéger. Un sac solide, du papier bulle, et vous rentrez avec une pièce durable, pas un souvenir cassé.",
    ],
  },
  {
    slug: "check-in-sans-stress-5-etapes",
    title: "Check‑in sans stress: 5 étapes qui rassurent un voyageur",
    excerpt:
      "Un bon check‑in, c’est 80% de la satisfaction. Voici un flow simple (messages, repères, timing) qui réduit les avis négatifs.",
    date: "2026-02-28",
    readingTime: "5 min",
    coverImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    tags: ["Hôtes", "Accueil", "Process"],
    content: [
      "Étape 1: envoyez un message J‑1 avec l’adresse exacte, le repère visuel et l’heure recommandée d’arrivée.",
      "Étape 2: proposez un point de contact unique (WhatsApp ou téléphone) et annoncez un temps de réponse réaliste.",
      "Étape 3: préparez le logement comme si vous étiez le premier client de la journée: lumière, odeur neutre, surfaces propres.",
    ],
  },
  {
    slug: "annulation-politique-simple",
    title: "Politique d’annulation: simple, lisible, et pro",
    excerpt:
      "Une politique trop complexe crée des frictions. Voici 3 modèles clairs et leurs impacts sur la conversion.",
    date: "2026-02-14",
    readingTime: "4 min",
    coverImage:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
    tags: ["Conversion", "Confiance", "Conditions"],
    content: [
      "Les voyageurs premium achètent la tranquillité. Une règle lisible vaut mieux qu’un paragraphe juridique.",
      "Modèle 1: annulation gratuite jusqu’à J‑3. Modèle 2: 50% jusqu’à J‑7. Modèle 3: non remboursable avec -10%.",
      "Choisissez un modèle et appliquez‑le partout: annonce, confirmation, messages. La cohérence augmente la confiance.",
    ],
  },
  {
    slug: "wifi-et-espace-travail",
    title: "Wifi + espace de travail: l’upgrade le plus rentable",
    excerpt:
      "Télétravail, appels, upload… Un wifi fiable et un coin bureau propre valent parfois plus qu’une piscine.",
    date: "2026-01-30",
    readingTime: "5 min",
    coverImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    tags: ["Hôtes", "Business", "Qualité"],
    content: [
      "Le wifi est devenu un “must”. Indiquez la vitesse réelle (test) et où se situe le routeur.",
      "Un coin bureau simple: chaise confortable, prise accessible, bonne lumière. Ça suffit pour convertir une partie du trafic pro.",
      "Ajoutez une photo dédiée: c’est un signal fort pour les voyageurs qui comparent vite.",
    ],
  },
  {
    slug: "photos-lumiere-naturelle",
    title: "Lumière naturelle: le hack photo le plus simple",
    excerpt:
      "Pas besoin d’un shooting coûteux: horaire, angle, et cohérence. Voici une méthode pour améliorer tes photos en 30 minutes.",
    date: "2026-01-18",
    readingTime: "4 min",
    coverImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    tags: ["Photos", "Hôtes", "Conversion"],
    content: [
      "Photographie entre 9h et 11h ou 15h et 17h: lumière douce, peu d’ombres dures.",
      "Coupe les lumières “jaunes” et privilégie une balance des blancs cohérente.",
      "Répète la même logique dans toutes les pièces: c’est ce qui donne un rendu premium.",
    ],
  },
  {
    slug: "services-qui-justifient-le-prix",
    title: "Les services qui justifient vraiment un prix plus élevé",
    excerpt:
      "La valeur perçue se construit. On te montre comment associer 2–3 services pour monter en gamme sans complexité.",
    date: "2025-12-22",
    readingTime: "6 min",
    coverImage:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1600&q=80",
    tags: ["Tarification", "Services", "Expérience"],
    content: [
      "Ne liste pas 15 services. Choisis 3 qui se voient et se vivent: accueil, propreté, confort.",
      "Le pack gagnant: transfert + panier d’accueil + conciergerie réactive.",
      "Annonce clairement les conditions: ce qui est inclus, ce qui est en option. Zéro surprise = meilleurs avis.",
    ],
  },
  {
    slug: "leboncoin-vs-airbnb-attentes",
    title: "Leboncoin vs Airbnb: comprendre les attentes (et éviter les malentendus)",
    excerpt:
      "Même logement, deux publics. Comment adapter ton annonce et tes messages pour viser le bon niveau d’exigence.",
    date: "2025-12-05",
    readingTime: "7 min",
    coverImage:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80",
    tags: ["Positionnement", "Confiance", "Messages"],
    content: [
      "Sur un public “deal”, le prix prime. Sur un public “premium”, la clarté prime.",
      "Adapte le ton: professionnel, précis, sans exagération. Les voyageurs premium détectent vite le marketing creux.",
      "Sois cohérent: photos, description, règles. Chaque incohérence coûte une réservation.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
