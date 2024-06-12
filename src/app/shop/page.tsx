"use client";
import { Banner } from "@/components/MainPage/Banner";
import { SingInUpBanner } from "@/components/MainPage/SingInUpBanner";
import { CarouselCategory } from "@/components/MainPage/CarouselCategory";

import ScrollToTopButton from "@/components/Shared/ScrollToTopButton";
import { ProductsBlock } from "@/components/Product/ProductsBlock";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products";

export default function Home() {
  const productsTrendingQuery = useQuery({
    queryKey: ["products", "main", "tranding"],
    queryFn: () => getProducts({ page: 1, pageSize: 10, orderBy: "date" }),
    select(data) {
      return data.status === 200 ? data.data : [];
    },
  });
  const productsDiscountQuery = useQuery({
    queryKey: ["products", "main", "discount"],
    queryFn: () => getProducts({ page: 1, pageSize: 10, discount: true }),
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
              products={productsTrendingQuery.data ?? []}
              title="Trending deals"
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
              products={productsDiscountQuery.data ?? []}
              title="Sale"
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
