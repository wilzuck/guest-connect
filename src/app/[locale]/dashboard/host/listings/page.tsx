import { getLocale } from "next-intl/server";
import { EntityTableClient } from "@/components/admin/EntityTableClient";
import { Badge } from "@/components/ui/Badge";
import { readDb } from "@/lib/server/db";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();

  const rows = db.listings ?? [];
  const categories = db.categories ?? [];

  const catById = new Map(categories.map((c) => [String(c.id), String(c.name ?? c.id)]));

  return (
    <EntityTableClient
      title="Mes logements"
      entity="listings"
      initialRows={rows}
      columns={[
        { key: "title", label: "Titre" },
        { key: "location", label: "Localisation" },
        { key: "pricePerNight", label: "Prix", render: (r) => `${String(r.pricePerNight ?? "—")} ${String(r.currency ?? "EUR")}` },
        {
          key: "categoryId",
          label: "Catégorie",
          render: (r) => <Badge>{catById.get(String(r.categoryId ?? "")) ?? String(r.categoryId ?? "—")}</Badge>,
        },
      ]}
      createHref={`/${locale}/dashboard/host/listings/new`}
      editHref={(id) => `/${locale}/dashboard/host/listings/${id}`}
    />
  );
}

