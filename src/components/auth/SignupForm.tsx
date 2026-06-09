"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { signup } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/api-client";
import { useAuthToken } from "@/hooks/useAuthToken";
import { Button } from "@/components/ui/Button";
import { TextDivider } from "@/components/ui/TextDivider";
import { AuthField } from "@/components/auth/AuthField";
import { useLocale, useTranslations } from "next-intl";
import { PhoneLoginDialogButton } from "@/components/auth/PhoneLoginDialogButton";

export function SignupForm() {
  const router = useRouter();
  const { save } = useAuthToken();
  const locale = useLocale();
  const t = useTranslations("auth");
  const tShell = useTranslations("authShell.footer");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError(t("errors.passwordMismatch"));
      return;
    }
    if (!terms) {
      setError(t("errors.acceptTerms"));
      return;
    }

    setIsLoading(true);

    try {
      // Endpoint par défaut: POST /api/auth/signup (à adapter côté backend)
      const res = await signup({ name, email, password });
      save(res.token);
      router.push(`/${locale}`);
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(t("errors.genericSignup"));
      } else {
        setError(t("errors.genericSignup"));
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} autoComplete="off" className="grid gap-4">
      <AuthField
        label={t("fields.fullName")}
        name="name"
        placeholder={t("placeholders.fullName")}
        autoComplete="off"
        required
        value={name}
        onChange={setName}
      />
      <AuthField
        label={t("fields.email")}
        name="email"
        type="email"
        placeholder={t("placeholders.email")}
        autoComplete="off"
        required
        value={email}
        onChange={setEmail}
      />
      <AuthField
        label={t("fields.phone")}
        name="phone"
        type="tel"
        placeholder={t("placeholders.phone")}
        autoComplete="off"
        required
        value={phone}
        onChange={setPhone}
      />
      <AuthField
        label={t("fields.password")}
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder={t("placeholders.password")}
        autoComplete="off"
        required
        value={password}
        onChange={setPassword}
        rightElement={
          <button
            type="button"
            className="rounded-xl px-3 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-black/[0.04] hover:text-black dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? t("actions.hidePassword") : t("actions.showPassword")}
          >
            {showPassword ? t("actions.hide") : t("actions.show")}
          </button>
        }
      />
      <AuthField
        label={t("fields.confirmPassword")}
        name="confirmPassword"
        type={showConfirm ? "text" : "password"}
        placeholder={t("placeholders.password")}
        autoComplete="off"
        required
        value={confirm}
        onChange={setConfirm}
        rightElement={
          <button
            type="button"
            className="rounded-xl px-3 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-black/[0.04] hover:text-black dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? t("actions.hidePassword") : t("actions.showPassword")}
          >
            {showConfirm ? t("actions.hide") : t("actions.show")}
          </button>
        }
      />

      <label className="mt-1 inline-flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        <input
          type="checkbox"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-black/20 dark:border-zinc-700 dark:bg-zinc-950"
        />
        <span className="leading-6">
          {t("actions.acceptTerms")}{" "}
          <Link href={`/${locale}/terms`} className="font-semibold text-black hover:underline dark:text-white">
            {tShell("terms")}
          </Link>
          {" · "}
          <Link href={`/${locale}/privacy`} className="font-semibold text-black hover:underline dark:text-white">
            {tShell("privacy")}
          </Link>
        </span>
      </label>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </div>
      ) : null}

      <Button type="submit" size="lg" disabled={isLoading} className="rounded-2xl">
        {isLoading ? t("actions.creating") : t("actions.createAccount")}
      </Button>

      <TextDivider>{t("orContinueWith")}</TextDivider>

      <div className="grid gap-3">
        <PhoneLoginDialogButton label={t("actions.continueWithPhone")} />
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="rounded-2xl bg-white dark:bg-zinc-950"
          onClick={() => alert(t("placeholders.googleSoon"))}
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
