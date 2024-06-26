import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "./middlewares/withAuth";
// import subdomains from './subdomains.json';

const shopSubdomain = {
  subdomain: "shop",
};
const adminSubdomain = {
  subdomain: "admin",
};

const subdomains = [shopSubdomain, adminSubdomain];

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") as string;

  // Define allowed Domains (localhost and production domain)
  // const allowedDomains = ["localhost:3000", "localhost:8888"];

  // Verify if hostname exist in allowed domains
  // const isAllowedDomain = allowedDomains.some((domain) =>
  //   hostname.includes(domain)
  // );

  // Extract the possible subdomain in the URL
  const subdomainFromUrl = hostname.split(".")[0];

  // If we stay in a allowed domain and its not a subdomain
  // const isOnRootDomain =
  //   isAllowedDomain &&
  //   !subdomains.some((d) => d.subdomain === subdomainFromUrl);
  const isOnRootDomain = !subdomains.some(
    (d) => d.subdomain === subdomainFromUrl
  );

  // Redirect to default subdomain (shop) or use existing subdomain
  const subdomain = isOnRootDomain ? shopSubdomain.subdomain : subdomainFromUrl;

  const subdomainData = subdomains.find((d) => d.subdomain === subdomain);

  if (subdomainData) {
    const authResponse = await withAuth(subdomain, req);

    if (authResponse instanceof NextResponse) {
      return authResponse;
    }

    // Rewrite the URL in the dynamic route based in the subdomain
    return NextResponse.rewrite(
      new URL(`/${subdomain}${url.pathname}${req.nextUrl.search}`, req.url)
    );
  }

  return new Response(null, { status: 404 });
}
