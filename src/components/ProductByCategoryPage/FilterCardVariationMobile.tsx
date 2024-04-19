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

import { FilterItem, FilterCheckedType } from "./filtersDataTypes";

export const FilterCardVariationMobile = ({ categoryId, filters, checkedItems, setCheckedItems }: 
  { categoryId: string, filters: FilterItem[], checkedItems: FilterCheckedType, setCheckedItems: React.Dispatch<React.SetStateAction<FilterCheckedType>> }) => {
  const searchParams = useSearchParamsTools();

  //#region indicatorCheckedFilterCount
  const [indicatorCount, setIndicatorCount] = useState<number>(() => {
    if (checkedItems) {
      return checkedItems?.reduce((total, item) => total + item.values.length, 0);
    }
    return 0;
  });

  useEffect(() => {
    const newCount = checkedItems?.reduce((total, item) => total + item.values.length, 0);
    setIndicatorCount(newCount ? newCount : 0);
  }, [checkedItems]);
  //#endregion

  const clearAllFilters = () => {
    setCheckedItems([]);
  };

  const uncheckFilter = (titleItem: string, checkedItem: string) => {
    const isExists = checkedItems.find((v) => v.title === titleItem);
    if (isExists)
    {
      if (isExists.values.length === 1 && isExists.values.includes(checkedItem))
      {
        searchParams.set(titleItem, undefined);
        setCheckedItems(prevItems => [...prevItems.filter(item => item.title !== titleItem)]);
      }
      else
      {
        searchParams.set(titleItem, checkedItems?.find((v) => v.title === titleItem)?.values.filter((v) => v !== checkedItem).join(","));
        setCheckedItems(prevItems => prevItems.map(item =>
          item.title === titleItem
            ? { ...item, values: item.values.filter(val => val !== checkedItem) }
            : item
        ));
      }
    }
  };

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
                <Button variant={"ghost"} className="border-2 border-gray-400" onClick={clearAllFilters}>
                  <Link href={`/category/${categoryId}`} >Reset all</Link>
                </Button>
              </div>
            </div>
            <div className="flex max-h-[100px] mt-2">
              <ScrollArea className="flex w-full h-full gap-2">
                {checkedItems && checkedItems.map((item, index) => (
                  item.values.map((value, valueIndex) => (
                    <Button key={index + "_" + valueIndex} variant="ghost" className="bg-gray-300 justify-between m-[2px]" onClick={() => {uncheckFilter(item.title, value)}}>
                      <span>{value}</span>
                      <XIcon />
                    </Button>
                  ))
                ))}
              </ScrollArea>
            </div>
            <hr className="mt-1 border-gray-400 border-y"></hr>
          </DrawerHeader>
          <DrawerHeader>
            <ScrollArea>
              <div className="max-h-[400px]">
                <FilterCardVariation filters={filters} isOpen={false} checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
              </div>
            </ScrollArea>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
}
