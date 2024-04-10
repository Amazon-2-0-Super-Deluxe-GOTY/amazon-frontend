import { useState } from "react";
import { ReviewCard } from "./ReviewCard";
import { ReviewFilter } from "./ReviewFilters";
import { ReviewsStatisticCard } from "./ReviewsStatisticCard";
import type { Review, ReviewFilters, ReviewsStatistic } from "./types";

interface Props {
  reviews: Review[];
  reviewsStatistic: ReviewsStatistic;
}

export const ReviewsBlock = ({ reviews, reviewsStatistic }: Props) => {
  const [reviewsFiltered, serReviewsFiltered] = useState(reviews);

  const onFiltersChange = (filters: ReviewFilters) => {
    serReviewsFiltered(
      reviews.filter((r) => {
        if (!!filters.stars) return r.rating === filters.stars;

        return true;
      })
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:max-w-xl w-full">
        <ReviewsStatisticCard data={reviewsStatistic} />
      </div>
      <div className="w-full">
        <div className="mb-6">
          <ReviewFilter onFiltersChange={onFiltersChange} />
        </div>
        <div className="space-y-3 lg:space-y-8">
          {reviewsFiltered.length ? (
            reviewsFiltered.map((r, i) => <ReviewCard review={r} key={i} />)
          ) : (
            <p className="text-center text-gray-600">No reviews</p>
          )}
        </div>
      </div>
    </div>
  );
};
