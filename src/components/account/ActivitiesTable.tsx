"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";

type ActivityItem = {
  id: string;
  date: string;
  title: string;
  detail: string;
  status?: "info" | "success" | "warning";
};

export function ActivitiesTable({ isEn }: { isEn: boolean }) {
  const all = useMemo<ActivityItem[]>(
    () =>
      Array.from({ length: 28 }).map((_, idx) => {
        const n = idx + 1;
        const baseDate = new Date(2026, 5, 1 + idx); // June 2026
        const date = baseDate.toLocaleDateString(isEn ? "en-GB" : "fr-FR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        const templates = isEn
          ? [
              { title: "Saved a listing", detail: "Added a stay to favorites.", status: "info" as const },
              { title: "Search completed", detail: "Destination + dates + guests updated.", status: "success" as const },
              { title: "Reservation updated", detail: "Your booking details were refreshed.", status: "warning" as const },
            ]
          : [
              { title: "Ajout aux favoris", detail: "Un logement a été ajouté aux favoris.", status: "info" as const },
              { title: "Recherche effectuée", detail: "Destination + dates + voyageurs mis à jour.", status: "success" as const },
              { title: "Réservation mise à jour", detail: "Les détails de réservation ont été mis à jour.", status: "warning" as const },
            ];

        const t = templates[idx % templates.length];
        return { id: `act-${n}`, date, ...t };
      }),
    [isEn],
  );

  const pageSize = 8;
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(all.length / pageSize));

  const rows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return all.slice(start, start + pageSize);
  }, [all, page]);

  return (
    <div className="grid gap-4">
      <Card className="p-0 shadow-none">
        <div className="grid grid-cols-12 gap-3 border-b border-black/10 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
          <div className="col-span-3 sm:col-span-2">{isEn ? "Date" : "Date"}</div>
          <div className="col-span-6 sm:col-span-7">{isEn ? "Activity" : "Activité"}</div>
          <div className="col-span-3 sm:col-span-3 text-right">{isEn ? "Status" : "Statut"}</div>
        </div>

        <div className="divide-y divide-black/5">
          {rows.map((r) => (
            <div key={r.id} className="grid grid-cols-12 items-center gap-3 px-4 py-3">
              <div className="col-span-3 sm:col-span-2 text-sm text-zinc-600">{r.date}</div>
              <div className="col-span-6 sm:col-span-7 min-w-0">
                <p className="truncate text-sm font-semibold text-black">{r.title}</p>
                <p className="mt-1 truncate text-sm text-zinc-600">{r.detail}</p>
              </div>
              <div className="col-span-3 sm:col-span-3 flex justify-end">
                <span
                  className={[
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                    r.status === "success"
                      ? "bg-emerald-50 text-emerald-700"
                      : r.status === "warning"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-zinc-100 text-zinc-700",
                  ].join(" ")}
                >
                  {r.status === "success"
                    ? isEn
                      ? "OK"
                      : "OK"
                    : r.status === "warning"
                      ? isEn
                        ? "Pending"
                        : "En attente"
                      : isEn
                        ? "Info"
                        : "Info"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-600">
          {isEn ? "Page" : "Page"} {page} / {pageCount}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-50 transition disabled:opacity-50"
          >
            {isEn ? "Prev" : "Préc."}
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-50 transition disabled:opacity-50"
          >
            {isEn ? "Next" : "Suiv."}
          </button>
        </div>
      </div>
    </div>
  );
}

