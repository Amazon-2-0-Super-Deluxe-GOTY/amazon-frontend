"use client";
import { useEffect } from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

import HouseLine from "@/../public/Icons/HouseLine.svg";
import FiltersCategoryArrow from "@/../public/Icons/FiltersCategoryArrow.svg";
import placeholder from "@/../public/Icons/placeholder.svg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MessageCircle, Slash, StarIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  useEffect(() => {
    if (params.categoryId) {
      console.log(`Loading page for category ${params.categoryId}`);
    }
  }, [params.categoryId]);

  return (
    <main className="flex flex-col items-center max-w-screen-xl py-10 grow w-full mx-auto">
      <section className="w-full flex items-left gap-1">
        <Breadcrumb>
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
                <Link href="/clothes">Clothes</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/clothes/women">Women</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Tops, Tees & Blouses</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* <Image src={HouseLine} alt="Home" />
        <span>/ Category{params.categoryId} / Subcategory / ProductsType </span> */}
      </section>
      <section className="w-full flex items-left pt-4">
        <span className="text-[36px] font-semibold">Title</span>
      </section>
      <section className="flex flex-col lg:flex-row w-full pt-8 gap-6">
        <div className="flex flex-col gap-3 basis-[320px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <FiltersCard key={index} />
          ))}
        </div>
        <div className="grow">
          {/* Filters here */}
          <div className="grid grid-cols-1 lg:grid-cols-3 auto-rows-max gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCard
                price={29}
                title={"Product " + index}
                quantity={index}
                key={index}
              />
            ))}
          </div>
          {/* Pagination here */}
        </div>
      </section>
    </main>
  );
}

const FiltersCard = () => {
  return (
    <div className="max-w-xs w-full p-4 bg-gray-200 rounded-lg shadow max-h-[414px]">
      <div className="flex items-center justify-between border-b">
        <h2 className="text-lg font-semibold">Brand</h2>
        <Button variant="ghost">
          <Image src={FiltersCategoryArrow} alt="filters" />
        </Button>
      </div>
      <div className="pt-3 w-full">
        <Input placeholder="Search..." className="mb-3" />
        <ScrollArea>
          <ul className="list-none p-0 m-0">
            {Array.from({ length: 10 }).map((_, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Checkbox id={"brand" + index} />
                <label className="text-base" htmlFor={"brand" + index}>
                  PUMIEY
                </label>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </div>
  );
};

const ProductCard = ({
  title,
  price,
  quantity,
}: {
  title: string;
  price: number;
  quantity: number;
}) => {
  const priceParts = price.toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];
  const isOutOfStock = quantity === 0;

  return (
    <Card className="max-w-sm w-full border-0 hover:ring-1 ring-gray-300 shadow-none transition-shadow duration-300 relative">
      <CardHeader className="pb-0">
        <div className="relative aspect-square">
          <Image src={placeholder} fill={true} alt="Placeholder" />
          <div className="absolute top-6 left-0 rounded-e-xl bg-gray-100 px-2 pl-4 pr-6">
            -24%
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-3 flex flex-col justify-center items-center">
          <span className="text-lg line-clamp-2">{title}</span>
          <div className="pb-3 flex gap-3 items-center">
            <div className="flex items-center gap-1">
              <StarIcon width={16} height={16} />
              <span className="text-sm">4.7</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle width={16} height={16} />
              <span className="text-sm">228</span>
            </div>
          </div>
          <div>
            <span className="text-xl">${whole}</span>
            <sup>{fraction}</sup>
            <sub className="ml-2 line-through text-gray-400">$39.99</sub>
          </div>
        </div>
      </CardContent>
      {isOutOfStock && (
        <div className="absolute inset-0 bg-gray-200/50">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center max-w-[230px] w-full">
            <span className="text-2xl">Out of Stock</span>
            <Button className="mt-4">Notify when available</Button>
          </div>
        </div>
      )}
    </Card>
  );
};
