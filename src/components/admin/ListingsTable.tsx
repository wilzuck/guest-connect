"use client";

import { EntityTableClient } from "./EntityTableClient";
import { Badge } from "@/components/ui/Badge";

const COLUMNS = [
  { key: "title", label: "Titre" },
  { key: "cityId", label: "Lieu", renderKey: "location" },
  { key: "pricePerNight", label: "Prix", renderKey: "price" },
  { key: "categoryId", label: "Catégorie", renderKey: "category" },
];

export  function ListingsTable({
  initialRows,
  createHref,
  editBaseHref,
  catById,   // Map sérialisée en objet depuis le server
  locById,
}: {
  initialRows: Array<Record<string, unknown>>;
  createHref: string;
  editBaseHref: string;
  catById: Record<string, string>;
  locById: Record<string, string>;
}) {
  const renderers = {
    category: (r: Record<string, unknown>) => {
      const id = String(r.categoryId ?? "");
      return <Badge>{catById[id] ?? id}</Badge>;
    },
    location: (r: Record<string, unknown>) => {
      const id = String(r.cityId ?? "");
      return locById[id] ?? id;
    },
    price: (r: Record<string, unknown>) =>
      `${String(r.pricePerNight ?? "—")} ${String(r.currency ?? "EUR")}`,
  };

  return (
    <EntityTableClient
      title="Logements"
      entity="listings"
      initialRows={initialRows}
      columns={COLUMNS}
      createHref={createHref}
      editBaseHref={editBaseHref}
      renderers={renderers}
    />
  );
}