import { getLocale } from "next-intl/server";
import { EntityTableClient } from "@/components/admin/EntityTableClient";
import { Badge } from "@/components/ui/Badge";
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
          label: "Statut",
          render: (r) => (
            <Badge className={r.active ? "text-emerald-700" : "text-zinc-500"}>
              {r.active ? "Actif" : "Inactif"}
            </Badge>
          ),
        },
      ]}
      createHref={`/${locale}/dashboard/admin/services/new`}
      editHref={(id) => `/${locale}/dashboard/admin/services/${id}`}
    />
  );
}

