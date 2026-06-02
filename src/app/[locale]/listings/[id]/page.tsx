import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { africaListings } from "@/lib/mock/africa-listings";
import { ListingLightbox } from "@/components/gallery/ListingLightbox";
import { getTranslations } from "next-intl/server";
import { BookingCard } from "@/components/listings/detail/BookingCard";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { ReviewForm } from "@/components/reviews/ReviewForm";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { locale, id } = await params;
  const t = await getTranslations("listingPage");

  const listing = africaListings.find((l) => l.id === id);
  if (!listing) notFound();

  const images = listing.images?.length ? listing.images : [listing.imageUrl];

  return (
    <div className="bg-white">
      <Container className="py-10 sm:py-14">
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <Badge>{listing.location}</Badge>
              <h1
                className="mt-4 text-balance text-3xl font-semibold tracking-tight text-black sm:text-4xl"
                title={listing.title}
              >
                {listing.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
                <span className="inline-flex items-center gap-1 font-semibold text-black">
                  <Star className="h-4 w-4" />
                  {listing.rating.toFixed(2)}
                </span>
                <span className="text-zinc-400">•</span>
                <span>{t("reviews", { count: listing.reviewCount })}</span>
                <span className="text-zinc-400">•</span>
                <span>{t("securePayment")}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FavoriteButton locale={locale} listingId={listing.id} />
              <ButtonLink href={`/${locale}/explore`} variant="outline" size="sm">
                {t("back")}
              </ButtonLink>
              <ButtonLink href={`/${locale}/search`} variant="primary" size="sm">
                {t("search")}
              </ButtonLink>
            </div>
          </div>

          {/* Galerie */}
          <ListingLightbox title={listing.title} images={images} />

          {/* Contenu */}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Main */}
            <div className="order-2 lg:order-1 lg:col-span-7">
              <section className="space-y-3">
                <h2 className="text-xl font-semibold tracking-tight text-black">{t("aboutTitle")}</h2>
                <p className="text-sm leading-7 text-zinc-600">{t("aboutBody")}</p>
              </section>

              <section className="mt-10">
                <h2 className="text-xl font-semibold tracking-tight text-black">{t("amenitiesTitle")}</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <Amenity icon={<WifiIcon className="h-5 w-5" />} title={t("amenities.wifi")} />
                  <Amenity icon={<BreakfastIcon className="h-5 w-5" />} title={t("amenities.breakfast")} />
                  <Amenity icon={<ParkingIcon className="h-5 w-5" />} title={t("amenities.parking")} />
                  <Amenity icon={<ShieldIcon className="h-5 w-5" />} title={t("amenities.securePayment")} />
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-xl font-semibold tracking-tight text-black">{t("locationTitle")}</h2>
                <div className="mt-5 rounded-3xl border border-black/10 bg-white p-5 shadow-sm shadow-black/5">
                  <MapPlaceholder location={listing.location} subtitle={t("mapSubtitle")} />
                </div>
              </section>

              <section className="mt-10">
                <ReviewForm />
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

          {/* Avis: pleine largeur container */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-black">{t("reviewsTitle")}</h2>
            <div className="mt-5 rounded-3xl bg-zinc-50 p-6">
              <div className="grid gap-4 lg:grid-cols-2">
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
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm shadow-black/5 hover:bg-zinc-50 transition"
                >
                  {t("loadMoreReviews")}
                </button>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}

function Amenity({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-black">{icon}</div>
      <p className="text-sm font-semibold text-black">{title}</p>
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
          <p className="text-sm font-semibold text-black">{location}</p>
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
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-zinc-100 text-sm font-semibold text-black">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-black" title={name}>
              {name}
            </p>
            <p className="text-xs text-zinc-600">{date}</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1 text-sm font-semibold text-black">
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
