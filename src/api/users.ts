export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  registerAt: Date;
  isDeleted: boolean;
  isAdmin: boolean;
}

export type UserRoles = "all" | "user" | "admin";

interface UserFilters {
  role?: UserRoles;
  searchQuery?: string;
  page?: number;
  pageSize?: number;
}

function userFiltersToSearchParams(filters: UserFilters) {
  const params = new URLSearchParams();
  params.set("role", filters.role ?? "all");
  params.set("page", filters.page ? filters.page.toString() : "1");
  params.set("pageSize", filters.pageSize ? filters.pageSize.toString() : "10");
  filters.searchQuery && params.set("searchQuery", filters.searchQuery);
  return params;
}

export function getUsers(
  filters: UserFilters
): Promise<{ data: User[]; count: { pageCount: number } }> {
  const params = userFiltersToSearchParams(filters);
  return fetch("/api/admin/users?" + params.toString()).then((r) => r.json());
}
