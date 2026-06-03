import { getLocale } from "next-intl/server";
import { EntityTableClient } from "@/components/admin/EntityTableClient";
import { Badge } from "@/components/ui/Badge";
import { readDb } from "@/lib/server/db";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();

  const rows = db.listings ?? [];
  const categories = db.categories ?? [];
  const locations = db.locations ?? [];

  const catById = new Map(categories.map((c) => [String(c.id), String(c.name ?? c.id)]));
  const locById = new Map(
    locations.map((l) => [
      String(l.id),
      `${String(l.city ?? "")}${l.country ? `, ${String(l.country)}` : ""}`,
    ]),
  );

  return (
    <EntityTableClient
      title="Logements"
      entity="listings"
      initialRows={rows}
      columns={[
        { key: "title", label: "Titre" },
        { key: "cityId", label: "Lieu", render: (r) => locById.get(String(r.cityId ?? "")) ?? String(r.location ?? "—") },
        {
          key: "pricePerNight",
          label: "Prix",
          render: (r) => `${String(r.pricePerNight ?? "—")} ${String(r.currency ?? "EUR")}`,
        },
        {
          key: "categoryId",
          label: "Catégorie",
          render: (r) => <Badge>{catById.get(String(r.categoryId ?? "")) ?? String(r.categoryId ?? "—")}</Badge>,
        },
      ]}
      createHref={`/${locale}/dashboard/admin/listings/new`}
      editHref={(id) => `/${locale}/dashboard/admin/listings/${id}`}
    />
  );
}

