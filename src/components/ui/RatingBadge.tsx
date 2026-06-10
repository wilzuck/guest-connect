import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type RatingBadgeProps = {
  rating: number;
  /** Optional review count appended after the score. */
  reviewCount?: number;
  reviewLabel?: string;
  size?: "sm" | "md";
  className?: string;
};

/** Sober star + score chip. Reused in headers, review cards and lists. */
export function RatingBadge({
  rating,
  reviewCount,
  reviewLabel,
  size = "md",
  className,
}: RatingBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold text-black dark:text-white",
        size === "sm" ? "text-xs" : "text-sm",
        className,
      )}
    >
      <Star
        className={cn("fill-amber-400 text-amber-400", size === "sm" ? "size-3.5" : "size-4")}
        aria-hidden="true"
      />
      <span>{rating.toFixed(2)}</span>
      {typeof reviewCount === "number" && reviewLabel ? (
        <span className="font-normal text-zinc-500 dark:text-zinc-400">· {reviewLabel}</span>
      ) : null}
    </span>
  );
}
