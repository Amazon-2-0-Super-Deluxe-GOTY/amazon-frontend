import type { ApiResponse } from "./types";

export interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  quantity: number;
  discountPrice?: number;
  rating: number;
  images: {
    id: string;
    imageUrl: string;
  }[];
  productDetails: { name: string; text: string }[];
  aboutProduct: { name: string; text: string }[];
}

export interface ProductShort {
  id: string;
  name: string;
  images: string[];
  price: number;
  discountPrice?: number;
  rating: number;
}

const defaultPageSize = "7";

export function getProductsShort({
  categoryId,
  searchQuery,
  page,
  pageSize,
}: {
  categoryId: string;
  searchQuery?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ data: ProductShort[]; count: { pageCount: number } }> {
  const params = new URLSearchParams();
  params.set("categoryId", categoryId);
  searchQuery && params.set("searchQuery", searchQuery);
  params.set("page", page ? page.toString() : "1");
  params.set("pageSize", pageSize ? pageSize.toString() : defaultPageSize);

  return fetch(`/api/admin/products/short?${params.toString()}`).then((r) =>
    r.json()
  );
}

export function uploadProductImage(
  files: File[]
): Promise<
  ApiResponse<[[200, { id: string; imageUrl: string }[]], [400, null]]>
> {
  const data = new FormData();

  for (const file of files) {
    data.append("files[]", file, file.name);
  }

  return fetch("/api/admin/upload", {
    method: "POST",
    body: data,
  }).then((r) => r.json());
}

interface ProductForm {
  name: string;
  code: string;
  categoryId: string;
  images: {
    id: string;
    imageUrl: string;
  }[];
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
  discount?: number | undefined;
}

export function getAdminProduct({
  productId,
}: {
  productId: string;
}): Promise<{ data: ProductForm }> {
  return fetch(`/api/admin/products`).then((r) => r.json());
}
