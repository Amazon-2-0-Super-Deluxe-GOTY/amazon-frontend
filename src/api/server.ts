"use server";
import "server-only";
import type { Product } from "./products";
import type { ApiResponse, ApiValidationErrors, User } from "./types";
import type { Review } from "./review";
import type { Category } from "./categories";

export async function getUserProfileServer(
  token: string
): Promise<ApiResponse<[[200, User], [401, null]]>> {
  return fetch(`${process.env.BASE_PATH}/api/users/profile`, {
    headers: { authorization: `Bearer ${token}` },
  }).then((r) => r.json());
}

export async function getProductBySlugServer({
  productSlug,
}: {
  productSlug: string;
}): Promise<
  ApiResponse<[[200, Product], [400, ApiValidationErrors], [404, null]]>
> {
  return fetch(
    `${process.env.BASE_PATH}/api/products/bySlug?productSlug=${productSlug}`
  ).then((r) => r.json());
}

export async function getReviewByIdServer(
  reviewId: string
): Promise<ApiResponse<[[200, Review], [404, null]]>> {
  return fetch(
    `${process.env.BASE_PATH}/api/reviews/byId?reviewId=${reviewId}`
  ).then((r) => r.json());
}

export async function getCategoryServer({
  categoryId,
}: {
  categoryId: number;
}): Promise<Category> {
  return fetch(
    `${process.env.BASE_PATH}/api/categories/category/${categoryId}`
  ).then((r) => r.json());
}
