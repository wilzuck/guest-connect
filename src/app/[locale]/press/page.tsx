import type { Metadata } from "next";
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
      <div className="grid gap-6 lg:grid-cols-12">
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
