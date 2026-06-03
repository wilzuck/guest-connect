"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";

export function ThreadComposerClient() {
  const [value, setValue] = useState("");

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Écrire un message (démo)" />
      <button
        type="button"
        className="inline-flex h-11 items-center justify-center rounded-2xl bg-black px-6 text-sm font-semibold text-white transition"
        onClick={() => {
          setValue("");
          alert("Démo: l’envoi de message sera branché plus tard.");
        }}
      >
        Envoyer
      </button>
    </div>
  );
}

