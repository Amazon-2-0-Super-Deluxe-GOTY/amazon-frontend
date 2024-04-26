import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "../Product/ProductCard";

export function SuggestionsProducts({
  products,
}: {
  products: { title: string; price: number }[];
}) {
  return (
    <div className="max-w-[1230px]">
      <Carousel>
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem
              className="md:basis-1/4 lg:basis-1/5 xl:basis-1/6 flex justify-center pl-4"
              key={index}
            >
              <Link href={`/product/${index + 1}`} >
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
