import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "../Product/ProductCard";

export function CarouselProduct({
  products,
}: {
  products: { title: string; price: number }[];
}) {
  return (
    <div className="relative">
      <Carousel
        className="w-full mx-auto max-w-[1430px] static"
        opts={{ align: "end" }}
      >
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem
              className="md:basis-1/3 lg:basis-1/6 flex justify-center pl-4"
              key={index}
            >
              <Link href={`/product/${index + 1}`} className="w-full">
                <ProductCard title={product.title} price={product.price} />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
