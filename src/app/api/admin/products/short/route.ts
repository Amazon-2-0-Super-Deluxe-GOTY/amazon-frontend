import { ProductShort } from "@/api/products";
import placeholder from "@/../public/Icons/placeholder.svg";
import { z } from "zod";

const data: ProductShort[] = [
  {
    id: "1",
    name: "Angerella Denim Shorts for Women Mid Rise Ripped Jean Shorts Stretchy Folded Hem Hot Short Jeans",
    images: [
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
    ],
    price: 25.59,
    rating: 4.3,
  },
  {
    id: "2",
    name: "PRETTYGARDEN Women's Summer Tops Dressy Casual Short Lantern Sleeve V Neck Buttons Hollow Out Lace Embroidered Blouses Shirts",
    images: [
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
    ],
    price: 44.99,
    rating: 4.2,
  },
  {
    id: "3",
    name: "Dokotoo Womens Dresses 2024 Spring Summer Deep V Neck Elegant Bow tie Mini Dress S-XL",
    images: [
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
    ],
    price: 39.99,
    rating: 4.2,
  },
  {
    id: "4",
    name: "YESNO Women Long Casual Loose Bib Pants Overalls Baggy Rompers Jumpsuits with Pockets PV9",
    images: [
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
    ],
    price: 36.99,
    rating: 4.2,
  },
  {
    id: "5",
    name: "PUMIEY Women's Long Sleeve T-Shirts Crew Neck Slim Fit Tops Sexy Basic Tee Smoke Cloud Pro Collection",
    images: [
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
    ],
    price: 32.99,
    discountPrice: 24.99,
    rating: 4.3,
  },
  {
    id: "6",
    name: "WateLves Water Shoes Mens Womens Beach Swim Shoes Barefoot Athletic Quick-Dry Aqua Socks for Surfing Diving Kayaking Exercise",
    images: [
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
    ],
    price: 31.99,
    rating: 4.6,
  },
  {
    id: "7",
    name: "Lack of Color Women's Ventura Raffia Straw Wide-Brimmed Boater Hat",
    images: [
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
    ],
    price: 109.99,
    rating: 4.3,
  },
  {
    id: "8",
    name: "Lack of Color Women's Ventura Raffia Straw Wide-Brimmed Boater Hat",
    images: [
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
      placeholder,
    ],
    price: 109.99,
    rating: 4.3,
  },
];

const paramsSchema = z.object({
  searchQuery: z.string().optional(),
  page: z.number({ coerce: true }).min(1),
  pageSize: z.number({ coerce: true }).min(1),
});

export function GET(req: Request) {
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

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredData = filteredData.filter((v) =>
      v.name.toLowerCase().includes(query)
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
