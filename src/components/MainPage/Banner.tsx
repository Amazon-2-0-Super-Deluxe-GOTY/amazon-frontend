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
// import bannerImage1 from "../../../public/images/banner-main-1.png";
// import bannerImage1 from "../../../public/images/banner-main-1.avif";

export function Banner() {
  return (
    <Carousel
      className="w-full rounded-lg overflow-hidden"
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
            <div className="w-full h-80 relative">
              <Card className="w-full h-full">
                <CardContent className="flex items-center justify-center">
                  <Image
                    // src={bannerImage1}
                    src={"/banner-main-1.avif"}
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
