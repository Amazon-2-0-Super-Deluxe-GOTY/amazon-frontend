import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { useSearchParamsTools } from "@/lib/router";

import Link from "next/link";
import Image from "next/image";
import { SearchIcon, XIcon } from "lucide-react";

import FilterIcon from "@/../public/Icons/FilterIcon.svg";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { FiltersDataItem } from "./FiltersDataTypes";


const FiltersCard = ({ item, isOpen, isMobile }: { item: FiltersDataItem, isOpen: boolean, isMobile: boolean }) => {
  //#region Search
  const [searchText, setSearchText] = useState<string>('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  //#endregion

  return (
    <div className={cn("max-h-[414px] p-6 pt-3 bg-gray-200 rounded-lg", isMobile ? "" : "shadow")}>
      <Accordion type="single" defaultValue={isOpen ? "item-1" : ""} collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold">
            {item.title}
          </AccordionTrigger>
          <AccordionContent>
            {item.isSearch ? (
              <Input placeholder="Search..." className="my-3" value={searchText} onChange={handleSearchChange} />
            ) : (
              <></>
            )}
            <ScrollArea>
              <ul className="list-none p-0 m-0 max-h-[272px] w-full">
                <FilterCardVariation
                  key={item.title}
                  title={item.title}
                  type={item.type}
                  values={item.values
                    .filter(value => value.toLowerCase().includes(searchText.toLowerCase()))}
                />
              </ul>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const FiltersCardMobile = ({ categoryId, items }: { categoryId: string, items: FiltersDataItem[] }) => {
  const searchParams = useSearchParamsTools();

  //#region CheckedParams
  const [data, setData] = useState<string[] | undefined>(() => {
    const result = items.map((item, index) => {
      const params = searchParams.get(item.title);
      if (params)
      {
        const checkedValues = params.split(',');
        const itemNamesArray = checkedValues.map((element, i) => {
          if(item.values.find((s) => s === element))
          {
            return element;
          }
        });
          
        if(itemNamesArray)
        {
          return itemNamesArray;
        }
        else
        {
          searchParams.set(item.title, undefined);
        }
      }
    })
    return result;
  });

  //   if(data)
  //   {
  //     let newData;
  //     if(data.find((s) => s === name))
  //     {
  //       newData = data.filter((s) => s != name);
  //     }
  //     else
  //     {
  //       newData = data;
  //       newData.push(name);
  //     }
  //     setData(newData);
  //     searchParams.set(title, newData.join(','));
  //   }
  //   else
  //   {
  //     setData([name]);
  //     searchParams.set(title, name);
  //   }
  // };
  //#endregion

  //#region indicatorCheckedFilterCount
  const [indicatorCount, setIndicatorCount] = useState<number | undefined>(() => {
    let result = 0;
    if(data)
    {
      data.forEach((s) => s ? result += s.length : false);
    }
    return result;
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
              <ScrollArea className="flex h-full gap-2 items-start justify-normal">
                {data && data
                .filter((element) => element)
                .reduce((acc, element) => {
                  const _items = (element).toString().split(',');
                  return acc.concat(_items);
                }, [])
                .map((item, index) => (
                  <Button key={index} variant="ghost" className="bg-gray-300 justify-between m-[2px]">
                    <span>{item}</span>
                    <XIcon />
                  </Button>
                ))}
              </ScrollArea>
            </div>
            <hr className="mt-1 border-gray-400 border-y"></hr>
          </DrawerHeader>
          <DrawerHeader>
            <ScrollArea>
            <div className="max-h-[400px]">
              {items.map((item, index) => (
                <div key={index} className="my-2">
                  <FiltersCard 
                    item={item}
                    isOpen={false}
                    isMobile={true} />
                  <hr className="mt-2 border-gray-300 border-y"></hr>
                </div>
              ))}
            </div>
            </ScrollArea>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export { FiltersCard, FiltersCardMobile };
