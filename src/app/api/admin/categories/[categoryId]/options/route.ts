import type { CategoryOption } from "@/api/categories";

const data: CategoryOption[] = [
  {
    id: "1",
    name: "Color",
    appearance: "tiles",
  },
  {
    id: "2",
    name: "Size",
    appearance: "rows",
  },
];

export function GET(req: Request) {
  return Response.json({ data }, { status: 200 });
}
