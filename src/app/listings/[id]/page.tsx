import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { africaListings } from "@/lib/mock/africa-listings";
import { ShieldCheck } from "lucide-react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ListingPage({ params }: PageProps) {
  const { id } = await params;
  const locale = await getLocale();

  const listing = africaListings.find((l) => l.id === id);
  if (!listing) notFound();

  const images = listing.images?.length ? listing.images : [listing.imageUrl];

  return (
    <div >
      <Container className="py-10 sm:py-14">
        mlkklkklkl
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge>{listing.location}</Badge>
              <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {listing.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
                <span className="inline-flex items-center gap-1 font-medium text-black">
                  <Star className="h-4 w-4" />
                  {listing.rating.toFixed(2)}
                </span>
                <span className="text-zinc-400">•</span>
                <span>{listing.reviewCount} avis</span>
                <span className="text-zinc-400">•</span>
                <span>Paiement sécurisé</span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <ButtonLink href={`/${locale}/stays`} variant="outline" size="sm">
                Retour
              </ButtonLink>
              <ButtonLink href={`/${locale}/search`} variant="primary" size="sm">
                Rechercher
              </ButtonLink>
            </div>
          </div>

          {/* Galerie */}
          <div className="grid gap-3 lg:grid-cols-12">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-black/10 bg-zinc-100 shadow-sm shadow-black/5 lg:col-span-8">
              <Image
                src={images[0]}
                alt={`${listing.title} — photo principale`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
              {images.slice(1, 3).map((src, idx) => (
                <div
                  key={src}
                  className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-black/10 bg-zinc-100 shadow-sm shadow-black/5"
                >
                  <Image
                    src={src}
                    alt={`${listing.title} — photo ${idx + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Contenu */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <h2 className="text-xl font-semibold tracking-tight">
                À propos 
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                Un séjour premium, sélectionné pour sa qualité d’accueil et sa clarté d’informations.
                Cette page est une base “Airbnb/Booking-like” : branchez-la ensuite à votre backend
                (photos, disponibilités, conditions, etc.).
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <InfoCard title="Arrivée flexible" desc="Check-in facilité (selon disponibilité)." />
                <InfoCard title="Annulation claire" desc="Conditions affichées avant paiement." />
                <InfoCard title="Emplacement" desc={`Quartier recommandé à ${listing.location}.`} />
                <InfoCard title="Support" desc="Assistance 24/7 (voyageurs & hôtes)." />
              </div>
            </div>
            <div className="lg:col-span-4">
              <Card className="sticky top-24 p-6">
                <p className="text-sm text-zinc-600">À partir de</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {listing.pricePerNight} {listing.currency}
                  <span className="text-sm font-medium text-zinc-500"> / nuit</span>
                </p>
                <div className="mt-5 grid gap-3">
                  <ButtonLink href={`/${locale}/search`} variant="primary" size="lg" className="w-full">
                    Vérifier les disponibilités
                  </ButtonLink>
                  <ButtonLink href={`/${locale}/favorites`} variant="outline" size="lg" className="w-full">
                    Ajouter aux favoris
                  </ButtonLink>
                </div>
                <p className="mt-4 text-xs flex gap-1.5 leading-5 text-zinc-500">
                 <ShieldCheck  /> Paiement sécurisé · Confirmation instantanée · Sans frais cachés
                </p>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function InfoCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm shadow-black/5">
      <p className="text-sm font-semibold ">{title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{desc}</p>
    </div>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.7 1.2 6.6L12 17.9 6.1 20.8l1.2-6.6-4.8-4.7 6.6-.9L12 2.5Z" />
    </svg>
  );
}
