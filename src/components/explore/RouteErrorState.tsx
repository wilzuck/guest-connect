"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export function RouteErrorState({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto grid min-h-[50dvh] max-w-lg place-items-center px-5 py-16 text-center">
      <div>
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        </div>
        <h1 className="mt-4 text-xl font-semibold ">Impossible de charger cette page</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Une erreur temporaire a interrompu l’affichage. Vous pouvez réessayer sans perdre votre navigation.
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="mt-5 inline-flex h-11 items-center rounded-full bg-black px-5 text-sm font-semibold text-white"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
