"use client";

import Link from "next/link";
import { useMemo, useState, useTransition, type ReactNode } from "react";
import { ChevronDown, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

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
  const [pending, startTransition] = useTransition();

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => !q || Object.values(row).join(" ").toLowerCase().includes(q));
  }, [query, rows]);

  const groupedRows = useMemo(() => groupRows(filteredRows), [filteredRows]);
  const gridTemplate = `minmax(240px,1.5fr) repeat(${Math.max(columns.length - 1, 0)}, minmax(120px,1fr)) minmax(108px,.7fr) minmax(132px,.8fr) 104px`;

  async function onDelete(id: string) {
    if (!confirm("Supprimer cet élément ?")) return;
    await fetch(`/api/db/${entity}/${encodeURIComponent(id)}`, { method: "DELETE" });
    startTransition(() => setRows((current) => current.filter((row) => row.id !== id)));
  }

  return (
    <section className="grid gap-4">
      <div className="flex flex-col gap-3 px-4 lg:px-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#202024]">{title}</h1>
          <p className="mt-1 text-sm text-[#8E8E93]">
            {filteredRows.length} élément(s) affiché(s) sur {rows.length}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-[#E8E8EC] bg-white px-3 text-sm text-[#8E8E93] shadow-xs shadow-black/5 sm:w-80">
            <Search className="h-4 w-4" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher..."
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#B1B1B7]"
            />
          </label>

          <ButtonLink href={createHref} variant="primary" size="sm" className="h-10 rounded-lg">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Ajouter
          </ButtonLink>
        </div>
      </div>

      <div className="overflow-x-auto border-y border-[#E8E8EC] bg-white">
        <div className="min-w-[920px]">
          <div
            className="grid border-b border-[#E8E8EC] bg-[#FAFAFB] px-4 py-3 text-xs font-medium text-[#8E8E93]"
            style={{ gridTemplateColumns: gridTemplate, gap: "0.75rem" }}
          >
            {columns.map((column) => (
              <div key={column.key}>{column.label}</div>
            ))}
            <div>Priorité</div>
            <div>Date</div>
            <div className="text-right">Actions</div>
          </div>

          {groupedRows.map((group) => (
            <div key={group.title}>
              <div className="flex items-center gap-2 border-b border-[#EFEFF2] bg-[#F7F7F8] px-4 py-2 text-xs font-semibold text-[#5D5D65]">
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{group.title}</span>
                <span className="text-[#A4A4AA]">{group.rows.length}</span>
              </div>

              <div className="divide-y divide-[#EFEFF2]">
                {group.rows.map((row) => {
                  const id = String(row.id ?? "");
                  if (!id) return null;

                  return (
                    <div
                      key={id}
                      className="grid px-4 py-2.5 text-sm transition hover:bg-[#FAFAFB]"
                      style={{ gridTemplateColumns: gridTemplate, gap: "0.75rem" }}
                    >
                      {columns.map((column, index) => {
                        const renderer = column.renderKey ? renderers[column.renderKey] : undefined;

                        return (
                          <div
                            key={column.key}
                            className={index === 0 ? "min-w-0 truncate font-medium text-[#202024]" : "min-w-0 truncate text-[#73737A]"}
                          >
                            {renderer ? renderer(row) : renderCell(row, column.key)}
                          </div>
                        );
                      })}
                      <div>
                        <PriorityBadge row={row} />
                      </div>
                      <div className="truncate text-[#73737A]">{getDisplayDate(row)}</div>
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`${editBaseHref}/${id}`}
                          className="grid h-8 w-8 place-items-center rounded-lg border border-[#E8E8EC] text-[#73737A] transition hover:bg-[#F7F7F8] hover:text-[#202024]"
                          aria-label="Modifier"
                          title="Modifier"
                        >
                          <Pencil className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => onDelete(id)}
                          disabled={pending}
                          className="grid h-8 w-8 place-items-center rounded-lg border border-[#E8E8EC] text-[#E04F5F] transition hover:bg-[#FFF3F4] disabled:opacity-50"
                          aria-label="Supprimer"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderCell(row: Record<string, unknown>, key: string) {
  const value = row[key];
  if (key === "validationStatus" || key === "status") return <StatusBadge value={value} />;
  if (key === "active") return <StatusBadge value={value ? "active" : "inactive"} />;
  return String(value ?? "—");
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
  const label = group === "pending" ? "High" : group === "active" ? "Medium" : "Low";
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
