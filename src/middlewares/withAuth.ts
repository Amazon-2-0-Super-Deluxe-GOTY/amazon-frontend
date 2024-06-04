import type { ApiResponse, User } from "@/api/types";
import { type NextRequest, NextResponse } from "next/server";

const protectedPathsShop = ["/account"];

const getUserProfile = (
  token: string
): Promise<ApiResponse<[[200, User], [401, null]]>> => {
  return fetch(`${process.env.BASE_PATH}/api/users/profile`, {
    headers: { authorization: `Bearer ${token}` },
    next: {
      revalidate: 120,
    },
  }).then((r) => r.json());
};

export const withAuth = async (
  subdomain: string,
  req: NextRequest
): Promise<NextResponse | undefined> => {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("jwt");
  let profile: User | undefined = undefined;

  const isProtectedShopPath =
    subdomain === "shop" &&
    protectedPathsShop.some((path) => pathname.startsWith(path));
  const isProtectedAdminPath = subdomain === "admin" && pathname !== "/";
  const isProtectedPath = isProtectedShopPath || isProtectedAdminPath;

  if (isProtectedPath) {
    if (token) {
      try {
        const profileResponse = await getUserProfile(token.value);

        if (profileResponse.status === 200) {
          profile = profileResponse.data;
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (isProtectedShopPath) {
      if (!profile) {
        return NextResponse.redirect(new URL("/", req.nextUrl.origin));
      }
    } else if (isProtectedAdminPath) {
      if (!profile?.isAdmin) {
        return NextResponse.redirect(new URL("/", req.nextUrl.origin));
      }
    }
  }

  return undefined;
};
