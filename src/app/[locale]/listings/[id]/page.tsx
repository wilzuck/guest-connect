import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { africaListings } from "@/lib/mock/africa-listings";
import { ListingLightbox } from "@/components/gallery/ListingLightbox";
import { getTranslations } from "next-intl/server";

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
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge>{listing.location}</Badge>
              <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-black sm:text-4xl">
                {listing.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
                <span className="inline-flex items-center gap-1 font-medium text-black">
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
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <h2 className="text-xl font-semibold tracking-tight text-black">{t("aboutTitle")}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {t("aboutBody")}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <InfoCard title={t("info.flexTitle")} desc={t("info.flexDesc")} />
                <InfoCard title={t("info.cancelTitle")} desc={t("info.cancelDesc")} />
                <InfoCard title={t("info.locationTitle")} desc={t("info.locationDesc", { location: listing.location })} />
                <InfoCard title={t("info.supportTitle")} desc={t("info.supportDesc")} />
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="sticky top-24 p-6">
                <p className="text-sm text-zinc-600">{t("from")}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-black">
                  {listing.pricePerNight} {listing.currency}
                  <span className="text-sm font-medium text-zinc-500"> {t("perNight")}</span>
                </p>
                <div className="mt-5 grid gap-3">
                  <ButtonLink
                    href={`/${locale}/search`}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    {t("checkAvailability")}
                  </ButtonLink>
                  <ButtonLink
                    href={`/${locale}/favorites`}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    {t("addToFavorites")}
                  </ButtonLink>
                </div>
                <p className="mt-4 text-xs leading-5 text-zinc-500">
                  {t("footerNote")}
                </p>
              </Card>
            </div>
          </div>

          {/* Caractéristiques (en bas de page) */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight text-black">{t("amenitiesTitle")}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Amenity icon={<WifiIcon className="h-5 w-5" />} title={t("amenities.wifi")} />
              <Amenity icon={<BreakfastIcon className="h-5 w-5" />} title={t("amenities.breakfast")} />
              <Amenity icon={<ParkingIcon className="h-5 w-5" />} title={t("amenities.parking")} />
              <Amenity icon={<ShieldIcon className="h-5 w-5" />} title={t("amenities.securePayment")} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function InfoCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white p-5">
      <p className="text-sm font-semibold text-black">{title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{desc}</p>
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
