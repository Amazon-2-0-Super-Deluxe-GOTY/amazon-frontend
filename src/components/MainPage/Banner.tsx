import * as React from "react";

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

export function Banner() {
  return (
    <Carousel className="w-full rounded-lg overflow-hidden">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="w-full h-80">
              <Card className="w-full h-full">
                <CardContent className="flex items-center justify-center">
                  <Image
                    src={placeholderImage}
                    alt="placeholder"
                    fill={true}
                    className="object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
