"use client";

import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

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

  return (
    <section className="grid gap-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#202024]">{title}</h1>
          <p className="mt-1 text-sm text-[#8E8E93]">{description}</p>
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
          <ButtonLink href="#" variant="primary" size="sm" className="h-10 rounded-lg">
            <Plus className="h-4 w-4" aria-hidden="true" />
            {addLabel}
          </ButtonLink>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E8E8EC] bg-white">
        <div className="hidden grid-cols-[1.3fr_1.2fr_1fr_1fr_120px] gap-3 border-b border-[#E8E8EC] bg-[#FAFAFB] px-4 py-3 text-xs font-medium text-[#8E8E93] lg:grid">
          <div>Nom</div>
          <div>Email / portée</div>
          <div>Rôle</div>
          <div>Statut</div>
          <div className="text-right">Actions</div>
        </div>

        <div className="divide-y divide-[#EFEFF2]">
          {filteredRows.map((row) => (
            <div
              key={row.id}
              className="grid gap-3 px-4 py-4 lg:grid-cols-[1.3fr_1.2fr_1fr_1fr_120px] lg:items-center"
            >
              <div>
                <p className="text-sm font-semibold text-[#202024]">{row.name}</p>
                <p className="mt-1 text-xs text-[#8E8E93] lg:hidden">{row.email}</p>
              </div>
              <div className="hidden truncate text-sm text-[#73737A] lg:block">{row.email}</div>
              <div className="text-sm text-[#73737A]">{row.role}</div>
              <div>
                <Badge className={statusClassName(row.status)}>
                  {row.status}
                </Badge>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-[#E8E8EC] text-[#73737A]"
                  aria-label="Modifier"
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-[#E8E8EC] text-[#E04F5F]"
                  aria-label="Supprimer"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
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
