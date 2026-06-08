"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { Check, Clock3, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export type ApprovalItem = {
  id: string;
  entity: string;
  entityLabel: string;
  title: string;
  subtitle: string;
  submittedBy: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  href?: string;
  canPersist?: boolean;
};

export function ApprovalsQueueClient({ initialItems }: { initialItems: ApprovalItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) =>
      !q
        ? true
        : `${item.entityLabel} ${item.title} ${item.subtitle} ${item.submittedBy}`
            .toLowerCase()
            .includes(q),
    );
  }, [items, query]);

  const pendingCount = items.filter((item) => item.status === "pending").length;

  async function updateStatus(item: ApprovalItem, status: ApprovalItem["status"]) {
    if (item.canPersist) {
      await fetch(`/api/db/${item.entity}/${encodeURIComponent(item.id)}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          validationStatus: status,
          validationUpdatedAt: new Date().toISOString(),
        }),
      });
    }

    startTransition(() => {
      setItems((current) =>
        current.map((row) => (row.id === item.id && row.entity === item.entity ? { ...row, status } : row)),
      );
    });
  }

  return (
    <section className="grid gap-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#202024]">À valider</h1>
          <p className="mt-1 text-sm text-[#8E8E93]">
            {pendingCount} élément(s) en attente sur {items.length} contenu(s) contrôlés.
          </p>
        </div>

        <label className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-[#E8E8EC] bg-white px-3 text-sm text-[#8E8E93] sm:w-80">
          <Search className="h-4 w-4" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un contenu..."
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#B1B1B7]"
          />
        </label>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E8E8EC] bg-white">
        <div className="grid grid-cols-[1.4fr_140px_160px_148px] gap-3 border-b border-[#E8E8EC] bg-[#FAFAFB] px-4 py-3 text-xs font-medium text-[#8E8E93] max-lg:hidden">
          <div>Contenu</div>
          <div>Type</div>
          <div>Soumis par</div>
          <div className="text-right">Décision</div>
        </div>

        <div className="divide-y divide-[#EFEFF2]">
          {filteredItems.map((item) => (
            <article
              key={`${item.entity}-${item.id}`}
              className="grid gap-3 px-4 py-4 lg:grid-cols-[1.4fr_140px_160px_148px] lg:items-center"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <StatusDot status={item.status} />
                  {item.href ? (
                    <Link href={item.href} className="truncate text-sm font-semibold text-[#202024] hover:underline">
                      {item.title}
                    </Link>
                  ) : (
                    <p className="truncate text-sm font-semibold text-[#202024]">{item.title}</p>
                  )}
                </div>
                <p className="mt-1 truncate text-sm text-[#73737A]">{item.subtitle}</p>
              </div>

              <div>
                <Badge className="rounded-md bg-[#F7F7F8] shadow-none">{item.entityLabel}</Badge>
              </div>

              <div className="text-sm text-[#73737A]">
                <p className="truncate font-medium text-[#202024]">{item.submittedBy}</p>
                <p className="mt-1 text-xs text-[#8E8E93]">{item.submittedAt}</p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={pending || item.status === "rejected"}
                  className="h-9 rounded-lg px-3 text-[#E04F5F]"
                  onClick={() => updateStatus(item, "rejected")}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={pending || item.status === "approved"}
                  className="h-9 rounded-lg px-3"
                  onClick={() => updateStatus(item, "approved")}
                >
                  <Check className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatusDot({ status }: { status: ApprovalItem["status"] }) {
  const classes =
    status === "approved"
      ? "bg-[#37B7A8]"
      : status === "rejected"
        ? "bg-[#E04F5F]"
        : "bg-[#F6B44B]";

  return (
    <span className={`grid h-5 w-5 place-items-center rounded-full ${classes}`}>
      <Clock3 className="h-3 w-3 text-white" aria-hidden="true" />
    </span>
  );
}
