"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Slash, Star, StarHalf } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HouseLine from "@/../public/Icons/HouseLine.svg";
import placeholder from "@/../public/Icons/placeholder.svg";
import { OptionsComponent } from "@/components/Product/Options/types";
import { ProductOptionsMapper } from "@/components/Product/Options/ProductOptionsMapper";
import { ProductOrderCard } from "@/components/Product/ProductOrderCard";

const productOptions: OptionsComponent[] = [
  {
    type: "sizes",
    data: [
      {
        title: "Extra Small",
        short: "XS",
        isAvailable: true,
      },
      {
        title: "Small",
        short: "S",
        isAvailable: true,
      },
      {
        title: "Medium",
        short: "M",
        isAvailable: true,
      },
      {
        title: "Large",
        short: "L",
        isAvailable: true,
      },
      {
        title: "Extra Large",
        short: "XL",
        isAvailable: true,
      },
      {
        title: "2X Large",
        short: "2XL",
        isAvailable: true,
      },
      {
        title: "3X Large",
        short: "3XL",
        isAvailable: false,
      },
    ],
  },
  {
    type: "colors",
    data: [
      {
        title: "Red",
        hex: "#FF0000",
        isAvailable: true,
      },
      {
        title: "Orange",
        hex: "#FF8A00",
        isAvailable: true,
      },
      {
        title: "Yellow",
        hex: "#FFE500",
        isAvailable: true,
      },
      {
        title: "Chartreuse",
        hex: "#80FF00",
        isAvailable: true,
      },
      {
        title: "Green",
        hex: "#00FF47",
        isAvailable: true,
      },
      {
        title: "Aqua",
        hex: "#00FFD1",
        isAvailable: false,
      },
      {
        title: "Light Blue",
        hex: "#00D1FF",
        isAvailable: true,
      },
      {
        title: "Azure",
        hex: "#0094FF",
        isAvailable: true,
      },
      {
        title: "Blue",
        hex: "#0047FF",
        isAvailable: true,
      },
      {
        title: "Purple",
        hex: "#8000FF",
        isAvailable: true,
      },
      {
        title: "Magenta",
        hex: "#FA00FF",
        isAvailable: true,
      },
    ],
  },
];

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  useEffect(() => {
    if (params.productId) {
      console.log(`Loading page for product ${params.productId}`);
    }
  }, [params.productId]);

  return (
    <main className="flex flex-col items-center grow w-full max-w-[1600px] px-4 py-5 lg:py-10 lg:px-2 mx-auto">
      <div className="w-full flex items-left gap-1 mb-3 lg:mb-10">
        <Breadcrumb className="text-sm lg:text-base">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <Image src={HouseLine} width={24} height={24} alt="Home" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/category">Clothes</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/category/subcategory">Tops, Tees & Blouses</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>T-Shirts</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <section className="flex flex-col lg:flex-row gap-3 lg:gap-6 justify-between w-full">
        <div className="max-w-2xl w-full">
          <div className="lg:hidden">
            <h1 className="text-2xl">
              PUMIEY Women&apos;s Long Sleeve T-Shirts Crew Neck Slim Fit Tops
              Sexy Basic Tee Smoke Cloud Pro Collection
            </h1>
            <span className="text-sm text-gray-400">Code: B0CHFLT63B</span>
            <div className="my-3 flex items-center">
              <div className="flex items-center gap-1 h-4">
                <Star fill="#000" className="w-4 h-4" />
                <Star fill="#000" className="w-4 h-4" />
                <Star fill="#000" className="w-4 h-4" />
                <Star fill="#000" className="w-4 h-4" />
                <StarHalf fill="#000" className="w-4 h-4" />
              </div>
              <span className="text-base font-bold ml-2">4.3</span>
              <span className="text-base ml-2">228 reviews</span>
            </div>
          </div>
          <Carousel
            className="w-full"
            opts={{
              align: "center",
            }}
          >
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, index) => {
                return (
                  <CarouselItem key={index}>
                    <Image
                      src={placeholder}
                      alt="Placeholder"
                      className="object-cover"
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <span className="w-1/5 absolute top-[4%] lg:top-8 left-0 pl-[3%] py-2 bg-gray-50 rounded-e-full text-base lg:text-2xl">
              -24%
            </span>
          </Carousel>
          <div className="mt-4 lg:mt-8">
            <Carousel
              className="w-full"
              opts={{
                align: "center",
              }}
            >
              <CarouselContent>
                {Array.from({ length: 10 }).map((_, index) => {
                  return (
                    <CarouselItem
                      key={index}
                      className={
                        "basis-[unset] pl-2 first:pl-4 lg:pl-6 md:pl-4 lg:first:pl-4"
                      }
                    >
                      <Image
                        src={placeholder}
                        alt="Placeholder"
                        className="w-14 h-14 lg:w-20 lg:h-20 object-cover"
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        <div className="max-w-xl w-full">
          <div className="hidden lg:block">
            <h1 className="text-3xl">
              PUMIEY Women&apos;s Long Sleeve T-Shirts Crew Neck Slim Fit Tops
              Sexy Basic Tee Smoke Cloud Pro Collection
            </h1>
            <div className="mt-4 flex items-center">
              <div className="flex items-center gap-1 h-4">
                <Star fill="#000" className="w-4 h-4" />
                <Star fill="#000" className="w-4 h-4" />
                <Star fill="#000" className="w-4 h-4" />
                <Star fill="#000" className="w-4 h-4" />
                <StarHalf fill="#000" className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold ml-2">4.3</span>
              <span className="text-xl ml-4">228 reviews</span>
              <span className="text-xl ml-auto">Code: B0CHFLT63B</span>
            </div>
          </div>
          <div className="mt-3 mb-6 lg:mt-8 lg:mb-0 flex flex-col gap-3 lg:gap-8">
            <ProductOptionsMapper options={productOptions} />
          </div>
        </div>
        <div className="max-w-72 w-full">
          <ProductOrderCard />
        </div>
      </section>
    </main>
  );
}
