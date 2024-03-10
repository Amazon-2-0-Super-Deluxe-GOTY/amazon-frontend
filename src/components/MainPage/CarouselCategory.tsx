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

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function CarouselCategory() {
  return (
    <Carousel className="h-full w-full @container">
      <CarouselContent className="mx-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="@3xl:basis-1/3 @6xl:basis-1/5 flex justify-center pl-0"
          >
            <ImageCard
              title={`Test ${index + 1}`}
              variant={getRandomInt(1, 3) as any}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

const ImageCard = ({
  title,
  variant,
}: {
  title: string;
  variant: 1 | 2 | 3;
}) => {
  return (
    <Card className="w-[220px] flex flex-col">
      <div className="p-2">
        {variant === 1 ? (
          <div className="h-40">
            <Image
              src={placeholderImage}
              alt="placeholder"
              className="max-h-full object-cover"
            />
          </div>
        ) : variant === 2 ? (
          <div className="grid grid-cols-2 grid-rows-2 gap-1 h-40 w-full relative">
            <Image
              src={placeholderImage}
              alt="placeholder"
              className="max-w-full max-h-full object-cover"
            />
            <Image
              src={placeholderImage}
              alt="placeholder"
              className="max-w-full max-h-full object-cover"
            />
            <Image
              src={placeholderImage}
              alt="placeholder"
              className="max-w-full max-h-full object-cover"
            />
            <Image
              src={placeholderImage}
              alt="placeholder"
              className="max-w-full max-h-full object-cover"
            />
          </div>
        ) : (
          <div className="grid grid-cols-3 grid-rows-3 items-end gap-1 h-40 w-full relative">
            <Image
              src={placeholderImage}
              alt="placeholder"
              className="max-w-full max-h-full h-full row-span-2 col-span-3 object-cover"
            />
            <Image
              src={placeholderImage}
              alt="placeholder"
              className="max-w-full max-h-full h-full row-2 object-cover"
            />
            <Image
              src={placeholderImage}
              alt="placeholder"
              className="max-w-full max-h-full h-full row-2 col-1 object-cover"
            />
            <Image
              src={placeholderImage}
              alt="placeholder"
              className="max-w-full max-h-full h-full row-2 col-2 object-cover"
            />
          </div>
        )}
        <div className="mt-3">
          <span className="text-lg">{title}</span>
        </div>
      </div>
    </Card>
  );
};
