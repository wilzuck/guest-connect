import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Carrières — GuestConnect",
  description:
    "Rejoignez GuestConnect. Construisez une marketplace premium de maisons d’hôtes avec une équipe produit, remote-friendly.",
};

const culture = [
  {
    title: "Esprit startup",
    description: "Aller vite, livrer avec qualité, apprendre en continu. Ownership sur ce que vous construisez.",
  },
  {
    title: "Remote-friendly",
    description: "Async first. Documentation claire. Collaboration solide sans réunions inutiles.",
  },
  {
    title: "Produit & craft",
    description: "Design éditorial + rigueur SaaS : typographie, UX et performance comptent vraiment.",
  },
];

const roles = [
  {
    title: "Ingénieur Frontend",
    team: "Tech",
    location: "Remote · Europe",
    stack: "React · Next.js · TypeScript",
    description:
      "Construire des interfaces premium et performantes pour voyageurs et hôtes (Next.js App Router).",
  },
  {
    title: "Ingénieur Backend",
    team: "Tech",
    location: "Remote · Europe",
    stack: "Node.js · APIs · PostgreSQL",
    description:
      "Concevoir des APIs scalables et une infra prête pour paiement : recherche, réservations, paiements.",
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "Remote · Flexible",
    stack: "Figma · Design systems",
    description:
      "Concevoir une expérience marketplace premium avec une forte hiérarchie typographique et des parcours orientés conversion.",
  },
];

export default function CareersPage() {
  return (
    <div >
      {/* Hero */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <Container className="py-14 sm:py-18">
          <Badge>GuestConnect · Carrières</Badge>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Rejoignez l’équipe GuestConnect
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            Nous construisons une marketplace premium de maisons d’hôtes — où la confiance,
            l’hospitalité et la qualité produit guident tout.
          </p>
        </Container>
      </section>

      {/* Culture */}
      <section className="bg-zinc-50">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Culture"
            title="Petite équipe, standards élevés"
            description="Remote-friendly, orienté produit, obsédé par la qualité — sans perdre en vitesse."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {culture.map((c) => (
              <Card
                key={c.title}
                className="p-6 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10"
              >
                <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{c.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Roles */}
      <section >
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Postes ouverts"
              title="Construisez un produit que les voyageurs adorent"
              description="Postes fictifs (mock). Remplacez-les par des offres réelles quand vous êtes prêt."
            />
            <a
              href="#apply"
              className="text-sm font-medium text-zinc-600 hover:text-black transition-colors"
            >
              Comment postuler →
            </a>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {roles.map((r) => (
              <Card
                key={r.title}
                className="p-6 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/80">
                      {r.team}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight">
                      {r.title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-zinc-700">
                    {r.location}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-zinc-600">{r.description}</p>

                <div className="mt-5 grid gap-2 text-sm text-zinc-700">
                  <p>
                    <span className="font-medium text-black">Stack :</span> {r.stack}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div id="apply" className="mt-12 rounded-3xl border border-black/10 bg-zinc-50 p-8 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Envoyez votre candidature
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
                  Envoyez votre CV, portfolio ou GitHub à{" "}
                  <span className="font-medium text-black">careers@guestconnect.com</span> et dites-nous
                  ce que vous aimeriez construire.
                </p>
              </div>
              <a href="mailto:careers@guestconnect.com">
                <Button size="lg">Nous écrire</Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
