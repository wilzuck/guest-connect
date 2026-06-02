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

export default async function Page() {
  const locale = await getLocale();
  const t = await getTranslations("experiencesPage");

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
          <div className="mt-8 flex flex-wrap gap-2">
            {t.raw("chips").map((label: string) => (
              <span key={label} className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700">
                {label}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <div className="flex items-end justify-between gap-4">
            <p className="text-sm text-zinc-600">{t("results", { count: experiences.length })}</p>
            <Link href={`/${locale}/explore`} className="text-sm font-semibold text-black hover:underline">
              {t("browseStays")}
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {experiences.map((e) => (
              <ExperienceCard key={e.id} experience={e} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
