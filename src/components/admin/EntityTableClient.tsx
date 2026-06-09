"use client";

import Link from "next/link";
import { useMemo, useState, useTransition, type ReactNode } from "react";
import { ChevronDown, Ellipsis, Eye, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
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
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [previewRow, setPreviewRow] = useState<Record<string, unknown> | null>(null);
  const [pending, startTransition] = useTransition();

  const visibleColumns = columns.slice(0, 2);
  const gridTemplate = "40px minmax(220px,1.55fr) minmax(140px,1fr) minmax(132px,.8fr) 104px";

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => !q || Object.values(row).join(" ").toLowerCase().includes(q));
  }, [query, rows]);

  const groupedRows = useMemo(() => groupRows(filteredRows), [filteredRows]);

  async function onDelete(id: string) {
    if (!confirm("Supprimer cet élément ?")) return;
    await fetch(`/api/db/${entity}/${encodeURIComponent(id)}`, { method: "DELETE" });
    startTransition(() => setRows((current) => current.filter((row) => String(row.id ?? "") !== id)));
    setSelectedIds((current) => current.filter((selectedId) => selectedId !== id));
  }

  async function onBulkDelete() {
    if (selectedIds.length === 0) return;
    if (!confirm(`Supprimer ${selectedIds.length} élément(s) ?`)) return;

    await Promise.all(
      selectedIds.map((id) => fetch(`/api/db/${entity}/${encodeURIComponent(id)}`, { method: "DELETE" })),
    );
    startTransition(() => setRows((current) => current.filter((row) => !selectedIds.includes(String(row.id ?? "")))));
    setSelectedIds([]);
  }

  function toggleSelected(id: string) {
    setSelectedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <section className="grid gap-4 dark:text-white">
      <div className="flex flex-col gap-3 px-4 pt-3 lg:px-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#202024] dark:text-white">{title}</h1>
          <p className="mt-1 text-sm text-[#8E8E93] dark:text-zinc-400">
            {filteredRows.length} élément(s) affiché(s) sur {rows.length}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <label className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-black/5  dark:border-black/10 bg-white px-3 text-sm text-[#8E8E93] shadow-xs shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:shadow-black/30 sm:w-80">
            <Search className="h-4 w-4" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher..."
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#B1B1B7] dark:placeholder:text-zinc-500"
            />
          </label>
          {selectedIds.length > 0 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-10 rounded-lg text-[#E04F5F]"
              disabled={pending}
              onClick={onBulkDelete}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Supprimer ({selectedIds.length})
            </Button>
          ) : (
            <ButtonLink href={createHref} variant="primary" size="sm" className="h-10 rounded-lg">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Ajouter
            </ButtonLink>
          )}
        </div>
      </div>

      <div className="overflow-x-auto border-y border-black/10 bg-white dark:border-zinc-800 dark:bg-black">
        <div className="min-w-[760px]">
          <div
            className="grid border-b border-black/5  dark:border-black/10 bg-[#FAFAFB] px-4 py-3 text-xs font-medium text-[#8E8E93] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
            style={{ gridTemplateColumns: gridTemplate, gap: "0.75rem" }}
          >
            <div />
            {visibleColumns.map((column) => (
              <div key={column.key}>{column.label}</div>
            ))}
            <div>Date</div>
            <div className="text-right">Actions</div>
          </div>

          {groupedRows.map((group) => (
            <div key={group.title}>
              <div className="flex items-center gap-2 border-b border-[#EFEFF2] bg-[#F7F7F8] px-4 py-2 text-xs font-semibold text-[#5D5D65] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{group.title}</span>
                <span className="text-[#A4A4AA] dark:text-zinc-500">{group.rows.length}</span>
              </div>

              <div className="divide-y divide-[#EFEFF2] dark:divide-zinc-800">
                {group.rows.map((row) => {
                  const id = String(row.id ?? "");
                  if (!id) return null;
                  const selected = selectedIds.includes(id);
                  const showValidation = String(row.validationStatus ?? row.status ?? "").toLowerCase().includes("pending");

                  return (
                    <div
                      key={id}
                      className="group/row grid items-center px-4 py-2.5 text-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-900/70"
                      style={{ gridTemplateColumns: gridTemplate, gap: "0.75rem" }}
                    >
                      <label
                        className={[
                          "grid h-8 w-8 place-items-center rounded-lg transition",
                          selected ? "opacity-100" : "opacity-0 group-hover/row:opacity-100 focus-within:opacity-100",
                        ].join(" ")}
                        aria-label="Sélectionner la ligne"
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleSelected(id)}
                          className="h-4 w-4 accent-black"
                        />
                      </label>

                      {visibleColumns.map((column, index) => {
                        const renderer = column.renderKey ? renderers[column.renderKey] : undefined;

                        return (
                          <div
                            key={column.key}
                            className={index === 0 ? "min-w-0 truncate font-medium text-[#202024] dark:text-white" : "min-w-0 truncate text-[#73737A] dark:text-zinc-400"}
                          >
                            {renderer ? renderer(row) : renderCell(row, column.key)}
                          </div>
                        );
                      })}

                      <div className="truncate text-[#73737A] dark:text-zinc-400">{getDisplayDate(row)}</div>

                      <div className="relative flex items-center justify-end gap-2">
                        {showValidation ? <PriorityBadge row={row} /> : null}
                        <button
                          type="button"
                          className="grid h-8 w-8 place-items-center rounded-lg border border-black/10 text-[#73737A] transition hover:bg-zinc-50 hover:text-[#202024] dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900/70 dark:hover:text-white"
                          aria-label="Actions"
                          onClick={() => setOpenMenuId((current) => (current === id ? null : id))}
                        >
                          <Ellipsis className="h-4 w-4" aria-hidden="true" />
                        </button>

                        {openMenuId === id ? (
                          <div className="absolute right-0 top-9 z-20 w-44 overflow-hidden rounded-xl border border-black/5  dark:border-black/10 bg-white p-1 shadow-lg shadow-black/10 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40">
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#202024] hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-900/70"
                              onClick={() => {
                                setPreviewRow(row);
                                setOpenMenuId(null);
                              }}
                            >
                              <Eye className="h-4 w-4" aria-hidden="true" />
                              Visualiser
                            </button>
                            <Link
                              href={`${editBaseHref}/${id}`}
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#202024] hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-900/70"
                            >
                              <Pencil className="h-4 w-4" aria-hidden="true" />
                              Éditer
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null);
                                onDelete(id);
                              }}
                              disabled={pending}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#E04F5F] hover:bg-[#FFF3F4] disabled:opacity-50 dark:text-red-300 dark:hover:bg-red-950/40"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                              Supprimer
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {previewRow ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4 py-8 dark:bg-black/70" role="dialog" aria-modal="true">
          <div className="max-h-[min(720px,90dvh)] w-full max-w-2xl border border-black/10 dark:border-zinc-800 overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/20 dark:bg-zinc-950 dark:shadow-black/60">
            <div className="flex items-center justify-between border-b border-black/5  dark:border-black/10 px-5 py-4 dark:border-zinc-800">
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{"Détail de l'élément"}</p>
                <p className="mt-1 text-xs text-[#8E8E93]">{String(previewRow.id ?? "")}</p>
              </div>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-[#F7F7F8] dark:text-white dark:hover:bg-zinc-900"
                onClick={() => setPreviewRow(null)}
                aria-label="Fermer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-[calc(min(720px,90dvh)-73px)] overflow-y-auto p-5">
              <dl className="grid gap-3 sm:grid-cols-2">
                {Object.entries(previewRow).map(([key, value]) => (
                  <div key={key} className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8E8E93]">{key}</dt>
                    <dd className="mt-2 whitespace-pre-wrap break-words text-sm text-zinc-900 dark:text-zinc-100">{formatPreviewValue(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function renderCell(row: Record<string, unknown>, key: string) {
  const value = row[key];
  if (key === "validationStatus" || key === "status") return <StatusBadge value={value} />;
  if (key === "active") return <StatusBadge value={value ? "active" : "inactive"} />;
  return String(value ?? "-");
}

function StatusBadge({ value }: { value: unknown }) {
  const status = String(value ?? "pending").toLowerCase();
  const positive = status === "approved" || status === "active" || status === "true";
  const negative = status === "rejected" || status === "inactive" || status === "false";
  const label = positive ? "Actif" : negative ? "Inactif" : "À valider";
  const className = positive
    ? "rounded-md border-emerald-100 bg-emerald-50 text-emerald-700 shadow-none"
    : negative
      ? "rounded-md border-red-100 bg-red-50 text-red-700 shadow-none"
      : "rounded-md border-amber-100 bg-amber-50 text-amber-700 shadow-none";

  return <Badge className={className}>{label}</Badge>;
}

function PriorityBadge({ row }: { row: Record<string, unknown> }) {
  const group = getRowGroup(row);
  const label = group === "pending" ? "Valider" : group === "active" ? "Moyen" : "OK";
  const className =
    group === "pending"
      ? "rounded-md border-red-100 bg-red-50 text-red-700 shadow-none"
      : group === "active"
        ? "rounded-md border-amber-100 bg-amber-50 text-amber-700 shadow-none"
        : "rounded-md border-emerald-100 bg-emerald-50 text-emerald-700 shadow-none";

  return <Badge className={className}>{label}</Badge>;
}

function groupRows(rows: Array<Record<string, unknown>>) {
  const pending = rows.filter((row) => getRowGroup(row) === "pending");
  const active = rows.filter((row) => getRowGroup(row) === "active");
  const completed = rows.filter((row) => getRowGroup(row) === "completed");

  return [
    { title: "À traiter", rows: pending },
    { title: "Aujourd'hui", rows: active },
    { title: "Complété", rows: completed },
  ].filter((group) => group.rows.length > 0);
}

function getRowGroup(row: Record<string, unknown>) {
  const raw = String(row.validationStatus ?? row.status ?? row.active ?? "").toLowerCase();
  if (raw.includes("pending") || raw.includes("attente") || raw.includes("valid")) return "pending";
  if (raw.includes("approved") || raw.includes("confirm") || raw.includes("actif") || raw === "true") return "completed";
  return "active";
}

function getDisplayDate(row: Record<string, unknown>) {
  const value = row.updatedAt ?? row.createdAt ?? row.validationUpdatedAt ?? row.submittedAt;
  if (typeof value === "string" && value.length > 0) return value.slice(0, 16);
  return "Aujourd'hui";
}

function formatPreviewValue(value: unknown) {
  if (value == null || value === "") return "-";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}
