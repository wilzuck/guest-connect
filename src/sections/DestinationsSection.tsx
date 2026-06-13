import { getLocale, getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { africaListings } from "@/lib/mock/africa-listings";
import { ChevronRight } from "lucide-react";
import { DestinationsCarousel } from "@/components/listings/DestinationsCarousel";
import { BackButton } from "@/components/ui/BackButton";

type Destination = {
  city: string;
  country: string;
  imageUrl: string;
  count: number;
};

// Dérive les destinations (villes) depuis les données, avec un logement représentatif.
function getDestinations(limit = 10): Destination[] {
  const map = new Map<string, Destination>();
  for (const l of africaListings) {
    const existing = map.get(l.city);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(l.city, {
        city: l.city,
        country: l.country,
        imageUrl: l.imageUrl,
        count: 1,
      });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count).slice(0, limit);
}

export async function DestinationsSection() {
  const locale = await getLocale();
  const t = await getTranslations("homeDestinations");
  const destinations = getDestinations();

  return (
    <section
      id="destinations"
      className="border-t border-black/5 dark:border-white/10"
    >
      <Container className="py-4 sm:py-6">
        <DestinationsCarousel
          locale={locale}
          destinations={destinations}
          header={
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow={t("eyebrow")}
                title={t("title")}
                description={t("description")}
              />
            </div>
          }
        />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            {/* titre + description */}
          </div>

          <div className="my-2 flex w-full shrink-0 justify-start lg:w-auto lg:justify-end ">
            <BackButton
              href={`/${locale}/stays`}
              className="-ml-3 lg:-mr-3"
               label={t("viewAll")}
               buttonPosition="end"
               />
          </div>
        </div>
      </Container>
    </section>
  );
}
