import "server-only";
import type { Product } from "./products";
import type { ApiResponse, ApiValidationErrors, User } from "./types";
import type { Review } from "./review";

export async function getUserProfileServer(
  token: string
): Promise<ApiResponse<[[200, User], [401, null]]>> {
  return fetch(`${process.env.BASE_PATH}/api/users/profile`, {
    headers: { authorization: `Bearer ${token}` },
    // next: {
    //   revalidate: 120,
    // },
  }).then((r) => r.json());
}

export function getProductBySlugServer({
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

export function getReviewByIdServer(
  reviewId: string
): Promise<ApiResponse<[[200, Review], [404, null]]>> {
  return fetch(
    `${process.env.BASE_PATH}/api/reviews/byId?reviewId=${reviewId}`
  ).then((r) => r.json());
}
