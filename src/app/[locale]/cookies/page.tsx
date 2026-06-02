import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Cookies — GuestConnect",
  description: "Informations cookies (template) — à adapter.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  const cookies = isEn
    ? [
        { t: "Essential", d: "Required to run the site (sessions, security)." },
        { t: "Performance", d: "Measure usage to improve speed and UX." },
        { t: "Functional", d: "Remember preferences (language, theme)." },
        { t: "Marketing", d: "Optional: help measure campaigns (if enabled)." },
      ]
    : [
        { t: "Essentiels", d: "Nécessaires au fonctionnement (session, sécurité)." },
        { t: "Performance", d: "Mesurer l’usage pour améliorer vitesse et UX." },
        { t: "Fonctionnels", d: "Mémoriser préférences (langue, thème)." },
        { t: "Marketing", d: "Optionnels : mesurer campagnes (si activé)." },
      ];

  return (
    <MarketingPageLayout
      eyebrow={isEn ? "Legal" : "Légal"}
      title={isEn ? "Cookies (template)" : "Cookies (template)"}
      description={
        isEn
          ? "A simple structure inspired by modern travel sites. Replace with your consent manager if needed."
          : "Structure simple inspirée des sites de voyage modernes. À relier à votre gestion du consentement si besoin."
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {cookies.map((c) => (
          <Card key={c.t} className="p-6">
            <p className="text-sm font-semibold text-black">{c.t}</p>
            <p className="mt-2 text-sm leading-7 text-zinc-600">{c.d}</p>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-xs text-zinc-500">
        {isEn
          ? "Note: This is a UI template."
          : "Note : ceci est un template UI."}
      </p>
    </MarketingPageLayout>
  );
}
