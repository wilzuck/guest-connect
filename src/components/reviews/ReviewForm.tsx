"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FieldLabel } from "@/components/ui/FieldLabel";

export function ReviewForm() {
  const t = useTranslations("reviewForm");
  const [rating, setRating] = useState("5");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setMessage("");
    setRating("5");
    setTimeout(() => setSubmitted(false), 2500);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-black/10 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 xl:p-8">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold tracking-tight text-black dark:text-white">{t("title")}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("subtitle")}</p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-12 sm:items-start">
        <label className="sm:col-span-12">
          <FieldLabel>{t("rating")}</FieldLabel>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-2 h-11 w-full max-w-sm rounded-2xl border border-black/10 bg-white px-3 text-sm font-semibold text-black shadow-sm shadow-black/5 focus:outline-none focus:ring-4 focus:ring-black/5 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:shadow-black/30 dark:focus:ring-white/10"
            aria-label={t("rating")}
          >
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </label>

        <label className="sm:col-span-12">
          <FieldLabel>{t("comment")}</FieldLabel>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("placeholder")}
            className="mt-2 min-h-[110px] w-full resize-y rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm text-black shadow-sm shadow-black/5 focus:outline-none focus:ring-4 focus:ring-black/5 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:shadow-black/30 dark:focus:ring-white/10"
          />
        </label>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{t("note")}</p>
        <button
          type="submit"
          className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition active:scale-[0.99] dark:bg-white dark:text-black"
        >
          {t("submit")}
        </button>
      </div>

      {submitted ? (
        <p className="mt-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{t("success")}</p>
      ) : null}
    </form>
  );
}
