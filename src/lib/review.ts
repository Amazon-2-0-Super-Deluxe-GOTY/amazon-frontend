import type { Review } from "@/components/Review/types";

export const getRatesCountString = (review: Review) => {
  if (review.reviewRatesCount === 0) return "";

  if (review.reviewRatesCount === 1) {
    if (review.isRatedByUser) {
      return "You found this helpful";
    }
    return "1 person found this helpful";
  }

  return (
    (review.isRatedByUser ? "You and " : "") +
    `${review.reviewRatesCount} people found this helpful`
  );
};
