import { useState, useEffect } from "react";
import Image from "next/image";
import { SearchIcon, XIcon } from "lucide-react";

import FilterIcon from "@/../public/Icons/FilterIcon.svg";
import RatingFillStar from "@/../public/Icons/RatingFillStar.svg";
import RatingLineStar from "@/../public/Icons/RatingLineStar.svg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";

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
import { cn } from "@/lib/utils";
  

type FiltersDataItem = {
    title: string;
    type: string;
    isSearch: boolean;
    values: string[];
};

const FiltersCard = ({ item, isOpen, isMobile }: { item: FiltersDataItem, isOpen: boolean , isMobile: boolean }) => {

    const [searchText, setSearchText] = useState<string>('');
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    };
  
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

const FiltersCardMobile = ({ items }: { items: FiltersDataItem[] }) => {
  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <Image src={FilterIcon} alt="filters" />
        </DrawerTrigger>
        <DrawerContent className="bg-gray-200 max-h-[700px]">
          <DrawerHeader className="pb-0">
            <div className="flex w-full justify-between items-center mb-2">
              <DrawerTitle className="font-bold">Filters</DrawerTitle>
              
              <DrawerClose>
                <Button variant="ghost" className="font-bold">
                  <XIcon />
                </Button>
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
                <Button variant={"ghost"} className="border-2 border-gray-400">Reset all</Button>
              </div>
            </div>
            <div className="flex max-h-[100px] mt-2 gap-1">
              <Button variant={"ghost"} className="bg-gray-300 justify-between">
                <span>Brand 1</span>
                <XIcon />
              </Button>
              <Button variant={"ghost"} className="bg-gray-300 justify-between">
                <span>Brand 2</span>
                <XIcon />
              </Button>
            </div>
            <hr className="mt-1 border-gray-400 border-y"></hr>
          </DrawerHeader>
          <DrawerHeader>
            <div className="max-h-[400px] overflow-y-scroll">
              {items.map((item, index) => (
                <div key={index} className="my-2">
                  <FiltersCard item={item} isOpen={false} isMobile={true} />
                  <hr className="mt-2 border-gray-300 border-y"></hr>
                </div>
              ))}
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
}
  
const FilterCardVariation = ({
    title,
    type,
    values,
}: {
    title: string;
    type: string;
    values: string[];
}) => {
    switch (type) {
      case "Checkbox": {
        return (
          <>
            {Array.from({ length: values.length }).map((_, index) => (
              <li key={index} className="flex items-center space-x-2 pb-1">
                <Checkbox id={title + index} />
                <label className="text-base" htmlFor={title + index}>
                  {values[index]}
                </label>
              </li>
            ))}
          </>
        );
      }
      case "Tiles": {
        return (
          <>
            <ToggleGroup
              variant="outline"
              type="multiple"
              className={`grid grid-cols-5 max-[340px]:grid-cols-4 max-[250px]:grid-cols-3 max-[180px]:grid-cols-2 `}
            >
              {Array.from({ length: values.length }).map((_, index) => (
                <ToggleGroupItem
                  key={title + index}
                  value={values[index]}
                  aria-label={"Toggle" + values[index]}
                  className="border-black border-[1.5px]"
                >
                  {values[index]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </>
        );
      }
      case "Price": {
        return (
          <>
            <div className="h-full overflow-hidden mt-3">
              <div className="flex justify-between w-full pb-3">
                <div className="flex justify-center items-center gap-2">
                  <Input className="max-w-[64px]" defaultValue={"0"}></Input>
                  <span className="font-bold">—</span>
                  <Input className="max-w-[64px]" defaultValue={"100"}></Input>
                </div>
                <div>
                  <Button variant={"ghost"} className="bg-gray-300">
                    Save
                  </Button>
                </div>
              </div>
              <div className="h-[20px]">
                <Slider defaultValue={[15, 90]} max={100} step={1} />
              </div>
            </div>
          </>
        );
      }
      case "Rating": {
        return (
          <div className="mt-3">
            {Array.from({ length: values.length }).map((_, index) => (
              <li key={index} className="flex items-center space-x-2 pb-2">
                <Checkbox id={title + index} />
                <label
                  className="text-base flex gap-[3.44px]"
                  htmlFor={title + index}
                >
                  {Array.from({ length: 5 - index }).map((_, _index) => (
                    <Image key={_index} src={RatingFillStar} alt="placeholder" />
                  ))}
                  {Array.from({ length: index }).map((_, _index) => (
                    <Image
                      key={_index}
                      src={RatingLineStar}
                      alt="placeholder"
                      fill={false}
                    />
                  ))}
                </label>
              </li>
            ))}
          </div>
        );
      }
    }
};

export { FiltersCard, FiltersCardMobile };
