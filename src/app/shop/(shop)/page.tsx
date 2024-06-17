"use client";
import { Banner } from "@/components/MainPage/Banner";
import { SingInUpBanner } from "@/components/MainPage/SingInUpBanner";
import { CarouselCategory } from "@/components/MainPage/CarouselCategory";

import ScrollToTopButton from "@/components/Shared/ScrollToTopButton";
import { ProductsBlock } from "@/components/Product/ProductsBlock";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products";

const pageSize = 9;

export default function Home() {
  const productsTrendingQuery = useQuery({
    queryKey: ["products", "main", "trending"],
    queryFn: () => getProducts({ page: 1, pageSize, orderBy: "date" }),
    refetchOnWindowFocus: false,
    select(data) {
      return data.status === 200 ? data.data : [];
    },
  });
  const productsDiscountQuery = useQuery({
    queryKey: ["products", "main", "discount"],
    queryFn: () => getProducts({ page: 1, pageSize, discount: true }),
    refetchOnWindowFocus: false,
    select(data) {
      return data.status === 200 ? data.data : [];
    },
  });

  return (
    <>
      <main className="lg:px-4 text-foreground">
        <Banner />
        <section className="py-6">
          <CarouselCategory />
        </section>
        <section className="px-4">
          <Separator />
          <div className="py-6">
            <ProductsBlock
              title="Trending deals"
              isLoading={productsTrendingQuery.isLoading}
              products={productsTrendingQuery.data ?? []}
            />
          </div>
          <Separator />
        </section>
        <div className="py-6">
          <CarouselCategory />
        </div>
        <section className="px-4">
          <Separator />
          <div className="py-6">
            <ProductsBlock
              title="Sale"
              isLoading={productsDiscountQuery.isLoading}
              products={productsDiscountQuery.data ?? []}
            />
          </div>
          <Separator />
        </section>
        <section className="pt-6 pb-6 px-4">
          <SingInUpBanner />
        </section>
      </main>
      <ScrollToTopButton />
    </>
  );
}
