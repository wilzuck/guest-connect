import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Politique de confidentialité — GuestConnect",
  description: "Comment GuestConnect collecte, utilise et protège les données des voyageurs, hôtes et prestataires.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";
  const items = isEn ? enPrivacy : frPrivacy;

  return (
    <MarketingPageLayout
      eyebrow={isEn ? "Privacy" : "Confidentialité"}
      title={isEn ? "Privacy policy" : "Politique de confidentialité"}
      description={
        isEn
          ? "A transparent view of the data we need to operate bookings, messaging, trust, and support."
          : "Une vision claire des données nécessaires aux réservations, messages, contrôles de confiance et au support."
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <Card key={item.title} className="p-6 shadow-none">
            <p className="text-base font-semibold ">{item.title}</p>
            <p className="mt-3 text-sm leading-7 text-zinc-600">{item.body}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-6 p-6 shadow-none">
        <p className="text-sm font-semibold ">{isEn ? "Contact" : "Contact"}</p>
        <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
          {isEn
            ? "For access, correction, export, or deletion requests, contact GuestConnect support from your account or the support page."
            : "Pour toute demande d'accès, correction, export ou suppression, contactez le support GuestConnect depuis votre compte ou la page d'aide."}
        </p>
      </Card>
    </MarketingPageLayout>
  );
}

const frPrivacy = [
  {
    title: "Données de compte",
    body: "Nous collectons les informations nécessaires à l'identification du compte : nom, email, téléphone si fourni, langue, préférences et paramètres de sécurité.",
  },
  {
    title: "Réservations et conversations",
    body: "Les informations liées aux séjours, demandes, messages et services sont utilisées pour confirmer les réservations, faciliter l'accueil et résoudre les litiges.",
  },
  {
    title: "Paiements et conformité",
    body: "Les données de paiement peuvent être traitées par des prestataires spécialisés. GuestConnect conserve uniquement les informations nécessaires au suivi, à la facturation et à la prévention de la fraude.",
  },
  {
    title: "Amélioration du service",
    body: "Des mesures d'audience et d'usage peuvent aider à améliorer la vitesse, la recherche, les filtres, la qualité des annonces et l'expérience mobile.",
  },
  {
    title: "Partage maîtrisé",
    body: "Nous partageons les données uniquement lorsque c'est nécessaire : hôte, prestataire, support, paiement, obligation légale ou sécurité de la plateforme.",
  },
  {
    title: "Sécurité et conservation",
    body: "Les données sont conservées pendant la durée nécessaire au service, aux obligations légales et à la résolution des réclamations, avec des mesures de protection adaptées.",
  },
];

const enPrivacy = [
  {
    title: "Account data",
    body: "We collect information required to identify your account: name, email, phone if provided, language, preferences, and security settings.",
  },
  {
    title: "Bookings and conversations",
    body: "Stay details, requests, messages, and service information are used to confirm bookings, support arrivals, and resolve disputes.",
  },
  {
    title: "Payments and compliance",
    body: "Payment data may be processed by specialized providers. GuestConnect keeps only what is needed for tracking, invoicing, and fraud prevention.",
  },
  {
    title: "Service improvement",
    body: "Usage and performance measurements may help improve speed, search, filters, listing quality, and the mobile experience.",
  },
  {
    title: "Controlled sharing",
    body: "We share data only when needed: host, provider, support, payment, legal obligation, or platform safety.",
  },
  {
    title: "Security and retention",
    body: "Data is kept only as long as needed for the service, legal obligations, and claims resolution, with appropriate protection measures.",
  },
];
