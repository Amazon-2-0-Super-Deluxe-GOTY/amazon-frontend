import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "./ProductCard";
import { useScreenSize } from "@/lib/media";

export function SuggestionsProducts({
  products,
}: {
  products: { title: string; price: number }[];
}) {
  const isDesktop = useScreenSize({ minSize: "md" });

  return (
    <div className="w-full h-full max-w-[1230px]">
      {isDesktop ? (
      <Carousel>
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem
              className="basis-1/4 lg:basis-1/5 xl:basis-1/6"
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
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.map((product, index) => (
            <div
              className=""
              key={index}
            >
              <Link href={`/product/${index + 1}`} >
                <ProductCard title={product.title} price={product.price} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
