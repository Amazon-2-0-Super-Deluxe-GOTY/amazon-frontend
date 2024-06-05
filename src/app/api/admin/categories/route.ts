import type { Category } from "@/api/categories";

const data: Category[] = [
  {
    id: 1,
    name: "Fashion",
    iconId: "shirt",
    description:
      "Explore a diverse collection of clothing, footwear, accessories, and more to elevate your style and keep up with the latest fashion trends. From timeless classics to bold statements, find everything you need to express your individuality and stay fashionable.",
    categoryPropertyKeys: [],
    isDeleted: false,
  },
  {
    id: 2,
    name: "Electronics",
    iconId: "monitor",
    description: "Test description",
    categoryPropertyKeys: [],
    isDeleted: false,
  },
  {
    id: 3,
    name: "Household",
    iconId: "home",
    description: "Test description",
    categoryPropertyKeys: [],
    isDeleted: false,
  },
  {
    id: 4,
    name: "Furniture",
    iconId: "armchair",
    description: "Test description",
    categoryPropertyKeys: [],
    isDeleted: false,
  },
  {
    id: 5,
    name: "Work tools",
    iconId: "wrench",
    description: "Test description",
    categoryPropertyKeys: [],
    isDeleted: false,
  },
  {
    id: 11,
    parentId: 1,
    name: "Women's Fashion",
    description: "Test description",
    categoryPropertyKeys: [
      { name: "Size" },
      { name: "Fabric type" },
      { name: "Color" },
    ],
    isDeleted: false,
  },
  {
    id: 12,
    parentId: 11,
    name: "Casual Women's Clothing",
    description: "Test description",
    categoryPropertyKeys: [
      {
        name: "Size",
      },
      {
        name: "Brand",
      },
    ],
    isDeleted: false,
  },
  {
    id: 13,
    parentId: 12,
    name: "Tops",
    description: "Test description",
    categoryPropertyKeys: [],
    isDeleted: false,
  },
  {
    id: 14,
    parentId: 13,
    name: "T-shirts and Tank Tops",
    description: "Test description",
    categoryPropertyKeys: [],
    isDeleted: false,
  },
  {
    id: 15,
    parentId: 13,
    name: "Blouses and Shirts",
    description: "Test description",
    categoryPropertyKeys: [],
    isDeleted: false,
  },
  {
    id: 16,
    parentId: 12,
    name: "Bottoms",
    description: "Test description",
    categoryPropertyKeys: [],
    isDeleted: false,
  },
  {
    id: 17,
    parentId: 16,
    name: "Jeans and Denim",
    description: "Test description",
    categoryPropertyKeys: [],
    isDeleted: false,
  },
  {
    id: 18,
    parentId: 16,
    name: "Pants and Trousers",
    description: "Test description",
    categoryPropertyKeys: [],
    isDeleted: false,
  },
  {
    id: 19,
    parentId: 1,
    name: "Men's Fashion",
    description: "Test description",
    categoryPropertyKeys: [],
    isDeleted: false,
  },
  {
    id: 20,
    parentId: 2,
    name: "Computers",
    description: "Test description",
    categoryPropertyKeys: [],
    isDeleted: false,
  },
];

export function GET(req: Request) {
  return Response.json({ data }, { status: 200 });
}
