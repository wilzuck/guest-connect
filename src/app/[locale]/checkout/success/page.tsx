import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams?: Promise<{ ref?: string }>;
}) {
  const locale = await getLocale();
  const sp = (await searchParams) ?? {};
  const ref = sp.ref ?? "GC-demo-0001";

  return (
    <div >
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/80">Confirmation</p>
          <h1 className="mt-4 text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Réservation confirmée
          </h1>
          <p className="mt-3 max-w-xl text-balance text-sm leading-6 text-zinc-600 dark:text-zinc-300 sm:mt-4 sm:max-w-2xl sm:text-base sm:leading-7 lg:text-lg">
            Merci. Vous recevrez un message avec les détails d’arrivée (adresse, check-in, contact hôte). Ceci est une
            démo.
          </p>
        </Container>
      </section>

      <section >
        <Container className="py-12 sm:py-14">
          <div className="grid gap-4 md:grid-cols-12">
            <Card className="p-6 shadow-none md:col-span-7">
              <p className="text-sm font-semibold ">Référence</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge>{ref}</Badge>
                <span className="text-sm text-zinc-600">Gardez-la pour le support.</span>
              </div>

              <p className="mt-6 text-sm font-semibold ">Prochaines étapes</p>
              <ul className="mt-3 grid gap-2 text-sm text-zinc-600">
                <li>• Vérifiez votre boîte mail (et vos spams) pour la confirmation.</li>
                <li>• Contactez l’hôte si vous avez une heure d’arrivée spécifique.</li>
                <li>• Ajoutez un service (transfert, ménage) si nécessaire.</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/messages`}
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-black px-6 text-sm font-semibold text-white transition"
                >
                  Ouvrir les messages
                </Link>
                <Link
                  href={`/${locale}/reservations`}
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-black/10 bg-white px-6 text-sm font-semibold  hover:bg-zinc-50 transition"
                >
                  Voir mes réservations
                </Link>
              </div>
            </Card>

            <Card className="p-6 shadow-none md:col-span-5">
              <p className="text-sm font-semibold ">Support</p>
              <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                Une question ? Nous répondons rapidement, avec des infos précises (horaires, accès, factures). Référence
                recommandée: <span className="font-semibold ">{ref}</span>.
              </p>
              <div className="mt-6 grid gap-2 text-sm text-zinc-600">
                <p>• Email: support@guestconnect.example</p>
                <p>• WhatsApp: +33 6 00 00 00 00</p>
                <p>• Horaires: 9h–19h (CET)</p>
              </div>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
}

