"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/api-client";
import { useAuthToken } from "@/hooks/useAuthToken";
import { Button } from "@/components/ui/Button";
import { AuthField } from "@/components/auth/AuthField";

export function LoginForm() {
  const router = useRouter();
  const { save } = useAuthToken();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await login({ email, password });
      save(res.token);
      router.push("/");
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        setError("Email ou mot de passe invalide.");
      } else {
        setError("Impossible de se connecter. Réessaie dans un instant.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
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
        autoComplete="current-password"
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
        {isLoading ? "Connexion..." : "Se connecter"}
      </Button>
    </form>
  );
}

