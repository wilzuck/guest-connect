import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Textarea } from "@/components/ui/Textarea";

export const metadata: Metadata = {
  title: "Presse — GuestConnect",
  description:
    "Espace presse & kit média de GuestConnect : annonces, assets de marque, contact et jalons.",
};

const announcements = [
  {
    date: "Mai 2026",
    title: "GuestConnect lance un programme de vérification des établissements",
    excerpt:
      "Un programme orienté confiance pour mettre en avant qualité, cohérence et hospitalité — à grande échelle.",
  },
  {
    date: "Mars 2026",
    title: "Dashboard hôte 1.0 : tarifs, disponibilité, messagerie",
    excerpt:
      "Un centre de contrôle moderne pour les hôtes — conçu avec la clarté et la performance d’un SaaS.",
  },
  {
    date: "Janvier 2026",
    title: "GuestConnect s’étend à plus de 80 pays",
    excerpt:
      "Une marketplace dédiée aux établissements — désormais dans les destinations clés du monde entier.",
  },
];

const milestones = [
  { year: "2024", title: "Idée & recherche", desc: "Validation du besoin : une découverte centrée sur les maisons d’hôtes." },
  { year: "2025", title: "Bêta privée", desc: "Premiers hôtes onboardés, parcours de réservation optimisé pour la conversion." },
  { year: "2026", title: "Lancement public", desc: "Système de marque, programme de vérification et dashboard hôte livrés." },
];

export default function PressPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="border-b border-black/5 bg-white">
        <Container className="py-14 sm:py-18">
          <Badge>GuestConnect · Presse</Badge>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            Presse &amp; Kit média
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            Retrouvez les dernières annonces, les assets de marque et les jalons clés. Tout ce qu’il
            faut pour parler de GuestConnect.
          </p>
        </Container>
      </section>

      {/* Announcements */}
      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Dernières actus"
            title="Annonces"
            description="Articles fictifs — remplacez-les par vos communiqués et liens réels."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {announcements.map((a) => (
              <Card
                key={a.title}
                className="p-6 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  {a.date}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-black">{a.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{a.excerpt}</p>
                <a
                  href="#"
                  className="mt-5 inline-flex text-sm font-medium text-black hover:underline"
                >
                  En savoir plus
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Media resources */}
      <section className="bg-zinc-50">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Ressources média"
            title="Assets de marque"
            description="Placeholders prêts à remplacer par vos fichiers (SVG/PNG) quand disponibles."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Card className="p-6">
              <h3 className="text-lg font-semibold tracking-tight text-black">Logos</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Logo principal, icône, variations clair/sombre.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <AssetChip label="guestconnect-logo.svg" />
                <AssetChip label="guestconnect-icon.svg" />
                <AssetChip label="guestconnect-wordmark.svg" />
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold tracking-tight text-black">Captures produit</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Captures sélectionnées pour vos articles.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <AssetChip label="homepage.png" />
                <AssetChip label="listing-card.png" />
                <AssetChip label="host-dashboard.png" />
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold tracking-tight text-black">Guidelines</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Typographie, système d’espacement et règles d’usage.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <AssetChip label="brand-guidelines.pdf" />
                <AssetChip label="press-factsheet.pdf" />
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Contact presse"
                title="Nous contacter"
                description="Formulaire UI (statique). Branchez-le à votre système d’email quand vous êtes prêt."
              />
              <div className="mt-6 rounded-2xl border border-black/10 bg-zinc-50 p-5">
                <p className="text-sm font-semibold text-black">Email</p>
                <p className="mt-1 text-sm text-zinc-600">press@guestconnect.com</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Card className="p-7 sm:p-8">
                <form className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-black">Nom</span>
                      <Input placeholder="Votre nom" />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-black">Organisation</span>
                      <Input placeholder="Média / Entreprise" />
                    </label>
                  </div>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-black">Email</span>
                    <Input type="email" placeholder="vous@media.com" />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-black">Message</span>
                    <Textarea placeholder="Dites-nous ce dont vous avez besoin : citations, images, données, interviews..." />
                  </label>
                  <Button type="button" size="lg">
                    Envoyer
                  </Button>
                  <p className="text-xs leading-5 text-zinc-500">
                    Note : ce formulaire est statique. Remplacez le bouton par un vrai submit lors de l’intégration.
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="border-t border-black/5 bg-zinc-50">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Timeline"
            title="Jalons"
            description="Une narration simple de l’évolution de GuestConnect (fictif)."
          />

          <div className="mt-10 grid gap-4">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="grid gap-3 rounded-2xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 sm:grid-cols-12 sm:items-center"
              >
                <div className="sm:col-span-2">
                  <p className="text-sm font-semibold text-black">{m.year}</p>
                </div>
                <div className="sm:col-span-10">
                  <p className="text-base font-semibold tracking-tight text-black">{m.title}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

function AssetChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm shadow-black/5 hover:bg-zinc-50 transition-colors">
      {label}
    </span>
  );
}
