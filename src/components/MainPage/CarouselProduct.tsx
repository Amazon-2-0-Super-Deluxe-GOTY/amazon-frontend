import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import placeholderImage from "../../../public/placeholder.svg";
import { MessageCircle, StarIcon } from "lucide-react";

export function CarouselProduct() {
  return (
    <Carousel className="w-full">
      <CarouselContent className="mx-auto">
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem
            className="md:basis-1/3 lg:basis-1/5 flex justify-center pl-0"
            key={index}
          >
            <ProductCard title={`Test ${index + 1}`} price={35.99} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

const ProductCard = ({ title, price }: { title: string; price: number }) => {
  const priceParts = price.toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];

  return (
    <Card className="w-[220px]">
      <div className="p-2">
        <Image src={placeholderImage} alt="placeholder" className="w-full" />
        <div className="mt-3 flex flex-col">
          <span className="text-lg line-clamp-2">{title}</span>
          <div className="py-1 flex gap-3 items-center">
            <div className="flex items-center gap-1">
              <StarIcon width={16} height={16} />
              <span className="text-sm">4.7</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle width={16} height={16} />
              <span className="text-sm">228</span>
            </div>
          </div>
          <div>
            <span className="text-xl">${whole}</span>
            <sup>{fraction}</sup>
            <sub className="ml-2 line-through text-gray-400">$39.99</sub>
          </div>
        </div>
      </div>
    </Card>
  );
};
