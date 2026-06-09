import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { differenceInCalendarDays, isValid, parseISO } from "date-fns";
import { CreditCard, Landmark, Smartphone, WalletCards } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Container } from "@/components/ui/Container";
import { readDb } from "@/lib/server/db";

const paymentMethods = [
  {
    id: "mobile-money",
    label: "Mobile Money",
    description: "MTN, Moov, Orange Money ou portefeuille local compatible.",
    icon: Smartphone,
  },
  {
    id: "card",
    label: "Carte bancaire",
    description: "Visa, Mastercard ou carte bancaire internationale.",
    icon: CreditCard,
  },
  {
    id: "paypal",
    label: "PayPal",
    description: "Paiement rapide avec votre compte PayPal.",
    icon: WalletCards,
  },
  {
    id: "bank-transfer",
    label: "Virement / paiement sur place",
    description: "Option manuelle selon validation de l'hôte.",
    icon: Landmark,
  },
];

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
    <div >
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/80 dark:text-white/5">Paiement</p>
          <h1 className="mt-4 text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Finaliser la réservation
          </h1>
          <p className="mt-3 max-w-xl text-balance text-sm leading-6 text-zinc-600 dark:text-zinc-300 sm:mt-4 sm:max-w-2xl sm:text-base sm:leading-7 lg:text-lg">
            Démo: aucun paiement réel. Cette page illustre le flux checkout + confirmation.
          </p>
        </Container>
      </section>

      <section >
        <Container className="py-12 sm:py-14">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 xl:col-span-8">
              <Card className="p-6 shadow-none">
                <p className="text-sm font-semibold ">Vos informations</p>
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

                <div className="mt-8 border-t border-black/10 pt-6">
                  <p className="text-sm font-semibold ">Moyen de paiement</p>
                  <p className="mt-2 text-sm text-zinc-600">
                    Choisissez comment vous souhaitez payer cette réservation. Le paiement reste en mode démo.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {paymentMethods.map((method, index) => {
                      const Icon = method.icon;

                      return (
                        <label
                          key={method.id}
                          className="group flex cursor-pointer gap-3 rounded-2xl border border-black/10 bg-white p-4 transition hover:border-black/25 hover:bg-zinc-50 has-[:checked]:border-black has-[:checked]:bg-zinc-50"
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            defaultChecked={index === 0}
                            className="mt-1 h-4 w-4 accent-black"
                          />
                          <span className="grid min-w-0 gap-2">
                            <span className="flex items-center gap-2 text-sm font-semibold ">
                              <span className="grid h-9 w-9 place-items-center rounded-xl border border-black/10 bg-zinc-100 text-black transition group-has-[:checked]:bg-white">
                                <Icon className="h-4 w-4" aria-hidden="true" />
                              </span>
                              {method.label}
                            </span>
                            <span className="text-sm leading-5 text-zinc-600">{method.description}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        Numéro Mobile Money
                      </span>
                      <Input type="tel" placeholder="+229 01 00 00 00 00" />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        Nom sur la carte
                      </span>
                      <Input placeholder="Camille Dupont" />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        Numéro de carte
                      </span>
                      <Input inputMode="numeric" placeholder="4242 4242 4242 4242" />
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="grid gap-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                          Expiration
                        </span>
                        <Input placeholder="MM/AA" />
                      </label>
                      <label className="grid gap-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">CVC</span>
                        <Input inputMode="numeric" placeholder="123" />
                      </label>
                    </div>
                  </div>
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
                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-black/10 bg-white px-6 text-sm font-semibold  hover:bg-zinc-50 transition"
                  >
                    Continuer à explorer
                  </Link>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-5 xl:col-span-4">
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
                  <p className="text-sm font-semibold ">{String(listing?.title ?? "Logement")}</p>
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
      <span className={strong ? "font-semibold " : "font-semibold"}>{value}</span>
    </div>
  );
}
