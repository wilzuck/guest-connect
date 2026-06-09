import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";

type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
};

function Icon({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/[0.06] text-black">
      {children}
    </div>
  );
}

function getFeatures(locale: string): Feature[] {
  const base = [
    {
      icon: (
        <Icon>
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
        </Icon>
      ),
    },
    {
      icon: (
        <Icon>
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
        </Icon>
      ),
    },
    {
      icon: (
        <Icon>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 8h18v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M3 10h18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M7 15h4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </Icon>
      ),
    },
    {
      icon: (
        <Icon>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M3.6 9h16.8M3.6 15h16.8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M12 3c2.4 2.6 3.6 5.6 3.6 9S14.4 18.4 12 21c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </Icon>
      ),
    },
    {
      icon: (
        <Icon>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M8 17v-6m4 6V7m4 10v-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </Icon>
      ),
    },
    {
      icon: (
        <Icon>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 22a8 8 0 0 0 8-8V9A8 8 0 1 0 4 9v5a8 8 0 0 0 8 8Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M8 11v3m8-3v3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M9 16c.7.7 1.7 1.1 3 1.1s2.3-.4 3-1.1"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </Icon>
      ),
    },
  ];

  if (locale === "en") {
    return [
      {
        title: "Easy booking",
        description: "A frictionless flow: search, compare, book — done.",
        icon: base[0].icon,
      },
      {
        title: "Verified stays",
        description: "Quality checks and review integrity so you can book with confidence.",
        icon: base[1].icon,
      },
      {
        title: "Secure payments",
        description: "Safe, compliant payments designed for international travel.",
        icon: base[2].icon,
      },
      {
        title: "Global availability",
        description: "Handpicked stays across key destinations — easy to explore.",
        icon: base[3].icon,
      },
      {
        title: "Host dashboard",
        description: "Manage listings, pricing and availability with clarity.",
        icon: base[4].icon,
      },
      {
        title: "24/7 support",
        description: "Fast, human support for travelers and hosts — anytime.",
        icon: base[5].icon,
      },
    ];
  }

  return [
    {
      title: "Réservation simple",
      description: "Un parcours fluide pensé pour convertir : rechercher, comparer, réserver — terminé.",
      icon: base[0].icon,
    },
    {
      title: "Maisons d’hôtes vérifiées",
      description: "Contrôles qualité et intégrité des avis pour réserver en toute confiance.",
      icon: base[1].icon,
    },
    {
      title: "Paiements sécurisés",
      description: "Des paiements sûrs, conformes et pensés pour l’international.",
      icon: base[2].icon,
    },
    {
      title: "Disponibilité mondiale",
      description:
        "Des maisons d’hôtes dans les meilleures destinations — sélectionnées et faciles à explorer.",
      icon: base[3].icon,
    },
    {
      title: "Dashboard hôte",
      description: "Gérez annonces, prix et disponibilité depuis un espace de contrôle élégant.",
      icon: base[4].icon,
    },
    {
      title: "Support 24/7",
      description: "Un support réactif et humain, pour voyageurs comme hôtes — à toute heure.",
      icon: base[5].icon,
    },
  ];
}

export async function FeaturesSection() {
  const locale = await getLocale();
  const features = getFeatures(locale);
  return (
    <section id="features" className="bg-zinc-50">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow={locale === "en" ? "Features" : "Fonctionnalités"}
          title={
            locale === "en"
              ? "Everything you need to book — and to host — beautifully"
              : "Tout ce qu’il faut pour réserver — et pour héberger — avec élégance"
          }
          description={
            locale === "en"
              ? "A premium experience inspired by the best travel marketplaces and modern SaaS design."
              : "Une expérience premium, orientée conversion, inspirée des meilleurs marketplaces et des SaaS modernes."
          }
          className="max-w-xl"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card
              key={f.title}
              className="p-6 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10"
            >
              {f.icon}
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{f.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
