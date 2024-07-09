import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "./middlewares/withAuth";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
export default async function middleware(req: NextRequest) {
  const subdomain = req.nextUrl.pathname.startsWith("/admin")
    ? "admin"
    : "shop";
  const authResponse = await withAuth(subdomain, req);

  if (authResponse instanceof NextResponse) {
    return authResponse;
  }

  return NextResponse.next();
}
