"use server";
import React from "react";
import { getProductBySlug } from "@/api/products";
import { ProductPage } from "@/components/ProductPage/ProductPage";
import { getProductBySlugServer } from "@/api/server";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { productSlug: string };
}) {
  const product = await getProductBySlugServer(params);

  if (product.status !== 200) {
    return redirect("/");
  }

  return <ProductPage product={product.data} />;
}
