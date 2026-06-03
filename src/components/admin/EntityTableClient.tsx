"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { Card } from "@/components/ui/Card";

export type Column = {
  key: string;
  label: string;
  render?: (row: Record<string, unknown>) => React.ReactNode;
};

export function EntityTableClient({
  title,
  createHref,
  entity,
  columns,
  initialRows,
  editHref,
}: {
  title: string;
  createHref: string;
  entity: string;
  columns: Column[];
  initialRows: Array<Record<string, unknown>>;
  editHref: (id: string) => string;
}) {
  const [rows, setRows] = useState(initialRows);
  const [pending, startTransition] = useTransition();

  const headerCols = useMemo(() => columns, [columns]);

  async function onDelete(id: string) {
    if (!confirm("Supprimer cet élément ?")) return;
    await fetch(`/api/db/${entity}/${encodeURIComponent(id)}`, { method: "DELETE" });
    startTransition(() => setRows((r) => r.filter((x) => x.id !== id)));
  }

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
        <div className="grid grid-cols-12 gap-3 border-b border-black/10 bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
          {headerCols.map((c) => (
            <div key={c.key} className="col-span-4 sm:col-span-3">
              {c.label}
            </div>
          ))}
          <div className="col-span-4 sm:col-span-3 text-right">Actions</div>
        </div>

        <div className="divide-y divide-black/5">
          {rows.map((r) => {
            const id = String(r.id ?? "");
            return (
              <div key={id} className="grid grid-cols-12 items-center gap-3 px-4 py-3">
                {headerCols.map((c) => (
                  <div key={c.key} className="col-span-4 sm:col-span-3 min-w-0">
                    <div className="truncate text-sm font-semibold text-black">
                      {c.render ? c.render(r) : String(r[c.key] ?? "")}
                    </div>
                  </div>
                ))}

                <div className="col-span-4 sm:col-span-3 flex justify-end gap-2">
                  <Link
                    href={editHref(id)}
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

