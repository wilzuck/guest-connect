import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { ActivitiesTable } from "@/components/account/ActivitiesTable";

export const metadata: Metadata = {
  title: "Activity — GuestConnect",
  description: "Your recent activity.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {isEn ? "Activity" : "Activités"}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            {isEn ? "Recent activity" : "Activité récente"}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            {isEn ? "A simple feed to keep track of what you’ve done." : "Un fil simple pour suivre vos actions."}
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <ActivitiesTable isEn={isEn} />
        </Container>
      </section>
    </div>
  );
}
