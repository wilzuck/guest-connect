"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/api-client";
import { useAuthToken } from "@/hooks/useAuthToken";
import { Button } from "@/components/ui/Button";
import { AuthField } from "@/components/auth/AuthField";

export function SignupForm() {
  const router = useRouter();
  const { save } = useAuthToken();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Endpoint par défaut: POST /api/auth/signup (à adapter côté backend)
      const res = await signup({ name, email, password });
      save(res.token);
      router.push("/");
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        setError("Impossible de créer le compte. Vérifie tes informations.");
      } else {
        setError("Inscription indisponible. Réessaie dans un instant.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <AuthField
        label="Nom"
        name="name"
        placeholder="Sofia Martin"
        autoComplete="name"
        required
        value={name}
        onChange={setName}
      />
      <AuthField
        label="Email"
        name="email"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        required
        value={email}
        onChange={setEmail}
      />
      <AuthField
        label="Mot de passe"
        name="password"
        type="password"
        placeholder="••••••••"
        autoComplete="new-password"
        required
        value={password}
        onChange={setPassword}
      />

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <Button type="submit" size="lg" disabled={isLoading}>
        {isLoading ? "Création..." : "Créer mon compte"}
      </Button>

      <p className="text-xs leading-5 text-zinc-500">
        En créant un compte, tu acceptes nos conditions d’utilisation et notre politique de
        confidentialité.
      </p>
    </form>
  );
}

