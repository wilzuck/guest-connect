"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
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
            <p className="text-sm font-semibold ">
              {isEn ? "Personal information" : "Informations personnelles"}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              {isEn
                ? "Your profile details are shown below. Click edit to update them."
                : "Vos informations sont affichées ci‑dessous. Cliquez sur Modifier pour les mettre à jour."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setEdit(true)}
            className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold  hover:bg-zinc-50 transition disabled:opacity-50"
            disabled={edit}
          >
            {isEn ? "Edit" : "Modifier"}
          </button>
        </div>

        {!edit ? (
          <div className="mt-6 grid gap-3">
            {rows.map((r) => (
              <div key={r.k} className="flex items-center justify-between gap-4 rounded-2xl bg-zinc-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{r.k}</p>
                <p className="truncate text-sm font-semibold ">{r.v}</p>
              </div>
            ))}
            <div className="rounded-2xl bg-zinc-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{isEn ? "Bio" : "Bio"}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">{user.bio}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  {isEn ? "Full name" : "Nom complet"}
                </span>
                <Input defaultValue={user.name} />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  {isEn ? "Email" : "Email"}
                </span>
                <Input type="email" defaultValue={user.email} />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  {isEn ? "Phone" : "Téléphone"}
                </span>
                <Input defaultValue={user.phone} />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  {isEn ? "City" : "Ville"}
                </span>
                <Input defaultValue={user.location} />
              </label>
            </div>

            <label className="mt-4 grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{isEn ? "Bio" : "Bio"}</span>
              <Textarea defaultValue={user.bio} />
            </label>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition active:scale-[0.99]"
              >
                {isEn ? "Save changes" : "Enregistrer"}
              </button>
              <button
                type="button"
                onClick={() => setEdit(false)}
                className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold  hover:bg-zinc-50 transition"
              >
                {isEn ? "Cancel" : "Annuler"}
              </button>
            </div>
          </>
        )}
      </Card>

      <Card className="p-6 shadow-none">
        <p className="text-sm font-semibold ">{isEn ? "Security" : "Sécurité"}</p>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          {isEn ? "Change your password. (UI placeholder)" : "Changez votre mot de passe. (UI placeholder)"}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{isEn ? "Current" : "Actuel"}</span>
            <Input type="password" placeholder={isEn ? "Current password" : "Mot de passe actuel"} />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{isEn ? "New" : "Nouveau"}</span>
            <Input type="password" placeholder={isEn ? "New password" : "Nouveau mot de passe"} />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              {isEn ? "Confirm" : "Confirmer"}
            </span>
            <Input type="password" placeholder={isEn ? "Confirm password" : "Confirmer"} />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition active:scale-[0.99]"
          >
            {isEn ? "Update password" : "Mettre à jour"}
          </button>
          <button
            type="button"
            className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold  hover:bg-zinc-50 transition"
          >
            {isEn ? "Manage sessions" : "Gérer les sessions"}
          </button>
        </div>
      </Card>
    </div>
  );
}

