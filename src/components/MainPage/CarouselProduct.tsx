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
          <span className="text-lg">{title}</span>
          <div>
            <span className="text-xl">${whole}</span>
            <sup>{fraction}</sup>
          </div>
        </div>
      </div>
    </Card>
  );
};
