"use server";
import type { Category } from "@/api/categories";
import { getCategoryServer } from "@/api/server";
import { ProductsListPage } from "@/components/ProductPage/ProductsListPage";
import { redirect } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const categoryId = Number(params.categoryId);

  if (isNaN(categoryId)) return redirect("/");

  let category: Category | null = null;
  try {
    category = await getCategoryServer({ categoryId });
  } catch (err) {
    return redirect("/");
  }

  if (!category.isActive) return redirect("/");

  return <ProductsListPage category={category} />;
}
