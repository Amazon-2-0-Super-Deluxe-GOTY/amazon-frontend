import {
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { ReviewCard, UserReviewCard } from "./ReviewCard";
import { ReviewFilter } from "./ReviewFilters";
import {
  ReviewsStatisticCard,
  ReviewsStatisticCardSkeleton,
} from "./ReviewsStatisticCard";
import {
  Review,
  deleteReview,
  getProductReviewStats,
  getProductReviews,
  getReviewTags,
  likeReview,
  type ReviewFilters,
} from "@/api/review";
import { ReviewCardFull } from "./ReviewCardFull";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { useUser } from "@/api/users";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import clsx from "clsx";
import { PlusIcon } from "../Shared/Icons";
import { useModal } from "../Shared/Modal";
import { CreateReviewModal } from "./CreateReviewModal";
import { AlertDialog } from "../Admin/AlertDialog";

interface Props {
  productId: string;
}

const pageSize = 5;

export const ReviewsBlock = ({ productId }: Props) => {
  const [filters, setFilters] = useState<ReviewFilters>({
    pageSize,
    pageIndex: 1,
    productId,
    orderBy: "desc",
  });
  const { showModal } = useModal();

  const { user } = useUser();

  const queryClient = useQueryClient();
  const reviewsStatsQuery = useQuery({
    queryKey: ["reviewStats", productId],
    queryFn: () => getProductReviewStats(productId),
    refetchOnWindowFocus: false,
    select(data) {
      return data.status === 200 ? data.data : undefined;
    },
  });
  const reviewsQuery = useQuery({
    queryKey: [
      "reviews",
      filters.pageIndex,
      filters.pageSize,
      filters.productId,
      filters.rating,
      filters.orderBy,
    ],
    queryFn: () => getProductReviews(filters),
    refetchOnWindowFocus: false,
    select(data) {
      return data.status === 200
        ? data.data.filter((r) => r.user.id !== user?.id)
        : [];
    },
  });
  const userReviewQuery = useQuery({
    queryKey: ["review", "user", user, productId],
    queryFn: () =>
      user
        ? getProductReviews({
            pageSize: 1,
            pageIndex: 1,
            userId: user?.id,
            productId,
          })
        : null,
    refetchOnWindowFocus: false,
    select(data) {
      return data?.status === 200 ? data.data[0] : undefined;
    },
  });
  const reviewTagsQuery = useQuery({
    queryKey: ["reviewTags"],
    queryFn: getReviewTags,
    refetchOnWindowFocus: false,
    select(data) {
      return data.status === 200 ? data.data : [];
    },
  });
  const deleteReviewMutation = useMutation({
    mutationFn: deleteReview,
  });

  const reviews = reviewsQuery.data ?? [];
  const [reviewsOptimistic, setReviewsOptimistic] = useOptimistic(reviews);
  const [isLikePending, startLikeTransition] = useTransition();

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
      : openedReviewIndex + 1 < (reviewsOptimistic.length ?? 0);
  }, [openedReviewIndex, reviewsOptimistic.length]);

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

  const onCreateReview = () => {
    showModal({
      component: CreateReviewModal,
      props: {
        productId: productId,
        review: userReviewQuery.data,
        reviewTags: reviewTagsQuery.data ?? [],
      },
    }).then((r) => {
      if (r.action === "CONFIRM") {
        userReviewQuery.refetch();
        reviewsStatsQuery.refetch();
        // invalidate main page queries
        queryClient.invalidateQueries({
          queryKey: ["products", "main", "trending"],
        });
        queryClient.invalidateQueries({
          queryKey: ["products", "main", "discount"],
        });
      }
    });
  };

  const onDeleteReview = () => {
    const reviewId = userReviewQuery.data?.id;
    if (!reviewId) return;

    showModal({
      component: AlertDialog,
      props: {
        title: "Are you sure?",
        text: "Your review will be impossible to recover.",
        buttonCloseText: "Cancel",
        buttonConfirmText: "Delete",
        colorVariant: "destructive",
      },
    }).then(async (r) => {
      if (r.action === "CONFIRM") {
        await deleteReviewMutation.mutateAsync({ reviewId });
        userReviewQuery.refetch();
        reviewsStatsQuery.refetch();
        // invalidate main page queries
        queryClient.invalidateQueries({
          queryKey: ["products", "main", "trending"],
        });
        queryClient.invalidateQueries({
          queryKey: ["products", "main", "discount"],
        });
      }
    });
  };

  const onLikeReview = (reviewId: string) => {
    if (!user) return;
    startLikeTransition(async () => {
      setReviewsOptimistic(
        reviews.map((r) =>
          r.id === reviewId
            ? {
                ...r,
                currentUserLiked: !r.currentUserLiked,
                likes: r.currentUserLiked ? r.likes - 1 : r.likes + 1,
              }
            : r
        )
      );
      try {
        await likeReview({ reviewId });
        await reviewsQuery.refetch();
      } catch (e) {
        console.error(e);
      }
    });
  };

  const onUserCardClick = () => {
    const reviewId = userReviewQuery.data?.id;
    if (!userReviewQuery.data || !reviewId) return;
    showModal({
      component: ReviewCardFull,
      props: {
        isOpen: true,
        review: userReviewQuery.data,
        hasPrev: false,
        hasNext: false,
        isOwnReview: true,
        onPrev: () => {},
        onNext: () => {},
        onLike: () => onLikeReview(reviewId),
        startImageIndex: 0,
      },
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:max-w-xl w-full">
        {reviewsStatsQuery.isLoading ? (
          <ReviewsStatisticCardSkeleton />
        ) : (
          <ReviewsStatisticCard data={reviewsStatsQuery.data} />
        )}
      </div>
      <div className="w-full">
        <div className="mb-6">
          <ReviewFilter filters={filters} onFiltersChange={setFilters} />
        </div>
        <div className="space-y-6 pb-6">
          <Separator />
          {userReviewQuery.isLoading ? (
            <ReviewCardSkeleton />
          ) : !!userReviewQuery.data ? (
            <UserReviewCard
              review={userReviewQuery.data}
              onClick={onUserCardClick}
              onEdit={onCreateReview}
              onDelete={onDeleteReview}
              isDeleteInProgress={deleteReviewMutation.isPending}
            />
          ) : (
            !!user && (
              <Button
                variant={"secondary"}
                className="w-full h-max lg:justify-start gap-4 lg:text-lg font-semibold"
                onClick={onCreateReview}
              >
                <PlusIcon className="w-6 h-6 stroke-secondary" />
                Create review
              </Button>
            )
          )}
        </div>
        <div className="space-y-3 lg:space-y-8">
          {reviewsQuery.isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <ReviewCardSkeleton key={i} transparent />
            ))
          ) : !!reviewsOptimistic.length ? (
            reviewsOptimistic.map((r, i) => (
              <ReviewCard
                review={r}
                onClick={createOnCardClick(i)}
                onImageClick={setStartImageIndex}
                onLike={() => onLikeReview(r.id)}
                key={i}
              />
            ))
          ) : (
            <p className="text-center">No reviews</p>
          )}
        </div>
      </div>
      {isFullOpen && (
        <ReviewCardFull
          review={reviewsOptimistic[openedReviewIndex]}
          isOpen={isFullOpen}
          startImageIndex={startImageIndex}
          hasPrev={hasPrev}
          hasNext={hasNext}
          onPrev={toPrev}
          onNext={toNext}
          onLike={() => onLikeReview(reviewsOptimistic[openedReviewIndex].id)}
          closeModal={closeFullView}
        />
      )}
    </div>
  );
};

const ReviewCardSkeleton = ({ transparent }: { transparent?: boolean }) => {
  return (
    <Card className={clsx("p-3", transparent && "bg-transparent shadow-none")}>
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-1/4 h-6" />
      </div>
      <Skeleton className="w-2/4 h-6 mb-2" />
      <Skeleton className="w-full h-6 mb-2" />
      <Skeleton className="w-full h-6" />
    </Card>
  );
};
