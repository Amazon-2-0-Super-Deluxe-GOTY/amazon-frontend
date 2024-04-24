import { type NextRequest, NextResponse } from "next/server";

const protectedPathsShop = ["/product"];

export const withAuth = async (
  subdomain: string,
  req: NextRequest
): Promise<string | undefined> => {
  const pathname = req.nextUrl.pathname;

  if (subdomain === "shop") {
    // example of auth for user
    // if (protectedPathsShop.some((path) => pathname.startsWith(path))) {
    //   const userId = req.cookies.get("userId");
    //   if (!userId) {
    //     return "/category/1";
    //   }
    // }
  } else if (subdomain === "admin") {
  }

  return undefined;
};
