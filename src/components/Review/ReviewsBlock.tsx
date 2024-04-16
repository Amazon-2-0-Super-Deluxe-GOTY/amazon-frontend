import { useMemo, useState } from "react";
import { ReviewCard } from "./ReviewCard";
import { ReviewFilter } from "./ReviewFilters";
import { ReviewsStatisticCard } from "./ReviewsStatisticCard";
import type { Review, ReviewFilters, ReviewsStatistic } from "./types";
import { ReviewCardFull } from "./ReviewCardFull";

interface Props {
  reviews: Review[];
  reviewsStatistic: ReviewsStatistic;
}

export const ReviewsBlock = ({ reviews, reviewsStatistic }: Props) => {
  const [reviewsFiltered, serReviewsFiltered] = useState(reviews);
  const [openedReviewIndex, setOpenedReviewIndex] = useState<
    number | undefined
  >();
  const [startImageIndex, setStartImageIndex] = useState(0);
  const isFullOpen = openedReviewIndex !== undefined;

  const hasPrev = useMemo(() => {
    return openedReviewIndex === undefined ? false : openedReviewIndex > 0;
  }, [openedReviewIndex]);
  const hasNext = useMemo(() => {
    return openedReviewIndex === undefined
      ? false
      : openedReviewIndex + 1 < reviewsFiltered.length;
  }, [openedReviewIndex, reviewsFiltered.length]);

  const createOnCardClick = (index: number) => () =>
    setOpenedReviewIndex(index);
  const closeFullView = () => {
    setOpenedReviewIndex(undefined);
    setStartImageIndex(0);
  };
  const toPrev = () => {
    if (hasPrev && openedReviewIndex !== undefined) {
      setOpenedReviewIndex(openedReviewIndex - 1);
      setStartImageIndex(0);
    }
  };
  const toNext = () => {
    if (hasNext && openedReviewIndex !== undefined) {
      setOpenedReviewIndex(openedReviewIndex + 1);
      setStartImageIndex(0);
    }
  };

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
            reviewsFiltered.map((r, i) => (
              <ReviewCard
                review={r}
                onClick={createOnCardClick(i)}
                onImageClick={setStartImageIndex}
                key={i}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">No reviews</p>
          )}
        </div>
      </div>
      <ReviewCardFull
        review={reviewsFiltered[openedReviewIndex ?? 0]}
        isOpen={isFullOpen}
        startImageIndex={startImageIndex}
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPrev={toPrev}
        onNext={toNext}
        closeModal={closeFullView}
      />
    </div>
  );
};
