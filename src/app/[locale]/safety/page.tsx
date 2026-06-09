import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { Faq, type FaqItem } from "@/components/ui/Faq";

export const metadata: Metadata = {
  title: "Sécurité — GuestConnect",
  description: "Confiance et sécurité pour les voyageurs et les hôtes.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  const pillars = isEn
    ? [
        { t: "Verified information", d: "Clear listings, consistent photos, accurate details." },
        { t: "Secure payments", d: "A payment experience designed for international travelers." },
        { t: "Clear policies", d: "Cancellation and house rules shown before booking." },
        { t: "Support", d: "Fast help when something goes wrong." },
      ]
    : [
        { t: "Infos vérifiées", d: "Annonces claires, photos cohérentes, détails fiables." },
        { t: "Paiements sécurisés", d: "Expérience de paiement pensée pour l’international." },
        { t: "Politiques claires", d: "Annulation et règles visibles avant de réserver." },
        { t: "Support", d: "Aide rapide en cas de problème." },
      ];

  const faq: FaqItem[] = isEn
    ? [
        {
          q: "How do I report an issue?",
          a: "Use the Contact page and include your booking ID, dates, and screenshots if possible.",
        },
        {
          q: "Are reviews moderated?",
          a: "We aim for integrity: we reduce spam and encourage reviews tied to real stays when possible.",
        },
      ]
    : [
        {
          q: "Comment signaler un problème ?",
          a: "Utilise la page Contact et ajoute l’ID de réservation, les dates et des captures si possible.",
        },
        {
          q: "Les avis sont-ils modérés ?",
          a: "On vise l’intégrité : réduction du spam et encouragement des avis liés à de vrais séjours lorsque possible.",
        },
      ];

  return (
    <MarketingPageLayout
      eyebrow={isEn ? "Trust & safety" : "Confiance & sécurité"}
      title={isEn ? "Travel with confidence" : "Voyagez en confiance"}
      description={
        isEn
          ? "Inspired by modern marketplaces: clear rules, reliable information, and support."
          : "Inspiré des marketplaces modernes : règles claires, infos fiables et support."
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p) => (
          <Card key={p.t} className="p-6">
            <p className="text-sm font-semibold ">{p.t}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{p.d}</p>
          </Card>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-sm font-semibold ">{isEn ? "FAQ" : "FAQ"}</p>
          <Faq items={faq} className="mt-4" />
        </div>
        <div className="lg:col-span-5">
          <Card className="p-6">
            <p className="text-sm font-semibold ">{isEn ? "Need help now?" : "Besoin d’aide ?"}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              {isEn
                ? "If something feels wrong, contact us. We prioritize safety-related requests."
                : "Si quelque chose ne va pas, contacte-nous. Les demandes sécurité sont prioritaires."}
            </p>
            <div className="mt-4 grid gap-2">
              <Link
                href={`/${locale}/contact`}
                className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold  hover:bg-zinc-50 transition"
              >
                {isEn ? "Contact support" : "Contacter le support"} →
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </MarketingPageLayout>
  );
}
