import { getLocale } from "next-intl/server";
import { EntityTableClient } from "@/components/admin/EntityTableClient";
import { Badge } from "@/components/ui/Badge";
import { readDb } from "@/lib/server/db";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();

  const rows = db.experiences ?? [];
  const locations = db.locations ?? [];
  const locById = new Map(
    locations.map((l) => [
      String(l.id),
      `${String(l.city ?? "")}${l.country ? `, ${String(l.country)}` : ""}`,
    ]),
  );

  return (
    <EntityTableClient
      title="Expériences"
      entity="experiences"
      initialRows={rows}
      columns={[
        { key: "title", label: "Titre" },
        { key: "cityId", label: "Lieu", render: (r) => locById.get(String(r.cityId ?? "")) ?? "—" },
        { key: "tag", label: "Tag", render: (r) => <Badge>{String(r.tag ?? "—")}</Badge> },
        {
          key: "priceFrom",
          label: "Prix",
          render: (r) => `${String(r.priceFrom ?? "—")} ${String(r.currency ?? "EUR")}`,
        },
      ]}
      createHref={`/${locale}/dashboard/admin/experiences/new`}
      editHref={(id) => `/${locale}/dashboard/admin/experiences/${id}`}
    />
  );
}

