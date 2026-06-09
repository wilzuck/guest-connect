import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { africaListings } from "@/lib/mock/africa-listings";
import { ListingLightbox } from "@/components/gallery/ListingLightbox";
import { getTranslations } from "next-intl/server";
import { BookingCard } from "@/components/listings/detail/BookingCard";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { Armchair, Bath, Building2, CalendarDays, DoorOpen, Leaf, LayoutTemplate, Maximize2, UsersRound } from "lucide-react";
import type { ReactNode } from "react";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { locale, id } = await params;
  const t = await getTranslations("listingPage");

  const listing = africaListings.find((l) => l.id === id);
  if (!listing) notFound();

  const images = listing.images?.length ? listing.images : [listing.imageUrl];
  const floorPlanImages = listing.floorPlanImages?.length ? listing.floorPlanImages : buildFloorPlanImages(listing.id);
  const host = buildHost(listing.id);
  const characteristics = buildCharacteristics(listing);
  const openDays = listing.pricePerNight > 90 ? "7j/7" : "5 jours/semaine";

  return (
    <div >
      <Container className="py-5 sm:py-8">
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <Badge>{listing.location}</Badge>
              <h1
                className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
                title={listing.title}
              >
                {listing.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
                <span className="inline-flex items-center gap-1 font-semibold ">
                  <Star className="h-4 w-4" />
                  {listing.rating.toFixed(2)}
                </span>
                <span className="text-zinc-400">•</span>
                <span>{t("reviews", { count: listing.reviewCount })}</span>
                <span className="text-zinc-400">•</span>
                <span>{t("securePayment")}</span>
              </div>
            </div>

            {/* Action: favoris (en haut à droite) */}
            <div className="flex items-center justify-end gap-2">
              <Link 
                href={`/${locale}/stays`}
                className="rounded-2xl  bg-white px-4 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-black"
              >
                ← Retour aux hébergements
              </Link>
              <FavoriteButton listingId={listing.id} locale={locale} />
            </div>
          </div>

          {/* Galerie */}
          <ListingLightbox title={listing.title} images={images} floorPlanImages={floorPlanImages} />

          {/* Contenu */}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Main */}
            <div className="order-2 lg:order-1 lg:col-span-7">
              <section className="space-y-3">
                <h2 className="text-xl font-semibold tracking-tight">{t("aboutTitle")}</h2>
                <p className="text-sm leading-7 text-zinc-600">
                  {listing.shortDescription ?? t("aboutBody")}
                </p>
              </section>

              <section className="mt-10 border-y border-black/10 py-10 dark:border-black/10">
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  Caractéristiques
                </h2>
                <div className="mt-8 grid gap-x-12 gap-y-7 sm:grid-cols-2">
                  {characteristics.map((item) => (
                    <CharacteristicItem key={item.label} icon={item.icon} label={item.label} />
                  ))}
                </div>
              </section>

              <FloorPlansSection images={floorPlanImages} title={listing.title} />

              <section className="mt-10">
                <h2 className="text-xl font-semibold tracking-tight">{t("amenitiesTitle")}</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <Amenity icon={<WifiIcon className="h-5 w-5" />} title={t("amenities.wifi")} />
                  <Amenity icon={<BreakfastIcon className="h-5 w-5" />} title={t("amenities.breakfast")} />
                  <Amenity icon={<ParkingIcon className="h-5 w-5" />} title={t("amenities.parking")} />
                  <Amenity icon={<ShieldIcon className="h-5 w-5" />} title={t("amenities.securePayment")} />
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-xl font-semibold tracking-tight">{t("locationTitle")}</h2>
                <div className="mt-5 rounded-3xl border border-black/10 bg-white p-3 shadow-sm shadow-black/5">
                  <MapPlaceholder location={listing.location} subtitle={t("mapSubtitle")} />
                </div>
              </section>

              <section className="mt-10">
                <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm shadow-black/5">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-black text-base font-semibold text-white">
                        {host.initials}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold tracking-tight">
                          Hébergé par {host.name}
                        </h2>
                        <p className="mt-1 text-sm text-zinc-600">
                          {host.role} · répond généralement en {host.responseTime}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge>{host.rating} ★ hôte</Badge>
                          <Badge>{host.years} ans sur GuestConnect</Badge>
                          <Badge>Identité vérifiée</Badge>
                        </div>
                      </div>
                    </div>
                    <ButtonLink
                      href={`/${locale}/messages?listing=${encodeURIComponent(listing.id)}&host=${encodeURIComponent(host.name)}`}
                      variant="primary"
                      size="md"
                      className="rounded-2xl"
                    >
                      Discuter avec l&apos;hôte
                    </ButtonLink>
                  </div>
                  <div className="mt-5 grid gap-3 border-t border-black/10 pt-5 sm:grid-cols-3">
                    <InfoTile label="Disponibilité" value={openDays} compact />
                    <InfoTile label="Arrivée" value="À partir de 15:00" compact />
                    <InfoTile label="Validation" value="Annonce vérifiée" compact />
                  </div>
                </div>
              </section>
            </div>

            {/* Booking */}
            <div className="order-1 lg:order-2 lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <BookingCard
                  locale={locale}
                  listingId={listing.id}
                  pricePerNight={listing.pricePerNight}
                  currency={listing.currency}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Avis: fond plein largeur (comme Features), contenu aligné sur Container */}
      <section className="bg-zinc-50 py-10">
        <Container>
          <h2 className="text-xl font-semibold tracking-tight">{t("reviewsTitle")}</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <ReviewCard
              rating={listing.rating}
              name={t("reviewsSection.one.name")}
              date={t("reviewsSection.one.date")}
              body={t("reviewsSection.one.body")}
            />
            <ReviewCard
              rating={listing.rating}
              name={t("reviewsSection.two.name")}
              date={t("reviewsSection.two.date")}
              body={t("reviewsSection.two.body")}
            />
            <ReviewCard
              rating={listing.rating}
              name={t("reviewsSection.three.name")}
              date={t("reviewsSection.three.date")}
              body={t("reviewsSection.three.body")}
            />
          </div>

          <div className="mt-8">
            <Button type="button" variant="secondary" size="md" className="rounded-2xl px-6">
              <PlusIcon className="h-4 w-4" />
              {t("loadMoreReviews")}
            </Button>
          </div>
          <section className="mt-10">
            <ReviewForm />
          </section>
        </Container>
      </section>
    </div>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function buildHost(id: string) {
  const hosts = [
    { name: "Awa K.", role: "Hôte premium", responseTime: "1 heure", rating: "4.9", years: 3 },
    { name: "Moussa D.", role: "Gestionnaire local", responseTime: "2 heures", rating: "4.8", years: 2 },
    { name: "Nadia S.", role: "Super hôte", responseTime: "30 min", rating: "5.0", years: 4 },
  ];
  const host = hosts[id.length % hosts.length];
  return {
    ...host,
    initials: host.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .replace(".", ""),
  };
}

function buildSpecs(listing: { title: string; propertyType?: string; pricePerNight: number }) {
  const text = `${listing.title} ${listing.propertyType ?? ""}`.toLowerCase();
  const isVilla = text.includes("villa") || listing.pricePerNight > 80;
  const isStudio = text.includes("studio");

  return [
    { label: "Type", value: listing.propertyType ?? (isVilla ? "Villa" : isStudio ? "Studio" : "Appartement") },
    { label: "Chambres", value: isStudio ? "1 chambre" : isVilla ? "3 chambres" : "2 chambres" },
    { label: "Salles de bain", value: isVilla ? "2 salles de bain" : "1 salle de bain" },
    { label: "Voyageurs", value: isVilla ? "6 voyageurs" : isStudio ? "2 voyageurs" : "4 voyageurs" },
    { label: "Surface", value: isVilla ? "120 m²" : isStudio ? "38 m²" : "72 m²" },
    { label: "Séjour minimum", value: listing.pricePerNight > 90 ? "2 nuits" : "1 nuit" },
  ];
}

function buildCharacteristics(listing: { title: string; propertyType?: string; pricePerNight: number }) {
  const text = `${listing.title} ${listing.propertyType ?? ""}`.toLowerCase();
  const isVilla = text.includes("villa") || listing.pricePerNight > 80;
  const isStudio = text.includes("studio");

  return [
    { label: "disponible à partir du 15/06/2026", icon: <CalendarDays className="h-8 w-8" /> },
    { label: isVilla ? "Ascenseur disponible" : "Pas d'ascenseur", icon: <Building2 className="h-8 w-8" /> },
    { label: isVilla ? "Terrasse et jardin" : "Terrasse", icon: <TerraceIcon /> },
    { label: "Calme", icon: <Leaf className="h-8 w-8" /> },
    { label: "Meublé", icon: <Armchair className="h-8 w-8" /> },
    { label: isVilla ? "2 salles de bain" : "1 salle de bain", icon: <Bath className="h-8 w-8" /> },
    { label: isStudio ? "Idéal solo ou couple" : "Colocation possible", icon: <UsersRound className="h-8 w-8" /> },
    { label: "Entrée séparée", icon: <DoorOpen className="h-8 w-8" /> },
  ];
}

function buildFloorPlanImages(seed: string) {
  const plan = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760">
      <rect width="1200" height="760" fill="#fff"/>
      <g fill="#f2f2f2" stroke="#111" stroke-width="12">
        <rect x="70" y="70" width="520" height="360"/>
        <rect x="590" y="70" width="250" height="230"/>
        <rect x="840" y="70" width="290" height="230"/>
        <rect x="590" y="300" width="210" height="180"/>
        <rect x="800" y="300" width="330" height="180"/>
        <rect x="70" y="430" width="520" height="250"/>
        <rect x="590" y="480" width="250" height="200"/>
        <rect x="840" y="480" width="290" height="200"/>
      </g>
      <g fill="#444" font-family="Arial, sans-serif" font-size="36" font-weight="700">
        <text x="250" y="250">Sejour</text>
        <text x="670" y="190">Cuisine</text>
        <text x="925" y="190">Chambre</text>
        <text x="645" y="405">SdB</text>
        <text x="900" y="405">Chambre</text>
        <text x="255" y="565">Terrasse</text>
        <text x="655" y="590">Entree</text>
        <text x="925" y="590">Bureau</text>
      </g>
      <g fill="none" stroke="#999" stroke-width="5">
        <path d="M590 260q-70 0-70 70"/>
        <path d="M840 235q-65 0-65 65"/>
        <path d="M800 430q-70 0-70 70"/>
      </g>
      <text x="70" y="730" fill="#777" font-family="Arial, sans-serif" font-size="24">Plan indicatif - ${seed}</text>
    </svg>
  `;
  return [`data:image/svg+xml;charset=utf-8,${encodeURIComponent(plan)}`];
}

function CharacteristicItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-6 text-zinc-800 dark:text-white">
      <span className="grid h-12 w-12 shrink-0 place-items-center text-zinc-800 dark:text-white">
        {icon}
      </span>
      <span className="text-2xl font-medium leading-tight tracking-tight">{label}</span>
    </div>
  );
}

function FloorPlansSection({ images, title }: { images: string[]; title: string }) {
  if (images.length === 0) return null;
  return (
    <section className="mt-10 border-b border-black/10 pb-10 dark:border-black/10">
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">Plans du bien</h2>
      <div className="mt-6 overflow-hidden rounded-3xl border border-black/10 bg-white dark:bg-zinc-950">
        <div
          className="relative aspect-[16/9] bg-white bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${images[0]}")` }}
          role="img"
          aria-label={`Plan du bien ${title}`}
        >
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
            <LayoutTemplate className="h-4 w-4" aria-hidden="true" />
            Plans du bien
          </div>
          <button
            type="button"
            className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-lg shadow-black/10"
            aria-label="Agrandir le plan"
          >
            <Maximize2 className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="absolute bottom-4 right-4 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
            1 / {images.length}
          </div>
        </div>
      </div>
    </section>
  );
}

function TerraceIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20V9a8 8 0 0 1 16 0v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M2.5 20h19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 20v-7h10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 12h14M12 3v17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function InfoTile({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className={compact ? "rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-900" : "rounded-2xl border border-black/5 bg-white p-4 dark:border-zinc-800 dark:bg-black/10"}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">{label}</p>
      <p className="mt-1 text-sm font-semibold ">{value}</p>
    </div>
  );
}

function Amenity({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 dark:border-zinc-800 dark:bg-black/10 shadow-none">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-50 text-black">{icon}</div>
      <p className="text-sm font-semibold ">{title}</p>
    </div>
  );
}

function MapPlaceholder({ location, subtitle }: { location: string; subtitle: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(0,0,0,0.06),transparent_45%),radial-gradient(circle_at_40%_80%,rgba(0,0,0,0.08),transparent_42%)]" />
      <div className="relative grid min-h-[220px] place-items-center p-6">
        <div className="grid place-items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-sm shadow-black/10">
            <PinIcon className="h-6 w-6 text-black" />
          </div>
          <p className="text-sm font-semibold ">{location}</p>
          <p className="text-xs text-zinc-600">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ rating, name, date, body }: { rating: number; name: string; date: string; body: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-none">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-zinc-100 text-sm font-semibold ">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold " title={name}>
              {name}
            </p>
            <p className="text-xs text-zinc-600">{date}</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1 text-sm font-semibold ">
          <Star className="h-4 w-4" />
          {rating.toFixed(1)}
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-zinc-700">{body}</p>
    </div>
  );
}

function WifiIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.5 9.5A15 15 0 0 1 12 6.5a15 15 0 0 1 9.5 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5.5 13a10.8 10.8 0 0 1 6.5-2.2c2.4 0 4.7.8 6.5 2.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8.7 16.4A6.2 6.2 0 0 1 12 15.5c1.2 0 2.4.3 3.3.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M12 19.5h0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BreakfastIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3v7a5 5 0 0 0 10 0V3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M6 21h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 21v-4h6v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ParkingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 4h6a4 4 0 0 1 0 8H7V4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M7 12v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2l7 5v7c0 4.418-3.134 7.418-7 8-3.866-.582-7-3.582-7-8V7l7-5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 12.5 11 14.5l4-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.7 1.2 6.6L12 17.9 6.1 20.8l1.2-6.6-4.8-4.7 6.6-.9L12 2.5Z" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-6.2 7-12A7 7 0 1 0 5 10c0 5.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}
