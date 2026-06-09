"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type User = {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
};

export function ProfileClient({ isEn, user }: { isEn: boolean; user: User }) {
  const [edit, setEdit] = useState(false);

  const rows = useMemo(
    () => [
      { k: isEn ? "Full name" : "Nom complet", v: user.name },
      { k: isEn ? "Email" : "Email", v: user.email },
      { k: isEn ? "Phone" : "Téléphone", v: user.phone },
      { k: isEn ? "City" : "Ville", v: user.location },
    ],
    [isEn, user],
  );

  return (
    <div className="grid gap-6">
      <Card className="p-6 shadow-none">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-black dark:text-white">
              {isEn ? "Personal information" : "Informations personnelles"}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {isEn
                ? "Your profile details are shown below. Click edit to update them."
                : "Vos informations sont affichées ci‑dessous. Cliquez sur Modifier pour les mettre à jour."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setEdit(true)}
            className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900"
            disabled={edit}
          >
            {isEn ? "Edit" : "Modifier"}
          </button>
        </div>

        {!edit ? (
          <div className="mt-6 grid gap-3">
            {rows.map((r) => (
              <div key={r.k} className="flex items-center justify-between gap-4 rounded-2xl bg-zinc-50 px-4 py-3 dark:bg-zinc-900">
                <FieldLabel>{r.k}</FieldLabel>
                <p className="truncate text-sm font-semibold text-black dark:text-white">{r.v}</p>
              </div>
            ))}
            <div className="rounded-2xl bg-zinc-50 px-4 py-3 dark:bg-zinc-900">
              <FieldLabel>{isEn ? "Bio" : "Bio"}</FieldLabel>
              <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{user.bio}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  {isEn ? "Full name" : "Nom complet"}
                </span>
                <Input defaultValue={user.name} />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  {isEn ? "Email" : "Email"}
                </span>
                <Input type="email" defaultValue={user.email} />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  {isEn ? "Phone" : "Téléphone"}
                </span>
                <Input defaultValue={user.phone} />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  {isEn ? "City" : "Ville"}
                </span>
                <Input defaultValue={user.location} />
              </label>
            </div>

            <label className="mt-4 grid gap-2">
              <FieldLabel>{isEn ? "Bio" : "Bio"}</FieldLabel>
              <Textarea defaultValue={user.bio} />
            </label>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition active:scale-[0.99] dark:bg-white dark:text-black"
              >
                {isEn ? "Save changes" : "Enregistrer"}
              </button>
              <button
                type="button"
                onClick={() => setEdit(false)}
                className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900"
              >
                {isEn ? "Cancel" : "Annuler"}
              </button>
            </div>
          </>
        )}
      </Card>

      <Card className="p-6 shadow-none">
        <p className="text-sm font-semibold text-black dark:text-white">{isEn ? "Security" : "Sécurité"}</p>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {isEn ? "Change your password. (UI placeholder)" : "Changez votre mot de passe. (UI placeholder)"}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <label className="grid gap-2">
            <FieldLabel>{isEn ? "Current" : "Actuel"}</FieldLabel>
            <Input type="password" placeholder={isEn ? "Current password" : "Mot de passe actuel"} />
          </label>
          <label className="grid gap-2">
            <FieldLabel>{isEn ? "New" : "Nouveau"}</FieldLabel>
            <Input type="password" placeholder={isEn ? "New password" : "Nouveau mot de passe"} />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              {isEn ? "Confirm" : "Confirmer"}
            </span>
            <Input type="password" placeholder={isEn ? "Confirm password" : "Confirmer"} />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition active:scale-[0.99] dark:bg-white dark:text-black"
          >
            {isEn ? "Update password" : "Mettre à jour"}
          </button>
          <button
            type="button"
            className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900"
          >
            {isEn ? "Manage sessions" : "Gérer les sessions"}
          </button>
        </div>
      </Card>
    </div>
  );
}
