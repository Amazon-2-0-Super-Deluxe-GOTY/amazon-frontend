"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function Banner() {
  return (
    <Carousel
      className="w-full lg:rounded-lg overflow-hidden"
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnMouseEnter: true,
        }),
      ]}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="w-full h-56 lg:h-80 relative">
              <Card className="w-full h-full">
                <CardContent className="flex items-center justify-center">
                  <picture className="block">
                    <source
                      media="(max-width: 768px)"
                      srcSet="/banner-main-mobile-1.avif"
                    />
                    <Image
                      src={"/banner-main-1.webp"}
                      alt="Banner with waves and cutlery"
                      fill={true}
                      className="object-cover"
                    />
                  </picture>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="hidden lg:inline-flex" />
      <CarouselNext className="hidden lg:inline-flex" />
    </Carousel>
  );
}
