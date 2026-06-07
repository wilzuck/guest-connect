import { getLocale } from "next-intl/server";
import { EntityTableClient } from "@/components/admin/EntityTableClient";
import { readDb } from "@/lib/server/db";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();
  const rows = db.locations ?? [];

  return (
    <EntityTableClient
      title="Lieux"
      entity="locations"
      initialRows={rows}
      columns={[
        { key: "city", label: "Ville" },
        { key: "country", label: "Pays" },
        { key: "countryCode", label: "Code" },
      ]}
      createHref={`/${locale}/dashboard/service-management/locations/new`}
      editBaseHref={`/${locale}/dashboard/service-management/locations`}
    />
  );
}

