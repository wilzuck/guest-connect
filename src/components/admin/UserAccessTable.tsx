"use client";

import { ChevronDown, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
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
  const [query, setQuery] = useState("");
  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => !q || Object.values(row).join(" ").toLowerCase().includes(q));
  }, [query, rows]);
  const groupedRows = useMemo(() => groupAccessRows(filteredRows), [filteredRows]);

  return (
    <section className="grid gap-4 dark:text-white">
      <div className="flex flex-col gap-3 px-4 pt-3 lg:px-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#202024] dark:text-white">{title}</h1>
          <p className="mt-1 text-sm text-[#8E8E93] dark:text-zinc-400">{description}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <label className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-[#E8E8EC] bg-white px-3 text-sm text-[#8E8E93] shadow-xs shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:shadow-black/30 sm:w-80">
            <Search className="h-4 w-4" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher..."
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#B1B1B7] dark:placeholder:text-zinc-500"
            />
          </label>
          <ButtonLink href="#" variant="primary" size="sm" className="h-10 rounded-lg">
            <Plus className="h-4 w-4" aria-hidden="true" />
            {addLabel}
          </ButtonLink>
        </div>
      </div>

      <div className="overflow-x-auto border-y border-[#E8E8EC] bg-white dark:border-zinc-800 dark:bg-black">
        <div className="min-w-[820px]">
          <div className="grid grid-cols-[1.4fr_1.3fr_1fr_120px_132px_104px] gap-3 border-b border-[#E8E8EC] bg-[#FAFAFB] px-4 py-3 text-xs font-medium text-[#8E8E93] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            <div>Nom</div>
            <div>Email / portée</div>
            <div>Rôle</div>
            <div>Statut</div>
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
                {group.rows.map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-[1.4fr_1.3fr_1fr_120px_132px_104px] gap-3 px-4 py-2.5 text-sm transition hover:bg-[#FAFAFB] dark:hover:bg-zinc-950"
                  >
                    <div className="truncate font-medium text-[#202024] dark:text-white">{row.name}</div>
                    <div className="truncate text-[#73737A] dark:text-zinc-400">{row.email}</div>
                    <div className="truncate text-[#73737A] dark:text-zinc-400">{row.role}</div>
                    <div>
                      <Badge className={statusClassName(row.status)}>{row.status}</Badge>
                    </div>
                    <div className="truncate text-[#73737A] dark:text-zinc-400">{"Aujourd'hui"}</div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="grid h-8 w-8 place-items-center rounded-lg border border-[#E8E8EC] text-[#73737A] transition hover:bg-[#F7F7F8] hover:text-[#202024] dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                        aria-label="Modifier"
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="grid h-8 w-8 place-items-center rounded-lg border border-[#E8E8EC] text-[#E04F5F] transition hover:bg-[#FFF3F4] dark:border-zinc-800 dark:text-red-300 dark:hover:bg-red-950/40"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function statusClassName(status: string) {
  const lower = status.toLowerCase();
  if (lower.includes("prioritaire") || lower.includes("attente")) {
    return "rounded-md border-amber-100 bg-amber-50 text-amber-700 shadow-none";
  }
  if (lower.includes("valid") || lower.includes("confirm") || lower.includes("actif") || lower.includes("ouvert")) {
    return "rounded-md border-emerald-100 bg-emerald-50 text-emerald-700 shadow-none";
  }
  return "rounded-md border-zinc-100 bg-zinc-50 text-zinc-700 shadow-none";
}

function groupAccessRows(rows: AccessRow[]) {
  const pending = rows.filter((row) => {
    const status = row.status.toLowerCase();
    return status.includes("attente") || status.includes("valid") || status.includes("prioritaire");
  });
  const completed = rows.filter((row) => row.status.toLowerCase().includes("confirm") || row.status.toLowerCase().includes("actif"));
  const active = rows.filter((row) => !pending.includes(row) && !completed.includes(row));

  return [
    { title: "À traiter", rows: pending },
    { title: "Aujourd'hui", rows: active },
    { title: "Complété", rows: completed },
  ].filter((group) => group.rows.length > 0);
}
