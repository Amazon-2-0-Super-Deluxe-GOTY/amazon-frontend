import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { ProductCarousel } from "./ProductCarousel";
import { ProductsListMobile } from "./ProductsListMobile";
import { MediaQueryCSS } from "../Shared/MediaQuery";

interface Props {
  title: string;
  maxSizeMobile?: number;
}

export const ProductsBlock = ({ title, maxSizeMobile }: Props) => {
  const products = Array.from({ length: 9 }).map((_, index) => ({
    title: `Product ${index + 1}`,
    price: 39.99,
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-heading-2">{title}</h2>
        <MediaQueryCSS minSize="lg">
          <Button variant="tertiary" className="text-sm">
            See all{" "}
            <ChevronRight className="ml-2 stroke-secondary w-4 h-4 lg:w-6 lg:h-6" />
          </Button>
        </MediaQueryCSS>
      </div>
      <MediaQueryCSS maxSize="lg">
        <ProductsListMobile products={products} maxSize={maxSizeMobile} />
      </MediaQueryCSS>
      <MediaQueryCSS minSize="lg">
        <ProductCarousel products={products} />
      </MediaQueryCSS>
      {maxSizeMobile === undefined && (
        <MediaQueryCSS maxSize="lg">
          <div className="mt-3 flex justify-center items-center">
            <Button variant="secondary" className="text-sm">
              See all
            </Button>
          </div>
        </MediaQueryCSS>
      )}
    </div>
  );
};
