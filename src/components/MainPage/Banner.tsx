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
import Image, { type StaticImageData } from "next/image";

import banner1Desktop from "@/../public/banner-main-1.webp";
import banner1Mobile from "@/../public/banner-main-mobile-1.webp";
import banner2Desktop from "@/../public/banner-main-2.webp";
import banner2Mobile from "@/../public/banner-main-mobile-2.webp";

const imageUrls: { desktop: StaticImageData; mobile: StaticImageData }[] = [
  {
    desktop: banner1Desktop,
    mobile: banner1Mobile,
  },
  {
    desktop: banner2Desktop,
    mobile: banner2Mobile,
  },
];

// const imageUrls: { desktop: string; mobile: string }[] = [
//   {
//     desktop: "/banner-main-1.webp",
//     mobile: "/banner-main-mobile-1.webp",
//   },
//   {
//     desktop: "/banner-main-2.webp",
//     mobile: "/banner-main-mobile-2.webp",
//   },
// ];

export function Banner() {
  return (
    <Card className="w-full h-full">
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
              <div className="w-full relative">
                <picture className="block">
                  <source
                    media="(max-width: 768px)"
                    srcSet={image.mobile.src}
                  />
                  <Image
                    src={image.desktop}
                    alt="Banner with waves and cutlery"
                    width={1600}
                    height={350}
                    className="object-cover"
                    placeholder="blur"
                  />
                </picture>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden lg:inline-flex" />
        <CarouselNext className="hidden lg:inline-flex" />
      </Carousel>
    </Card>
  );
}
