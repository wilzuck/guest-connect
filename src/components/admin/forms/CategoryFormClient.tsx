"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export function CategoryFormClient({
  locale,
  initial,
}: {
  locale: string;
  initial?: { id?: string; name?: string; slug?: string };
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const isEdit = Boolean(initial?.id);
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");

  const hint = useMemo(() => {
    if (!name) return "Ex: Maison d’hôtes";
    return "Slug conseillé: " + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }, [name]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = { name: name.trim(), slug: slug.trim() || undefined };

    if (isEdit && initial?.id) {
      await fetch(`/api/db/categories/${encodeURIComponent(initial.id)}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch(`/api/db/categories`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    startTransition(() => router.push(`/${locale}/dashboard/service-management/categories`));
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Card className="p-6 shadow-none">
        <p className="text-sm font-semibold ">{isEdit ? "Modifier une catégorie" : "Créer une catégorie"}</p>
        <p className="mt-2 text-sm text-zinc-600">Nommez clairement la catégorie pour éviter les doublons.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Nom</span>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Maison d’hôtes" required />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{hint}</span>
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Slug</span>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="maison-dhotes" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Optionnel, pour les URLs et filtres.</span>
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-black px-6 text-sm font-semibold text-white transition disabled:opacity-50"
          >
            {isEdit ? "Enregistrer" : "Créer"}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/${locale}/dashboard/service-management/categories`)}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-black/10 bg-white px-6 text-sm font-semibold  hover:bg-zinc-50 transition"
          >
            Annuler
          </button>
        </div>
      </Card>
    </form>
  );
}

