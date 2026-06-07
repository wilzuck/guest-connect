import { getLocale } from "next-intl/server";
import { readDb } from "@/lib/server/db";
import { ListingsTable } from "@/components/admin/ListingsTable";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();

  const catById = Object.fromEntries(
    (db.categories ?? []).map((c) => [
      String(c.id),
      String(c.name ?? c.id),
    ]),
  );

  const locById = Object.fromEntries(
    (db.locations ?? []).map((l) => [
      String(l.id),
      `${String(l.city ?? "")}${l.country ? `, ${String(l.country)}` : ""}`,
    ]),
  );

  return (
    <ListingsTable
      initialRows={db.listings ?? []}
      createHref={`/${locale}/dashboard/admin/listings/new`}
      editBaseHref={`/${locale}/dashboard/admin/listings/edit`}
      catById={catById}
      locById={locById}
    />
  );
}