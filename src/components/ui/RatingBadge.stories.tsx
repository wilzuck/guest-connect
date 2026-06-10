import { RatingBadge } from "./RatingBadge";

const meta = {
  title: "Atoms/RatingBadge",
  component: RatingBadge,
};

export default meta;

export function Sizes() {
  return (
    <div className="flex items-center gap-6">
      <RatingBadge rating={4.86} size="sm" />
      <RatingBadge rating={4.92} size="md" />
    </div>
  );
}

export function WithReviewCount() {
  return (
    <div className="flex items-center gap-6">
      <RatingBadge rating={4.86} reviewCount={212} reviewLabel="212 avis" />
      <RatingBadge rating={5} reviewCount={8} reviewLabel="8 reviews" size="sm" />
    </div>
  );
}

export function Dark() {
  return (
    <div className="dark rounded-2xl bg-zinc-950 p-6">
      <div className="flex items-center gap-6">
        <RatingBadge rating={4.86} reviewCount={212} reviewLabel="212 avis" />
        <RatingBadge rating={4.92} size="sm" />
      </div>
    </div>
  );
}
