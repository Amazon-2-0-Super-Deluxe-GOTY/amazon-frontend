"use client";
import { useEffect, useState } from "react";
import { AdditionalProductDataTypes, SizesData } from "./types";
import { useSearhParamsTools } from "@/lib/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PencilRulerIcon, ShirtIcon } from "lucide-react";

const type: AdditionalProductDataTypes = "sizes";

export const OptionSizes = ({ data }: { data: SizesData }) => {
  const searchParams = useSearhParamsTools();
  const [index, setIndex] = useState<number | undefined>(() => {
    const defaultValue = searchParams.get(type);

    if (defaultValue) {
      const index = data.findIndex((s) => s.short === defaultValue);

      if (index !== -1 && data[index].isAvailable) {
        return index;
      } else {
        // remove invalid parameter
        searchParams.set(type, undefined);
      }
    }

    return undefined;
  });

  const onSelect = (i: number) => () => {
    setIndex(i);
    searchParams.set(type, data[i].short);
  };

  useEffect(() => {}, []);

  return (
    <div className="w-full">
      <p className="text-base lg:text-2xl">
        <span>Size</span>
        <span className="font-semibold ml-4">
          {index !== undefined ? data[index].title : "None"}
        </span>
      </p>
      <div
        role="input"
        className="flex lg:flex-wrap gap-1 lg:gap-3 my-2 lg:my-4 overflow-y-auto pb-1 lg:pb-0"
      >
        {data.map((s, i) => {
          const item = data[i];
          const isSelected = index === i;

          return (
            <div
              className={cn(
                "min-w-11 max-w-14 w-full aspect-square flex justify-center items-center rounded-md border-2 cursor-pointer text-sm lg:text-xl",
                {
                  "border-gray-300": !isSelected,
                  "border-black": isSelected,
                  // "text-gray-300 bg-gray-100 cursor-not-allowed overflow-hidden relative before:absolute before:-top-4 before:-bottom-4 before:rotate-45 before:bg-gray-300 before:w-[2px] z-10":
                  //   !item.isAvailable,
                  "cursor-not-allowed relative before:absolute before:inset-0 before:bg-gray-100/80":
                    !item.isAvailable,
                }
              )}
              key={item.short}
              title={item.title}
              onClick={item.isAvailable ? onSelect(i) : undefined}
            >
              {item.short}
              {!item.isAvailable && (
                <svg className="w-full h-full absolute stroke-gray-300 stroke-2">
                  <line x1="0" y1="100%" x2="100%" y2="0" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4">
        <Button
          size={"lg"}
          variant={"outline"}
          className="w-max h-max justify-start gap-2 lg:gap-4 p-2 lg:p-4 lg:max-w-xs lg:w-full"
        >
          <ShirtIcon className="w-4 lg:w-10" />
          <span className="text-sm lg:text-2xl">Size chart</span>
        </Button>
        <Button
          size={"lg"}
          variant={"outline"}
          className="w-max h-max justify-start gap-2 lg:gap-4 p-2 lg:p-4 lg:max-w-xs lg:w-full"
        >
          <PencilRulerIcon className="w-4 lg:w-10" />
          <span className="text-sm lg:text-2xl">Unsure of size?</span>
        </Button>
      </div>
    </div>
  );
};
