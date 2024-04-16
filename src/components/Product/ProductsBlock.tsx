import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { ProductCarousel } from "./ProductCarousel";
import { ProductsListMobile } from "./ProductsListMobile";
import { MediaQueryCSS } from "../MediaQuery";

interface Props {
  title: string;
  maxSizeMobile?: number;
}

export const ProductsBlock = ({ title, maxSizeMobile }: Props) => {
  const products = Array.from({ length: 10 }).map((_, index) => ({
    title: `Product ${index + 1}`,
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
      <MediaQueryCSS maxSize="lg">
        <ProductsListMobile products={products} maxSize={maxSizeMobile} />
      </MediaQueryCSS>
      <MediaQueryCSS minSize="lg">
        <ProductCarousel products={products} />
      </MediaQueryCSS>
    </div>
  );
};
