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
    <Carousel className="h-full w-full">
      <CarouselContent className="md:basis-1/3 lg:basis-1/5">
        {Array.from({ length: 10 }).map((_, index) => (
          <CardContent key={index}>
            <ImageCard
              title={`Test ${index + 1}`}
              variant={getRandomInt(1, 3) as any}
            />
          </CardContent>
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
          <div className="grid grid-cols-3 grid-rows-2 items-end gap-1 h-40 w-full relative">
            <Image
              src={placeholderImage}
              alt="placeholder"
              className="h-full max-w-full max-h-full col-span-3 object-cover"
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
        )}
        <div className="mt-3">
          <span className="text-lg">{title}</span>
        </div>
      </div>
    </Card>
  );
};
