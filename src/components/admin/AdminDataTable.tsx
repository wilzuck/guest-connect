"use client";

import { useMemo, useState, type ReactNode } from "react";
import { BarChart3, ChevronDown, Download, RefreshCw, Search, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/utils/cn";

export type AdminDataTableColumn<Row> = {
  key: string;
  label: string;
  render?: (row: Row) => ReactNode;
  searchable?: boolean;
  defaultVisible?: boolean;
  widthClassName?: string;
};

type AdminDataTableProps<Row> = {
  rows: Row[];
  columns: AdminDataTableColumn<Row>[];
  getRowId: (row: Row) => string;
  title?: string;
  emptyLabel?: string;
  searchPlaceholder?: string;
  actionsLabel?: string;
  renderActions?: (row: Row) => ReactNode;
  renderGroupTitle?: (rows: Row[]) => ReactNode;
  groupBy?: (row: Row) => string;
  stats?: Array<{ label: string; value: ReactNode }>;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  exportFilename?: string;
  onRefresh?: () => void;
  className?: string;
};

export function AdminDataTable<Row extends object>({
  rows,
  columns,
  getRowId,
  title,
  emptyLabel = "Aucun enregistrement trouve.",
  searchPlaceholder = "Rechercher...",
  actionsLabel = "Actions",
  renderActions,
  renderGroupTitle,
  groupBy,
  stats,
  pageSizeOptions = [10, 25, 50, 100],
  defaultPageSize = 10,
  exportFilename = "export.csv",
  onRefresh,
  className,
}: AdminDataTableProps<Row>) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [visibleKeys, setVisibleKeys] = useState<string[]>(
    columns.filter((column) => column.defaultVisible !== false).map((column) => column.key),
  );

  const visibleColumns = columns.filter((column) => visibleKeys.includes(column.key));

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((row) =>
      columns.some((column) => {
        if (column.searchable === false) return false;
        const value = column.render ? "" : getValue(row, column.key);
        return String(value ?? "").toLowerCase().includes(q);
      }) || Object.values(row).join(" ").toLowerCase().includes(q),
    );
  }, [columns, query, rows]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pagedRows = filteredRows.slice((safePage - 1) * pageSize, safePage * pageSize);

  const groups = useMemo(() => {
    if (!groupBy) return [{ key: "all", rows: pagedRows }];
    const map = new Map<string, Row[]>();
    for (const row of pagedRows) {
      const key = groupBy(row);
      map.set(key, [...(map.get(key) ?? []), row]);
    }
    return Array.from(map.entries()).map(([key, groupRows]) => ({ key, rows: groupRows }));
  }, [groupBy, pagedRows]);

  const gridTemplateColumns = [
    ...visibleColumns.map((column, index) => column.widthClassName ?? (index === 0 ? "minmax(220px,1.4fr)" : "minmax(140px,1fr)")),
    renderActions ? "112px" : "",
  ].filter(Boolean).join(" ");

  function toggleColumn(key: string) {
    setVisibleKeys((current) => {
      if (current.includes(key)) {
        return current.length === 1 ? current : current.filter((item) => item !== key);
      }
      return [...current, key];
    });
  }

  function exportCsv() {
    const header = visibleColumns.map((column) => escapeCsv(column.label)).join(",");
    const lines = filteredRows.map((row) =>
      visibleColumns.map((column) => escapeCsv(String(getValue(row, column.key) ?? ""))).join(","),
    );
    const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = exportFilename;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={cn("grid gap-3", className)}>
      <div className="flex flex-col gap-3 px-4 lg:px-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          {title ? <h2 className="text-sm font-semibold text-[#202024] dark:text-white">{title}</h2> : null}
          <p className="mt-1 text-xs text-[#8E8E93] dark:text-zinc-400">
            {filteredRows.length} element(s) affiche(s) sur {rows.length}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <label className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-sm text-[#8E8E93] shadow-xs shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:shadow-black/30 sm:w-80">
            <Search className="h-4 w-4" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder={searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-[#202024] outline-none placeholder:text-[#B1B1B7] dark:text-white dark:placeholder:text-zinc-500"
            />
          </label>

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" className="h-10 rounded-lg" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button type="button" variant="outline" size="sm" className="h-10 rounded-lg" onClick={exportCsv}>
              <Download className="h-4 w-4" aria-hidden="true" />
            </Button>
            <details className="relative">
              <summary className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-lg border border-black/10 bg-white text-[#73737A] transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900">
                <Settings2 className="h-4 w-4" aria-hidden="true" />
              </summary>
              <div className="absolute right-0 top-11 z-20 w-56 rounded-xl border border-black/10 bg-white p-3 shadow-lg shadow-black/10 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">Colonnes</p>
                <div className="grid gap-2">
                  {columns.map((column) => (
                    <Checkbox
                      key={column.key}
                      label={column.label}
                      checked={visibleKeys.includes(column.key)}
                      onChange={() => toggleColumn(column.key)}
                    />
                  ))}
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>

      {stats?.length ? (
        <div className="grid gap-2 px-4 lg:px-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-black/10 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
                {stat.label}
              </div>
              <p className="mt-1 text-lg font-semibold text-black dark:text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="overflow-x-auto border-y border-black/10 bg-white dark:border-zinc-800 dark:bg-black">
        <div className="min-w-190">
          <div
            className="grid gap-3 border-b border-black/10 bg-[#FAFAFB] px-4 py-3 text-xs font-medium text-[#8E8E93] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
            style={{ gridTemplateColumns }}
          >
            {visibleColumns.map((column) => (
              <div key={column.key}>{column.label}</div>
            ))}
            {renderActions ? <div className="text-right">{actionsLabel}</div> : null}
          </div>

          {groups.length > 0 && filteredRows.length > 0 ? (
            groups.map((group) => (
              <div key={group.key}>
                {groupBy ? (
                  <div className="flex items-center gap-2 border-b border-black/10 bg-zinc-50 px-4 py-2 text-xs font-semibold text-[#5D5D65] dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300">
                    <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{renderGroupTitle ? renderGroupTitle(group.rows) : group.key}</span>
                    <span className="text-[#A4A4AA] dark:text-zinc-500">{group.rows.length}</span>
                  </div>
                ) : null}

                <div
                  className="
                    max-h-[calc(100dvh-32rem)]
                    overflow-y-auto
                    divide-y divide-black/10 dark:divide-zinc-800
                    scrollbar-thin
                    scrollbar-track-transparent
                    scrollbar-thumb-zinc-300
                    hover:scrollbar-thumb-zinc-400
                    dark:scrollbar-thumb-zinc-700
                    dark:hover:scrollbar-thumb-zinc-600
                  "
                >
                  {group.rows.map((row) => (
                    <div
                      key={getRowId(row)}
                      className="grid items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-900/70"
                      style={{ gridTemplateColumns }}
                    >
                      {visibleColumns.map((column, index) => (
                        <div
                          key={column.key}
                          className={cn(
                            "min-w-0 truncate",
                            index === 0 ? "font-medium text-[#202024] dark:text-white" : "text-[#73737A] dark:text-zinc-400",
                          )}
                        >
                          {column.render ? column.render(row) : String(getValue(row, column.key) ?? "-")}
                        </div>
                      ))}
                      {renderActions ? <div className="flex justify-end">{renderActions(row)}</div> : null}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-10 text-center text-sm text-[#8E8E93] dark:text-zinc-400">{emptyLabel}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 px-4 text-sm pt-2 py-4 text-[#73737A] dark:text-zinc-400 lg:px-6 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2">
          <span>Elements par page</span>
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setPage(1);
            }}
            className="h-9 rounded-lg border border-black/10 bg-white px-2 text-sm text-black dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" disabled={safePage <= 1} onClick={() => setPage((current) => current - 1)}>
            Precedent
          </Button>
          <span>
            Page {safePage} / {totalPages}
          </span>
          <Button type="button" variant="outline" size="sm" disabled={safePage >= totalPages} onClick={() => setPage((current) => current + 1)}>
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}

function escapeCsv(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function getValue<Row extends object>(row: Row, key: string) {
  return (row as Record<string, unknown>)[key];
}
