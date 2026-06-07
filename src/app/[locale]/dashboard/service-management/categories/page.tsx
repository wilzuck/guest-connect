import { getLocale } from "next-intl/server";
import { EntityTableClient } from "@/components/admin/EntityTableClient";
import { readDb } from "@/lib/server/db";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();

  return (
    <EntityTableClient
      title="Catégories"
      entity="categories"
      initialRows={db.categories ?? []}
      columns={[
        { key: "name", label: "Nom", renderKey: "name" },
        { key: "slug", label: "Slug", renderKey: "slug" },
      ]}
      createHref={`/${locale}/dashboard/service-management/categories/new`}
      editBaseHref={`/${locale}/dashboard/service-management/categories`}
    />
  );
}
