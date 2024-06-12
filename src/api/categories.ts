import type { ApiResponse } from "./types";
import type { FilterItem } from "@/components/ProductByCategoryPage/filtersDataTypes";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

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
  categoryId: number;
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

interface CategoryFilters {
  filterItems: Record<string, string[]>;
  minPrice: number;
  maxPrice: number;
}

export function getCategoryFilters(
  categoryId: number
): Promise<ApiResponse<[[200, CategoryFilters], [404, null]]>> {
  return fetch(`/api/products/filterItems?categoryId=${categoryId}`).then((r) =>
    r.json()
  );
}

export function useCategoryFilters(categoryId: number) {
  const filtersQuery = useQuery({
    queryKey: ["categoryFilters", categoryId],
    queryFn: useCallback(() => getCategoryFilters(categoryId), [categoryId]),
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
