"use client";
import React from 'react';
import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Slash, StarIcon } from "lucide-react";

import HouseLine from "@/../public/Icons/HouseLine.svg";
import SwitchCard33 from "@/../public/Icons/SwitchCard33.svg";
import SwitchCard44 from "@/../public/Icons/SwitchCard44.svg";
import placeholder from "@/../public/Icons/placeholder.svg";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import ScrollToTopButton from "@/components/ScrollToTopButton";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/Product/ProductCard";
import { FiltersCard, FiltersCardMobile } from "@/components/ProductByCategoryPage/FiltersCard";
import { useScreenSize } from '@/lib/media';

type FiltersDataItemValue = {
  name: string;
  isChecked: boolean;
};
type FiltersDataItem = {
  title: string;
  type: string;
  values: FiltersDataItemValue[];
  isSearch: boolean;
};
const FiltersData: FiltersDataItem[] = [
  {
    title: "Brand",
    type: "Checkbox",
    values: [
      { name: "Brand 1", isChecked: false },
      { name: "Brand 2", isChecked: false },
      { name: "Brand 3", isChecked: false },
      { name: "Brand 4", isChecked: false },
      { name: "Brand 5", isChecked: false },
      { name: "Brand 6", isChecked: false },
      { name: "Brand 7", isChecked: false },
      { name: "Brand 8", isChecked: false },
      { name: "Brand 9", isChecked: false },
      { name: "Brand 10", isChecked: false },
      { name: "Brand 11", isChecked: false },
      { name: "Brand 12", isChecked: false },
      { name: "Brand 13", isChecked: false },
      { name: "Brand 14", isChecked: false },
      { name: "Brand 15", isChecked: false },
    ],
    isSearch: true,
  },
  {
    title: "Fabric type",
    type: "Checkbox",
    values: [
      { name: "Brand 1", isChecked: false },
      { name: "Brand 2", isChecked: false },
      { name: "Brand 3", isChecked: false },
      { name: "Brand 4", isChecked: false },
      { name: "Brand 5", isChecked: false },
      { name: "Brand 6", isChecked: false },
      { name: "Brand 7", isChecked: false },
      { name: "Brand 8", isChecked: false },
      { name: "Brand 9", isChecked: false },
      { name: "Brand 10", isChecked: false },
      { name: "Brand 11", isChecked: false },
      { name: "Brand 12", isChecked: false },
      { name: "Brand 13", isChecked: false },
      { name: "Brand 14", isChecked: false },
      { name: "Brand 15", isChecked: false },
    ],
    isSearch: true,
  },
  {
    title: "Size",
    type: "Tiles",
    values: [
      { name: "2XS", isChecked: false },
      { name: "XS", isChecked: false },
      { name: "S", isChecked: false },
      { name: "M", isChecked: false },
      { name: "L", isChecked: false },
      { name: "XL", isChecked: false },
      { name: "2XL", isChecked: false },
      { name: "3XL", isChecked: false },
      { name: "4XL", isChecked: false },
      { name: "5XL", isChecked: false },
      { name: "32", isChecked: false },
      { name: "34", isChecked: false },
      { name: "36", isChecked: false },
      { name: "38", isChecked: false },
      { name: "40", isChecked: false },
      { name: "42", isChecked: false },
      { name: "44", isChecked: false },
      { name: "46", isChecked: false },
      { name: "48", isChecked: false },
      { name: "50", isChecked: false },
      { name: "52", isChecked: false },
      { name: "54", isChecked: false },
      { name: "56", isChecked: false },
      { name: "58", isChecked: false },
      { name: "60", isChecked: false },
    ],
    isSearch: true,
  },
  {
    title: "Color",
    type: "Checkbox",
    values: [
      { name: "Color 1", isChecked: false },
      { name: "Color 2", isChecked: false },
      { name: "Color 3", isChecked: false },
      { name: "Color 4", isChecked: false },
      { name: "Color 5", isChecked: false },
      { name: "Color 6", isChecked: false },
      { name: "Color 7", isChecked: false },
      { name: "Color 8", isChecked: false },
      { name: "Color 9", isChecked: false },
      { name: "Color 10", isChecked: false },
      { name: "Color 11", isChecked: false },
      { name: "Color 12", isChecked: false },
      { name: "Color 13", isChecked: false },
      { name: "Color 14", isChecked: false },
      { name: "Color 15", isChecked: false },
    ],
    isSearch: true,
  },
  {
    title: "Price",
    type: "Price",
    values: [{ name: "0", isChecked: false }],
    isSearch: false,
  },
  {
    title: "Customer reviews",
    type: "Rating",
    values: [
      { name: "5", isChecked: false }, 
      { name: "4", isChecked: false }, 
      { name: "3", isChecked: false }, 
      { name: "2", isChecked: false }, 
      { name: "1", isChecked: false }, 
    ],
    isSearch: false,
  },
];

export default function CategoryPage ({
  params,
}: {
  params: { categoryId: string, filter: string };
}) {
  //#region isMobile
  const isMobile = useScreenSize({ maxSize: "sm" });
  //#endregion

  //#region ButtonDefaultCardTemplateClick
  const [isDefaultTemplateDisplayCardOn, setIsDefaultTemplateDisplayCardOn] =
    useState(true);
  const ButtonDefaultCardTemplateClick = () => {
    setIsDefaultTemplateDisplayCardOn(true);
  };
  const ButtonSecondaryCardTemplateClick = () => {
    setIsDefaultTemplateDisplayCardOn(false);
  };
  //#endregion
  
  const handleClearAllFilters = () => {
    FiltersData.map((item, index) => {
      localStorage.removeItem("FilterCheckedArray_" + item.title + "_" + params.categoryId);
    });
    
  };

  useEffect(() => {
    if (params.categoryId) {
      console.log(`Loading page for category ${params.categoryId}`);
    }
  }, [params.categoryId]);

  return (
    <main className="flex flex-col items-center max-w-[1600px] px-4 py-10 grow w-full mx-auto">
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
                <Link href="/category">Category {params.categoryId}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/category/subcategory">
                  Subcategory {params.categoryId}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Products {params.categoryId}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <section className="w-full flex items-left pt-4">
        <span className="text-[36px] font-semibold">Title</span>
      </section>
      <section className="flex max-sm:flex-col lg:flex-row w-full pt-8 gap-6">
        { !isMobile && 
          <div className="flex flex-col gap-2 basis-[385px] max-md:w-full">
            {FiltersData.map((item, index) => (
              <FiltersCard key={index} categoryId={params.categoryId} item={item} isOpen={true} isMobile={false} />
            ))}
          </div> }
        <div className="grow">
          {/* Filters here */}
          <div className="w-full flex justify-between items-center gap-2">
          {isMobile ? (<FiltersCardMobile categoryId={params.categoryId} items={FiltersData} />) : (
            <div className="max-w-[200px] w-full">
              <Select>
                <SelectTrigger className="bg-gray-200">
                  <SelectValue placeholder="Selected filters" />
                </SelectTrigger>
                <SelectContent className="bg-gray-200">
                  <div className=" p-3">
                    <ScrollArea>
                      <ul className="list-none p-0 m-0 max-h-[230px]">
                        {Array.from({ length: 15 }).map((_, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2 pb-1"
                          >
                            <Button
                              variant={"ghost"}
                              className="flex gap-2 bg-gray-300"
                            >
                              <span>Filter {index}</span>
                              <span className="px-1">X</span>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                    <hr className="my-4 border-gray-400 border-y"></hr>
                    <Button variant={"ghost"} onClick={() => {
                      handleClearAllFilters()
                    }}
                    asChild>
                      <Link href={`/category/${params.categoryId}`} >
                        Clear all
                      </Link>
                    </Button>
                  </div>
                </SelectContent>
              </Select>
            </div>
          )}
            <div className="flex gap-2 items-center w-full justify-end">
              <div className="max-w-[260px] w-full">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mostpopular">Most popular</SelectItem>
                    <SelectItem value="tocheap">
                      From expensive to cheap
                    </SelectItem>
                    <SelectItem value="toexpensive">
                      From cheap to expensive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex max-md:hidden">
                <Button
                  variant={"ghost"}
                  className={cn(
                    "rounded-r-none min-w-[40px] px-4 max-lg:px-2",
                    isDefaultTemplateDisplayCardOn
                      ? "bg-gray-300"
                      : "bg-gray-200"
                  )}
                  onClick={ButtonDefaultCardTemplateClick}
                >
                  <Image src={SwitchCard33} alt="switchcards33" />
                </Button>
                <Button
                  variant={"ghost"}
                  className={cn(
                    "rounded-l-none min-w-[40px] px-4 max-lg:px-2",
                    !isDefaultTemplateDisplayCardOn
                      ? "bg-gray-300"
                      : "bg-gray-200"
                  )}
                  onClick={ButtonSecondaryCardTemplateClick}
                >
                  <Image src={SwitchCard44} alt="switchcards44" />
                </Button>
              </div>
            </div>
          </div>
          <hr className="mt-6 mb-10 border-gray-300"></hr>
          <div
            className={cn(
              "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 auto-rows-max gap-6",
              !isDefaultTemplateDisplayCardOn && "md:grid-cols-3 lg:grid-cols-4"
            )}
          >
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
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
      <ScrollToTopButton />
    </main>
  );
}
