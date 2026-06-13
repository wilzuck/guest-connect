import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BackButton } from "@/components/ui/BackButton";
import { RatingBadge } from "@/components/ui/RatingBadge";
import { Avatar } from "@/components/ui/Avatar";
import { africaListings } from "@/lib/mock/africa-listings";
import { ListingImageGallery } from "@/components/gallery/ListingImageGallery";
import { getTranslations } from "next-intl/server";
import { BookingCard } from "@/components/listings/detail/BookingCard";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import type { Review } from "@/components/reviews/ReviewCard";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { locale, id } = await params;
  const t = await getTranslations("listingPage");

  const listing = africaListings.find((l) => l.id === id);
  if (!listing) notFound();

  const images = listing.images?.length ? listing.images : [listing.imageUrl];
  const host = buildHost(listing.id, t);
  const specs = buildSpecs(listing, t);
  const reviews = buildReviews(listing.rating, t);
  const contactHref = `/${locale}/messages?listing=${encodeURIComponent(listing.id)}&host=${encodeURIComponent(host.name)}`;


  return (
    <div className="bg-white text-black dark:bg-black dark:text-white">
      <Container className="py-5 sm:py-8">
        <div className="flex flex-col gap-7">
          <BackButton
            href={`/${locale}/stays`}
            label={t("backToListings")}
            className="-ml-3"
          />

          <header className="relative flex flex-col gap-4 pr-14 sm:flex-row sm:items-start sm:justify-between sm:pr-0">
            <div className="min-w-0">
              <Badge>{listing.location}</Badge>

              <h1
                className="mt-4 max-w-4xl text-balance text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-4xl lg:text-5xl"
                title={listing.title}
              >
                {listing.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <RatingBadge rating={listing.rating} />
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span>{t("reviews", { count: listing.reviewCount })}</span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span>{t("securePayment")}</span>
              </div>
            </div>

            <FavoriteButton
              listingId={listing.id}
              locale={locale}
              className="absolute right-0 top-0 shrink-0 sm:static"
            />
          </header>

          <ListingImageGallery title={listing.title} images={images} />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start xl:gap-14">
            <main className="order-2 space-y-12 lg:order-1">
              <Section title={t("aboutTitle")}>
                <p className="max-w-3xl text-sm leading-7 text-zinc-700 dark:text-zinc-300 sm:text-base sm:leading-8">
                  {listing.shortDescription ?? t("aboutBody")}
                </p>
              </Section>

              <Section title={t("specsTitle")}>
                <div className="mt-5 grid overflow-hidden rounded-[28px] border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-950 sm:grid-cols-2 xl:grid-cols-3">
                  {specs.map((spec, index) => (
                    <InfoTile
                      key={spec.label}
                      label={spec.label}
                      value={spec.value}
                      className={getSpecTileClassName(index)}
                    />
                  ))}
                </div>
              </Section>

              <Section title={t("amenitiesTitle")}>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <Amenity
                    icon={<WifiIcon className="size-5" />}
                    title={t("amenities.wifi")}
                  />
                  <Amenity
                    icon={<BreakfastIcon className="size-5" />}
                    title={t("amenities.breakfast")}
                  />
                  <Amenity
                    icon={<ParkingIcon className="size-5" />}
                    title={t("amenities.parking")}
                  />
                  <Amenity
                    icon={<ShieldIcon className="size-5" />}
                    title={t("amenities.securePayment")}
                  />
                </div>
              </Section>

              <Section title={t("locationTitle")}>
                <div className="rounded-4xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-zinc-950">
                  <MapPlaceholder
                    location={listing.location}
                    subtitle={t("mapSubtitle")}
                  />
                </div>
              </Section>

              <section className="rounded-4xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-950 sm:p-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar name={host.name} size="lg" />

                    <div className="min-w-0">
                      <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                        {t("host.hostedBy", { name: host.name })}
                      </h2>

                      <p className="mt-1 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        {t("host.responds", {
                          role: host.role,
                          time: host.responseTime,
                        })}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge>
                          {t("host.ratingBadge", { rating: host.rating })}
                        </Badge>
                        <Badge>
                          {t("host.yearsBadge", { count: host.years })}
                        </Badge>
                        <Badge>{t("host.verified")}</Badge>
                      </div>
                    </div>
                  </div>

                  <ButtonLink
                    href={contactHref}
                    variant="primary"
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    {t("host.contact")}
                  </ButtonLink>
                </div>
              </section>
            </main>

            <aside className="order-1 lg:order-2">
              <div className="lg:sticky lg:top-24">
                <BookingCard
                  locale={locale}
                  listingId={listing.id}
                  pricePerNight={listing.pricePerNight}
                  currency={listing.currency}
                />
              </div>
            </aside>
          </div>
        </div>
      </Container>

      <section className="mt-6 border-t border-zinc-200 bg-zinc-50 py-12 dark:border-white/10 dark:bg-zinc-950">
        <Container>
          <ReviewsSection
            reviews={reviews}
            rating={listing.rating}
            reviewCount={listing.reviewCount}
          />
        </Container>
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
        {title}
      </h2>

      <div className="mt-5">{children}</div>
    </section>
  );
}

type Translator = Awaited<ReturnType<typeof getTranslations>>;

function buildHost(id: string, t: Translator) {
  const hosts = [
    {
      name: "Awa K.",
      role: t("host.roles.premium"),
      responseTime: t("host.responseTimes.1h"),
      rating: "4.9",
      years: 3,
    },
    {
      name: "Moussa D.",
      role: t("host.roles.localManager"),
      responseTime: t("host.responseTimes.2h"),
      rating: "4.8",
      years: 2,
    },
    {
      name: "Nadia S.",
      role: t("host.roles.superhost"),
      responseTime: t("host.responseTimes.30m"),
      rating: "5.0",
      years: 4,
    },
  ];
  return hosts[id.length % hosts.length];
}

function buildSpecs(
  listing: { title: string; propertyType?: string; pricePerNight: number },
  t: Translator,
) {
  const text = `${listing.title} ${listing.propertyType ?? ""}`.toLowerCase();
  const isVilla = text.includes("villa") || listing.pricePerNight > 80;
  const isStudio = text.includes("studio");
  const typeValue =
    listing.propertyType ??
    (isVilla
      ? t("specValues.villa")
      : isStudio
        ? t("specValues.studio")
        : t("specValues.apartment"));

  return [
    { label: t("specs.type"), value: typeValue },
    {
      label: t("specs.bedrooms"),
      value: t("specValues.bedrooms", {
        count: isStudio ? 1 : isVilla ? 3 : 2,
      }),
    },
    {
      label: t("specs.bathrooms"),
      value: t("specValues.bathrooms", { count: isVilla ? 2 : 1 }),
    },
    {
      label: t("specs.guests"),
      value: t("specValues.guests", { count: isVilla ? 6 : isStudio ? 2 : 4 }),
    },
    {
      label: t("specs.area"),
      value: t("specValues.area", {
        count: isVilla ? 120 : isStudio ? 38 : 72,
      }),
    },
    {
      label: t("specs.minStay"),
      value: t("specValues.minStay", {
        count: listing.pricePerNight > 90 ? 2 : 1,
      }),
    },
  ];
}

function buildReviews(rating: number, t: Translator): Review[] {
  return (["one", "two", "three"] as const).map((key, i) => ({
    id: key,
    name: t(`reviewsSection.${key}.name`),
    date: t(`reviewsSection.${key}.date`),
    body: t(`reviewsSection.${key}.body`),
    rating: Math.max(1, Math.min(5, Number((rating - i * 0.12).toFixed(1)))),
  }));
}

function InfoTile({
  label,
  value,
  compact = false,
  className,
}: {
  label: string;
  value: string;
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <div className="rounded-2xl bg-zinc-50  dark:bg-white/4">
        <p className="text-sm font-semibold text-zinc-950 dark:text-white">
          {value}
        </p>

        <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
          {label}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-30 bg-white px-4 py-2 transition hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-white/3 sm:p-6",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500 sm:text-sm">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold text-zinc-950 dark:text-white sm:text-xl">
        {value}
      </p>
    </div>
  );
}

function Amenity({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 border border-zinc-200  transition hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-950 dark:hover:border-white/20">
      <div className="grid size-10 place-items-center rounded-2xl bg-zinc-50 text-black dark:bg-zinc-800 dark:text-white">
        {icon}
      </div>
      <p className="text-sm font-semibold text-black dark:text-white">
        {title}
      </p>
    </div>
  );
}

function getSpecTileClassName(index: number) {
  return cn(
    "border-zinc-200 dark:border-white/10",

    index > 0 && "border-t",

    index >= 2 && "sm:border-t",
    index < 2 && "sm:border-t-0",
    index % 2 === 1 && "sm:border-l",
    index % 2 === 0 && "sm:border-l-0",

    index >= 3 && "xl:border-t",
    index < 3 && "xl:border-t-0",
    index % 3 !== 0 && "xl:border-l",
    index % 3 === 0 && "xl:border-l-0",
  );
}

function MapPlaceholder({
  location,
  subtitle,
}: {
  location: string;
  subtitle: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.08),transparent_38%),radial-gradient(circle_at_80%_30%,rgba(0,0,0,0.06),transparent_42%),radial-gradient(circle_at_45%_80%,rgba(0,0,0,0.08),transparent_44%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.07),transparent_38%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.05),transparent_42%),radial-gradient(circle_at_45%_80%,rgba(255,255,255,0.04),transparent_44%)]" />

      <div className="absolute inset-x-0 top-1/2 h-px bg-black/5 dark:bg-white/5" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-black/5 dark:bg-white/5" />

      <div className="relative grid min-h-60 place-items-center p-6">
        <div className="grid max-w-sm place-items-center gap-3 text-center">
          <div className="grid size-14 place-items-center rounded-2xl bg-white shadow-sm shadow-black/10 dark:bg-zinc-950 dark:shadow-none">
            <PinIcon className="size-6 text-zinc-950 dark:text-white" />
          </div>

          <p className="text-sm font-semibold text-zinc-950 dark:text-white">
            {location}
          </p>

          <p className="text-xs leading-5 text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function WifiIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
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
      <path
        d="M12 19.5h0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BreakfastIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 3v7a5 5 0 0 0 10 0V3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6 21h12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9 21v-4h6v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ParkingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 4h6a4 4 0 0 1 0 8H7V4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M7 12v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
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

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
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
