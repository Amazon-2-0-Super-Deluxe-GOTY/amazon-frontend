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

const imageUrls: { desktop: string; mobile: string }[] = [
  {
    desktop: "/banner-main-1.webp",
    mobile: "/banner-main-mobile-1.avif",
  },
  {
    desktop: "/banner-main-2.webp",
    mobile: "/banner-main-mobile-1.avif",
  },
];

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
        {imageUrls.map((image, index) => (
          <CarouselItem key={index}>
            <div className="w-full h-56 lg:h-80 relative">
              <Card className="w-full h-full">
                <CardContent className="flex items-center justify-center">
                  <picture className="block">
                    <source media="(max-width: 768px)" srcSet={image.mobile} />
                    <Image
                      src={image.desktop}
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
