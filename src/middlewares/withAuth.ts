import { getUserProfileServer } from "@/api/server";
import type { User } from "@/api/types";
import { type NextRequest, NextResponse } from "next/server";

const protectedPathsShop = ["/account", "/checkout"];

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
  const isProtectedAdminPath = subdomain === "admin" && pathname !== "/admin";
  const isProtectedPath = isProtectedShopPath || isProtectedAdminPath;

  if (isProtectedPath) {
    if (token) {
      try {
        const profileResponse = await getUserProfileServer(token.value);

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
        return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
      }
    }
  }

  return undefined;
};
