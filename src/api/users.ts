import { authStore, useAuthStore } from "@/lib/storage";
import type { ApiResponse, ApiValidationErrors, User } from "./types";
import { useEffect, useState } from "react";

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

export function registerUser(body: {
  email: string;
  password: string;
}): Promise<
  ApiResponse<[[201, { token: string }], [400, ApiValidationErrors]]>
> {
  return fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}

export function logIn(body: {
  email: string;
  password: string;
  staySignedIn: boolean;
}): Promise<
  ApiResponse<
    [
      [200, { token: string }],
      [400, ApiValidationErrors],
      [403, null],
      [404, null]
    ]
  >
> {
  return fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}

export function updateUser(body: {
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  oldPassword?: string;
  newPassword?: string;
}): Promise<
  ApiResponse<[[200, null], [400, ApiValidationErrors], [401, null]]>
> {
  const token = authStore.getState().token;

  return fetch("/api/users", {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

// export function resendConfirmationEmail() {
//   return fetch('/api/users/someEmailConfirmationEndpointName')
// }

export function getUserProfile(): Promise<
  ApiResponse<[[200, User], [401, null]]>
> {
  const token = authStore.getState().token;
  return fetch("/api/users/profile", {
    headers: { authorization: `Bearer ${token}` },
  }).then((r) => r.json());
}

export function useUser() {
  const [user, setUser] = useState<User>();
  const authStore = useAuthStore((state) => state);

  useEffect(() => {
    if (authStore.token) {
      getUserProfile().then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        } else if (res.status === 401) {
          authStore.clearToken();
          setUser(undefined);
        }
      });
    } else {
      user && setUser(undefined);
    }
  }, [authStore.token]);

  return user;
}

export function logOut(): Promise<ApiResponse<[[200, null], [401, null]]>> {
  const token = authStore.getState().token;

  return fetch("/api/users/logout", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}
