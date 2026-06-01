import Image from "next/image";
import { getLocale } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Listing } from "@/types/listing";

function formatPrice(price: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${price} ${currency}`;
  }
}

type ListingsPreviewSectionProps = {
  listings: Listing[];
};

export async function ListingsPreviewSection({ listings }: ListingsPreviewSectionProps) {
  const locale = await getLocale();
  return (
    <section id="listings" className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={locale === "en" ? "Explore" : "Explorer"}
            title={
              locale === "en"
                ? "Handpicked stays you'll love"
                : "Des maisons d’hôtes sélectionnées pour vous"
            }
            description={
              locale === "en"
                ? "A curated preview — ready to be powered by your /api/listings backend."
                : "Une sélection (aperçu) — prête à être alimentée par votre backend /api/listings."
            }
          />
          <ButtonLink href={`/${locale}/explore`} variant="outline" size="md" className="w-fit">
            {locale === "en" ? "View all listings" : "Voir toutes les annonces"}
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <Card
              key={l.id}
              className="group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                <Image
                  src={l.imageUrl}
                  alt={l.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority={false}
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-black">
                      {l.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-600">{l.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-black">
                      {formatPrice(l.pricePerNight, l.currency)}
                    </p>
                    <p className="text-xs text-zinc-500">{locale === "en" ? "per night" : "par nuit"}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm font-medium text-black">
                    <StarIcon className="h-4 w-4" />
                    <span>{l.rating.toFixed(2)}</span>
                    <span className="text-zinc-500">({l.reviewCount})</span>
                  </div>
                  <ButtonLink
                    href={`/${locale}/listings/${l.id}`}
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  >
                    {locale === "en" ? "View" : "Voir"}
                  </ButtonLink>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2.5l2.9 6.1 6.6.9-4.8 4.7 1.2 6.6L12 17.9 6.1 20.8l1.2-6.6-4.8-4.7 6.6-.9L12 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
