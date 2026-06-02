import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";

export const metadata: Metadata = {
  title: "Entreprise — GuestConnect",
  description: "Notre mission, nos valeurs et notre façon de construire une marketplace premium.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  const values = isEn
    ? [
        { t: "Trust by design", d: "Verified profiles, clear policies, transparent reviews." },
        { t: "Hospitality first", d: "We optimize for comfort, clarity, and care." },
        { t: "Quality over quantity", d: "Curated stays that feel premium—every time." },
        { t: "Built for Africa", d: "Local context, global standards, modern UX." },
      ]
    : [
        { t: "La confiance par design", d: "Profils vérifiés, règles claires, avis transparents." },
        { t: "L’hospitalité avant tout", d: "Confort, clarté et attention à chaque étape." },
        { t: "Qualité > quantité", d: "Sélection premium, cohérente et maîtrisée." },
        { t: "Pensé pour l’Afrique", d: "Contexte local, standards globaux, UX moderne." },
      ];

  return (
    <MarketingPageLayout
      eyebrow={isEn ? "Company" : "Entreprise"}
      title={isEn ? "A premium marketplace for guest houses" : "Une marketplace premium de maisons d’hôtes"}
      description={
        isEn
          ? "Inspired by the best travel marketplaces—built with local expertise and modern product craftsmanship."
          : "Inspiré des meilleurs marketplaces de voyage — avec une exécution moderne et un ancrage local."
      }
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <Badge>{isEn ? "Our mission" : "Notre mission"}</Badge>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            {isEn
              ? "Make it effortless to discover and book trusted guest houses across Benin and Africa—through a clear experience, premium design, and a strong focus on trust."
              : "Rendre la découverte et la réservation de maisons d’hôtes fiables au Bénin et en Afrique simple, claire et premium — grâce à une UX moderne et une obsession pour la confiance."}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <Card key={v.t} className="p-6">
                <p className="text-sm font-semibold text-black">{v.t}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{v.d}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <Card className="p-6">
            <p className="text-sm font-semibold text-black">{isEn ? "What we verify" : "Ce que l’on vérifie"}</p>
            <ul className="mt-3 grid gap-2 text-sm text-zinc-600">
              <li>• {isEn ? "Host identity & contact details" : "Identité de l’hôte & coordonnées"}</li>
              <li>• {isEn ? "Photo accuracy & listing clarity" : "Exactitude des photos & clarté de l’annonce"}</li>
              <li>• {isEn ? "Basic safety requirements" : "Exigences de sécurité de base"}</li>
              <li>• {isEn ? "Policies (cancellation, house rules)" : "Politiques (annulation, règles)"}</li>
            </ul>
            <p className="mt-4 text-xs leading-5 text-zinc-500">
              {isEn
                ? "Verification doesn’t mean “perfect”—it means “clear, honest, and reliable”."
                : "Vérifier ne veut pas dire « parfait » : cela veut dire « clair, honnête et fiable »."}
            </p>
          </Card>
        </div>
      </div>
    </MarketingPageLayout>
  );
}
