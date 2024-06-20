"use server";
import React from "react";
import { ProductPage } from "@/components/ProductPage/ProductPage";
import { getProductBySlugServer } from "@/api/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export default async function Page({
  params,
}: {
  params: { productSlug: string };
}) {
  const product = await getProductBySlugServer(params);

  if (product.status !== 200) {
    return redirect("/not-found");
  }

  return <ProductPage product={product.data} />;
}

export async function generateMetadata({
  params,
}: {
  params: { productSlug: string };
}): Promise<Metadata> {
  const product = await getProductBySlugServer(params);

  if (product.status !== 200) {
    return {};
  }

  return {
    title: `${product.data.name} | Perry`,
  };
}
