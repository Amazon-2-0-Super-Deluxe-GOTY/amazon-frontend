import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { MediaQuery } from "../MediaQuery";
import { CarouselProduct } from "./CarouselProduct";
import { ProductsListMobile } from "./ProductsListMobile";

export const ProductsBlock = ({ title }: { title: string }) => {
  const products = Array.from({ length: 10 }).map((_, index) => ({
    title: `Product ${index}`,
    price: 39.99,
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <Button variant="ghost">
          See all <ChevronRight size={16} className="ml-2" />
        </Button>
      </div>
      <MediaQuery
        minSize="lg"
        fallback={<ProductsListMobile products={products} />}
      >
        <CarouselProduct products={products} />
      </MediaQuery>
    </div>
  );
};
