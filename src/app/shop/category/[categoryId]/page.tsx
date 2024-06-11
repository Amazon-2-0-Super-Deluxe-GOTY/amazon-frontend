"use client";
import React, { useMemo } from "react";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { useSearchParamsTools } from "@/lib/router";

import Image from "next/image";
import Link from "next/link";
import { Slash } from "lucide-react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ScrollToTopButton from "@/components/Shared/ScrollToTopButton";
import { ProductCard } from "@/components/Product/ProductCard";
import { FilterCardVariationMobile } from "@/components/ProductByCategoryPage/FilterCardVariationMobile";
import { FilterCheckedType } from "@/components/ProductByCategoryPage/filtersDataTypes";
import { MediaQueryCSS } from "@/components/Shared/MediaQuery";
import { FilterCardVariation } from "@/components/ProductByCategoryPage/FilterCardVariation";
import { useCategoryFilters } from "@/api/categories";
import { Pagination } from "@/components/Shared/Pagination";
import { Separator } from "@/components/ui/separator";
import {
  Grid3x3Icon,
  Grid5x4Icon,
  HomeIcon,
  XIcon,
} from "@/components/Shared/Icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const searchParams = useSearchParamsTools();
  // FIXME: test category id for now
  const filtersData = useCategoryFilters(1);

  const checkedItems = useMemo<FilterCheckedType>(() => {
    if (!searchParams.params) return [];

    // @ts-expect-error convert search params to array
    return [...searchParams.params.entries()].map((entry) => ({
      title: entry[0],
      values: entry[1].split(","),
    }));
  }, [searchParams]);

  const appliedFiltersCount = useMemo(() => {
    return checkedItems.reduce((count, item) => count + item.values.length, 0);
  }, [checkedItems]);

  const uncheckFilter = (param: { title: string; value: string }) => {
    const existingParams = searchParams.get?.(param.title)?.split(",");
    if (!existingParams) return;

    searchParams.set(
      param.title,
      existingParams.filter((p) => p !== param.value).join(",")
    );
  };

  const page = useMemo<number>(() => {
    const pageFromParams = searchParams.get?.("page");
    if (!pageFromParams) return 1;

    const pageNumber = Number(pageFromParams);
    if (isNaN(pageNumber)) return 1;

    return pageNumber;
  }, [searchParams]);

  const setPage = (page: number) => {
    searchParams.set("page", page.toString());
  };

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

  return (
    <main className="flex flex-col items-center px-4">
      <section className="w-full flex items-left gap-1">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <HomeIcon />
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
            <FilterCardVariation filters={filtersData.data} />
          </div>
        </MediaQueryCSS>
        <div className="grow">
          <div className="w-full flex justify-between items-center gap-2">
            <MediaQueryCSS maxSize="lg">
              <FilterCardVariationMobile
                categoryId={params.categoryId}
                filters={filtersData.data}
                checkedItems={checkedItems}
                uncheckFilter={uncheckFilter}
                appliedFiltersCount={appliedFiltersCount}
              />
            </MediaQueryCSS>
            <MediaQueryCSS minSize="lg">
              <div className="w-full">
                <Select>
                  <SelectTrigger className="py-3 px-4 max-w-52 w-full min-w-48">
                    <SelectValue
                      placeholder={
                        appliedFiltersCount +
                        (appliedFiltersCount === 1
                          ? " filter applied"
                          : " filters applied")
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-3">
                      <ScrollArea>
                        <ul className="list-none p-0 m-0 max-h-[230px]">
                          {checkedItems.map((item, index) => (
                            <ul key={index}>
                              {item.values.map((value, valueIndex) => (
                                <li
                                  key={valueIndex}
                                  className="flex items-center space-x-2 pb-1"
                                >
                                  <Button
                                    key={valueIndex}
                                    variant="tertiary"
                                    className="bg-gray-300 justify-between flex gap-2"
                                    onClick={() => {
                                      uncheckFilter({
                                        title: item.title,
                                        value,
                                      });
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
                      <Separator className="my-4" />
                      <Button variant={"tertiary"}>
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
              <ToggleGroup className="flex gap-0 max-md:hidden" type="single">
                <ToggleGroupItem
                  value="cols-3"
                  className="rounded-e-none border-2 border-r-0"
                >
                  <Grid3x3Icon className="w-6 h-6" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="cols-5"
                  className="rounded-s-none border-2 border-l-0"
                >
                  <Grid5x4Icon className="w-6 h-6" />
                </ToggleGroupItem>
              </ToggleGroup>
              {/* <div className="flex max-md:hidden">
                <Button
                  variant={"tertiary"}
                  className={cn(
                    "rounded-r-none min-w-[40px] px-4 max-lg:px-2",
                    isDefaultTemplateDisplayCardOn
                      ? "bg-gray-300"
                      : "bg-gray-200"
                  )}
                  onClick={ButtonDefaultCardTemplateClick}
                >
                  <Grid3x3Icon />
                </Button>
                <Button
                  variant={"tertiary"}
                  className={cn(
                    "rounded-l-none min-w-[40px] px-4 max-lg:px-2",
                    !isDefaultTemplateDisplayCardOn
                      ? "bg-gray-300"
                      : "bg-gray-200"
                  )}
                  onClick={ButtonSecondaryCardTemplateClick}
                >
                  <Grid5x4Icon />
                </Button>
              </div> */}
            </div>
          </div>
          <Separator className="mt-6 mb-10" />
          <div
            className={cn(
              "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 auto-rows-max gap-6",
              !isDefaultTemplateDisplayCardOn && "md:grid-cols-3 lg:grid-cols-5"
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
          <Pagination page={page} setPage={setPage} pagesCount={2} />
        </div>
      </section>
      <ScrollToTopButton />
    </main>
  );
}
