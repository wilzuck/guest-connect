"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export function SitePageFormClient({ backHref }: { backHref: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "");
    const payload = {
      id: `page-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || Date.now()}`,
      title,
      path: String(form.get("path") ?? ""),
      owner: String(form.get("owner") ?? "Marketing"),
      status: String(form.get("status") ?? "Brouillon"),
    };

    await fetch("/api/db/sitePages", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    router.push(backHref);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-2xl gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-[#202024]">Nouvelle page</h1>
        <p className="mt-1 text-sm text-[#8E8E93]">Ajoutez une page éditoriale ou une page de contenu au site.</p>
      </div>

      <div className="grid gap-4 rounded-xl border border-[#E8E8EC] bg-white p-5">
        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">Titre</span>
          <Input name="title" maxLength={250} placeholder="Guide voyageur" required />
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">URL</span>
          <Input name="path" maxLength={250} placeholder="/guide-voyageur" required />
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">Équipe</span>
          <Input name="owner" maxLength={250} placeholder="Marketing" />
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">Statut</span>
          <Select
            name="status"
            defaultValue="Brouillon"
            options={[
              { value: "Brouillon", label: "Brouillon" },
              { value: "Publié", label: "Publié" },
              { value: "À valider", label: "À valider" },
            ]}
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending} className="rounded-xl">
          Ajouter
        </Button>
        <Link
          href={backHref}
          className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-5 text-sm font-semibold "
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}
