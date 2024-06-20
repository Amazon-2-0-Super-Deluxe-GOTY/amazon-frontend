import { authStore, useAuthStore } from "@/lib/storage";
import type {
  ApiResponse,
  ApiResponseWithPages,
  ApiValidationErrors,
  User,
} from "./types";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

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

export function resendConfirmationEmail(): Promise<
  ApiResponse<[[200, null], [403, null]]>
> {
  const token = authStore.getState().token;
  return fetch("/api/users/sendNewEmailCode", {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function confirmEmail(
  emailCode: string
): Promise<ApiResponse<[[200, string], [400, string]]>> {
  const token = authStore.getState().token;
  return fetch("/api/users/confirmEmail", {
    method: "POST",
    body: JSON.stringify({ emailCode }),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function getUserProfile(): Promise<
  ApiResponse<[[200, User], [401, null]]>
> {
  const token = authStore.getState().token;
  return fetch("/api/users/profile", {
    headers: { authorization: `Bearer ${token}` },
  }).then((r) => r.json());
}

export function useUser(params?: { initialData: User }) {
  const authStore = useAuthStore((state) => state);
  const userQuery = useQuery({
    queryKey: ["user", authStore.token ?? "unauthorized"],
    queryFn: useCallback(
      () => (authStore.token ? getUserProfile() : null),
      [authStore.token]
    ),
    retry: false,
    initialData: params?.initialData
      ? { status: 200, message: "", data: params.initialData }
      : undefined,
    select(data) {
      return data?.status === 200 ? data.data : null;
    },
  });

  return { user: userQuery.data, refetch: () => userQuery.refetch() };
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

export function updateUserAvatar(
  userAvatar: File
): Promise<ApiResponse<[[200, null], [401, null]]>> {
  const formData = new FormData();

  formData.set("userAvatar", userAvatar);

  const token = authStore.getState().token;
  return fetch("/api/users/avatar", {
    method: "PUT",
    body: formData,
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function updateUserEmail(
  newEmail: string
): Promise<ApiResponse<[[200, null]]>> {
  const token = authStore.getState().token;
  return fetch("/api/users/changeEmailRequest", {
    method: "PUT",
    body: JSON.stringify({ newEmail }),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function deleteCurrentUser(): Promise<
  ApiResponse<[[200, null], [403, null]]>
> {
  const token = authStore.getState().token;
  return fetch("/api/users", {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function getAdminUsers(params: {
  pageSize: number;
  pageIndex: number;
  searchQuery?: string;
  role?: string;
}): Promise<ApiResponseWithPages<[[200, User[]], [404, null]]>> {
  const searchParams = new URLSearchParams();
  searchParams.set("pageSize", params.pageSize.toString());
  searchParams.set("pageIndex", params.pageIndex.toString());
  params.searchQuery && searchParams.set("searchQuery", params.searchQuery);
  params.role && searchParams.set("role", params.role);

  const token = authStore.getState().token;
  return fetch(`/api/users?${searchParams}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export function switchUserRole(body: {
  userId: string;
}): Promise<ApiResponse<[[200, User], [404, null]]>> {
  const token = authStore.getState().token;
  return fetch("/api/users/role", {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}

export function deleteUsers(body: {
  usersIds: string[];
}): Promise<ApiResponse<[[200, null]]>> {
  const token = authStore.getState().token;
  return fetch("/api/users/removeUsers", {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}

export function restoreUser(body: {
  userId: string;
}): Promise<ApiResponse<[[200, User], [404, null]]>> {
  const token = authStore.getState().token;
  return fetch("/api/users/restore", {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}
