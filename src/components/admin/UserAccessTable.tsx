"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminDataTable, type AdminDataTableColumn } from "@/components/admin/AdminDataTable";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

type AccessRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

export function UserAccessTable({
  title,
  description,
  addLabel,
  rows,
}: {
  title: string;
  description: string;
  addLabel: string;
  rows: AccessRow[];
}) {
  const columns: AdminDataTableColumn<AccessRow>[] = [
    { key: "name", label: "Nom", widthClassName: "minmax(220px,1.4fr)" },
    { key: "email", label: "Email / portee", widthClassName: "minmax(220px,1.3fr)" },
    { key: "role", label: "Role", widthClassName: "minmax(140px,1fr)" },
    {
      key: "status",
      label: "Statut",
      widthClassName: "120px",
      render: (row) => <Badge className={statusClassName(row.status)}>{row.status}</Badge>,
    },
    {
      key: "date",
      label: "Date",
      widthClassName: "132px",
      render: () => "Aujourd'hui",
    },
  ];

  return (
    <section className="grid gap-4 dark:text-white">
      <div className="flex flex-col gap-3 px-4 pt-3 lg:px-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#202024] dark:text-white">{title}</h1>
          <p className="mt-1 text-sm text-[#8E8E93] dark:text-zinc-400">{description}</p>
        </div>

        <ButtonLink href="#" variant="primary" size="sm" className="h-10 rounded-lg">
          <Plus className="h-4 w-4" aria-hidden="true" />
          {addLabel}
        </ButtonLink>
      </div>

      <AdminDataTable
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        groupBy={getAccessGroup}
        renderGroupTitle={(groupRows) => groupAccessLabel(getAccessGroup(groupRows[0]))}
        stats={[
          { label: "Total", value: rows.length },
          { label: "A traiter", value: rows.filter((row) => getAccessGroup(row) === "pending").length },
          { label: "Actifs", value: rows.filter((row) => getAccessGroup(row) === "completed").length },
        ]}
        exportFilename={`${title.toLowerCase().replaceAll(" ", "-")}.csv`}
        renderActions={() => (
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="grid h-8 w-8 place-items-center rounded-lg border border-black/10 text-[#73737A] transition hover:bg-zinc-50 hover:text-[#202024] dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900/70 dark:hover:text-white"
              aria-label="Modifier"
            >
              <Pencil className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="grid h-8 w-8 place-items-center rounded-lg border border-black/10 text-[#E04F5F] transition hover:bg-red-50 dark:border-zinc-800 dark:text-red-300 dark:hover:bg-red-950/40"
              aria-label="Supprimer"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      />
    </section>
  );
}

function statusClassName(status: string) {
  const lower = status.toLowerCase();
  if (lower.includes("prioritaire") || lower.includes("attente")) {
    return "rounded-md border-amber-100 bg-amber-50 text-amber-700 shadow-none dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-200";
  }
  if (lower.includes("valid") || lower.includes("confirm") || lower.includes("actif") || lower.includes("ouvert")) {
    return "rounded-md border-emerald-100 bg-emerald-50 text-emerald-700 shadow-none dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-200";
  }
  return "rounded-md border-zinc-100 bg-zinc-50 text-zinc-700 shadow-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300";
}

function getAccessGroup(row: AccessRow) {
  const status = row.status.toLowerCase();
  if (status.includes("attente") || status.includes("valid") || status.includes("prioritaire")) return "pending";
  if (status.includes("confirm") || status.includes("actif")) return "completed";
  return "active";
}

function groupAccessLabel(group: string) {
  if (group === "pending") return "A traiter";
  if (group === "completed") return "Complete";
  return "Aujourd'hui";
}
