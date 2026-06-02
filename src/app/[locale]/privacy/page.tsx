import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Confidentialité — GuestConnect",
  description: "Politique de confidentialité (template) — à adapter.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  const items = isEn
    ? [
        { t: "Data we collect", d: "Account info, booking details, usage analytics (as configured)." },
        { t: "How we use data", d: "To run the service, prevent fraud, improve UX, and support users." },
        { t: "Sharing", d: "Only when needed: hosts, payment providers, compliance." },
        { t: "Your rights", d: "Access, deletion, correction—according to your jurisdiction." },
      ]
    : [
        { t: "Données collectées", d: "Compte, réservations, analytics d’usage (selon configuration)." },
        { t: "Usage des données", d: "Fournir le service, prévenir la fraude, améliorer l’UX, aider les utilisateurs." },
        { t: "Partage", d: "Uniquement si nécessaire : hôtes, prestataires de paiement, conformité." },
        { t: "Vos droits", d: "Accès, suppression, rectification — selon juridiction." },
      ];

  return (
    <MarketingPageLayout
      eyebrow={isEn ? "Legal" : "Légal"}
      title={isEn ? "Privacy policy (template)" : "Politique de confidentialité (template)"}
      description={
        isEn
          ? "A clean, marketplace-style policy structure. Replace with your legal version."
          : "Structure claire type marketplace. À remplacer par votre version juridique."
      }
    >
      <div className="grid gap-4">
        {items.map((i) => (
          <Card key={i.t} className="p-6">
            <p className="text-sm font-semibold text-black">{i.t}</p>
            <p className="mt-2 text-sm leading-7 text-zinc-600">{i.d}</p>
          </Card>
        ))}
        <p className="text-xs text-zinc-500">
          {isEn
            ? "Note: This is a product template, not legal advice."
            : "Note : ceci est un template produit, pas un conseil juridique."}
        </p>
      </div>
    </MarketingPageLayout>
  );
}
