import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/lib/mock/experiences";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { FilterSidebarButton } from "@/components/explore/FilterSidebarButton";
import { ExploreFiltersBar } from "@/components/explore/ExploreFiltersBar";
import { CatalogEmptyState } from "@/components/explore/CatalogEmptyState";

export const metadata: Metadata = {
  title: "Expériences — GuestConnect",
  description: "Découvrez des expériences premium, comme sur Airbnb.",
};

type PageProps = {
  searchParams: Promise<{ tag?: string; q?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();
  const t = await getTranslations("experiencesPage");
  const sp = await searchParams;
  const activeTag = sp.tag?.trim() || "all";
  const query = sp.q?.trim() ?? "";

  const tags: Array<{ key: string; label: string }> = [
    { key: "all", label: t("all") },
    { key: "Culture", label: t("tagCulture") },
    { key: "Food", label: t("tagFood") },
    { key: "Nature", label: t("tagNature") },
    { key: "Nightlife", label: t("tagNightlife") },
    { key: "Business", label: t("tagBusiness") },
  ];

  const filteredByTag = activeTag === "all" ? experiences : experiences.filter((experience) => experience.tag === activeTag);
  const filtered = query
    ? filteredByTag.filter((experience) =>
        `${experience.title} ${experience.location} ${experience.tag}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
    : filteredByTag;

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
          <form action={`/${locale}/experiences`} className="mt-8">
            <div className="flex flex-col gap-2 rounded-2xl border border-black/10 bg-white/80 p-2 backdrop-blur-sm sm:flex-row">
              <label className="flex h-14 min-w-0 flex-1 items-center gap-3 rounded-xl bg-white px-4">
                <Search className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                <input
                  name="q"
                  defaultValue={query}
                  placeholder="Rechercher une expérience, une ville, une ambiance..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-black outline-none placeholder:text-zinc-500"
                />
              </label>
              {activeTag !== "all" ? <input type="hidden" name="tag" value={activeTag} /> : null}
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/90"
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
                    title: "Expériences",
                    options: tags.map((tag) => ({
                      href:
                        tag.key === "all"
                          ? `/${locale}/experiences`
                          : `/${locale}/experiences?tag=${encodeURIComponent(tag.key)}`,
                      active: activeTag === tag.key,
                      label: tag.key === "all" ? "Toutes les expériences" : tag.label,
                    })),
                  },
                ]}
              />
            }
            chips={tags
              .filter((tag) => tag.key !== "all")
              .map((tag) => ({
                href: `/${locale}/experiences?tag=${encodeURIComponent(tag.key)}`,
                active: activeTag === tag.key,
                label: tag.label,
              }))}
          />
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <div className="flex items-end justify-between gap-4">
            <p className="text-sm text-zinc-600">{t("results", { count: filtered.length })}</p>
            <Link href={`/${locale}/stays`} className="text-sm font-semibold text-black hover:underline">
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
              title="Aucune expérience dans cette catégorie"
              description="Explorez toutes les expériences ou choisissez une autre catégorie."
              resetHref={`/${locale}/experiences`}
            />
          )}

          <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <h2 className="text-2xl font-semibold tracking-tight text-black">{t("promoTitle")}</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-600">{t("promoBody")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/services`}
                  className="inline-flex items-center rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white"
                >
                  {t("promoCta")}
                </Link>
                <Link
                  href={`/${locale}/stays`}
                  className="inline-flex items-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-50"
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
