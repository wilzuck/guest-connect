import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Conditions — GuestConnect",
  description: "Conditions d’utilisation (exemple) — à adapter par votre conseil juridique.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  const sections = isEn
    ? [
        { id: "overview", t: "Overview", d: "These terms govern your use of GuestConnect." },
        { id: "bookings", t: "Bookings", d: "How reservations, cancellations and changes work." },
        { id: "payments", t: "Payments", d: "Payment processing, refunds and fees." },
        { id: "content", t: "Content & reviews", d: "User content rules and review integrity." },
        { id: "liability", t: "Liability", d: "Limitations and responsibilities (example)." },
      ]
    : [
        { id: "overview", t: "Aperçu", d: "Ces conditions encadrent l’utilisation de GuestConnect." },
        { id: "bookings", t: "Réservations", d: "Réservations, annulations et modifications." },
        { id: "payments", t: "Paiements", d: "Paiement, remboursements et frais." },
        { id: "content", t: "Contenus & avis", d: "Règles de contenu et intégrité des avis." },
        { id: "liability", t: "Responsabilité", d: "Limites et responsabilités (exemple)." },
      ];

  return (
    <MarketingPageLayout
      eyebrow={isEn ? "Legal" : "Légal"}
      title={isEn ? "Terms of service (template)" : "Conditions d’utilisation (template)"}
      description={
        isEn
          ? "This is a product-ready template inspired by travel marketplaces. Replace with your legal version."
          : "Template inspiré des marketplaces de voyage. À remplacer par votre version juridique."
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="p-6 lg:col-span-4">
          <p className="text-sm font-semibold text-black">{isEn ? "Table of contents" : "Sommaire"}</p>
          <ul className="mt-3 grid gap-2 text-sm text-zinc-600">
            {sections.map((s) => (
              <li key={s.id}>
                <a className="hover:text-black" href={`#${s.id}`}>
                  {s.t}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-zinc-500">
            {isEn
              ? "Not legal advice."
              : "Ceci n’est pas un conseil juridique."}
          </p>
        </Card>

        <div className="lg:col-span-8">
          <div className="grid gap-4">
            {sections.map((s) => (
              <Card key={s.id} className="p-6">
                <h2 id={s.id} className="text-base font-semibold text-black">
                  {s.t}
                </h2>
                <p className="mt-2 text-sm leading-7 text-zinc-600">{s.d}</p>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  {isEn
                    ? "Add your jurisdiction, policies, dispute resolution, and compliance requirements here."
                    : "Ajoutez ici votre juridiction, vos politiques, vos règles de litige et exigences de conformité."}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MarketingPageLayout>
  );
}
