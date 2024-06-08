import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "./types";

export interface CategoryPropertyKey {
  name: string;
}

export interface Category {
  id: number;
  parentId?: number;
  iconId?: string;
  name: string;
  image: { id: string; imageUrl: string };
  description: string;
  categoryPropertyKeys: CategoryPropertyKey[];
  isDeleted: boolean;
}

export interface CategoryOption {
  id: string;
  name: string;
  appearance: "tiles" | "rows";
}

export function getCategories(): Promise<{ data: Category[] }> {
  return fetch("/api/admin/categories").then((r) => r.json());
}

export function getCategory({
  categoryId,
}: {
  categoryId: string;
}): Promise<{ data: Category }> {
  return fetch(`/api/admin/category/${categoryId}`).then((r) => r.json());
}

export function uploadCategoryImage(
  file: File
): Promise<
  ApiResponse<[[200, { id: string; imageUrl: string }[]], [400, null]]>
> {
  const data = new FormData();

  data.append("files[]", file, file.name);

  return fetch("/api/admin/upload", {
    method: "POST",
    body: data,
  }).then((r) => r.json());
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
