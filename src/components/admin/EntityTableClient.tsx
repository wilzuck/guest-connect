"use client";

import Link from "next/link";
import { useMemo, useState, useTransition, type ReactNode } from "react";
import {
  Filter,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";

export type Column = {
  key: string;
  label: string;
  renderKey?: string;
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
  renderers?: Record<string, (row: Record<string, unknown>) => ReactNode>;
}) {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [pending, startTransition] = useTransition();
  const headerCols = useMemo(() => columns, [columns]);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();

    return rows.filter((row) => {
      const haystack = Object.values(row).join(" ").toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      const active = row.active;
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && active !== false) ||
        (filter === "inactive" && active === false);

      return matchesQuery && matchesFilter;
    });
  }, [filter, query, rows]);

  async function onDelete(id: string) {
    if (!confirm("Supprimer cet élément ?")) return;
    await fetch(`/api/db/${entity}/${encodeURIComponent(id)}`, { method: "DELETE" });
    startTransition(() => setRows((r) => r.filter((x) => x.id !== id)));
  }

  const gridTemplate = `minmax(180px, 1.4fr) repeat(${Math.max(
    columns.length - 1,
    0,
  )}, minmax(120px, 1fr)) 132px`;

  return (
    <section className="grid gap-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#202024]">{title}</h1>
          <p className="mt-1 text-sm text-[#8E8E93]">
            {filteredRows.length} élément(s) affiché(s) sur {rows.length}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-[#E8E8EC] bg-white px-3 text-sm text-[#8E8E93] sm:w-72">
            <Search className="h-4 w-4" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher..."
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#B1B1B7]"
            />
          </label>

          <label className="flex h-10 items-center gap-2 rounded-lg border border-[#E8E8EC] bg-white px-3 text-sm font-medium text-[#73737A]">
            <Filter className="h-4 w-4" aria-hidden="true" />
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="bg-transparent outline-none"
            >
              <option value="all">Tous</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
            </select>
          </label>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E8E8EC] bg-white px-3 text-sm font-medium text-[#73737A] transition hover:bg-[#F7F7F8]"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filtrer
          </Button>

          <ButtonLink
            href={createHref}
            variant="primary"
            size="sm"
            className="h-10 rounded-lg"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Ajouter
          </ButtonLink>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E8E8EC] bg-white">
        <div
          className="hidden border-b border-[#E8E8EC] bg-[#FAFAFB] px-4 py-3 text-xs font-medium text-[#8E8E93] lg:grid"
          style={{
            gridTemplateColumns: gridTemplate,
            gap: "0.75rem",
          }}
        >
          {headerCols.map((column) => (
            <div key={column.key}>{column.label}</div>
          ))}
          <div className="text-right">Actions</div>
        </div>

        <div className="divide-y divide-[#EFEFF2]">
          {filteredRows.map((row) => {
            const id = String(row.id ?? "");
            if (!id) return null;

            return (
              <div
                key={id}
                className="px-4 py-4"
              >
                <div
                  className="block space-y-3 lg:grid lg:space-y-0 lg:items-center"
                  style={{
                    gridTemplateColumns: gridTemplate,
                  }}
                >
                  {headerCols.map((column, index) => {
                    const renderer = column.renderKey
                      ? renderers[column.renderKey]
                      : undefined;

                    return (
                      <div key={column.key} className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#A4A4AA] lg:hidden">
                          {column.label}
                        </p>
                        <div
                          className={
                            index === 0
                              ? "truncate text-sm font-semibold text-[#202024]"
                              : "truncate text-sm text-[#73737A]"
                          }
                        >
                          {renderer ? renderer(row) : String(row[column.key] ?? "—")}
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`${editBaseHref}/${id}`}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-[#E8E8EC] text-[#73737A] transition hover:bg-[#F7F7F8] hover:text-[#202024]"
                      aria-label="Modifier"
                      title="Modifier"
                    >
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onDelete(id)}
                      disabled={pending}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-[#E8E8EC] text-[#E04F5F] transition hover:bg-[#FFF3F4] disabled:opacity-50"
                      aria-label="Supprimer"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      className="grid h-9 w-9 place-items-center rounded-lg border border-[#E8E8EC] text-[#73737A] transition hover:bg-[#F7F7F8]"
                      aria-label="Plus d'actions"
                      title="Plus d'actions"
                    >
                      <MoreVertical className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
