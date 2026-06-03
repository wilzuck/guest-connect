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
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

