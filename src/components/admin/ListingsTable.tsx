"use client";

import { EntityTableClient } from "./EntityTableClient";
import { Badge } from "@/components/ui/Badge";

const COLUMNS = [
  { key: "title", label: "Titre" },
  { key: "cityId", label: "Lieu", renderKey: "location" },
  { key: "pricePerNight", label: "Prix", renderKey: "price" },
  { key: "categoryId", label: "Catégorie", renderKey: "category" },
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
