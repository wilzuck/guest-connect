import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";

export const metadata: Metadata = {
  title: "Carrières — GuestConnect",
  description: "Rejoignez une équipe produit ambitieuse, orientée design et conversion.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  const roles = isEn
    ? [
        { t: "Frontend Engineer (Next.js)", d: "Build fast, premium UI for travelers and hosts." },
        { t: "Product Designer", d: "Craft marketplace flows inspired by Airbnb/Booking." },
        { t: "Growth / SEO", d: "Own acquisition loops and landing page conversion." },
      ]
    : [
        { t: "Ingénieur Frontend (Next.js)", d: "Construire une UI premium et rapide." },
        { t: "Product Designer", d: "Designer des parcours marketplace style Airbnb/Booking." },
        { t: "Growth / SEO", d: "Piloter l’acquisition et la conversion des pages." },
      ];

  return (
    <MarketingPageLayout
      eyebrow={isEn ? "Careers" : "Carrières"}
      title={isEn ? "Build the future of guest houses" : "Construire le futur des maisons d’hôtes"}
      description={
        isEn
          ? "A product-first team, obsessed with clarity, trust, and premium design."
          : "Une équipe produit, obsédée par la clarté, la confiance et le design premium."
      }
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Badge>{isEn ? "How we work" : "Notre façon de travailler"}</Badge>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Card className="p-6">
              <p className="text-sm font-semibold ">{isEn ? "High standards" : "Standards élevés"}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {isEn
                  ? "We ship premium experiences: design, performance, and reliability."
                  : "On livre une expérience premium : design, performance et fiabilité."}
              </p>
            </Card>
            <Card className="p-6">
              <p className="text-sm font-semibold ">{isEn ? "Ownership" : "Ownership"}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {isEn
                  ? "Small team, big impact. You own outcomes, not just tasks."
                  : "Petite équipe, gros impact. On possède des résultats, pas des tâches."}
              </p>
            </Card>
            <Card className="p-6">
              <p className="text-sm font-semibold ">{isEn ? "Remote-friendly" : "Remote-friendly"}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {isEn
                  ? "Async by default, documentation-driven, clean processes."
                  : "Async par défaut, doc-first, process propres."}
              </p>
            </Card>
            <Card className="p-6">
              <p className="text-sm font-semibold ">{isEn ? "Customer empathy" : "Empathie client"}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {isEn
                  ? "We design for real trips, real hosts, real constraints."
                  : "On design pour de vrais voyages, de vrais hôtes, de vraies contraintes."}
              </p>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-5">
          <Card className="p-6">
            <p className="text-sm font-semibold ">{isEn ? "Open roles" : "Postes ouverts"}</p>
            <div className="mt-4 grid gap-3">
              {roles.map((r) => (
                <div key={r.t} className="rounded-2xl border border-black/10 bg-white p-4">
                  <p className="text-sm font-semibold ">{r.t}</p>
                  <p className="mt-1 text-sm text-zinc-600">{r.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <ButtonLink href={`/${locale}/contact`} variant="primary" size="lg" className="w-full">
                {isEn ? "Contact us" : "Nous contacter"}
              </ButtonLink>
              <p className="mt-3 text-xs text-zinc-500">
                {isEn
                  ? "Send your portfolio or LinkedIn — we reply quickly."
                  : "Envoie ton portfolio ou LinkedIn — on répond vite."}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </MarketingPageLayout>
  );
}
