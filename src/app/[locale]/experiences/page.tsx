import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/lib/mock/experiences";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";

export const metadata: Metadata = {
  title: "Expériences — GuestConnect",
  description: "Découvrez des expériences premium, comme sur Airbnb.",
};

type PageProps = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();
  const t = await getTranslations("experiencesPage");
  const sp = await searchParams;
  const activeTag = sp.tag?.trim() || "all";

  const tags: Array<{ key: string; label: string }> = [
    { key: "all", label: t("all") },
    { key: "Culture", label: t("tagCulture") },
    { key: "Food", label: t("tagFood") },
    { key: "Nature", label: t("tagNature") },
    { key: "Nightlife", label: t("tagNightlife") },
    { key: "Business", label: t("tagBusiness") },
  ];

  const filtered = activeTag === "all" ? experiences : experiences.filter((e) => e.tag === activeTag);

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => {
              const href =
                tag.key === "all"
                  ? `/${locale}/experiences`
                  : `/${locale}/experiences?tag=${encodeURIComponent(tag.key)}`;
              const active = activeTag === tag.key;
              return (
                <Link
                  key={tag.key}
                  href={href}
                  className={
                    active
                      ? "rounded-full bg-black px-4 py-2 text-sm font-semibold text-white"
                      : "rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-200 hover:text-black"
                  }
                >
                  {tag.label}
                </Link>
              );
            })}
          </div>
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

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((e) => (
              <ExperienceCard key={e.id} experience={e} />
            ))}
          </div>

          {/* Bloc éditorial (50/50) */}
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
