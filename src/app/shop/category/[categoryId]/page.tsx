"use client";
import React from "react";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { useSearchParamsTools } from "@/lib/router";

import Image from "next/image";
import Link from "next/link";
import { Slash, XIcon } from "lucide-react";

import HouseLine from "@/../public/Icons/HouseLine.svg";
import SwitchCard33 from "@/../public/Icons/SwitchCard33.svg";
import SwitchCard44 from "@/../public/Icons/SwitchCard44.svg";

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

import ScrollToTopButton from "@/components/Shared/ScrollToTopButton";
import { ProductCard } from "@/components/Product/ProductCard";
import { FilterCardVariationMobile } from "@/components/ProductByCategoryPage/FilterCardVariationMobile";
import {
  FilterItem,
  FilterCheckedType,
} from "@/components/ProductByCategoryPage/filtersDataTypes";
import { MediaQueryCSS } from "@/components/Shared/MediaQuery";
import { FilterCardVariation } from "@/components/ProductByCategoryPage/FilterCardVariation";

const FiltersData: FilterItem[] = [
  {
    title: "Brand",
    type: "checkbox",
    isSearch: true,
    values: [
      "Brand 1",
      "Brand 2",
      "Brand 3",
      "Brand 4",
      "Brand 5",
      "Brand 6",
      "Brand 7",
      "Brand 8",
      "Brand 9",
      "Brand 10",
      "Brand 11",
      "Brand 12",
      "Brand 13",
      "Brand 14",
      "Brand 15",
    ],
  },
  {
    title: "Fabric type",
    type: "checkbox",
    isSearch: true,
    values: [
      "Fabric type 1",
      "Fabric type 2",
      "Fabric type 3",
      "Fabric type 4",
      "Fabric type 5",
      "Fabric type 6",
      "Fabric type 7",
      "Fabric type 8",
      "Fabric type 9",
      "Fabric type 10",
      "Fabric type 11",
      "Fabric type 12",
      "Fabric type 13",
      "Fabric type 14",
      "Fabric type 15",
    ],
  },
  {
    title: "Size",
    type: "tiles",
    isSearch: true,
    values: [
      "2XS",
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL",
      "4XL",
      "5XL",
      "32",
      "34",
      "36",
      "38",
      "40",
      "42",
      "44",
      "46",
      "48",
      "50",
      "52",
      "54",
      "56",
      "58",
      "60",
    ],
  },
  {
    title: "Color",
    type: "checkbox",
    isSearch: true,
    values: [
      "Color 1",
      "Color 2",
      "Color 3",
      "Color 4",
      "Color 5",
      "Color 6",
      "Color 7",
      "Color 8",
      "Color 9",
      "Color 10",
      "Color 11",
      "Color 12",
      "Color 13",
      "Color 14",
      "Color 15",
    ],
  },
  {
    title: "Price",
    type: "price",
    isSearch: false,
    values: { min: 0, max: 1000 },
  },
  {
    title: "Customer reviews",
    type: "rating",
    isSearch: false,
    values: [5, 4, 3, 2, 1],
  },
];

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const searchParams = useSearchParamsTools();

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

  //#region CheckedParams
  const [checkedItems, setCheckedItems] = useState<FilterCheckedType>(() => {
    let result: FilterCheckedType = [];

    FiltersData.forEach((filter, index) => {
      const defaultValue = searchParams.get(filter.title);
      if (defaultValue) {
        const itemNamesArray = defaultValue
          .split(",")
          .filter(
            (v) =>
              filter.type === "price" ||
              (filter.type === "rating" &&
                !isNaN(parseInt(v)) &&
                filter.values.includes(parseInt(v))) ||
              (filter.type !== "rating" && filter.values.includes(v))
          );

        if (itemNamesArray.length > 0) {
          result.push({ title: filter.title, values: itemNamesArray });
        } else {
          searchParams.set(filter.title, undefined);
        }
      }
    });

    return result;
  });
  //#endregion

  //#region indicatorCheckedFilterCount
  const [indicatorCount, setIndicatorCount] = useState<number>(() => {
    if (checkedItems) {
      return checkedItems?.reduce(
        (total, item) => total + item.values.length,
        0
      );
    }
    return 0;
  });

  useEffect(() => {
    const newCount = checkedItems?.reduce(
      (total, item) => total + item.values.length,
      0
    );
    setIndicatorCount(newCount ? newCount : 0);
  }, [checkedItems]);
  //#endregion

  const clearAllFilters = () => {
    setCheckedItems([]);
  };

  const uncheckFilter = (titleItem: string, checkedItem: string) => {
    const isExists = checkedItems.find((v) => v.title === titleItem);
    if (isExists) {
      if (
        isExists.values.length === 1 &&
        isExists.values.includes(checkedItem)
      ) {
        searchParams.set(titleItem, undefined);
        setCheckedItems((prevItems) => [
          ...prevItems.filter((item) => item.title !== titleItem),
        ]);
      } else {
        searchParams.set(
          titleItem,
          checkedItems
            ?.find((v) => v.title === titleItem)
            ?.values.filter((v) => v !== checkedItem)
            .join(",")
        );
        setCheckedItems((prevItems) =>
          prevItems.map((item) =>
            item.title === titleItem
              ? {
                  ...item,
                  values: item.values.filter((val) => val !== checkedItem),
                }
              : item
          )
        );
      }
    }
  };

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
        <span className="text-4xl font-semibold">Title</span>
      </section>
      <section className="flex max-sm:flex-col lg:flex-row w-full pt-8 gap-6">
        <MediaQueryCSS minSize="lg">
          <div className="flex flex-col gap-2 w-80">
            <FilterCardVariation
              filters={FiltersData}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
            />
          </div>
        </MediaQueryCSS>
        <div className="grow">
          <div className="w-full flex justify-between items-center gap-2">
            <MediaQueryCSS maxSize="lg">
              <FilterCardVariationMobile
                categoryId={params.categoryId}
                filters={FiltersData}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
            </MediaQueryCSS>
            <MediaQueryCSS minSize="lg">
              <div className="w-full">
                <Select>
                  <SelectTrigger className="py-3 px-4 max-w-52 w-full min-w-48 bg-gray-200">
                    <SelectValue
                      placeholder={
                        indicatorCount +
                        (indicatorCount === 1
                          ? " filter applied"
                          : " filters applied")
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-200">
                    <div className="p-3">
                      <ScrollArea>
                        <ul className="list-none p-0 m-0 max-h-[230px]">
                          {checkedItems &&
                            checkedItems.map((item, index) => (
                              <ul key={index}>
                                {item.values.map((value, valueIndex) => (
                                  <li
                                    key={valueIndex}
                                    className="flex items-center space-x-2 pb-1"
                                  >
                                    <Button
                                      key={valueIndex}
                                      variant="ghost"
                                      className="bg-gray-300 justify-between flex gap-2"
                                      onClick={() => {
                                        uncheckFilter(item.title, value);
                                      }}
                                    >
                                      <span>{value}</span>
                                      <XIcon />
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            ))}
                        </ul>
                      </ScrollArea>
                      <hr className="my-4 border-gray-400 border-y"></hr>
                      <Button variant={"ghost"} onClick={clearAllFilters}>
                        <Link href={`/category/${params.categoryId}`}>
                          Clear all
                        </Link>
                      </Button>
                    </div>
                  </SelectContent>
                </Select>
              </div>
            </MediaQueryCSS>
            <div className="flex gap-2 items-center w-full justify-end">
              <div className="max-w-[260px] w-full">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="byrating">By rating</SelectItem>
                    <SelectItem value="novelty">Novelty</SelectItem>
                    <SelectItem value="toexpensive">
                      From cheap to expensive
                    </SelectItem>
                    <SelectItem value="tocheap">
                      From expensive to cheap
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
