import type { Review } from "@/api/review";

export const getRatesCountString = (review: Review) => {
  if (review.likes === 0) return "";

  if (review.likes === 1) {
    if (review.currentUserLiked) {
      return "You found this helpful";
    }
    return "1 person found this helpful";
  }

  return (
    (review.currentUserLiked ? "You and " : "") +
    `${review.likes} people found this helpful`
  );
};
