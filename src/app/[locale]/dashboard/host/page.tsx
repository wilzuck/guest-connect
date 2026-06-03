import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { readDb } from "@/lib/server/db";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();
  const listingCount = db.listings?.length ?? 0;

  return (
    <div className="grid gap-4 md:grid-cols-12">
      <Card className="p-6 shadow-none md:col-span-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Logements</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-black">{listingCount}</p>
        <p className="mt-2 text-sm text-zinc-600">Total en base JSON.</p>
      </Card>

      <Card className="p-6 shadow-none md:col-span-6">
        <p className="text-sm font-semibold text-black">Checklist “annonce premium”</p>
        <ul className="mt-3 grid gap-2 text-sm text-zinc-600">
          <li>• Photo principale lumineuse, cadrage large (salon/chambre).</li>
          <li>• Titre court + bénéfice (“calme”, “proche centre”, “wifi stable”).</li>
          <li>• Services essentiels: ménage, transfert, petit-déjeuner.</li>
          <li>• Politique claire (horaires, conditions, annulation).</li>
        </ul>
      </Card>

      <Card className="p-6 shadow-none md:col-span-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-black">Gérer vos logements</p>
            <p className="mt-1 text-sm text-zinc-600">Créer, modifier ou supprimer une annonce.</p>
          </div>
          <Link
            href={`/${locale}/dashboard/host/listings`}
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-black px-6 text-sm font-semibold text-white transition"
          >
            Ouvrir la liste
          </Link>
        </div>
      </Card>
    </div>
  );
}

