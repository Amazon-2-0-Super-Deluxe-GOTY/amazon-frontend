import type { User } from "@/api/users";
import { z } from "zod";

const data: User[] = [
  {
    id: "1",
    fullName: "Evan Birch",
    email: "ken99@yahoo.com",
    registerAt: new Date(),
    isDeleted: true,
    isAdmin: true,
  },
  {
    id: "2",
    fullName: "Bruno Willis",
    email: "Abe45@gmail.com",
    registerAt: new Date(),
    isDeleted: false,
    isAdmin: true,
  },
  {
    id: "3",
    fullName: "Penelope Holland",
    email: "Monserrat44@gmail.com",
    registerAt: new Date(),
    isDeleted: false,
    isAdmin: false,
  },
  {
    id: "4",
    fullName: "Oswin Hood",
    email: "Silas22@gmail.com",
    registerAt: new Date(),
    isDeleted: false,
    isAdmin: true,
  },
  {
    id: "5",
    fullName: "Janice Fitzgerald",
    email: "carmella@hotmail.com",
    registerAt: new Date(),
    isDeleted: false,
    isAdmin: false,
  },
  {
    id: "6",
    fullName: "Ophelia Pope",
    email: "ophelia@gmail.com",
    registerAt: new Date(),
    isDeleted: true,
    isAdmin: false,
  },
  {
    id: "7",
    fullName: "Shauna King",
    email: "shaunaaaaaaa@gmail.com",
    registerAt: new Date(),
    isDeleted: false,
    isAdmin: false,
  },
  {
    id: "8",
    fullName: "Katrina Preston",
    email: "k.preston@gmail.com",
    registerAt: new Date(),
    isDeleted: false,
    isAdmin: false,
  },
  {
    id: "9",
    fullName: "Eugene Knight",
    email: "knight.eugene@gmail.com",
    registerAt: new Date(),
    isDeleted: true,
    isAdmin: false,
  },
  {
    id: "10",
    fullName: "Homer Fisher",
    email: "fisher.homer@gmail.com",
    registerAt: new Date(),
    isDeleted: true,
    isAdmin: false,
  },
  {
    id: "11",
    fullName: "Eugene Knight",
    email: "knight.eugene@gmail.com",
    registerAt: new Date(),
    isDeleted: true,
    isAdmin: false,
  },
  {
    id: "12",
    fullName: "Homer Fisher",
    email: "fisher.homer@gmail.com",
    registerAt: new Date(),
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
      v.fullName.toLowerCase().includes(query)
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
