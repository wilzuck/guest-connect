import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SearchBar } from "@/components/SearchBar";
import { Card } from "@/components/ui/Card";
import { africaListings } from "@/lib/mock/africa-listings";

export const metadata: Metadata = {
  title: "Destinations — GuestConnect",
  description: "Découvrez des destinations et trouvez votre prochain séjour.",
};

export default async function Page() {
  const locale = await getLocale();
  const t = await getTranslations("destinationsPage");

  const byCity = new Map<
    string,
    { city: string; country: string; location: string; imageUrl: string; count: number }
  >();
  for (const l of africaListings) {
    const key = l.city;
    const existing = byCity.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      byCity.set(key, {
        city: l.city,
        country: (l as any).country ?? "",
        location: l.location,
        imageUrl: l.imageUrl,
        count: 1,
      });
    }
  }
  const cities = Array.from(byCity.values());

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
          <div className="mt-8">
            <SearchBar />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-semibold tracking-tight text-black">{t("popularTitle")}</h2>
            <p className="text-sm text-zinc-600">{t("popularHint")}</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {cities.map((c) => (
              <Link
                key={c.city}
                href={`/${locale}/search?destination=${encodeURIComponent(c.city)}`}
                className="block"
                title={c.location}
              >
                <Card className="overflow-hidden rounded-2xl border border-black/10 bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                    <Image
                      src={c.imageUrl}
                      alt={c.location}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm font-semibold text-black" title={c.location}>
                      {c.location}
                    </p>
                    <p className="mt-1 text-xs text-zinc-600">{t("stays", { count: c.count })}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

