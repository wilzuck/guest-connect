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
        { t: "Bookings", d: "Confirmation, changes, cancellations.", icon: <BookingsIcon /> },
        { t: "Payments", d: "Cards, refunds, invoices.", icon: <PaymentsIcon /> },
        { t: "Safety", d: "Reporting, trust and safety.", icon: <SafetyIcon /> },
        { t: "Hosting", d: "Listing, pricing, rules.", icon: <HostingIcon /> },
      ]
    : [
        { t: "Réservations", d: "Confirmation, modifications, annulations.", icon: <BookingsIcon /> },
        { t: "Paiements", d: "Cartes, remboursements, factures.", icon: <PaymentsIcon /> },
        { t: "Sécurité", d: "Signalement, confiance et sécurité.", icon: <SafetyIcon /> },
        { t: "Héberger", d: "Annonce, tarifs, règles.", icon: <HostingIcon /> },
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
          <Card key={c.t} className="p-6 shadow-none">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-black/10 bg-white">
              {c.icon}
            </div>
            <p className="mt-4 text-sm font-semibold text-black">{c.t}</p>
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

function BookingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 7h10M7 12h10M7 17h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PaymentsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 8h18v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SafetyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2l7 5v7c0 4.418-3.134 7.418-7 8-3.866-.582-7-3.582-7-8V7l7-5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.7 12.4 11 14.7l4.3-4.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HostingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10.5 12 4l8 6.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9.5 22v-7h5v7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
