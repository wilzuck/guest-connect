import { getLocale } from "next-intl/server";
import { EntityTableClient } from "@/components/admin/EntityTableClient";
import { readDb } from "@/lib/server/db";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();

  return (
    <EntityTableClient
      title="Devises"
      entity="currencies"
      createHref={`/${locale}/dashboard/service-management/currencies/new`}
      editBaseHref={`/${locale}/dashboard/service-management/currencies`}
      columns={[
        { key: "name", label: "Nom" },
        { key: "code", label: "Code" },
        { key: "symbol", label: "Symbole" },
        { key: "minDiscount", label: "Remise min" },
        { key: "maxDiscount", label: "Remise max" },
      ]}
      initialRows={db.currencies ?? []}
    />
  );
}
