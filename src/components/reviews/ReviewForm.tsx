"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { cn } from "@/lib/utils/cn";

export function ReviewForm() {
  const t = useTranslations("reviewForm");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const displayRating = hovered || rating;

  function reset() {
    setRating(0);
    setHovered(0);
    setMessage("");
    setError(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      setError(true);
      return;
    }
    setSubmitted(true);
    reset();
    setOpen(false);
    setTimeout(() => setSubmitted(false), 2500);
  }

  return (
    <div className="flex flex-col gap-3">
      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) reset();
        }}
      >
        <DialogTrigger asChild>
          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 active:scale-[0.99] dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:focus-visible:ring-white/30"
          >
            <Star className="h-4 w-4" aria-hidden="true" />
            {t("trigger")}
          </button>
        </DialogTrigger>

        <DialogContent variant="modal" size="md" aria-label={t("title")}>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold tracking-tight text-black dark:text-white">{t("title")}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("subtitle")}</p>
            </div>

            <div className="mt-5">
              <FieldLabel>{t("rating")}</FieldLabel>
              <div
                className="mt-2 flex items-center gap-1"
                role="radiogroup"
                aria-label={t("rating")}
                onMouseLeave={() => setHovered(0)}
              >
                {[1, 2, 3, 4, 5].map((value) => {
                  const active = value <= displayRating;
                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={rating === value}
                      aria-label={t("starLabel", { count: value })}
                      onClick={() => {
                        setRating(value);
                        setError(false);
                      }}
                      onMouseEnter={() => setHovered(value)}
                      onFocus={() => setHovered(value)}
                      onBlur={() => setHovered(0)}
                      className="rounded-full p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/30"
                    >
                      <Star
                        className={cn(
                          "h-8 w-8 transition",
                          active
                            ? "fill-amber-400 text-amber-400"
                            : "fill-transparent text-zinc-300 dark:text-zinc-600",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
                {rating > 0 ? (
                  <span className="ml-2 text-sm font-semibold text-black dark:text-white">
                    {t("ratingValue", { count: rating })}
                  </span>
                ) : null}
              </div>
              {error ? (
                <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">{t("ratingRequired")}</p>
              ) : null}
            </div>

            <label className="mt-5 block">
              <FieldLabel>{t("comment")}</FieldLabel>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("placeholder")}
                className="mt-2 min-h-30 w-full resize-y rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm text-black shadow-sm shadow-black/5 focus:outline-none focus:ring-4 focus:ring-black/5 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:shadow-black/30 dark:focus:ring-white/10"
              />
            </label>

            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">{t("note")}</p>

            <div className="mt-5 flex items-center justify-end gap-3">
              <DialogClose asChild>
                <button
                  type="button"
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:focus-visible:ring-white/30"
                >
                  {t("cancel")}
                </button>
              </DialogClose>
              <button
                type="submit"
                className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 active:scale-[0.99] dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:focus-visible:ring-white/30"
              >
                {t("submit")}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {submitted ? (
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400" role="status">
          {t("success")}
        </p>
      ) : null}
    </div>
  );
}
