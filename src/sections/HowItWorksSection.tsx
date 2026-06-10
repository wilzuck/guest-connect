import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTranslations } from "next-intl/server";

export async function HowItWorksSection() {
  const t = await getTranslations("homeHowItWorks");
  const steps = [
    { title: t("step1Title"), description: t("step1Desc") },
    { title: t("step2Title"), description: t("step2Desc") },
    { title: t("step3Title"), description: t("step3Desc") },
  ];

  return (
    <section className="bg-zinc-50 dark:bg-black">
      <Container className="py-16 sm:py-20">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {steps.map((s, idx) => (
            <Card
              key={s.title}
              className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/30"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-sm font-semibold text-white dark:bg-white dark:text-black">
                  {idx + 1}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-black dark:text-white">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{s.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
