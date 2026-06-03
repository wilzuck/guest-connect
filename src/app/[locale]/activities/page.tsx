import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Activity — GuestConnect",
  description: "Your recent activity.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  const items = isEn
    ? [
        { t: "Saved a listing", d: "You added “Maison d’hôtes premium” to favorites." },
        { t: "Search completed", d: "Destination: Dakar · Dates: flexible · Guests: 2." },
        { t: "Review sent", d: "Thanks for sharing feedback — it helps everyone book with confidence." },
      ]
    : [
        { t: "Ajout aux favoris", d: "Vous avez ajouté “Maison d’hôtes premium” aux favoris." },
        { t: "Recherche effectuée", d: "Destination : Dakar · Dates : flexibles · Voyageurs : 2." },
        { t: "Avis envoyé", d: "Merci pour votre retour — cela aide à réserver en toute confiance." },
      ];

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
          <div className="grid gap-3">
            {items.map((x) => (
              <Card key={x.t} className="p-6 shadow-none">
                <p className="text-sm font-semibold text-black">{x.t}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{x.d}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

