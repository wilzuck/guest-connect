import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { Camera, Gamepad2, Gift, Leaf, Music, Scissors, Sparkles, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import servicesData from "../../../../../data/services.json";

type ServiceItem = {
  id: string;
  title: string;
  category: string;
  location: string;
  priceFrom: number;
  currency: "EUR" | "USD" | "XOF";
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
};

const categoryLabels: Record<string, { label: string; icon: typeof Camera }> = {
  photography: { label: "Photographie", icon: Camera },
  tailoring: { label: "Couture", icon: Scissors },
  repair: { label: "Réparation", icon: Wrench },
  play: { label: "Lieux de jeux", icon: Gamepad2 },
  entertainment: { label: "Distraction", icon: Music },
  cleaning: { label: "Ménage", icon: Sparkles },
  hospitality: { label: "Accueil", icon: Gift },
  garden: { label: "Extérieur", icon: Leaf },
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const locale = await getLocale();
  const { id } = await params;
  const service = (servicesData as ServiceItem[]).find((item) => item.id === id);
  if (!service) notFound();

  const meta = categoryLabels[service.category] ?? categoryLabels.hospitality;
  const Icon = meta.icon;

  return (
    <div className="bg-white">
      <Container className="py-8 sm:py-12">
        <Link href={`/${locale}/services`} className="text-sm font-semibold text-zinc-600 hover:text-black">
          ← Retour aux services
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-zinc-100">
              <Image src={service.imageUrl} alt={service.title} fill className="object-cover" priority />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-black shadow-sm shadow-black/10">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {meta.label}
              </div>
            </div>

            <section className="mt-8">
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-black sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-3 text-sm font-medium text-zinc-500">{service.location}</p>
              <p className="mt-5 text-base leading-8 text-zinc-600">{service.description}</p>
            </section>

            <section className="mt-8 grid gap-3 sm:grid-cols-3">
              <Info label="Délai conseillé" value="24 à 72h" />
              <Info label="Qualité" value="Prestataire vérifié" />
              <Info label="Support" value="Suivi GuestConnect" />
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:col-span-5">
            <Card className="p-5 shadow-sm shadow-black/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-500">À partir de</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-black">
                    {service.priceFrom} {service.currency}
                  </p>
                </div>
                <p className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-black">
                  ★ {service.rating.toFixed(1)} ({service.reviewCount})
                </p>
              </div>

              <div className="mt-5 grid gap-3 border-t border-black/10 pt-5">
                <Info label="Idéal pour" value="Hôtes, voyageurs, gestionnaires" compact />
                <Info label="Paiement" value="Devis confirmé avant intervention" compact />
                <Info label="Annulation" value="Conditions visibles avant validation" compact />
              </div>

              <ButtonLink
                href={`/${locale}/messages?service=${encodeURIComponent(service.id)}`}
                className="mt-5 w-full rounded-2xl"
              >
                Contacter le prestataire
              </ButtonLink>
            </Card>
          </aside>
        </div>
      </Container>
    </div>
  );
}

function Info({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className={compact ? "rounded-2xl bg-zinc-50 p-3" : "rounded-2xl border border-black/10 bg-white p-4"}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-black">{value}</p>
    </div>
  );
}
