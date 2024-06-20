import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CategoryCard } from "./CategoryCard";
import { CategoryCardSkeleton } from "./CategoryCardSkeleton";
import type { Category } from "@/api/categories";

export function CarouselCategory({
  categories,
  isLoading,
}: {
  categories: Category[];
  isLoading: boolean;
}) {
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
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem
                key={index}
                className={
                  "basis-[unset] md:basis-1/4 lg:basis-1/5 xl:basis-1/6 flex justify-center pl-4 lg:pl-6"
                }
              >
                <CategoryCardSkeleton />
              </CarouselItem>
            ))
          : categories.map((category, index) => {
              return (
                <CarouselItem
                  key={index}
                  className={
                    "basis-[unset] md:basis-1/4 lg:basis-1/5 xl:basis-1/6 flex justify-center pl-4 lg:pl-6"
                  }
                >
                  <CategoryCard category={category} />
                </CarouselItem>
              );
            })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
