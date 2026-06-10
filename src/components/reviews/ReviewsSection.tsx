"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RatingBadge } from "@/components/ui/RatingBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ReviewCard, type Review } from "@/components/reviews/ReviewCard";

const INITIAL_VISIBLE = 4;
const STEP = 4;

type ReviewsSectionProps = {
  reviews: Review[];
  rating: number;
  reviewCount: number;
};

/** Full reviews block: summary header, responsive grid, progressive reveal, empty state. */
export function ReviewsSection({ reviews, rating, reviewCount }: ReviewsSectionProps) {
  const t = useTranslations("reviewsBlock");
  const tListing = useTranslations("listingPage");
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  const shown = useMemo(() => reviews.slice(0, visible), [reviews, visible]);
  const hasReviews = reviews.length > 0;
  const remaining = reviews.length - visible;

  return (
    <section aria-labelledby="reviews-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="reviews-heading"
            className="text-2xl font-semibold tracking-tight text-black dark:text-white"
          >
            {t("title")}
          </h2>
          {hasReviews ? (
            <div className="mt-2 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <RatingBadge
                rating={rating}
                reviewCount={reviewCount}
                reviewLabel={tListing("reviews", { count: reviewCount })}
              />
            </div>
          ) : null}
        </div>
        <ReviewForm />
      </div>

      {hasReviews ? (
        <>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {shown.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {remaining > 0 ? (
            <div className="mt-8 flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setVisible((v) => v + STEP)}
              >
                {t("showMoreReviews", { count: remaining })}
              </Button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-6">
          <EmptyState
            icon={<MessageSquare className="size-5" aria-hidden="true" />}
            title={t("emptyTitle")}
            description={t("emptyDescription")}
          />
        </div>
      )}
    </section>
  );
}
