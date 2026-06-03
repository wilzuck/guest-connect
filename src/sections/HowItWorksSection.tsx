import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLocale } from "next-intl/server";

export async function HowItWorksSection() {
  const locale = await getLocale();
  const steps =
    locale === "en"
      ? [
          {
            title: "Search",
            description: "Filter by destination, dates and guests to find the right stay fast.",
          },
          {
            title: "Book",
            description: "Secure payment, clear policies, instant confirmation.",
          },
          {
            title: "Stay / Host",
            description: "Travelers enjoy the stay — hosts get a premium dashboard and tools.",
          },
        ]
      : [
          {
            title: "Rechercher",
            description:
              "Filtrez par destination, dates et voyageurs pour trouver rapidement le bon séjour.",
          },
          {
            title: "Réserver",
            description: "Paiement sécurisé, conditions claires et confirmation instantanée.",
          },
          {
            title: "Séjourner / Héberger",
            description:
              "Les voyageurs profitent — les hôtes disposent d’un dashboard premium et d’outils modernes.",
          },
        ];

  return (
    <section className="bg-zinc-50">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow={locale === "en" ? "How it works" : "Comment ça marche"}
          title={locale === "en" ? "A simple flow that feels premium" : "Un parcours simple, vraiment premium"}
          description={
            locale === "en"
              ? "Conversion-focused UX, clear structure and modern SaaS polish — end to end."
              : "UX orientée conversion, structure claire et finition SaaS moderne — de bout en bout."
          }
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {steps.map((s, idx) => (
            <Card
              key={s.title}
              className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm shadow-black/5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-sm font-semibold text-white">
                  {idx + 1}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-black">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{s.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
