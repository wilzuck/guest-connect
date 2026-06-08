"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { googleLogin, login } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/api-client";
import { useAuthToken } from "@/hooks/useAuthToken";
import { Button } from "@/components/ui/Button";
import { AuthField } from "@/components/auth/AuthField";
import { useLocale, useTranslations } from "next-intl";
import { PhoneLoginDialogButton } from "@/components/auth/PhoneLoginDialogButton";

export function LoginForm() {
  const router = useRouter();
  const { save } = useAuthToken();
  const locale = useLocale();
  const t = useTranslations("auth");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await login({ email, password });
      save(res.token);
      // garde le préfixe de langue
      router.push(`/${locale}`);
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(t("errors.invalidCredentials"));
      } else {
        setError(t("errors.genericLogin"));
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function onGoogleLogin() {
    setError(null);
    setIsLoading(true);

    try {
      const res = await googleLogin();
      save(res.token);
      router.push(`/${locale}`);
      router.refresh();
    } catch {
      setError(t("errors.genericLogin"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <AuthField
        label={t("fields.email")}
        name="email"
        type="email"
        placeholder={t("placeholders.email")}
        autoComplete="email"
        required
        value={email}
        onChange={setEmail}
      />
      <AuthField
        label={t("fields.password")}
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder={t("placeholders.password")}
        autoComplete="current-password"
        required
        value={password}
        onChange={setPassword}
        rightElement={
          <button
            type="button"
            className="rounded-xl px-3 py-2 text-xs font-semibold text-zinc-600 hover:text-black hover:bg-black/[0.04] transition"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? t("actions.hidePassword") : t("actions.showPassword")}
          >
            {showPassword ? t("actions.hide") : t("actions.show")}
          </button>
        }
      />

      <div className="flex items-center justify-between gap-3">
        <label className="inline-flex items-center gap-2 text-sm text-zinc-600">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-black/20"
          />
          {t("actions.rememberMe")}
        </label>
        <Link href={`/${locale}/support`} className="text-sm font-semibold text-black hover:underline">
          {t("actions.forgotPassword")}
        </Link>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <Button type="submit" size="lg" disabled={isLoading} className="rounded-2xl">
        {isLoading ? t("actions.loggingIn") : t("actions.login")}
      </Button>

      <div className="my-2 flex items-center gap-3">
        <div className="h-px flex-1 bg-black/10" />
        <p className="text-[11px] font-semibold tracking-[0.18em] text-zinc-500">
          {t("orContinueWith")}
        </p>
        <div className="h-px flex-1 bg-black/10" />
      </div>

      <div className="grid gap-3">
        <PhoneLoginDialogButton label={t("actions.continueWithPhone")} />
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="rounded-2xl bg-white"
          onClick={onGoogleLogin}
          disabled={isLoading}
        >
          <GoogleIcon className="h-5 w-5" />
          {t("actions.continueWithGoogle")}
        </Button>
      </div>
    </form>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21.35 11.1h-9.18v2.95h5.3c-.23 1.5-1.7 4.4-5.3 4.4-3.18 0-5.78-2.63-5.78-5.85S3.99 6.75 7.17 6.75c1.81 0 3.02.77 3.72 1.44l2.54-2.44C12.01 4.43 9.88 3.3 7.17 3.3 2.99 3.3-.4 6.76-.4 10.9s3.39 7.6 7.57 7.6c4.37 0 7.26-3.07 7.26-7.4 0-.5-.05-.88-.12-1.25Z"
        fill="currentColor"
      />
    </svg>
  );
}
