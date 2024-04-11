import { useState, useEffect } from "react";
import { useSearchParamsTools } from "@/lib/router";

import Link from "next/link";
import Image from "next/image";

import { SearchIcon, XIcon } from "lucide-react";
import FilterIcon from "@/../public/Icons/FilterIcon.svg";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FilterCardVariation } from "./FilterCardVariation";

import { FilterItem } from "./filtersDataTypes";

export const FilterCardVariationMobile = ({ categoryId, filters }: { categoryId: string, filters: FilterItem[] }) => {
  const searchParams = useSearchParamsTools();

  //#region CheckedParams
  const [data, setData] = useState<string[] | undefined>(() => {
    let result:string[] = [];
    filters.forEach((filter, index) => {
      const params = searchParams.get(filter.title);
      if (params)
      {
        const checkedValues = params.split(",");
        const itemNamesArray = checkedValues.filter((v) => filter.type !== "price" && ((filter.type === "rating" && !isNaN(parseInt(v)) && filter.values.includes(parseInt(v))) || (filter.type !== "rating" && filter.values.includes(v))))

        if (itemNamesArray.length > 0) {
          result = result.concat(itemNamesArray);
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
    if (data) {
      return data?.length;
    }
    return 0;
  });
  //#endregion

  return (
    <>
      <Drawer>
        <DrawerTrigger className="h-8 w-8 relative">
            <div className="absolute flex h-5 w-5 bg-gray-300 rounded-full top-[-5px] right-[-5px] justify-center items-center">
              <span className="text-[10px]">{indicatorCount}</span>
            </div>
            <Image src={FilterIcon} alt="filters" />
        </DrawerTrigger>
        <DrawerContent className="bg-gray-200 max-h-[700px]">
          <DrawerHeader className="pb-0">
            <div className="flex w-full justify-between items-center mb-2">
              <DrawerTitle className="font-bold">Filters</DrawerTitle>
              
              <DrawerClose className={buttonVariants({ variant: "ghost" })}>
                  <XIcon className="font-bold" />
              </DrawerClose>
            </div>
            <div className="flex justify-between items-center gap-2 max-h-8 h-full">
              <div className="flex-1 flex max-w-[950px] relative">
                <Input placeholder="Search..." />
                <Button
                  className="rounded-s-none px-2 absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none lg:px-4 lg:inline-flex lg:right-0 lg:pointer-events-auto"
                  variant={"ghost"}
                >
                <SearchIcon />
                </Button>
              </div>
              <div>
                <Button variant={"ghost"} className="border-2 border-gray-400">
                  <Link href={`/category/${categoryId}`}>Reset all</Link>
                </Button>
              </div>
            </div>
            <div className="flex max-h-[100px] mt-2 gap-1">
              <ScrollArea className="flex h-full gap-2 items-start">
                { data &&
                  data.map((item, index) => (
                    <Button key={index} variant="ghost" className="bg-gray-300 justify-between m-[2px]">
                      <span>{item}</span>
                      <XIcon />
                    </Button>
                  ))
                }
              </ScrollArea>
            </div>
            <hr className="mt-1 border-gray-400 border-y"></hr>
          </DrawerHeader>
          <DrawerHeader>
            <ScrollArea>
              <div className="max-h-[400px]">
                <FilterCardVariation filters={filters} isOpen={false} />
              </div>
            </ScrollArea>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
}
