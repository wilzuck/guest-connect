import Image from "next/image";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function AboutPage() {
  return (
    <MarketingPageLayout
      eyebrow="À propos"
      title="GuestConnect, des maisons d’hôtes vérifiées — sans friction"
      description="Nous aidons les voyageurs à réserver en confiance, et les hôtes à valoriser leurs adresses avec une expérience premium, simple et transparente."
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <Card className="overflow-hidden p-0 shadow-none">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80"
                alt="Salon lumineux d’une maison d’hôtes"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 56vw"
                priority
              />
            </div>
            <div className="p-6">
              <p className="text-sm font-semibold ">Notre mission</p>
              <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                Élever le standard de la maison d’hôtes: des annonces claires, des photos cohérentes, des services
                essentiels, et une communication fiable. Pour le voyageur, c’est moins de stress. Pour l’hôte, c’est
                plus de confiance — donc plus de réservations.
              </p>
            </div>
          </Card>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ValueCard
              title="Vérification pragmatique"
              desc="On préfère les preuves simples (photos récentes, équipements, règles) aux promesses vagues."
            />
            <ValueCard
              title="Expérience mobile d’abord"
              desc="Des pages rapides, lisibles, et des étapes de réservation courtes — surtout sur smartphone."
            />
            <ValueCard
              title="Transparence"
              desc="Conditions, frais et règles affichés clairement. Pas de surprises à l’arrivée."
            />
            <ValueCard
              title="Local & premium"
              desc="Nous mettons en avant les adresses qui valorisent l’accueil, la propreté et la qualité du service."
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <Card className="p-6 shadow-none">
            <p className="text-sm font-semibold ">Ce que vous trouverez sur GuestConnect</p>
            <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Une sélection d’adresses avec un niveau de détails élevé: emplacement, services, et un pitch orienté
              bénéfice. Notre objectif est simple: vous permettre de réserver rapidement, sans devoir “deviner”.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Badge>Maisons d’hôtes</Badge>
              <Badge>Appartements</Badge>
              <Badge>Villas</Badge>
              <Badge>Expériences locales</Badge>
            </div>

            <div className="mt-6 grid gap-4">
              <SideImage
                title="Des photos cohérentes"
                desc="Lumière naturelle, cadrage large, et pièces clairement identifiées."
                src="https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80"
              />
              <SideImage
                title="Des services utiles"
                desc="Transfert, ménage, conciergerie — ce qui réduit la friction du séjour."
                src="https://images.unsplash.com/photo-1551887373-6d1b5c5f809b?auto=format&fit=crop&w=1600&q=80"
              />
            </div>
          </Card>
        </div>
      </div>
    </MarketingPageLayout>
  );
}

function ValueCard({ title, desc }: { title: string; desc: string }) {
  return (
    <Card className="p-6 shadow-none">
      <p className="text-sm font-semibold ">{title}</p>
      <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{desc}</p>
    </Card>
  );
}

function SideImage({ title, desc, src }: { title: string; desc: string; src: string }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
        <Image src={src} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 32vw" />
      </div>
      <div>
        <p className="text-sm font-semibold ">{title}</p>
        <p className="mt-1 text-sm leading-7 text-zinc-600">{desc}</p>
      </div>
    </div>
  );
}

