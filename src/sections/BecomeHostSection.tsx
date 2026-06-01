import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getLocale } from "next-intl/server";

export async function BecomeHostSection() {
  const locale = await getLocale();
  return (
    <section id="host" className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-black to-zinc-900 px-6 py-12 text-white shadow-sm shadow-black/10 sm:px-10">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                {locale === "en" ? "Become a host" : "Devenir hôte"}
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {locale === "en"
                  ? "Turn your place into a high-performing listing"
                  : "Faites de votre établissement une annonce performante"}
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-white/75">
                {locale === "en"
                  ? "GuestConnect gives hosts a modern dashboard, secure payouts and visibility to travelers looking for curated stays."
                  : "GuestConnect donne aux hôtes un dashboard moderne, des paiements sécurisés et une visibilité auprès de voyageurs qui recherchent des maisons d’hôtes — pas des locations génériques."}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/host" variant="secondary" size="lg" className="text-black">
                  {locale === "en" ? "List my property" : "Ajouter mon établissement"}
                </ButtonLink>
                <ButtonLink href="#pricing" variant="ghost" size="lg" className="text-white hover:bg-white/10">
                  {locale === "en" ? "See pricing" : "Voir les tarifs"}
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                <Item
                  title={locale === "en" ? "Smart pricing" : "Tarification intelligente"}
                  desc={
                    locale === "en"
                      ? "Nightly rates, seasonal rules and minimum stays."
                      : "Prix à la nuit, règles saisonnières et séjours minimum."
                  }
                />
                <Item
                  title={locale === "en" ? "Occupancy insights" : "Suivi d’occupation"}
                  desc={
                    locale === "en"
                      ? "Performance and conversion at a glance."
                      : "Performance et conversion en un coup d’œil."
                  }
                />
                <Item
                  title={locale === "en" ? "Messaging" : "Messagerie"}
                  desc={
                    locale === "en"
                      ? "Communicate with guests from one clean inbox."
                      : "Communiquez avec vos voyageurs depuis une boîte de réception unique."
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Item({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-6 text-white/70">{desc}</p>
    </div>
  );
}
