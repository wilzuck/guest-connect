import { getLocale } from "next-intl/server";
import { EntityTableClient } from "@/components/admin/EntityTableClient";
import { readDb } from "@/lib/server/db";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();
  const rows = db.services ?? [];

  return (
    <EntityTableClient
      title="Services"
      entity="services"
      initialRows={rows}
      columns={[
        { key: "name", label: "Nom" },
        { key: "slug", label: "Slug" },
        {
          key: "active",
          label: "Statut"
        },
      ]}
      createHref={`/${locale}/dashboard/admin/services/new`}
      editBaseHref={`/${locale}/dashboard/admin/services`}
    />
  );
}

