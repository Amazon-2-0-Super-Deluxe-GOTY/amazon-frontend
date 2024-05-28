import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import placeholder from "../../../public/Icons/placeholder2.svg";
import { CategoryCard } from "./CategoryCard";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const imagesForCards = Array.from({ length: 9 }).map(() =>
  Array.from({ length: getRandomInt(1, 4) }).map(() => ({
    id: (Math.random() * 1000).toFixed(0),
    imageUrl: placeholder.src,
  }))
);

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
      <CarouselContent>
        {imagesForCards.map((images, index) => {
          return (
            <CarouselItem
              key={index}
              className={
                "basis-[unset] md:basis-1/4 lg:basis-1/5 xl:basis-1/6 flex justify-center pl-4 lg:pl-6"
              }
            >
              <CategoryCard
                title={`Test category card title ${index + 1}`}
                link="/category/1"
                images={images}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
