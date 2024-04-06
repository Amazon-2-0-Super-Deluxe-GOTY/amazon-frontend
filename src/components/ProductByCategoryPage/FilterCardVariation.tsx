import { useState, useEffect } from "react";
import { useSearchParamsTools } from "@/lib/router";

import Image from "next/image";
import RatingFillStar from "@/../public/Icons/RatingFillStar.svg";
import RatingLineStar from "@/../public/Icons/RatingLineStar.svg";

import { Checkbox } from "../ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

export const FilterCardVariation = ({
    title,
    type,
    values,
}: {
    title: string;
    type: string;
    values: string[];
}) => {

  //#region CheckedParams
  const searchParams = useSearchParamsTools();
  const [data, setData] = useState<string[] | undefined>(() => {

    const params = searchParams.get(title);

    if (params)
    {
      const checkedValues = params.split(',');
      const itemNamesArray = checkedValues.map((element, i) => {
        if(values.find((s) => s === element))
        {
          return element;
        }
        return undefined;
      });
        
      if(itemNamesArray)
      {
        return itemNamesArray;
      }
      else
      {
        searchParams.set(title, undefined);
      }
    }
    return undefined;
  });

  const onChecked = (name: string) => () => {
    if(data)
    {
      let newData;
      if(data.find((s) => s === name))
      {
        newData = data.filter((s) => s != name);
      }
      else
      {
        newData = data;
        newData.push(name);
      }
      setData(newData);
      searchParams.set(title, newData.join(','));
    }
    else
    {
      setData([name]);
      searchParams.set(title, name);
    }
  };
  const isChecked = (name: string) : boolean => {
    return (data?.find((s) => s === name) ? true : false);
  };
  //#endregion

  switch (type) {
    case "Checkbox": {
      return (
        <>
          {values.map((item, index) => (

            <li key={index} className="flex items-center space-x-2 pb-1">
              <Checkbox id={title + index} 
                checked={isChecked(item)}
                onClick={onChecked(item)}
              />
              <label className="text-base" htmlFor={title + index}>
                {item}
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
            {values.map((item, index) => (
              <ToggleGroupItem
                key={title + index}
                value={item}
                aria-label={"Toggle" + item}
                className="border-black border-[1.5px]"
                data-state={isChecked(item) ? "on" : "off"} 
                onClick={onChecked(item)}
              >
                {item}
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
              <Slider defaultValue={[0, 100]} max={100} min={0} step={1} />
            </div>
          </div>
        </>
      );
    }
    case "Rating": {
      return (
        <div className="mt-3">
          {values.map((_, index) => (
            <li key={index} className="flex items-center space-x-2 pb-2">
              <Checkbox id={title + index} 
                checked={isChecked((5 - index).toString())}
                onClick={onChecked((5 - index).toString())}
              />
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
