import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Conditions d'utilisation — GuestConnect",
  description: "Conditions d'utilisation de GuestConnect pour voyageurs, hôtes et prestataires.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  const sections = isEn ? enSections : frSections;

  return (
    <MarketingPageLayout
      eyebrow={isEn ? "Legal" : "Légal"}
      title={isEn ? "Terms of service" : "Conditions d'utilisation"}
      description={
        isEn
          ? "Clear rules for booking stays, offering services, hosting guests, and using GuestConnect with confidence."
          : "Les règles essentielles pour réserver, proposer un service, accueillir des voyageurs et utiliser GuestConnect en confiance."
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="p-6 shadow-none lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          <p className="text-sm font-semibold ">{isEn ? "Contents" : "Sommaire"}</p>
          <nav className="mt-4 grid gap-2 text-sm">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="text-zinc-600 transition hover:text-black">
                {section.title}
              </a>
            ))}
          </nav>
          <div className="mt-6 rounded-2xl bg-zinc-50 p-4 text-xs leading-5 text-zinc-500">
            {isEn
              ? "These terms are written for production use, but should be reviewed by your legal advisor before launch."
              : "Ces conditions sont prêtes côté produit, mais doivent être validées par votre conseil juridique avant mise en ligne."}
          </div>
        </Card>

        <div className="grid gap-4 lg:col-span-8">
          {sections.map((section) => (
            <Card key={section.id} className="p-6 shadow-none">
              <h2 id={section.id} className="text-lg font-semibold tracking-tight">
                {section.title}
              </h2>
              <div className="mt-4 grid gap-3">
                {section.items.map((item) => (
                  <p key={item} className="text-sm leading-7 text-zinc-600">
                    {item}
                  </p>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MarketingPageLayout>
  );
}

const frSections = [
  {
    id: "account",
    title: "Compte et accès",
    items: [
      "GuestConnect permet aux voyageurs de rechercher des hébergements, expériences et services locaux, et aux hôtes ou prestataires de publier des offres vérifiées.",
      "Vous êtes responsable des informations fournies dans votre compte, de la confidentialité de vos accès et de l'utilisation faite depuis votre espace.",
    ],
  },
  {
    id: "bookings",
    title: "Réservations et échanges",
    items: [
      "Les informations clés d'une annonce doivent être visibles avant réservation : prix, localisation, équipements, disponibilité, règles de séjour et conditions de paiement.",
      "Les échanges entre voyageurs, hôtes et prestataires doivent rester courtois, utiles et liés à la réservation ou au service demandé.",
    ],
  },
  {
    id: "hosts",
    title: "Hôtes et prestataires",
    items: [
      "Les hôtes s'engagent à publier des descriptions exactes, des photos représentatives et des disponibilités tenues à jour.",
      "Les prestataires de services doivent indiquer clairement leur périmètre, leur prix de départ, leurs délais et les conditions d'intervention.",
    ],
  },
  {
    id: "payments",
    title: "Paiements, prix et annulations",
    items: [
      "Les prix affichés peuvent varier selon les dates, la devise, les frais applicables ou les promotions configurées.",
      "Les conditions d'annulation et de remboursement doivent être consultées avant paiement. Certaines réservations peuvent être non remboursables selon l'offre choisie.",
    ],
  },
  {
    id: "trust",
    title: "Confiance, avis et contenu",
    items: [
      "Les avis doivent refléter une expérience réelle. Les contenus trompeurs, offensants ou artificiellement manipulés peuvent être retirés.",
      "GuestConnect peut modérer, suspendre ou retirer une annonce lorsqu'elle présente un risque, une information incohérente ou une violation manifeste des règles.",
    ],
  },
];

const enSections = [
  {
    id: "account",
    title: "Account and access",
    items: [
      "GuestConnect helps guests discover stays, experiences, and local services, and allows hosts or providers to publish verified offers.",
      "You are responsible for the information in your account, the confidentiality of your credentials, and actions made from your space.",
    ],
  },
  {
    id: "bookings",
    title: "Bookings and communication",
    items: [
      "Key listing information must be available before booking: price, location, amenities, availability, stay rules, and payment conditions.",
      "Messages between guests, hosts, and providers must remain respectful, useful, and related to the booking or requested service.",
    ],
  },
  {
    id: "hosts",
    title: "Hosts and providers",
    items: [
      "Hosts commit to accurate descriptions, representative photos, and up-to-date availability.",
      "Service providers must clearly state their scope, starting price, timing, and intervention conditions.",
    ],
  },
  {
    id: "payments",
    title: "Payments, prices, and cancellations",
    items: [
      "Displayed prices may vary depending on dates, currency, applicable fees, or configured promotions.",
      "Cancellation and refund conditions should be reviewed before payment. Some bookings may be non-refundable depending on the selected offer.",
    ],
  },
  {
    id: "trust",
    title: "Trust, reviews, and content",
    items: [
      "Reviews must reflect a real experience. Misleading, offensive, or artificially manipulated content may be removed.",
      "GuestConnect may moderate, suspend, or remove a listing when it presents a risk, inconsistent information, or a clear policy violation.",
    ],
  },
];
