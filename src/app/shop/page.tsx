import { Banner } from "@/components/MainPage/Banner";
import { SingInUpBanner } from "@/components/MainPage/SingInUpBanner";
import { CarouselCategory } from "@/components/MainPage/CarouselCategory";

import ScrollToTopButton from "@/components/Shared/ScrollToTopButton";
import { ProductsBlock } from "@/components/Product/ProductsBlock";
import { Separator } from "@/components/ui/separator";

export default function Home() {
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
            <ProductsBlock title="Trending deals" />
          </div>
          <Separator />
        </section>
        <div className="py-6">
          <CarouselCategory />
        </div>
        <section className="px-4">
          <Separator />
          <div className="py-6">
            <ProductsBlock title="Sale" />
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
