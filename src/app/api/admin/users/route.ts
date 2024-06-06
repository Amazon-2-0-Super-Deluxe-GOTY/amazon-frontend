import type { User } from "@/api/types";
import { z } from "zod";

const data: User[] = [
  {
    id: "1",
    firstName: "Evan",
    lastName: "Birch",
    email: "ken99@yahoo.com",
    createdAt: new Date(),
    isDeleted: true,
    isAdmin: true,
  },
  {
    id: "2",
    firstName: "Bruno",
    lastName: "Willis",
    email: "Abe45@gmail.com",
    createdAt: new Date(),
    isDeleted: false,
    isAdmin: true,
  },
  {
    id: "3",
    firstName: "Penelope",
    lastName: "Holland",
    email: "Monserrat44@gmail.com",
    createdAt: new Date(),
    isDeleted: false,
    isAdmin: false,
  },
  {
    id: "4",
    firstName: "Oswin",
    lastName: "Hood",
    email: "Silas22@gmail.com",
    createdAt: new Date(),
    isDeleted: false,
    isAdmin: true,
  },
  {
    id: "5",
    firstName: "Janice",
    lastName: "Fitzgerald",
    email: "carmella@hotmail.com",
    createdAt: new Date(),
    isDeleted: false,
    isAdmin: false,
  },
  {
    id: "6",
    firstName: "Ophelia",
    lastName: "Pope",
    email: "ophelia@gmail.com",
    createdAt: new Date(),
    isDeleted: true,
    isAdmin: false,
  },
  {
    id: "7",
    firstName: "Shauna",
    lastName: "King",
    email: "shaunaaaaaaa@gmail.com",
    createdAt: new Date(),
    isDeleted: false,
    isAdmin: false,
  },
  {
    id: "8",
    firstName: "Katrina",
    lastName: "Preston",
    email: "k.preston@gmail.com",
    createdAt: new Date(),
    isDeleted: false,
    isAdmin: false,
  },
  {
    id: "9",
    firstName: "Eugene",
    lastName: "Knight",
    email: "knight.eugene@gmail.com",
    createdAt: new Date(),
    isDeleted: true,
    isAdmin: false,
  },
  {
    id: "10",
    firstName: "Homer",
    lastName: "Fisher",
    email: "fisher.homer@gmail.com",
    createdAt: new Date(),
    isDeleted: true,
    isAdmin: false,
  },
  {
    id: "11",
    firstName: "Eugene",
    lastName: "Knight",
    email: "knight.eugene@gmail.com",
    createdAt: new Date(),
    isDeleted: true,
    isAdmin: false,
  },
  {
    id: "12",
    firstName: "Homer",
    lastName: "Fisher",
    email: "fisher.homer@gmail.com",
    createdAt: new Date(),
    isDeleted: true,
    isAdmin: false,
  },
];

const paramsSchema = z.object({
  role: z.enum(["all", "user", "admin"]),
  searchQuery: z.string().optional(),
  page: z.number({ coerce: true }).min(1),
  pageSize: z.number({ coerce: true }).min(1),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const filtersRaw = Object.fromEntries(url.searchParams.entries());

  const parseResult = paramsSchema.safeParse(filtersRaw);
  if (!parseResult.success) {
    return Response.json(
      { message: "Request params are invalid" },
      { status: 400 }
    );
  }

  const filters = parseResult.data;
  let filteredData = data;

  if (filters.role !== "all") {
    filteredData = filteredData.filter((v) =>
      filters.role === "admin" ? v.isAdmin : !v.isAdmin
    );
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredData = filteredData.filter((v) =>
      v.firstName.toLowerCase().includes(query)
    );
  }

  const sliceStart = (filters.page - 1) * filters.pageSize;
  const sliceEnd = sliceStart + filters.pageSize;
  const pagedData = filteredData.slice(sliceStart, sliceEnd);

  return Response.json(
    {
      data: pagedData,
      count: { pageCount: Math.ceil(filteredData.length / filters.pageSize) },
    },
    { status: 200 }
  );
}
