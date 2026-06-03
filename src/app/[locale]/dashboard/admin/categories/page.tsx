import { getLocale } from "next-intl/server";
import { EntityTableClient } from "@/components/admin/EntityTableClient";
import { readDb } from "@/lib/server/db";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();
  const rows = db.categories ?? [];

  return (
    <EntityTableClient
      title="Catégories"
      entity="categories"
      initialRows={rows}
      columns={[
        { key: "name", label: "Nom" },
        { key: "slug", label: "Slug" },
      ]}
      createHref={`/${locale}/dashboard/admin/categories/new`}
      editHref={(id) => `/${locale}/dashboard/admin/categories/${id}`}
    />
  );
}

