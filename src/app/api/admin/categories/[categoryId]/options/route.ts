const data: { name: string; appearance: "tiles" | "rows" }[] = [
  {
    name: "Color",
    appearance: "tiles",
  },
  {
    name: "Size",
    appearance: "rows",
  },
];

export function GET(req: Request) {
  return Response.json({ data }, { status: 200 });
}
