import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import placeholderImage from "../../../public/Icons/placeholder.svg";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function CarouselCategory() {
  return (
    <Carousel
      className="w-full mx-auto"
      opts={{
        breakpoints: {
          "(max-width: 640px)": {
            align: "center",
          },
        },
        align: "end",
        loop: true,
      }}
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <CarouselItem
              key={index}
              className={
                "basis-[unset] md:basis-1/3 lg:basis-1/6 flex justify-center pl-4 lg:pl-6"
              }
            >
              <Link href={`/category/${index + 1}`}>
                <ImageCard
                  title={`Test category card title ${index + 1}`}
                  variant={getRandomInt(1, 3) as any}
                />
              </Link>
            </CarouselItem>
          );
        })}
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
    <Card className="min-w-44 max-w-44 lg:max-w-xs w-full flex flex-col">
      <div className="p-2">
        {variant === 1 ? (
          <div className="h-32">
            <Image
              src={placeholderImage}
              alt="placeholder"
              className="max-h-full h-full object-cover"
            />
          </div>
        ) : variant === 2 ? (
          <div className="grid grid-cols-2 grid-rows-2 gap-1 h-32 w-full relative">
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
          <div className="grid grid-cols-3 grid-rows-3 items-end gap-1 h-32 w-full relative">
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
        <div className="mt-2">
          <p className="text-lg line-clamp-2">{title}</p>
          <div className="mt-6 flex justify-end">
            <Button variant="ghost">
              See all <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
