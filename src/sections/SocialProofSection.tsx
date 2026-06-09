import { Container } from "@/components/ui/Container";
import { partnerLogos } from "@/lib/mock/landing";
import { getLocale } from "next-intl/server";

export async function SocialProofSection() {
  const locale = await getLocale();
  const stats =
    locale === "en"
      ? [
          { value: "12k+", label: "Hosts" },
          { value: "240k+", label: "Bookings" },
          { value: "80+", label: "Countries" },
        ]
      : [
          { value: "12k+", label: "Hôtes" },
          { value: "240k+", label: "Réservations" },
          { value: "80+", label: "Pays" },
        ];

  return (
    <section className="border-y border-black/5 bg-white">
      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-zinc-600">
              {locale === "en"
                ? "The reliability travelers expect — and the tools hosts need."
                : "La fiabilité attendue par les voyageurs — et les outils dont les hôtes ont besoin."}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {partnerLogos.map((name) => (
                <div
                  key={name}
                  className="flex h-9 items-center rounded-full border border-black/10 bg-white px-4 text-xs font-semibold tracking-tight text-zinc-700 shadow-sm shadow-black/5"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 text-center shadow-sm shadow-black/5"
                >
                  <p className="text-2xl font-semibold tracking-tight">{s.value}</p>
                  <p className="mt-1 text-xs font-medium text-zinc-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
