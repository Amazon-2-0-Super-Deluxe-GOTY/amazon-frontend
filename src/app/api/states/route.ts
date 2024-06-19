import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
    const ciso = req.nextUrl.searchParams.get("ciso");

    return fetch(`https://api.countrystatecity.in/v1/countries/${ciso}/states`, {
        method: "GET",
        headers: {
            "X-CSCAPI-KEY": process.env.COUNTRIES_API_KEY!,
        },
        redirect: "follow",
    }).then(async (r) => {
        const body = await r.json();
        return Response.json(body, { status: 200 });
    });
}
