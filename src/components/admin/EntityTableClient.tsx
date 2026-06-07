"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { Card } from "@/components/ui/Card";

export type Column = {
  key: string;
  label: string;
  renderKey?: string; // clé optionnelle pour un renderer custom
};

export function EntityTableClient({
  title,
  createHref,
  entity,
  columns,
  initialRows,
  editBaseHref,
  renderers = {},
}: {
  title: string;
  createHref: string;
  entity: string;
  columns: Column[];
  initialRows: Array<Record<string, unknown>>;
  editBaseHref: string;
  renderers?: Record<string, (row: Record<string, unknown>) => React.ReactNode>;
}) {
  const [rows, setRows] = useState(initialRows);
  const [pending, startTransition] = useTransition();
  const headerCols = useMemo(() => columns, [columns]);

  async function onDelete(id: string) {
    if (!confirm("Supprimer cet élément ?")) return;
    await fetch(`/api/db/${entity}/${encodeURIComponent(id)}`, { method: "DELETE" });
    startTransition(() => setRows((r) => r.filter((x) => x.id !== id)));
  }
const gridTemplate = `repeat(${columns.length}, minmax(0, 1fr)) 180px`;
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-black">{title}</p>
          <p className="mt-1 text-sm text-zinc-600">{rows.length} élément(s)</p>
        </div>
        <Link
          href={createHref}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-black px-5 text-sm font-semibold text-white transition"
        >
          Ajouter
        </Link>
      </div>

      <Card className="overflow-hidden p-0 shadow-none">
  <div
    className="border-b border-black/10 bg-white px-4 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500"
    style={{
      display: "grid",
      gridTemplateColumns: gridTemplate,
      gap: "0.75rem",
    }}
  >
    {headerCols.map((c) => (
      <div key={c.key}>{c.label}</div>
    ))}
    <div className="text-right">Actions</div>
  </div>

  <div className="divide-y divide-black/5">
    {rows.map((r) => {
      const id = r.id as string;
      if (!id) return null;

      return (
        <div
          key={id}
          className="items-center px-4 py-3"
          style={{
            display: "grid",
            gridTemplateColumns: gridTemplate,
            gap: "0.75rem",
          }}
        >
          {headerCols.map((c) => {
            const renderer = c.renderKey
              ? renderers[c.renderKey]
              : undefined;

            return (
              <div key={c.key} className="min-w-0">
                <div className="truncate text-sm font-normal text-black">
                  {renderer ? renderer(r) : String(r[c.key])}
                </div>
              </div>
            );
          })}

          <div className="flex justify-end gap-2">
            <Link
              href={`${editBaseHref}/${id}`}
              className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-50 transition"
            >
              Modifier
            </Link>

            <button
              type="button"
              onClick={() => onDelete(id)}
              disabled={pending}
              className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-zinc-50 transition disabled:opacity-50"
            >
              Supprimer
            </button>
          </div>
        </div>
      );
    })}
  </div>
</Card>
    </div>
  );
}