import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { differenceInCalendarDays, isValid, parseISO } from "date-fns";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Container } from "@/components/ui/Container";
import { readDb } from "@/lib/server/db";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams?: Promise<{ listingId?: string; checkIn?: string; checkOut?: string }>;
}) {
  const locale = await getLocale();
  const sp = (await searchParams) ?? {};

  const db = await readDb();
  const listingId = sp.listingId;
  const listing = (db.listings ?? []).find((l) => l.id === listingId) ?? (db.listings ?? [])[0];
  const checkIn = sp.checkIn ? parseISO(sp.checkIn) : undefined;
  const checkOut = sp.checkOut ? parseISO(sp.checkOut) : undefined;
  const nights =
    checkIn && checkOut && isValid(checkIn) && isValid(checkOut)
      ? Math.max(1, differenceInCalendarDays(checkOut, checkIn))
      : 1;

  const total = listing ? Number(listing.pricePerNight ?? 0) * nights : 0;
  const currency = listing ? String(listing.currency ?? "EUR") : "EUR";

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Paiement</p>
          <h1 className="mt-4 text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-black">
            Finaliser la réservation
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            Démo: aucun paiement réel. Cette page illustre le flux checkout + confirmation.
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <Card className="p-6 shadow-none">
                <p className="text-sm font-semibold text-black">Vos informations</p>
                <p className="mt-2 text-sm text-zinc-600">
                  Nous les utilisons uniquement pour confirmer la réservation et partager les détails d’arrivée.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Nom</span>
                    <Input placeholder="Camille Dupont" />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Email</span>
                    <Input type="email" placeholder="camille@email.com" />
                  </label>
                  <label className="grid gap-2 sm:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Téléphone</span>
                    <Input type="tel" placeholder="+33 6 00 00 00 00" />
                  </label>
                  <label className="grid gap-2 sm:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      Message à l’hôte (optionnel)
                    </span>
                    <Textarea placeholder="Heure d’arrivée estimée, besoin particulier, etc." className="min-h-[120px]" />
                  </label>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/checkout/success?ref=GC-${encodeURIComponent(String(listing?.id ?? "demo"))}&checkIn=${encodeURIComponent(sp.checkIn ?? "")}&checkOut=${encodeURIComponent(sp.checkOut ?? "")}`}
                    className="inline-flex h-11 items-center justify-center rounded-2xl bg-black px-6 text-sm font-semibold text-white transition"
                  >
                    Confirmer (démo)
                  </Link>
                  <Link
                    href={`/${locale}/stays`}
                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-black/10 bg-white px-6 text-sm font-semibold text-black hover:bg-zinc-50 transition"
                  >
                    Continuer à explorer
                  </Link>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-5">
              <Card className="overflow-hidden p-0 shadow-none">
                <div className="relative aspect-[16/10] w-full bg-zinc-100">
                  {listing?.imageUrl ? (
                    <Image
                      src={String(listing.imageUrl)}
                      alt={String(listing.title ?? "Logement")}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 34vw"
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-black">{String(listing?.title ?? "Logement")}</p>
                  <p className="mt-1 text-sm text-zinc-600">{String(listing?.location ?? "—")}</p>

                  <div className="mt-5 grid gap-2 text-sm text-zinc-700">
                    <Row label="Arrivée" value={sp.checkIn ?? "À préciser"} />
                    <Row label="Départ" value={sp.checkOut ?? "À préciser"} />
                    <Row label="Durée" value={`${nights} nuit${nights > 1 ? "s" : ""}`} />
                    <Row label="Prix/nuit" value={`${String(listing?.pricePerNight ?? "—")} ${currency}`} />
                    <Row label="Frais" value={`0 ${currency}`} />
                    <div className="mt-2 h-px bg-black/5" />
                    <Row label="Total" value={`${total} ${currency}`} strong />
                  </div>

                  <p className="mt-4 text-xs text-zinc-500">
                    En confirmant, vous acceptez des conditions claires et une communication directe avec l’hôte.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-zinc-500">{label}</span>
      <span className={strong ? "font-semibold text-black" : "font-semibold"}>{value}</span>
    </div>
  );
}
