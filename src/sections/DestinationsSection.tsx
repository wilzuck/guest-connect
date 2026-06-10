import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { africaListings } from "@/lib/mock/africa-listings";
import { ChevronRight } from "lucide-react";

type Destination = {
  city: string;
  country: string;
  imageUrl: string;
  count: number;
};

// Dérive les destinations (villes) depuis les données, avec un logement représentatif.
function getDestinations(limit = 6): Destination[] {
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
    <section id="destinations" className="border-b border-t border-black/5 dark:border-white/10 dark:bg-zinc-950 dark:shadow-black/30 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <div className="shrink-0">
            <ButtonLink href={`/${locale}/stays`} variant="outline" size="md">
              {t("viewAll")} <ChevronRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {destinations.map((d) => (
            <li key={d.city}>
              <Link
                href={`/${locale}/stays?destination=${encodeURIComponent(d.city)}`}
                aria-label={t("exploreCity", { city: d.city })}
                className="group block overflow-hidden   transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={d.imageUrl}
                    alt={`${d.city}, ${d.country}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                    <p className="truncate text-sm font-semibold tracking-tight" title={d.city}>
                      {d.city}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-white/80" title={d.country}>
                      {d.country}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
