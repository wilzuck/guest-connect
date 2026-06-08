import { getLocale } from "next-intl/server";
import { readDb } from "@/lib/server/db";
import { ListingsTable } from "@/components/admin/ListingsTable";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();

  const catById = Object.fromEntries(
    (db.propertyTypes ?? []).map((type) => [String(type.id), String(type.name ?? type.id)]),
  );
  const locById = Object.fromEntries(
    (db.locations ?? []).map((l) => [
      String(l.id),
      `${String(l.city ?? "")}${l.country ? `, ${String(l.country)}` : ""}`,
    ]),
  );

  return (
    <ListingsTable
      title="Gestion hôte"
      initialRows={db.listings ?? []}
      createHref={`/${locale}/dashboard/service-management/listings/new`}
      editBaseHref={`/${locale}/dashboard/service-management/listings`}
      catById={catById}
      locById={locById}
    />
  );
}
