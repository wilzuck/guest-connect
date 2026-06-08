import { getLocale } from "next-intl/server";
import { EntityTableClient } from "@/components/admin/EntityTableClient";
import { readDb } from "@/lib/server/db";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();

  return (
    <EntityTableClient
      title="Pays"
      entity="countries"
      createHref={`/${locale}/dashboard/service-management/countries/new`}
      editBaseHref={`/${locale}/dashboard/service-management/countries`}
      columns={[
        { key: "name", label: "Pays" },
        { key: "code", label: "Code" },
        { key: "currency", label: "Devise" },
        { key: "active", label: "Actif" },
      ]}
      initialRows={db.countries ?? []}
    />
  );
}
