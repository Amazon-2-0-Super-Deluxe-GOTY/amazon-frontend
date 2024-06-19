import { useQuery } from "@tanstack/react-query";
import { ApiResponse, ApiValidationErrors } from "./types";
import { authStore } from "@/lib/storage";

interface RatingStatistic {
  mark: number;
  percent: number;
}

export interface ReviewTag {
  id: string;
  name: string;
  description: null;
}

export interface ReviewsStatistic {
  generalRate: number;
  reviewsQuantity: number;
  ratingStats: RatingStatistic[];
  tags: ReviewTag[];
}

export interface Review {
  id: string;
  mark: number;
  title?: string;
  text?: string;
  likes: number;
  currentUserLiked: boolean;
  createdAt: string;
  user: {
    id: string;
    avatarUrl: string;
    firstName: string;
    lastName: string;
  };
  reviewImages: { id: string; imageUrl: string }[];
  reviewTags: ReviewTag[];
}

export interface ReviewFilters {
  pageSize: number;
  pageIndex: number;
  productId?: string;
  userId?: string;
  rating?: number;
  orderBy?: "asc" | "desc" | "likes";
}

export function getReviewTranslation(reviewId: string, to: string) {
  return fetch("/api/reviews/translate", {
    method: "POST",
    body: JSON.stringify({ reviewId, to }),
  }).then((r) => r.json());
}

export function getReviewById(
  reviewId: string
): Promise<ApiResponse<[[200, Review], [404, null]]>> {
  return fetch(`/api/reviews/byId?reviewId=${reviewId}`).then((r) => r.json());
}

export function getProductReviewStats(
  productId: string
): Promise<ApiResponse<[[200, ReviewsStatistic], [404, null]]>> {
  return fetch(`/api/reviews/stats?productId=${productId}`).then((r) =>
    r.json()
  );
}

export function getProductReviews(
  filters: ReviewFilters
): Promise<ApiResponse<[[200, Review[]], [404, null]]>> {
  const searchParams = new URLSearchParams();
  searchParams.set("pageSize", filters.pageSize.toString());
  searchParams.set("pageIndex", filters.pageIndex.toString());
  filters.productId && searchParams.set("productId", filters.productId);
  filters.userId && searchParams.set("userId", filters.userId);
  filters.orderBy && searchParams.set("orderBy", filters.orderBy);
  filters.rating !== undefined &&
    searchParams.set("rating", filters.rating.toString());

  return fetch(`/api/reviews?${searchParams}`).then((r) => r.json());
}

// export function useTranslation(reviewId: string, language: string) {
//   return useQuery<{ title: string; text: string }>({
//     queryKey: ["translation", reviewId],
//     queryFn: () => getReviewTranslation(reviewId, language),
//     enabled: false,
//   });
// }

interface ReviewCreatePayload {
  productId: string;
  rating: number;
  title?: string;
  text?: string;
  reviewImagesIds?: string[];
  reviewTagsIds?: string[];
}

interface ReviewUpdatePayload extends ReviewCreatePayload {
  reviewId: string;
}

export function createReview(
  body: ReviewCreatePayload
): Promise<ApiResponse<[[201, Review], [400, ApiValidationErrors]]>> {
  const token = authStore.getState().token;
  return fetch("/api/reviews/newReview", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function updateReview(
  body: ReviewUpdatePayload
): Promise<ApiResponse<[[200, Review], [400, ApiValidationErrors]]>> {
  const token = authStore.getState().token;
  return fetch("/api/reviews/", {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function deleteReview(body: {
  reviewId: string;
}): Promise<ApiResponse<[[200, Review], [400, ApiValidationErrors]]>> {
  const token = authStore.getState().token;
  return fetch(`/api/reviews`, {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function likeReview(body: {
  reviewId: string;
}): Promise<ApiResponse<[[201, null], [200, null], [404, null]]>> {
  const token = authStore.getState().token;
  return fetch("/api/reviews/like", {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function getReviewTags(): Promise<
  ApiResponse<[[200, ReviewTag[]], [404, null]]>
> {
  return fetch("/api/reviewTags").then((r) => r.json());
}

export function uploadReviewImage(
  files: File[]
): Promise<
  ApiResponse<
    [[201, { id: string; imageUrl: string }[]], [403, null], [500, null]]
  >
> {
  const data = new FormData();

  for (const file of files) {
    data.append("reviewImages", file, file.name);
  }

  const token = authStore.getState().token;
  return fetch("/api/reviewImages", {
    method: "POST",
    body: data,
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function deleteReviewImage(
  reviewImageId: string
): Promise<ApiResponse<[[200, null], [404, null]]>> {
  const token = authStore.getState().token;
  return fetch("/api/reviewImages", {
    method: "DELETE",
    body: JSON.stringify({ reviewImageId }),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}
