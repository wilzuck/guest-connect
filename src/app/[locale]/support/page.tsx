import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { SearchBar } from "@/components/SearchBar";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { Faq, type FaqItem } from "@/components/ui/Faq";

export const metadata: Metadata = {
  title: "Support — GuestConnect",
  description: "Centre d’aide, FAQ et informations importantes.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  const categories = isEn
    ? [
        { t: "Bookings", d: "Confirmation, changes, cancellations." },
        { t: "Payments", d: "Cards, refunds, invoices." },
        { t: "Safety", d: "Reporting, trust and safety." },
        { t: "Hosting", d: "Listing, pricing, rules." },
      ]
    : [
        { t: "Réservations", d: "Confirmation, modifications, annulations." },
        { t: "Paiements", d: "Cartes, remboursements, factures." },
        { t: "Sécurité", d: "Signalement, confiance et sécurité." },
        { t: "Héberger", d: "Annonce, tarifs, règles." },
      ];

  const faq: FaqItem[] = isEn
    ? [
        {
          q: "How do I cancel a booking?",
          a: "Open the booking details and check the cancellation policy. If eligible, you can cancel directly from your account.",
        },
        {
          q: "When do I get a refund?",
          a: "Refund timing depends on the payment method and the listing cancellation policy. Most refunds appear within a few business days.",
        },
        {
          q: "How do you verify listings?",
          a: "We aim for clarity: host identity, listing information, photos consistency, and baseline safety requirements.",
        },
      ]
    : [
        {
          q: "Comment annuler une réservation ?",
          a: "Ouvre le détail de la réservation et consulte la politique d’annulation. Si éligible, l’annulation se fait depuis ton compte.",
        },
        {
          q: "Sous combien de temps suis‑je remboursé ?",
          a: "Cela dépend du mode de paiement et de la politique du logement. La plupart des remboursements apparaissent sous quelques jours ouvrés.",
        },
        {
          q: "Comment vérifiez‑vous les annonces ?",
          a: "On vise la clarté : identité de l’hôte, informations de l’annonce, cohérence des photos et exigences de sécurité de base.",
        },
      ];

  return (
    <MarketingPageLayout
      eyebrow={isEn ? "Support" : "Support"}
      title={isEn ? "Help center" : "Centre d’aide"}
      description={
        isEn
          ? "Search, browse categories, and find quick answers—like modern travel marketplaces."
          : "Rechercher, parcourir les catégories, obtenir des réponses rapides — comme sur les meilleurs sites de voyage."
      }
    >
      <div className="max-w-4xl">
        <SearchBar />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <Card key={c.t} className="p-6">
            <p className="text-sm font-semibold text-black">{c.t}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{c.d}</p>
          </Card>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-sm font-semibold text-black">{isEn ? "Top questions" : "Questions fréquentes"}</p>
          <Faq items={faq} className="mt-4" />
        </div>
        <div className="lg:col-span-5">
          <Card className="p-6">
            <p className="text-sm font-semibold text-black">{isEn ? "Need more help?" : "Besoin d’aide ?"}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              {isEn
                ? "Contact our team and include your booking ID if relevant."
                : "Contacte notre équipe et ajoute ton identifiant de réservation si besoin."}
            </p>
            <div className="mt-4 grid gap-2">
              <Link
                href={`/${locale}/contact`}
                className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-zinc-50 transition"
              >
                {isEn ? "Contact support" : "Contacter le support"} →
              </Link>
              <Link
                href={`/${locale}/safety`}
                className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-zinc-50 transition"
              >
                {isEn ? "Trust & safety" : "Confiance & sécurité"} →
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </MarketingPageLayout>
  );
}
