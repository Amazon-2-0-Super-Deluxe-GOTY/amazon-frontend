import { authStore, useAuthStore } from "@/lib/storage";
import { ApiResponse, ApiValidationErrors } from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { ProductShort } from "./products";

export interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  quantity: number;
  discountPrice: number;
  price: number;
  discountPercent: number;
  generalRate: number;
  reviewsCount: number;
  productImages: {
    imageUrl: string;
    createdAt: string;
  }[]
}

export function addToWishlist(
  values: { productId: string; }
): Promise<
  ApiResponse<[[201, { productId: string; }], [400, ApiValidationErrors], [500, null]]>
> {
  const token = authStore.getState().token;
  return fetch("/api/wishlist", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}

export function removeFromWishlist(
  values: { productIds: string[] }
): Promise<
  ApiResponse<[[201, { productIds: string[] }], [400, ApiValidationErrors], [500, null]]>
> {
  const token = authStore.getState().token;
  return fetch("/api/wishlist", {
    method: "DELETE",
    body: JSON.stringify(values),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}

export function getWishlistItems({
  pageSize,
  pageIndex,
}: {
  pageSize: number;
  pageIndex: number;
}): Promise<ApiResponse<[[200, ProductShort[]], [400, ApiValidationErrors], [404, null]]>> {
  const token = authStore.getState().token;
  return fetch(`/api/wishlist?pageSize=${pageSize}&pageIndex=${pageIndex}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function useWishlist() {
  const token = useAuthStore((state) => state.token);

  const wishlistQuery = useQuery({
    queryKey: ["wishlist", token],
    queryFn: useCallback(
      () => (!!token ? getWishlistItems({ pageSize: 100, pageIndex: 1 }) : null),
      [token]
    ),
    select(data) {
      return data?.status === 200 ? data.data : undefined;
    },
  });

  const addToWishlistMutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess() {
      wishlistQuery.refetch();
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess() {
      wishlistQuery.refetch();
    },
  });

  return {
    wishlist: wishlistQuery,
    addToWishlist: addToWishlistMutation,
    removeFromWishlist: removeFromWishlistMutation,
  };
}
