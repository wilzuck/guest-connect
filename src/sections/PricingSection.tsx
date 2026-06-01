import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils/cn";
import { pricingPlans } from "@/lib/mock/landing";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-white">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Tarifs"
          title="Des offres pensées pour évoluer"
          description="Commencez gratuitement, puis passez au niveau supérieur en fonction de vos besoins."
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((p) => (
            <Card
              key={p.name}
              className={cn(
                "relative p-7",
                p.highlighted
                  ? "border-black/25 shadow-md shadow-black/10"
                  : "border-black/10",
              )}
            >
              {p.highlighted ? (
                <div className="absolute -top-3 left-6 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                  Le plus populaire
                </div>
              ) : null}

              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold tracking-tight text-black">{p.name}</h3>
                <p className="text-3xl font-semibold tracking-tight text-black">
                  {p.price}
                  <span className="text-sm font-medium text-zinc-500">/mois</span>
                </p>
              </div>
              <p className="mt-2 text-sm text-zinc-600">{p.description}</p>

              <ul className="mt-6 space-y-3 text-sm text-zinc-700">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 text-black" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <ButtonLink
                href="/signup"
                variant={p.highlighted ? "primary" : "outline"}
                size="lg"
                className="mt-7 w-full"
              >
                {p.cta}
              </ButtonLink>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
