import type { Category } from "@/api/categories";

const data: Category = {
  id: "15",
  parentId: "13",
  name: "Blouses and Shirts",
  description: "Test description",
  categoryPropertyKeys: [],
  isDeleted: false,
};

export function GET(req: Request) {
  return Response.json({ data }, { status: 200 });
}
