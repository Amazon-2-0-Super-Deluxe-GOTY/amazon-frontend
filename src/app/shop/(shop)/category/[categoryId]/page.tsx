"use client";

import { ProductsListPage } from "@/components/Product/ProductsListPage";
import { useMemo } from "react";

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const categoryId = useMemo(() => {
    const val = Number(params.categoryId);
    return isNaN(val) ? 1 : val;
  }, [params.categoryId]);

  // FIXME: fetch real category
  return (
    <ProductsListPage category={{ id: categoryId, name: "TestCategory" }} />
  );
}
