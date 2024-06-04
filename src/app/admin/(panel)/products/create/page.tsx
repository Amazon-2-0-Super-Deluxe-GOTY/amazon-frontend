"use server";
import { getCategories } from "@/api/categories";
import { getAdminProduct } from "@/api/products";
import { CreateProductPage } from "@/components/Admin/Product/CreateProductPage";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const productId = searchParams["productId"] as string | undefined;
  const categoryId = searchParams["categoryId"] as string | undefined;

  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
    }),
    queryClient.prefetchQuery({
      queryKey: ["product", productId],
      queryFn: () => (productId ? getAdminProduct({ productId }) : undefined),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateProductPage productId={productId} categoryId={categoryId} />
    </HydrationBoundary>
  );
}
