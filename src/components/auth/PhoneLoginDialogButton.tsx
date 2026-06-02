"use client";

import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTranslations } from "next-intl";

export function PhoneLoginDialogButton({ label }: { label: string }) {
  const t = useTranslations("auth");
  const [country, setCountry] = useState("+229");
  const [phone, setPhone] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="lg" className="rounded-2xl bg-white">
          <PhoneIcon className="h-5 w-5" />
          {label}
        </Button>
      </DialogTrigger>

      <DialogContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-black">{t("phoneDialog.title")}</p>
          <DialogClose asChild>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white hover:bg-zinc-50 transition"
              aria-label={t("actions.close")}
            >
              ✕
            </button>
          </DialogClose>
        </div>

        <p className="mt-2 text-sm text-zinc-600">
          {t("placeholders.phoneLoginSoon")}
        </p>

        <div className="mt-5 grid gap-3">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-black">{t("fields.phone")}</span>
            <div className="flex gap-2">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="h-11 rounded-xl border border-black/10 bg-white px-3 text-sm font-semibold text-zinc-800 shadow-sm shadow-black/5 outline-none transition focus:border-black/20 focus:ring-4 focus:ring-black/5"
                aria-label={t("phoneDialog.countryCode")}
              >
                <option value="+229">BJ +229</option>
                <option value="+234">NG +234</option>
                <option value="+233">GH +233</option>
                <option value="+33">FR +33</option>
              </select>
              <Input
                type="tel"
                placeholder={t("placeholders.phone")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-black">{t("phoneDialog.otp")}</span>
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
