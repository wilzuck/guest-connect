import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { MapPin, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/lib/mock/experiences";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { FilterSidebarButton } from "@/components/explore/FilterSidebarButton";
import { ExploreFiltersBar } from "@/components/explore/ExploreFiltersBar";
import { CatalogEmptyState } from "@/components/explore/CatalogEmptyState";

export const metadata: Metadata = {
  title: "Experiences - GuestConnect",
  description: "Decouvrez des experiences premium, comme sur Airbnb.",
};

type ExperiencesSearchParams = {
  tag?: string;
  location?: string;
  q?: string;
};

type PageProps = {
  searchParams: Promise<ExperiencesSearchParams>;
};

function buildHref(locale: string, values: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value && value !== "all") params.set(key, value);
  }
  const query = params.toString();
  return `/${locale}/experiences${query ? `?${query}` : ""}`;
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();
  const t = await getTranslations("experiencesPage");
  const params = await searchParams;
  const activeTag = params.tag?.trim() || "all";
  const location = params.location?.trim() ?? "";
  const query = params.q?.trim() ?? "";
  const locations = Array.from(new Set(experiences.map((experience) => experience.location))).sort();

  const tags: Array<{ key: string; label: string }> = [
    { key: "all", label: t("all") },
    { key: "Culture", label: t("tagCulture") },
    { key: "Food", label: t("tagFood") },
    { key: "Nature", label: t("tagNature") },
    { key: "Nightlife", label: t("tagNightlife") },
    { key: "Business", label: t("tagBusiness") },
  ];

  let filtered =
    activeTag === "all" ? experiences : experiences.filter((experience) => experience.tag === activeTag);

  if (location) {
    const locationQuery = normalize(location);
    filtered = filtered.filter((experience) => normalize(experience.location).includes(locationQuery));
  }

  if (query) {
    const textQuery = normalize(query);
    filtered = filtered.filter((experience) =>
      normalize(`${experience.title} ${experience.tag}`).includes(textQuery),
    );
  }

  return (
    <div>
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <Container className="py-10 sm:py-14">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
          <form action={`/${locale}/experiences`} className="mt-8">
            <div className="grid gap-2 rounded-2xl border border-zinc-200 bg-white/80 p-2 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80 sm:grid-cols-[minmax(0,1fr)_minmax(180px,0.7fr)_auto]">
              <label className="flex h-14 min-w-0 items-center gap-3 rounded-xl bg-white px-4 dark:bg-zinc-950">
                <Search className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                <input
                  name="q"
                  defaultValue={query}
                  placeholder="Experience ou ambiance"
                  maxLength={250}
                  className="min-w-0 flex-1 bg-transparent text-sm text-black outline-none placeholder:text-zinc-500 dark:text-white dark:placeholder:text-zinc-500"
                />
              </label>
              <label className="flex h-14 min-w-0 items-center gap-3 rounded-xl bg-white px-4 dark:bg-zinc-950">
                <MapPin className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                <input
                  name="location"
                  defaultValue={location}
                  placeholder="Ville ou pays"
                  maxLength={250}
                  className="min-w-0 flex-1 bg-transparent text-sm text-black outline-none placeholder:text-zinc-500 dark:text-white dark:placeholder:text-zinc-500"
                />
              </label>
              {activeTag !== "all" ? <input type="hidden" name="tag" value={activeTag} /> : null}
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Rechercher
              </button>
            </div>
          </form>
          <ExploreFiltersBar
            className="mt-8"
            leading={
              <FilterSidebarButton
                resetHref={`/${locale}/experiences`}
                sections={[
                  {
                    title: "Experiences",
                    options: tags.map((tag) => ({
                      href: buildHref(locale, { ...params, tag: tag.key === "all" ? undefined : tag.key }),
                      active: activeTag === tag.key,
                      label: tag.key === "all" ? "Toutes les experiences" : tag.label,
                    })),
                  },
                  {
                    title: "Localisation",
                    options: [
                      {
                        href: buildHref(locale, { ...params, location: undefined }),
                        active: !location,
                        label: "Toutes les localisations",
                      },
                      ...locations.map((item) => ({
                        href: buildHref(locale, { ...params, location: item }),
                        active: location === item,
                        label: item,
                      })),
                    ],
                  },
                ]}
              />
            }
            chips={[
              ...tags
                .filter((tag) => tag.key !== "all")
                .map((tag) => ({
                  href: buildHref(locale, { ...params, tag: tag.key }),
                  active: activeTag === tag.key,
                  label: tag.label,
                })),
              { divider: true as const },
              ...locations.map((item) => ({
                href: buildHref(locale, { ...params, location: item }),
                active: location === item,
                label: item,
              })),
            ]}
          />
        </Container>
      </section>

      <section>
        <Container className="py-12 sm:py-14">
          <div className="flex items-end justify-between gap-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("results", { count: filtered.length })}</p>
            <Link href={`/${locale}/stays`} className="text-sm font-semibold text-black hover:underline dark:text-white">
              {t("browseStays")}
            </Link>
          </div>

          {filtered.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          ) : (
            <CatalogEmptyState
              title="Aucune experience ne correspond a ces filtres"
              description="Essayez une autre localisation ou une autre categorie."
              resetHref={`/${locale}/experiences`}
            />
          )}

          <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white">{t("promoTitle")}</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{t("promoBody")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/services`}
                  className="inline-flex items-center rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black"
                >
                  {t("promoCta")}
                </Link>
                <Link
                  href={`/${locale}/stays`}
                  className="inline-flex items-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900"
                >
                  {t("promoSecondary")}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-3xl bg-black shadow-md shadow-black/20">
                <video
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={t("promoVideoLabel")}
                >
                  <source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-the-ocean-7463/1080p.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
