import { getLocale, getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { africaListings } from "@/lib/mock/africa-listings";
import { ChevronRight } from "lucide-react";
import { DestinationsCarousel } from "@/components/listings/DestinationsCarousel";

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
    <section id="destinations" className="border-t border-black/5 bg-linear-to-b from-slate-50 to-transparent dark:border-white/10 dark:bg-zinc-950">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <div className="shrink-0">
            <ButtonLink href={`/${locale}/stays`} className="" variant="outline" size="md">
              {t("viewAll")} <ChevronRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>

        <DestinationsCarousel locale={locale} destinations={destinations} />
      </Container>
    </section>
  );
}
