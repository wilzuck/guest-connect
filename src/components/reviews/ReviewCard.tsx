"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Avatar } from "@/components/ui/Avatar";
import { RatingBadge } from "@/components/ui/RatingBadge";
import { cn } from "@/lib/utils/cn";

export type Review = {
  id: string;
  name: string;
  date: string;
  rating: number;
  body: string;
};

const LONG_COMMENT_THRESHOLD = 220;

type ReviewCardProps = {
  review: Review;
  className?: string;
};

/** Single review: avatar, author, date, rating and content with long-comment handling. */
export function ReviewCard({ review, className }: ReviewCardProps) {
  const t = useTranslations("reviewsBlock");
  const [expanded, setExpanded] = useState(false);
  const isLong = review.body.length > LONG_COMMENT_THRESHOLD;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-3xl border border-black/10 bg-white p-5 transition-colors dark:border-white/10 dark:bg-zinc-950 sm:p-6",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={review.name} size="md" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-black dark:text-white" title={review.name}>
              {review.name}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{review.date}</p>
          </div>
        </div>
        <RatingBadge rating={review.rating} size="sm" className="shrink-0" />
      </header>

      <p
        className={cn(
          "mt-4 whitespace-pre-line text-sm leading-7 text-zinc-700 dark:text-zinc-300",
          isLong && !expanded && "line-clamp-4",
        )}
      >
        {review.body}
      </p>

      {isLong ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 w-fit rounded-full text-sm font-semibold text-black underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:text-white dark:focus-visible:ring-white/25"
        >
          {expanded ? t("showLess") : t("showMore")}
        </button>
      ) : null}
    </article>
  );
}
