import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import placeholder from "../../../public/Icons/placeholder2.svg";
import { CategoryCard } from "./CategoryCard";
import Link from "next/link";

const imagesForCards = Array.from({ length: 9 }).map(() => ({
  id: (Math.random() * 1000).toFixed(0),
  imageUrl: placeholder.src,
}));

export function CarouselCategory() {
  return (
    <Carousel
      className="w-full mx-auto"
      opts={{
        breakpoints: {
          "(max-width: 640px)": {
            align: "center",
            loop: true,
          },
        },
        align: "end",
      }}
    >
      <CarouselContent className="p-1">
        {imagesForCards.map((image, index) => {
          return (
            <CarouselItem
              key={index}
              className={
                "basis-[unset] md:basis-1/4 lg:basis-1/5 xl:basis-1/6 flex justify-center pl-4 lg:pl-6"
              }
            >
              <Link
                href={`/category/${index + 1}`}
                className="w-full max-lg:min-w-44"
              >
                <CategoryCard
                  title={`Test category card title ${index + 1}`}
                  link="/category/1"
                  image={image}
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
