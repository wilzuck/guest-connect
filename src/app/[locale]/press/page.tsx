import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";

export const metadata: Metadata = {
  title: "Presse — GuestConnect",
  description: "Ressources presse, informations et demandes médias.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  const posts = isEn
    ? [
        {
          slug: "why-curation-matters",
          title: "Why curation matters for guest houses",
          date: "May 2026",
          excerpt: "Trust, clarity and consistent visuals are the fastest way to improve conversion.",
        },
        {
          slug: "photos-that-sell",
          title: "Photos that sell: a simple checklist",
          date: "May 2026",
          excerpt: "From hero shots to bathrooms: how to avoid mismatched expectations.",
        },
        {
          slug: "pricing-basics",
          title: "Pricing basics for small hospitality businesses",
          date: "Apr 2026",
          excerpt: "Seasonality, minimum stays and rate rules—without losing simplicity.",
        },
        {
          slug: "guest-communication",
          title: "Guest communication that feels premium",
          date: "Apr 2026",
          excerpt: "Templates, response times and the small details that build confidence.",
        },
        {
          slug: "safety-transparency",
          title: "Safety & transparency: what guests look for",
          date: "Mar 2026",
          excerpt: "Clear policies, verified info and frictionless support for peace of mind.",
        },
        {
          slug: "mobile-first-booking",
          title: "Mobile-first booking UX: 5 quick wins",
          date: "Mar 2026",
          excerpt: "Reduce steps, keep labels clear, and make date picking delightful.",
        },
        {
          slug: "host-onboarding",
          title: "Host onboarding: how to keep it fast",
          date: "Feb 2026",
          excerpt: "The minimal set of info needed to publish a high-quality listing.",
        },
        {
          slug: "brand-guidelines",
          title: "Brand guidelines: consistent, modern, readable",
          date: "Feb 2026",
          excerpt: "Typography, spacing and UI patterns for a premium travel marketplace.",
        },
      ]
    : [
        {
          slug: "pourquoi-la-curation-compte",
          title: "Pourquoi la curation change tout pour les maisons d’hôtes",
          date: "Mai 2026",
          excerpt: "Confiance, clarté et visuels cohérents : le trio qui améliore la conversion.",
        },
        {
          slug: "photos-qui-vendent",
          title: "Photos qui vendent : une checklist simple",
          date: "Mai 2026",
          excerpt: "De la photo principale aux salles de bain : évitez les mauvaises surprises.",
        },
        {
          slug: "bases-tarification",
          title: "Les bases de la tarification (sans complexité)",
          date: "Avril 2026",
          excerpt: "Saisonnalité, séjour minimum et règles de prix — sans perdre en simplicité.",
        },
        {
          slug: "communication-voyageurs",
          title: "Communication voyageurs : une expérience premium",
          date: "Avril 2026",
          excerpt: "Templates, délais de réponse et détails qui rassurent avant réservation.",
        },
        {
          slug: "securite-transparence",
          title: "Sécurité & transparence : ce que les voyageurs attendent",
          date: "Mars 2026",
          excerpt: "Politiques claires, infos vérifiées et support fluide pour réserver serein.",
        },
        {
          slug: "ux-mobile",
          title: "UX mobile : 5 optimisations rapides",
          date: "Mars 2026",
          excerpt: "Moins d’étapes, des labels clairs, et un calendrier agréable à utiliser.",
        },
        {
          slug: "onboarding-hote",
          title: "Onboarding hôte : comment aller vite (sans sacrifier la qualité)",
          date: "Fév 2026",
          excerpt: "Le minimum d’infos nécessaires pour publier une annonce premium.",
        },
        {
          slug: "guidelines-ui",
          title: "Guidelines UI : moderne, cohérent, lisible",
          date: "Fév 2026",
          excerpt: "Typo, espacements et patterns pour une marketplace voyage premium.",
        },
      ];

  return (
    <MarketingPageLayout
      eyebrow={isEn ? "Press" : "Presse"}
      title={isEn ? "Press & media" : "Presse & médias"}
      description={
        isEn
          ? "Find our story, product highlights, and brand resources."
          : "Retrouvez notre histoire, les points forts du produit et des ressources de marque."
      }
    >
      {/* Articles (liste) */}
      <div>
        <p className="text-sm font-semibold text-black">{isEn ? "Latest articles" : "Derniers articles"}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/${locale}/press?post=${encodeURIComponent(p.slug)}`} className="block">
              <Card className="p-6 shadow-none transition hover:bg-zinc-50">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{p.date}</p>
                <p className="mt-2 text-base font-semibold tracking-tight text-black">{p.title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{p.excerpt}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 mt-10">
        <div className="lg:col-span-7">
          <Card className="p-6">
            <p className="text-sm font-semibold text-black">{isEn ? "About GuestConnect" : "À propos de GuestConnect"}</p>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              {isEn
                ? "GuestConnect is a premium marketplace for guest houses across Benin and Africa—focused on trust, clear listings and a modern booking experience."
                : "GuestConnect est une marketplace premium de maisons d’hôtes au Bénin et en Afrique, centrée sur la confiance, la clarté des annonces et une expérience de réservation moderne."}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Info k={isEn ? "Category" : "Catégorie"} v={isEn ? "Travel marketplace" : "Marketplace voyage"} />
              <Info k={isEn ? "Focus" : "Focus"} v={isEn ? "Guest houses" : "Maisons d’hôtes"} />
              <Info k={isEn ? "Regions" : "Régions"} v={isEn ? "Benin & Africa" : "Bénin & Afrique"} />
              <Info k={isEn ? "Product" : "Produit"} v={isEn ? "Web (Next.js)" : "Web (Next.js)"} />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <Card className="p-6">
            <p className="text-sm font-semibold text-black">{isEn ? "Media contact" : "Contact média"}</p>
            <p className="mt-2 text-sm text-zinc-600">
              {isEn ? "For interviews and press requests:" : "Pour interviews et demandes presse :"}
            </p>
            <div className="mt-4 grid gap-3">
              <ButtonLink href={`/${locale}/contact`} variant="primary" size="lg" className="w-full">
                {isEn ? "Request a press kit" : "Demander un press kit"}
              </ButtonLink>
              <ButtonLink href={`/${locale}/company`} variant="outline" size="lg" className="w-full">
                {isEn ? "Company page" : "Page entreprise"}
              </ButtonLink>
            </div>
            <p className="mt-4 text-xs leading-5 text-zinc-500">
              {isEn
                ? "Brand assets and screenshots are available on request."
                : "Les assets de marque et captures sont disponibles sur demande."}
            </p>
          </Card>
        </div>
      </div>
    </MarketingPageLayout>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{k}</p>
      <p className="mt-1 text-sm font-semibold text-black">{v}</p>
    </div>
  );
}
