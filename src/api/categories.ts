export interface CategoryPropertyKey {
  name: string;
}

export interface Category {
  id: string;
  parentId?: string;
  iconId?: string;
  name: string;
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
