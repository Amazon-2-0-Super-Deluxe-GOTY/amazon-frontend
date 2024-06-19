import { authStore, useAuthStore } from "@/lib/storage";
import {
  ApiResponse,
  ApiResponseWithPages,
  ApiValidationErrors,
} from "./types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { FilterItem } from "@/components/ProductByCategoryPage/filtersDataTypes";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: {
    id: number;
    name: string;
  };
  code: string | null;
  quantity: number;
  price: number;
  discountPercent: number | null;
  discountPrice: number;
  generalRate: number;
  reviewsQuantity: number;
  createdAt: string;
  productImages: {
    id: string;
    imageUrl: string;
  }[];
  productProperties: { id: string; key: string; value: string }[];
  aboutProductItems: { id: string; title: string; text: string }[];
}

export interface ProductShort {
  id: string;
  slug: string;
  name: string;
  price: number;
  discountPercent: number | null;
  discountPrice: number;
  productImages: { imageUrl: string }[];
  generalRate: number;
  reviewsCount: number;
  quantity: number;
}

export interface ProductFilters {
  categoryId?: number;
  searchQuery?: string;
  page?: number;
  pageSize?: number;
  discount?: boolean;
  rating?: string;
  price?: { min: number; max: number };
  orderBy?: "date" | "rate" | "exp" | "cheap";
  additionalFilters?: { name: string; values: string[] }[];
}

interface ProductFilterItems {
  filterItems: Record<string, string[]>;
  minPrice: number;
  maxPrice: number;
}

export interface Cart {
  id: string;
  totalPrice: number;
  cartItems: CartItem[];
}

export interface CartItem {
  id: string;
  quantity: number;
  price: number;
  createdAt: string;
  product: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
    quantity: number;
    discountPrice: number;
    discountPercent: number | null;
    price: number;
  };
}

const defaultPageSize = "7";

export function getProducts(
  filters: ProductFilters
): Promise<
  ApiResponseWithPages<
    [[200, ProductShort[]], [400, ApiValidationErrors], [404, null]]
  >
> {
  const params = new URLSearchParams();
  params.set("pageIndex", filters.page ? filters.page.toString() : "1");
  params.set(
    "pageSize",
    filters.pageSize ? filters.pageSize.toString() : defaultPageSize
  );
  filters.categoryId && params.set("categoryId", filters.categoryId.toString());
  filters.searchQuery && params.set("searchQuery", filters.searchQuery);
  filters.discount !== undefined &&
    params.set("discount", filters.discount.toString());
  filters.rating !== undefined &&
    params.set("rating", filters.rating.toString());
  filters.orderBy && params.set("orderBy", filters.orderBy);
  filters.price &&
    params.set("price", `${filters.price.min}-${filters.price.max}`);

  if (filters.additionalFilters) {
    for (let param of filters.additionalFilters) {
      params.set(param.name, param.values.join(","));
    }
  }

  return fetch(`/api/products?${params.toString()}`).then((r) => r.json());
}

export function uploadProductImage(
  files: File[]
): Promise<
  ApiResponse<
    [[201, { id: string; imageUrl: string }[]], [403, null], [500, null]]
  >
> {
  const data = new FormData();

  for (const file of files) {
    data.append("productImages", file, file.name);
  }

  const token = authStore.getState().token;
  return fetch("/api/productImages", {
    method: "POST",
    body: data,
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function deleteProductImage(
  productImageId: string
): Promise<ApiResponse<[[200, null], [404, null]]>> {
  const token = authStore.getState().token;
  return fetch("/api/productImages", {
    method: "DELETE",
    body: JSON.stringify({ productImageId }),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}

export function getProductById({
  productId,
}: {
  productId: string;
}): Promise<
  ApiResponse<[[200, Product], [400, ApiValidationErrors], [404, null]]>
> {
  return fetch(`/api/products/byId?productId=${productId}`).then((r) =>
    r.json()
  );
}

export function getProductBySlug({
  productSlug,
}: {
  productSlug: string;
}): Promise<
  ApiResponse<[[200, Product], [400, ApiValidationErrors], [404, null]]>
> {
  return fetch(`/api/products/bySlug?productSlug=${productSlug}`).then((r) =>
    r.json()
  );
}

interface ProductForm {
  name: string;
  code: string;
  categoryId: number;
  images: string[];
  price: number;
  quantity: number;
  productDetails: {
    name: string;
    text: string;
  }[];
  aboutProduct: {
    name: string;
    text: string;
  }[];
  discount?: number | null;
}

export function createProduct(
  values: ProductForm
): Promise<
  ApiResponse<[[201, Product], [400, ApiValidationErrors], [500, null]]>
> {
  const token = authStore.getState().token;
  return fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}

export function updateProduct(
  values: ProductForm & { productId: string }
): Promise<
  ApiResponse<
    [[200, Product], [400, ApiValidationErrors], [404, null], [500, null]]
  >
> {
  const token = authStore.getState().token;
  return fetch("/api/products", {
    method: "PUT",
    body: JSON.stringify(values),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}

export function deleteProducts(
  productIds: string[]
): Promise<ApiResponse<[[200, null], [404, null], [500, null]]>> {
  const token = authStore.getState().token;
  return fetch("/api/products", {
    method: "DELETE",
    body: JSON.stringify({ productIds }),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}

export function getProductFilters(
  categoryId?: number
): Promise<ApiResponse<[[200, ProductFilterItems], [404, null]]>> {
  const searchParamsStr =
    categoryId === undefined ? "" : `?categoryId=${categoryId}`;
  return fetch(`/api/products/filterItems${searchParamsStr}`).then((r) =>
    r.json()
  );
}

export function useProductFilters({ categoryId }: { categoryId?: number }) {
  const filtersQuery = useQuery({
    queryKey: ["productFilters", categoryId],
    queryFn: useCallback(() => getProductFilters(categoryId), [categoryId]),
    select(data) {
      return data.status === 200 ? data.data : undefined;
    },
  });
  const data = useMemo<FilterItem[]>(() => {
    const ratingFilter: FilterItem = {
      type: "rating",
      title: "Customer reviews",
      values: [1, 2, 3, 4, 5],
      isSearch: false,
    };
    const priceFilter: FilterItem = {
      type: "price",
      title: "Price",
      values: {
        min: filtersQuery.data?.minPrice ?? 0,
        max: filtersQuery.data?.maxPrice ?? 0,
      },
      isSearch: false,
    };

    if (!filtersQuery.data) return [priceFilter, ratingFilter];

    const propertyFilters = Object.entries(filtersQuery.data.filterItems).map(
      (entry): FilterItem => ({
        type: "checkbox",
        title: entry[0],
        values: entry[1],
        isSearch: true,
      })
    );

    return [...propertyFilters, priceFilter, ratingFilter];
  }, [filtersQuery.data]);

  return { data, isLoading: filtersQuery.isLoading };
}

export function getCart({
  pageSize,
  pageIndex,
}: {
  pageSize: number;
  pageIndex: number;
}): Promise<ApiResponse<[[200, Cart], [404, null]]>> {
  const token = authStore.getState().token;
  return fetch(`/api/cart?pageSize=${pageSize}&pageIndex=${pageIndex}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function addToCart(body: {
  productId: string;
  quantity: number;
}): Promise<ApiResponse<[[200, CartItem], [201, CartItem], [404, null]]>> {
  const token = authStore.getState().token;
  return fetch("/api/cart", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}

export function updateCartItemQuantity(body: {
  cartItemId: string;
  quantity: number;
}): Promise<ApiResponse<[[200, CartItem], [404, null]]>> {
  const token = authStore.getState().token;
  return fetch("/api/cart", {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}

export function deleteCartItems(body: {
  cartItemIds: string[];
}): Promise<ApiResponse<[[200, null], [404, null]]>> {
  const token = authStore.getState().token;
  return fetch("/api/cart", {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}

export function useCart() {
  const token = useAuthStore((state) => state.token);

  const cartQuery = useQuery({
    queryKey: ["cart", token],
    queryFn: useCallback(
      () => (!!token ? getCart({ pageSize: 100, pageIndex: 1 }) : null),
      [token]
    ),
    select(data) {
      return data?.status === 200 ? data.data : undefined;
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess() {
      cartQuery.refetch();
    },
  });
  const updateCartItemQuantityMutation = useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess() {
      cartQuery.refetch();
    },
  });
  const deleteCartItemsMutation = useMutation({
    mutationFn: deleteCartItems,
    onSuccess() {
      cartQuery.refetch();
    },
  });

  return {
    cart: cartQuery,
    addToCart: addToCartMutation,
    updateCartItemQuantity: updateCartItemQuantityMutation,
    deleteCartItems: deleteCartItemsMutation,
  };
}
