export function GET(req: Request) {
    return fetch("https://api.countrystatecity.in/v1/countries", {
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
