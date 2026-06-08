"use client";

import { EntityTableClient } from "./EntityTableClient";
import { Badge } from "@/components/ui/Badge";

const COLUMNS = [
  { key: "title", label: "Titre" },
  { key: "cityId", label: "Lieu", renderKey: "location" },
  { key: "pricePerNight", label: "Prix", renderKey: "price" },
  { key: "categoryId", label: "Type", renderKey: "category" },
  { key: "validationStatus", label: "Validation", renderKey: "validation" },
];

export function ListingsTable({
  title = "Logements",
  entity = "listings",
  initialRows,
  createHref,
  editBaseHref,
  catById,
  locById,
}: {
  title?: string;
  entity?: "listings" | "experiences";
  initialRows: Array<Record<string, unknown>>;
  createHref: string;
  editBaseHref: string;
  catById: Record<string, string>;
  locById: Record<string, string>;
}) {
  const renderers = {
    category: (row: Record<string, unknown>) => {
      const id = String(row.categoryId ?? "");
      return <Badge>{catById[id] ?? id}</Badge>;
    },
    location: (row: Record<string, unknown>) => {
      const id = String(row.cityId ?? "");
      return locById[id] ?? id;
    },
    validation: (row: Record<string, unknown>) => {
      const status = String(row.validationStatus ?? "pending");
      const label =
        status === "approved" ? "Validé" : status === "rejected" ? "Refusé" : "À valider";
      const className =
        status === "approved"
          ? "border-emerald-100 bg-emerald-50 text-emerald-700"
          : status === "rejected"
            ? "border-red-100 bg-red-50 text-red-700"
            : "border-amber-100 bg-amber-50 text-amber-700";

      return <Badge className={className}>{label}</Badge>;
    },
    price: (row: Record<string, unknown>) =>
      `${String(row.pricePerNight ?? "—")} ${String(row.currency ?? "EUR")}`,
  };

  return (
    <EntityTableClient
      title={title}
      entity={entity}
      initialRows={initialRows}
      columns={COLUMNS}
      createHref={createHref}
      editBaseHref={editBaseHref}
      renderers={renderers}
    />
  );
}
