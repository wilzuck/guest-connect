"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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
    <form onSubmit={onSubmit} className="rounded-3xl border border-black/10 bg-white p-5 xl:p-8">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold tracking-tight text-black">{t("title")}</h3>
        <p className="text-sm text-zinc-600">{t("subtitle")}</p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-12 sm:items-start">
        <label className="sm:col-span-12">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{t("rating")}</span>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-2 h-11 w-full rounded-2xl border max-w-sm border-black/10 bg-white px-3 text-sm font-semibold text-black shadow-sm shadow-black/5 focus:outline-none focus:ring-4 focus:ring-black/5"
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
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{t("comment")}</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("placeholder")}
            className="mt-2 min-h-[110px] w-full resize-y rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm text-black shadow-sm shadow-black/5 focus:outline-none focus:ring-4 focus:ring-black/5"
          />
        </label>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-zinc-500">{t("note")}</p>
        <button
          type="submit"
          className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition active:scale-[0.99]"
        >
          {t("submit")}
        </button>
      </div>

      {submitted ? (
        <p className="mt-3 text-sm font-semibold text-emerald-600">{t("success")}</p>
      ) : null}
    </form>
  );
}
