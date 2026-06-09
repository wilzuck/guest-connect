import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { Card } from "@/components/ui/Card";
import { InfoCard } from "@/components/ui/InfoCard";

export const metadata: Metadata = {
  title: "Cookies — GuestConnect",
  description: "Gestion des cookies et technologies similaires utilisés par GuestConnect.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";
  const cookies = isEn ? enCookies : frCookies;

  return (
    <MarketingPageLayout
      eyebrow={isEn ? "Preferences" : "Préférences"}
      title={isEn ? "Cookie policy" : "Politique relative aux cookies"}
      description={
        isEn
          ? "How GuestConnect uses cookies to keep the platform secure, remember preferences, and improve the booking experience."
          : "Comment GuestConnect utilise les cookies pour sécuriser la plateforme, mémoriser les préférences et améliorer la réservation."
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {cookies.map((cookie) => (
          <InfoCard key={cookie.title} title={cookie.title}>
            <div className="flex items-start justify-between gap-4">
              <span className={cookie.required ? "rounded-full bg-black px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-black" : "rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"}>
                {cookie.required ? (isEn ? "Required" : "Requis") : (isEn ? "Optional" : "Optionnel")}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{cookie.body}</p>
          </InfoCard>
        ))}
      </div>
      <Card className="mt-6 p-6 shadow-none">
        <p className="text-sm font-semibold ">{isEn ? "Managing consent" : "Gestion du consentement"}</p>
        <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
          {isEn
            ? "You can change browser settings at any time. When a consent banner is enabled, your choices can be updated from the footer or account settings."
            : "Vous pouvez modifier les paramètres de votre navigateur à tout moment. Lorsqu'un bandeau de consentement est activé, vos choix peuvent être mis à jour depuis le footer ou les paramètres du compte."}
        </p>
      </Card>
    </MarketingPageLayout>
  );
}

const frCookies = [
  {
    title: "Cookies essentiels",
    required: true,
    body: "Ils permettent la navigation, la sécurité, la session, la langue et l'accès aux zones compte ou dashboard.",
  },
  {
    title: "Préférences",
    required: false,
    body: "Ils mémorisent les choix d'affichage, devise, langue, filtres et préférences utiles à une expérience plus fluide.",
  },
  {
    title: "Mesure d'audience",
    required: false,
    body: "Ils aident à comprendre les parcours, les recherches et les performances des pages afin d'améliorer le service.",
  },
  {
    title: "Marketing et campagnes",
    required: false,
    body: "Ils peuvent mesurer l'efficacité de campagnes ou recommandations, uniquement si ces outils sont activés.",
  },
];

const enCookies = [
  {
    title: "Essential cookies",
    required: true,
    body: "They enable navigation, security, sessions, language, and access to account or dashboard areas.",
  },
  {
    title: "Preferences",
    required: false,
    body: "They remember display choices, currency, language, filters, and useful preferences for a smoother experience.",
  },
  {
    title: "Analytics",
    required: false,
    body: "They help understand journeys, searches, and page performance so the service can be improved.",
  },
  {
    title: "Marketing and campaigns",
    required: false,
    body: "They may measure campaign or recommendation performance, only when such tools are enabled.",
  },
];
