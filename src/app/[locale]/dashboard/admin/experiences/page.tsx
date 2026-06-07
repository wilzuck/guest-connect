import { getLocale } from "next-intl/server";
import { readDb } from "@/lib/server/db";
import { ListingsTable } from "@/components/admin/ListingsTable";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();

  const locById = Object.fromEntries(
    (db.locations ?? []).map((l) => [
      String(l.id),
      `${String(l.city ?? "")}${l.country ? `, ${String(l.country)}` : ""}`,
    ]),
  );

  return (
    <ListingsTable
      title="Expériences"
      entity="experiences"
      initialRows={db.experiences ?? []}
      createHref={`/${locale}/dashboard/admin/experiences/new`}
      editBaseHref={`/${locale}/dashboard/admin/experiences`}
      locById={locById}
      catById={{}}
    />
  );
}
