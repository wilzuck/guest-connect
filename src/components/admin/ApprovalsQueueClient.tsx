"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
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

type ApprovalGroup = {
  label: string;
  items: ApprovalItem[];
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

  const groups = useMemo<ApprovalGroup[]>(() => {
    const pendingItems = filteredItems.filter((item) => item.status === "pending");
    const approvedItems = filteredItems.filter((item) => item.status === "approved");
    const rejectedItems = filteredItems.filter((item) => item.status === "rejected");

    return [
      { label: "À traiter", items: pendingItems },
      { label: "Validés", items: approvedItems },
      { label: "Refusés", items: rejectedItems },
    ].filter((group) => group.items.length > 0);
  }, [filteredItems]);

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
      <div className="flex flex-col gap-3 px-4 lg:px-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#202024]">À valider</h1>
          <p className="mt-1 text-sm text-[#8E8E93]">
            {pendingCount} élément(s) en attente sur {items.length} contenu(s) contrôlés.
          </p>
        </div>

        <label className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-[#E8E8EC] bg-white px-3 text-sm text-[#8E8E93] shadow-xs shadow-black/5 sm:w-80">
          <Search className="h-4 w-4" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un contenu..."
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#B1B1B7]"
          />
        </label>
      </div>

      <div className="overflow-x-auto border-y border-[#E8E8EC] bg-white">
        <div className="min-w-[980px]">
          <div className="grid grid-cols-[1.55fr_132px_116px_116px_150px_132px_116px] gap-3 border-b border-[#E8E8EC] bg-[#FAFAFB] px-4 py-3 text-xs font-medium text-[#8E8E93]">
            <div>Contenu</div>
            <div>Type</div>
            <div>Statut</div>
            <div>Priorité</div>
            <div>Soumis par</div>
            <div>Date</div>
            <div className="text-right">Actions</div>
          </div>

          {groups.length > 0 ? (
            groups.map((group) => (
              <section key={group.label}>
                <div className="flex items-center gap-2 border-b border-[#EFEFF2] bg-[#F7F7F8] px-4 py-2 text-xs font-medium text-[#5F5F66]">
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{group.label}</span>
                  <span className="text-[#B1B1B7]">{group.items.length}</span>
                </div>

                <div className="divide-y divide-[#EFEFF2]">
                  {group.items.map((item) => (
                    <article
                      key={`${item.entity}-${item.id}`}
                      className="grid grid-cols-[1.55fr_132px_116px_116px_150px_132px_116px] items-center gap-3 px-4 py-3 text-sm transition hover:bg-[#FAFAFB]"
                    >
                      <div className="min-w-0">
                        {item.href ? (
                          <Link href={item.href} className="truncate font-medium text-[#202024] hover:underline">
                            {item.title}
                          </Link>
                        ) : (
                          <p className="truncate font-medium text-[#202024]">{item.title}</p>
                        )}
                        <p className="mt-1 truncate text-xs text-[#8E8E93]">{item.subtitle}</p>
                      </div>

                      <div>
                        <Badge className="rounded-md bg-[#F7F7F8] text-[#5F5F66] shadow-none">
                          {item.entityLabel}
                        </Badge>
                      </div>

                      <ApprovalStatusBadge status={item.status} />
                      <PriorityBadge status={item.status} />

                      <p className="truncate text-sm font-medium text-[#5F5F66]">{item.submittedBy}</p>
                      <p className="truncate text-sm text-[#73737A]">{item.submittedAt}</p>

                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={pending || item.status === "rejected"}
                          className="h-8 w-8 rounded-lg p-0 text-[#E04F5F]"
                          aria-label="Refuser"
                          onClick={() => updateStatus(item, "rejected")}
                        >
                          <X className="h-4 w-4" aria-hidden="true" />
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          disabled={pending || item.status === "approved"}
                          className="h-8 w-8 rounded-lg p-0"
                          aria-label="Valider"
                          onClick={() => updateStatus(item, "approved")}
                        >
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="px-4 py-10 text-center text-sm text-[#8E8E93]">Aucun contenu trouvé.</div>
          )}
        </div>
      </div>
    </section>
  );
}

function ApprovalStatusBadge({ status }: { status: ApprovalItem["status"] }) {
  const config = {
    pending: "bg-[#FFF7E8] text-[#A86600]",
    approved: "bg-[#EAF8F6] text-[#188C7F]",
    rejected: "bg-[#FDECEF] text-[#B42336]",
  } satisfies Record<ApprovalItem["status"], string>;

  const label = {
    pending: "En attente",
    approved: "Validé",
    rejected: "Refusé",
  } satisfies Record<ApprovalItem["status"], string>;

  return <Badge className={`rounded-md shadow-none ${config[status]}`}>{label[status]}</Badge>;
}

function PriorityBadge({ status }: { status: ApprovalItem["status"] }) {
  const label = status === "pending" ? "Haute" : status === "rejected" ? "Moyenne" : "Basse";
  const className =
    status === "pending"
      ? "bg-[#FDECEF] text-[#B42336]"
      : status === "rejected"
        ? "bg-[#FFF7E8] text-[#A86600]"
        : "bg-[#EAF8F6] text-[#188C7F]";

  return <Badge className={`rounded-md shadow-none ${className}`}>{label}</Badge>;
}
