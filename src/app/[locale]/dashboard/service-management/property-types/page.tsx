import { getLocale } from "next-intl/server";
import { EntityTableClient } from "@/components/admin/EntityTableClient";
import { readDb } from "@/lib/server/db";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();

  return (
    <EntityTableClient
      title="Types de propriété"
      entity="propertyTypes"
      createHref={`/${locale}/dashboard/service-management/property-types/new`}
      editBaseHref={`/${locale}/dashboard/service-management/property-types`}
      columns={[
        { key: "name", label: "Nom" },
        { key: "slug", label: "Slug" },
        { key: "icon", label: "Icône" },
        { key: "description", label: "Description" },
      ]}
      initialRows={db.propertyTypes ?? []}
    />
  );
}
