import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SearchBar } from "@/components/SearchBar";
import { africaListings } from "@/lib/mock/africa-listings";

export const metadata: Metadata = {
  title: "Services — GuestConnect",
  description: "Browse services and discover destinations quickly.",
};

export default async function Page() {
  const locale = await getLocale();
  const t = await getTranslations("destinationsPage");
  const BLUR =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjE1IiBmaWxsPSIjZjRmNGY1Ii8+PC9zdmc+";

  const byCity = new Map<string, { city: string; location: string; imageUrl: string; count: number }>();
  for (const l of africaListings) {
    const key = l.city;
    const existing = byCity.get(key);
    if (existing) existing.count += 1;
    else {
      byCity.set(key, {
        city: l.city,
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{t("eyebrow")}</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            {t("description")}
          </p>
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

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5 lg:grid-cols-6">
            {cities.map((c) => (
              <Link
                key={c.city}
                href={`/${locale}/search?destination=${encodeURIComponent(c.city)}`}
                className="block"
                title={c.location}
              >
                <div className="group">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-100">
                    <Image
                      src={c.imageUrl}
                      alt={c.location}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={75}
                      placeholder="blur"
                      blurDataURL={BLUR}
                    />
                  </div>
                  <p className="mt-2 truncate text-sm font-semibold text-black" title={c.location}>
                    {c.location}
                  </p>
                  <p className="mt-1 text-xs text-zinc-600">{t("stays", { count: c.count })}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
