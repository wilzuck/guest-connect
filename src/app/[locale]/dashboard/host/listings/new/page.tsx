import { getLocale } from "next-intl/server";
import { ListingFormClient } from "@/components/admin/forms/ListingFormClient";
import { readDb } from "@/lib/server/db";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();

  const categories = (db.categories ?? []).map((c) => ({ id: String(c.id), name: String(c.name ?? c.id) }));
  const locations = (db.locations ?? []).map((l) => ({
    id: String(l.id),
    city: String(l.city ?? ""),
    country: String(l.country ?? ""),
  }));
  const services = (db.services ?? []).map((s) => ({
    id: String(s.id),
    name: String(s.name ?? s.id),
    active: Boolean(s.active ?? true),
  }));

  return (
    <ListingFormClient
      locale={locale}
      categories={categories}
      locations={locations}
      services={services}
      redirectTo="/dashboard/host/listings"
      titleLabel="Titre (visible sur la page annonce)"
    />
  );
}

