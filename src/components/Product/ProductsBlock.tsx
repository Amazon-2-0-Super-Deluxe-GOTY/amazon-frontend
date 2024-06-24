import { Button } from "../ui/button";
import { ProductCarousel } from "./ProductCarousel";
import { ProductsListMobile } from "./ProductsListMobile";
import { MediaQueryCSS } from "../Shared/MediaQuery";
import type { ProductShort } from "@/api/products";
import { ChevronRightIcon } from "../Shared/Icons";
import Link from "next/link";

interface Props {
  title: string;
  maxSizeMobile?: number;
  products: ProductShort[];
  isLoading: boolean;
  categoryId?: number;
}

export const ProductsBlock = ({
  title,
  products,
  maxSizeMobile,
  isLoading,
  categoryId,
}: Props) => {
  const seeAllUrl =
    categoryId !== undefined ? `/category/${categoryId}` : "/products";
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-heading-2">{title}</h2>
        <MediaQueryCSS minSize="lg">
          <Link href={seeAllUrl}>
            <Button variant="tertiary" className="text-sm">
              See all{" "}
              <ChevronRightIcon className="ml-2 stroke-secondary w-4 h-4 lg:w-6 lg:h-6" />
            </Button>
          </Link>
        </MediaQueryCSS>
      </div>
      <MediaQueryCSS maxSize="lg">
        <ProductsListMobile
          products={products}
          maxSize={maxSizeMobile}
          isLoading={isLoading}
        />
      </MediaQueryCSS>
      <MediaQueryCSS minSize="lg">
        <ProductCarousel products={products} isLoading={isLoading} />
      </MediaQueryCSS>
      {maxSizeMobile === undefined && (
        <MediaQueryCSS maxSize="lg">
          <div className="mt-3 flex justify-center items-center">
            <Link href={seeAllUrl}>
              <Button variant="secondary" className="text-sm">
                See all
              </Button>
            </Link>
          </div>
        </MediaQueryCSS>
      )}
    </div>
  );
};
