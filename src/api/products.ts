import { authStore } from "@/lib/storage";
import { ApiResponse, ApiValidationErrors } from "./types";

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

const defaultPageSize = "7";

export function getProducts(
  filters: ProductFilters
): Promise<
  ApiResponse<
    [[200, ProductShort[]], [400, ApiValidationErrors], [404, null]]
  > & { count: { pagesCount: number } }
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
