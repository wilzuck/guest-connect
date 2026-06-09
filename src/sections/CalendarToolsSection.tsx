import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTranslations } from "next-intl/server";
import { CalendarToolsDemo } from "@/sections/CalendarToolsSectionClient";

export async function CalendarToolsSection() {
  const t = await getTranslations("calendarTools");

  return (
    <section >
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
            <ul className="mt-8 grid gap-3 text-sm text-zinc-600">
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-black/20" />
                <span>{t("bullet1")}</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-black/20" />
                <span>{t("bullet2")}</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-black/20" />
                <span>{t("bullet3")}</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <CalendarToolsDemo />
          </div>
        </div>
      </Container>
    </section>
  );
}

