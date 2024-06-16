import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "./ProductCard";
import type { ProductShort } from "@/api/products";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function ProductCarousel({
  products,
  isLoading,
}: {
  products: ProductShort[];
  isLoading: boolean;
}) {
  return (
    <div className="relative">
      <Carousel
        className="w-full mx-auto max-w-[1430px] static"
        opts={{ align: "end" }}
      >
        <CarouselContent className="p-1">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <CarouselItem
                  className="md:basis-1/4 lg:basis-1/5 xl:basis-1/6 flex justify-center pl-4"
                  key={i}
                >
                  <ProductCardSkeleton />
                </CarouselItem>
              ))
            : products.map((product, index) => (
                <CarouselItem
                  className="md:basis-1/4 lg:basis-1/5 xl:basis-1/6 flex justify-center pl-4"
                  key={index}
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
