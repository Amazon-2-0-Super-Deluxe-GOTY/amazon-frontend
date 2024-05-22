export interface Category {
  id: string;
  parentId?: string;
  iconId?: string;
  title: string;
  description: string;
  keywords: string[];
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

export function getCategoryOptions(
  categoryId: string
): Promise<{ data: CategoryOption[] }> {
  return fetch(`/api/admin/categories/${categoryId}/options`).then((r) =>
    r.json()
  );
}
