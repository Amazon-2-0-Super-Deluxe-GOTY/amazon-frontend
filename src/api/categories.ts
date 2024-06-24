import { authStore } from "@/lib/storage";
import type { ApiResponse, ApiValidationErrors } from "./types";
import { useQuery } from "@tanstack/react-query";

export interface CategoryPropertyKey {
  name: string;
}

export interface Category {
  id: number;
  parentId: number | null;
  logo: string | null;
  name: string;
  description: string;
  image: { id: string; url: string };
  isActive: boolean;
  categoryPropertyKeys: CategoryPropertyKey[];
}

export interface CategoryOption {
  id: string;
  name: string;
  appearance: "tiles" | "rows";
}

export function getCategories(params: {
  pageNumber: number;
  pageSize: number;
  orderBy: "asc" | "desc";
}): Promise<Category[]> {
  const searchParams = new URLSearchParams();
  searchParams.set("pageNumber", params.pageNumber.toString());
  searchParams.set("pageSize", params.pageSize.toString());
  searchParams.set("orderBy", params.orderBy);

  return fetch(`/api/categories/category?${searchParams}`).then((r) =>
    r.json()
  );
}

export function getAdminCategories(params: {
  pageNumber: number;
  pageSize: number;
  orderBy: "asc" | "desc";
}): Promise<Category[]> {
  const searchParams = new URLSearchParams();
  searchParams.set("pageNumber", params.pageNumber.toString());
  searchParams.set("pageSize", params.pageSize.toString());
  searchParams.set("orderBy", params.orderBy);

  const token = authStore.getState().token;
  return fetch(`/api/categories/category_admin?${searchParams}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function getCategory({
  categoryId,
}: {
  categoryId: number;
}): Promise<Category> {
  return fetch(`/api/categories/category/${categoryId}`).then((r) => r.json());
}

export function uploadCategoryImage(
  file: File
): Promise<
  ApiResponse<
    [[201, { id: string; imageUrl: string }[]], [400, ApiValidationErrors]]
  >
> {
  const data = new FormData();

  data.append("categoryImages", file, file.name);

  const token = authStore.getState().token;
  return fetch("/api/categoryImages", {
    method: "POST",
    body: data,
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function deleteCategoryImage(body: {
  categoryImageId: string;
}): Promise<ApiResponse<[[200, null], [400, ApiValidationErrors]]>> {
  const token = authStore.getState().token;
  return fetch("/api/categoryImages", {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}

interface CategoryCreateObject {
  parentCategoryId: number | null;
  name: string;
  description: string;
  imageId: string;
  isActive: boolean;
  logo: string | null;
  propertyKeys: { name: string }[];
}

export function createCategory(body: CategoryCreateObject) {
  const token = authStore.getState().token;
  return fetch("/api/categories/create_category", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => ({ status: r.status }));
}

interface CategoryEditObject extends CategoryCreateObject {
  id: number;
}

export function updateCategory(body: CategoryEditObject) {
  const token = authStore.getState().token;
  return fetch("/api/categories/update", {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => ({ status: r.status }));
}

export function deleteCategory(params: { categoryId: number }) {
  const token = authStore.getState().token;
  return fetch(`/api/categories/delete_id/${params.categoryId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((r) => ({ status: r.status }));
}

export function useCategories(params: {
  pageNumber: number;
  pageSize: number;
  orderBy: "asc" | "desc";
}) {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(params),
  });
}

export function useAdminCategories() {
  return useQuery({
    queryKey: ["categories", "admin"],
    queryFn: () =>
      getAdminCategories({ pageNumber: 1, pageSize: 100, orderBy: "desc" }),
  });
}
