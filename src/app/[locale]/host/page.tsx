import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export default async function Page() {
  const locale = await getLocale();
  const t = await getTranslations("hostPage");

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`/${locale}/add-property`} variant="primary" size="lg">
              {t("ctaPrimary")}
            </ButtonLink>
            <ButtonLink href="#benefits" variant="outline" size="lg">
              {t("ctaSecondary")}
            </ButtonLink>
          </div>
        </Container>
      </section>
      
      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <h2 className="text-xl font-semibold tracking-tight text-black">{t("stepsTitle")}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Step title={t("steps.oneTitle")} desc={t("steps.oneDesc")} />
            <Step title={t("steps.twoTitle")} desc={t("steps.twoDesc")} />
            <Step title={t("steps.threeTitle")} desc={t("steps.threeDesc")} />
          </div>
        </Container>
      </section>

      <section id="benefits" className="bg-white">
        <Container className="py-12 sm:py-14">
          <h2 className="text-xl font-semibold tracking-tight text-black">{t("benefitsTitle")}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Step title={t("benefits.trustTitle")} desc={t("benefits.trustDesc")} />
            <Step title={t("benefits.toolsTitle")} desc={t("benefits.toolsDesc")} />
            <Step title={t("benefits.supportTitle")} desc={t("benefits.supportDesc")} />
          </div>
        </Container>
      </section>
    </div>
  );
}

function Step({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-none">
      <p className="text-sm font-semibold text-black">{title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{desc}</p>
    </div>
  );
}
