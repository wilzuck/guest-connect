"use client";

import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useTranslations } from "next-intl";

export function PhoneLoginDialogButton({ label }: { label: string }) {
  const t = useTranslations("auth");
  const [country, setCountry] = useState("+229");
  const [phone, setPhone] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="lg" className="rounded-2xl bg-white dark:bg-zinc-950">
          <PhoneIcon className="h-5 w-5" />
          {label}
        </Button>
      </DialogTrigger>

      <DialogContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-black dark:text-white">{t("phoneDialog.title")}</p>
          <DialogClose asChild>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900"
              aria-label={t("actions.close")}
            >
              ✕
            </button>
          </DialogClose>
        </div>

        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {t("placeholders.phoneLoginSoon")}
        </p>

        <div className="mt-5 grid gap-3">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-black dark:text-white">{t("fields.phone")}</span>
            <div className="flex gap-2">
              <Select
                value={country}
                onValueChange={setCountry}
                className="w-[132px] font-semibold"
                aria-label={t("phoneDialog.countryCode")}
                options={[
                  { value: "+229", label: "BJ +229" },
                  { value: "+234", label: "NG +234" },
                  { value: "+233", label: "GH +233" },
                  { value: "+33", label: "FR +33" },
                ]}
              />
              <Input
                type="tel"
                placeholder={t("placeholders.phone")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-black dark:text-white">{t("phoneDialog.otp")}</span>
            <Input placeholder="123456" disabled />
          </label>

          <Button
            type="button"
            size="lg"
            className="rounded-2xl"
            onClick={() => alert(t("placeholders.phoneLoginSoon"))}
          >
            {t("actions.continue")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
