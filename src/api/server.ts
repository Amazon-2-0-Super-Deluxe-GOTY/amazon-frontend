import type { ApiResponse, User } from "./types";

export async function getUserProfileServer(
  token: string
): Promise<ApiResponse<[[200, User], [401, null]]>> {
  return fetch(`${process.env.BASE_PATH}/api/users/profile`, {
    headers: { authorization: `Bearer ${token}` },
    // next: {
    //   revalidate: 120,
    // },
  }).then((r) => r.json());
}
