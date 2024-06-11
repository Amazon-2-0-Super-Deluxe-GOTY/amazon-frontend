import { useState } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FilterCardVariation } from "./FilterCardVariation";

import { FilterItem, FilterCheckedType } from "./filtersDataTypes";
import { FilterIcon, SearchIcon, XIcon } from "../Shared/Icons";
import { Separator } from "../ui/separator";
import { FilterItemButton } from "./FilterItemButton";

export const FilterCardVariationMobile = ({
  categoryId,
  filters,
  checkedItems,
  uncheckFilter,
  appliedFiltersCount,
}: {
  categoryId: string;
  filters: FilterItem[];
  checkedItems: FilterCheckedType[];
  uncheckFilter: (param: { title: string; value: string }) => void;
  appliedFiltersCount: number;
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const handleSearchTextChange = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger className="h-8 w-8 relative">
          <div className="absolute flex h-5 w-5 bg-primary rounded-full top-0 -right-0.5 justify-center items-center">
            <span className="text-xs">
              {appliedFiltersCount > 9 ? "9+" : appliedFiltersCount}
            </span>
          </div>
          <FilterIcon className="w-8 h-8" />
        </DrawerTrigger>
        <DrawerContent className="bg-card max-h-[700px]">
          <DrawerHeader className="pb-0">
            <div className="flex w-full justify-between items-center mb-2">
              <DrawerTitle className="font-bold text-xl">Filters</DrawerTitle>

              <DrawerClose>
                <XIcon className="font-bold" />
              </DrawerClose>
            </div>
            <div className="flex justify-between items-center gap-3 max-h-8 h-full">
              <div className="flex-1 flex max-w-[950px] relative">
                <Input
                  placeholder="Search..."
                  className="bg-card"
                  value={searchText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSearchTextChange(e.target.value)
                  }
                />
                <Button
                  className="rounded-s-none px-2 absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none lg:px-4 lg:inline-flex lg:right-0 lg:pointer-events-auto"
                  variant={"tertiary"}
                >
                  <SearchIcon />
                </Button>
              </div>
              <div>
                <Button variant={"destructive"}>
                  <Link href={`/category/${categoryId}`}>Reset all</Link>
                </Button>
              </div>
            </div>
            <div className="flex max-h-[100px] mt-2">
              <ScrollArea>
                <div className="flex flex-wrap w-full gap-1">
                  {checkedItems.map((item, index) =>
                    item.values
                      .filter((v) => v.toLowerCase().includes(searchText))
                      .map((value, valueIndex) => (
                        <FilterItemButton
                          key={`${index}${valueIndex}`}
                          type={item.type}
                          value={value}
                          onClick={() =>
                            uncheckFilter({
                              title: item.title,
                              value,
                            })
                          }
                        />
                      ))
                  )}
                </div>
              </ScrollArea>
            </div>
            <Separator className="mt-1" />
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
};
