import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Entreprise — GuestConnect",
  description:
    "Découvrez la mission, l’histoire et les valeurs de GuestConnect — marketplace premium de maisons d’hôtes.",
};

const values = [
  {
    title: "Confiance",
    description:
      "Séjours vérifiés, avis transparents et politiques claires pour réserver sereinement.",
  },
  {
    title: "Hospitalité",
    description:
      "Les maisons d’hôtes sont personnelles par nature — notre produit préserve cette chaleur à grande échelle.",
  },
  {
    title: "Simplicité",
    description:
      "Une simplicité à la Airbnb avec la rigueur d’un SaaS : moins d’étapes, plus de clarté, meilleure conversion.",
  },
  {
    title: "Accès mondial",
    description:
      "Nous aidons les meilleurs établissements à être découverts par les bons voyageurs, partout.",
  },
];

const impact = [
  { value: "12 000+", label: "Hôtes" },
  { value: "240 000+", label: "Voyageurs" },
  { value: "80+", label: "Pays" },
  { value: "4,9/5", label: "Note moyenne" },
];

export default function CompanyPage() {
  return (
    <div >
      {/* Hero */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <Container className="py-14 sm:py-18">
          <Badge>GuestConnect · Entreprise</Badge>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Pensé pour les maisons d’hôtes. Conçu pour la confiance.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            GuestConnect est une marketplace premium qui connecte les voyageurs aux propriétaires
            de maisons d’hôtes — avec une présentation éditoriale claire, une UX orientée conversion
            et une fiabilité digne des meilleurs SaaS.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#story" variant="primary" size="lg">
              Notre histoire
            </ButtonLink>
            <ButtonLink href="#values" variant="outline" size="lg">
              Nos valeurs
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section id="story" >
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Histoire"
                title="Pourquoi GuestConnect existe"
                description="Les maisons d’hôtes méritent une marketplace premium, simple et dédiée."
              />
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-5 text-base leading-7 text-zinc-600">
                <p>
                  Les meilleures maisons d’hôtes sont souvent noyées dans des plateformes généralistes.
                  Les voyageurs perdent l’authenticité qu’ils recherchent, tandis que les hôtes perdent
                  en visibilité, en contrôle et en temps.
                </p>
                <p>
                  GuestConnect a été créé pour offrir aux maisons d’hôtes un espace dédié : un produit
                  avec des signaux de confiance forts, une présentation éditoriale soignée et un parcours
                  de réservation qui convertit.
                </p>
                <p>
                  Nous nous inspirons de la clarté d’Airbnb, de la structure de Booking et de la qualité
                  produit des SaaS modernes — pour une expérience premium du premier scroll à la confirmation.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section id="values" className="bg-zinc-50">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Valeurs"
            title="Des principes qui guident chaque décision"
            description="Le design est la surface ; la confiance et l’hospitalité sont la fondation."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card
                key={v.title}
                className="p-6 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10"
              >
                <h3 className="text-lg font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{v.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Impact */}
      <section >
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Impact"
                title="Une marketplace dédiée, à l’échelle mondiale"
                description="Chiffres fictifs pour l’instant — votre backend les rendra réels."
              />
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {impact.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm shadow-black/5"
                  >
                    <p className="text-2xl font-semibold tracking-tight">{s.value}</p>
                    <p className="mt-1 text-xs font-medium text-zinc-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-black/5 bg-zinc-50">
        <Container className="py-16">
          <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm shadow-black/5 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Prêt à rejoindre GuestConnect ?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
                  Que vous voyagiez ou que vous hébergiez, GuestConnect est conçu pour être premium,
                  simple et fiable.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/host" variant="primary" size="lg">
                  Ajouter mon établissement
                </ButtonLink>
                <ButtonLink href="/stays" variant="outline" size="lg">
                  Explorer les annonces
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
