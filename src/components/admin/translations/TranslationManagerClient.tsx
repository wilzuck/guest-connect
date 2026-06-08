"use client";

import { useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";

export type TranslationFile = {
  id: string;
  locale: "fr" | "en";
  file: string;
  label: string;
  content: string;
};

export function TranslationManagerClient({ files }: { files: TranslationFile[] }) {
  const [selectedId, setSelectedId] = useState(files[0]?.id ?? "");
  const [draft, setDraft] = useState(files[0]?.content ?? "");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  const selectedFile = useMemo(
    () => files.find((file) => file.id === selectedId) ?? files[0],
    [files, selectedId],
  );

  function selectFile(nextId: string) {
    const next = files.find((file) => file.id === nextId);
    setSelectedId(nextId);
    setDraft(next?.content ?? "");
    setMessage("");
  }

  async function save() {
    if (!selectedFile) return;

    try {
      JSON.parse(draft);
    } catch {
      setMessage("Le JSON est invalide. Corrigez la syntaxe avant d'enregistrer.");
      return;
    }

    setMessage("");
    const response = await fetch("/api/admin/translations", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        locale: selectedFile.locale,
        file: selectedFile.file,
        content: draft,
      }),
    });

    const payload = (await response.json()) as { error?: string };
    startTransition(() => {
      setMessage(response.ok ? "Traduction enregistrée." : payload.error ?? "Enregistrement impossible.");
    });
  }

  return (
    <div className="grid gap-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-[#202024]">Traductions</h1>
        <p className="mt-1 text-sm text-[#8E8E93]">
          Modifiez les fichiers JSON de traduction. Le contenu est validé avant sauvegarde.
        </p>
      </div>

      <Card className="p-5 shadow-none">
        <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
          <div className="grid gap-3">
            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Fichier
              </span>
              <Select
                value={selectedId}
                onValueChange={selectFile}
                options={files.map((file) => ({ value: file.id, label: file.label }))}
              />
            </label>

            {selectedFile ? (
              <div className="rounded-xl border border-black/10 bg-zinc-50 p-3 text-xs leading-5 text-zinc-600">
                <p>
                  Locale : <span className="font-semibold text-black">{selectedFile.locale}</span>
                </p>
                <p>
                  Fichier : <span className="font-semibold text-black">{selectedFile.file}</span>
                </p>
              </div>
            ) : null}

            <Button type="button" onClick={save} disabled={pending || !selectedFile}>
              Enregistrer
            </Button>

            {message ? (
              <p className={message.includes("invalide") || message.includes("impossible") ? "text-sm text-red-600" : "text-sm text-emerald-600"}>
                {message}
              </p>
            ) : null}
          </div>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Contenu JSON
            </span>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              spellCheck={false}
              className="min-h-[560px] w-full resize-y rounded-xl border border-black/10 bg-[#0B0B0D] px-4 py-3 font-mono text-sm leading-6 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-black/20 focus:ring-4 focus:ring-black/5"
            />
          </label>
        </div>
      </Card>
    </div>
  );
}
