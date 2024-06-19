"use client";
import React, { useMemo } from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { useSearchParamsTools } from "@/lib/router";

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
import { Pagination } from "@/components/Shared/Pagination";
import { Separator } from "@/components/ui/separator";
import { Grid3x3Icon, Grid5x4Icon, HomeIcon } from "@/components/Shared/Icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FilterItemButton } from "@/components/ProductByCategoryPage/FilterItemButton";
import { ProductFilters, getProducts, useProductFilters } from "@/api/products";
import { parsePriceParamValue } from "@/lib/products";
import { useQuery } from "@tanstack/react-query";
import { ProductCardSkeleton } from "@/components/Product/ProductCardSkeleton";
import { FilterCardSkeleton } from "@/components/ProductByCategoryPage/FilterCardSkeleton";
import type { Category } from "@/api/categories";

export function ProductsListPage({ category }: { category?: Category }) {
  const categoryId = category?.id;
  const searchParams = useSearchParamsTools();
  const filtersData = useProductFilters({ categoryId });
  const filterProperties = useMemo(() => {
    return filtersData.data.map((f) => f.title);
  }, [filtersData.data]);
  const [listView, setListView] = useState("cols-3");
  const pageSize = listView === "cols-5" ? 30 : 12;

  const checkedItems = useMemo<FilterCheckedType[]>(() => {
    if (!searchParams.params) return [];

    // @ts-expect-error convert search params to array
    return [...searchParams.params.entries()]
      .filter(
        (entry) =>
          filterProperties.includes(entry[0]) ||
          entry[0] === "rating" ||
          entry[0] === "price" ||
          entry[0] === "searchQuery"
      )
      .map((entry) => ({
        title: entry[0],
        values: entry[1].split(","),
        type:
          entry[0] === "rating" || entry[0] === "price"
            ? entry[0]
            : entry[0] === "searchQuery"
            ? "search"
            : "checkbox",
      }));
  }, [searchParams, filterProperties]);

  const appliedFiltersCount = useMemo(() => {
    return checkedItems.reduce((count, item) => count + item.values.length, 0);
  }, [checkedItems]);

  const page = useMemo<number>(() => {
    const pageFromParams = searchParams.get?.("page");
    if (!pageFromParams) return 1;

    const pageNumber = Number(pageFromParams);
    if (isNaN(pageNumber)) return 1;

    return pageNumber;
  }, [searchParams]);

  const orderBy = useMemo(() => {
    const valueFromParams = searchParams.get?.("orderBy");
    if (!valueFromParams) return "date";
    return valueFromParams;
  }, [searchParams]);

  const setPage = (page: number) => {
    searchParams.set("page", page.toString());
  };

  const productFilterParams = useMemo<ProductFilters>(() => {
    return {
      categoryId: categoryId,
      orderBy: orderBy as ProductFilters["orderBy"],
      page: page,
      pageSize: pageSize,
      price: parsePriceParamValue(searchParams.get?.("price")),
      rating: searchParams.get?.("rating") ?? undefined,
      searchQuery: searchParams.get?.("searchQuery") ?? undefined,
      additionalFilters: checkedItems
        .filter((i) => i.type === "checkbox")
        .map((i) => ({ name: i.title, values: i.values })),
    };
  }, [checkedItems, orderBy, page, searchParams, pageSize, categoryId]);

  const productsQuery = useQuery({
    queryKey: ["products", productFilterParams],
    queryFn: () => getProducts(productFilterParams),
    select(data) {
      return data.status === 200
        ? { products: data.data, count: data.count }
        : { products: [], count: { pagesCount: 0 } };
    },
  });

  const uncheckFilter = (param: { title: string; value: string }) => {
    const existingParams = searchParams.get?.(param.title)?.split(",");
    if (!existingParams) return;

    searchParams.set(
      param.title,
      existingParams.filter((p) => p !== param.value).join(",")
    );
  };

  const setOrderBy = (sortBy: string) => {
    searchParams.set("orderBy", sortBy);
  };

  return (
    <main className="flex flex-col items-center px-4">
      {!!category && (
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
              {/* <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/category">Category {categoryId}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/category/subcategory">
                    Subcategory {categoryId}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator> */}
              <BreadcrumbItem>
                <BreadcrumbPage>{category.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </section>
      )}
      <section className="w-full flex items-left pt-4">
        <span className="text-4xl font-semibold">
          {category !== undefined ? category?.name : "Products"}
        </span>
      </section>
      <section className="flex max-sm:flex-col lg:flex-row w-full pt-8 gap-6">
        <MediaQueryCSS minSize="lg">
          <div className="flex flex-col gap-2 w-[370px]">
            {filtersData.isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <FilterCardSkeleton key={i} />
              ))
            ) : (
              <FilterCardVariation filters={filtersData.data} />
            )}
          </div>
        </MediaQueryCSS>
        <div className="grow">
          <div className="w-full flex justify-between items-center gap-2">
            <MediaQueryCSS maxSize="lg">
              <FilterCardVariationMobile
                categoryId={categoryId}
                filters={filtersData.data}
                checkedItems={checkedItems}
                uncheckFilter={uncheckFilter}
                appliedFiltersCount={appliedFiltersCount}
                isLoading={filtersData.isLoading}
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
                  <SelectContent className="w-80">
                    <div className="p-3">
                      <ScrollArea>
                        <ul className="flex items-center flex-wrap gap-1">
                          {checkedItems.map((item, index) =>
                            item.values.map((value, valueIndex) => (
                              <li
                                key={`${index}${valueIndex}`}
                                className="w-max"
                              >
                                <FilterItemButton
                                  type={item.type}
                                  value={value}
                                  onClick={() =>
                                    uncheckFilter({
                                      title: item.title,
                                      value,
                                    })
                                  }
                                />
                              </li>
                            ))
                          )}
                        </ul>
                      </ScrollArea>
                      <Separator className="my-4" />
                      <Button variant={"tertiary"}>
                        <Link
                          href={
                            categoryId !== undefined
                              ? `/category/${categoryId}`
                              : "/products"
                          }
                        >
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
                <Select value={orderBy} onValueChange={setOrderBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rate">By rating</SelectItem>
                    <SelectItem value="date">Novelty</SelectItem>
                    <SelectItem value="cheap">Cheap to expensive</SelectItem>
                    <SelectItem value="exp">Expensive to cheap</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ToggleGroup
                className="flex gap-0 max-md:hidden"
                type="single"
                value={listView}
                onValueChange={(value) => value && setListView(value)}
              >
                <ToggleGroupItem
                  value="cols-3"
                  className="rounded-e-none border-2 border-r-0 py-3 px-4.5"
                >
                  <Grid3x3Icon className="w-6 h-6" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="cols-5"
                  className="rounded-s-none border-2 border-l-0 py-3 px-4.5"
                >
                  <Grid5x4Icon className="w-6 h-6" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          <Separator className="mt-6 mb-10" />
          <div
            className={cn(
              "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 auto-rows-max gap-6",
              listView === "cols-5" && "md:grid-cols-3 lg:grid-cols-5"
            )}
          >
            {productsQuery.isLoading
              ? Array.from({ length: pageSize }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : productsQuery.data?.products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
          </div>
          {/* Pagination here */}
          {!!productsQuery.data?.count.pagesCount &&
            productsQuery.data.count.pagesCount > 1 && (
              <div className="w-full mb-6 lg:mb-12">
                <Pagination
                  page={page}
                  setPage={setPage}
                  pagesCount={productsQuery.data.count.pagesCount}
                />
              </div>
            )}
        </div>
      </section>
      <ScrollToTopButton />
    </main>
  );
}
