import { useEffect, useState } from "react";

import Image from "next/image";
import RatingFillStar from "@/../public/Icons/RatingFillStar.svg";
import RatingLineStar from "@/../public/Icons/RatingLineStar.svg";

import { Checkbox } from "../ui/checkbox";
import { FilterCheckboxItem, FilterTilesItem, FilterPriceItem, FilterRatingItem, FilterItem } from "./filtersDataTypes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import { useSearchParamsTools } from "@/lib/router";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DoubleThumbSlider } from "../ui/slider";
import { MediaQueryCSS } from "../MediaQuery";

export const FilterCardVariation = ({ filters, onFilterParamsChange, isOpen = true }: { filters: FilterItem[], onFilterParamsChange: (title: string, checkedItems: string[]) => void, isOpen?: boolean }) => {
  
  const [searchTextArray, setSearchTextArray] = useState<string[]>(filters.map(() => ''));

  const handleSearchTextChange = (index: number, value: string) => {
    const updatedSearchTextArray = [...searchTextArray];
    updatedSearchTextArray[index] = value.toLowerCase();
    setSearchTextArray(updatedSearchTextArray);
  };

  return filters.map((filter, i) => (
    <div key={filter.title + i}>
      <div className={"max-h-[414px] w-full p-6 pt-3 bg-gray-200 rounded-lg lg:shadow"}>
        <Accordion type="single" defaultValue={isOpen ? i.toString() : ""} collapsible>
          <AccordionItem value={i.toString()}>
            <AccordionTrigger className="font-semibold">
              {filter.title}
            </AccordionTrigger>
            <AccordionContent>
              {filter.isSearch ? (
                <Input placeholder="Search..." className="my-3" value={searchTextArray[i]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchTextChange(i, e.target.value)} />
              ) : (
                <></>
              )}
              <ScrollArea>
                <div className="list-none p-0 m-0 max-h-64 w-full">
                  {(() => {
                    switch (filter.type) {
                      case "checkbox":
                        return <FilterCheckbox data={filter} searchText={searchTextArray[i]} onFilterParamsChange={onFilterParamsChange} />;
                      case "tiles":
                        return <FilterTiles data={filter} searchText={searchTextArray[i]} onFilterParamsChange={onFilterParamsChange} />;
                      case "price":
                        return <FilterPrice data={filter} />;
                      case "rating":
                        return <FilterRating data={filter} onFilterParamsChange={onFilterParamsChange} />;

                      default:
                        return null;
                    }
                  })()}
                </div>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <MediaQueryCSS maxSize="lg">
        <hr className="mt-2 border-gray-300 border-y"></hr>
      </MediaQueryCSS>
    </div>
  ));
};

const FilterCheckbox = ({ data, onFilterParamsChange, searchText }: { data: FilterCheckboxItem, onFilterParamsChange: (title: string, checkedItems: string[]) => void, searchText: string }) => {
  const searchParams = useSearchParamsTools();
  const [checkedItems, setCheckedItems] = useState<string[]>(() => {
    const defaultValue = searchParams.get(data.title);

    if (defaultValue) {
      return defaultValue.split(",").filter((v) => data.values.includes(v));
    }

    return [];
  });

  const onToggle = (value: string) => () => {
    const isChecked = checkedItems.includes(value);
    if (isChecked) {
      setCheckedItems((items) => items.filter((v) => v !== value));
    } else {
      setCheckedItems((items) => [...items, value]);
    }
  };

  useEffect(() => {
    onFilterParamsChange(data.title, checkedItems);
  }, [checkedItems]);

  return (
    <ul>
      {data.values.filter((v) => v.toLowerCase().includes(searchText)).map((item, index) => (
        <li key={index} className="flex items-center space-x-2 pb-1" onClick={onToggle(item)}>
            <Checkbox
              id={item + index}
              checked={checkedItems.includes(item)}
            />
            <label className="text-base" htmlFor={item + index}>
              {item}
            </label>
        </li>
      ))}
    </ul>
  );
};

const FilterTiles = ({ data, onFilterParamsChange, searchText }: { data: FilterTilesItem, onFilterParamsChange: (title: string, checkedItems: string[]) => void, searchText: string }) => {
  const searchParams = useSearchParamsTools();
  const [checkedItems, setCheckedItems] = useState<string[]>(() => {
    const defaultValue = searchParams.get(data.title);

    if (defaultValue) {
      return defaultValue.split(",").filter((v) => data.values.includes(v));
    }

    return [];
  });

  const onToggle = (value: string) => () => {
    const isChecked = checkedItems.includes(value);

    if (isChecked) {
      setCheckedItems((items) => items.filter((v) => v !== value));
    } else {
      setCheckedItems((items) => [...items, value]);
    }
  };

  useEffect(() => {
    onFilterParamsChange(data.title, checkedItems);
  }, [checkedItems]);

  return (
    <>
      <ToggleGroup
        variant="outline"
        type="multiple"
        className={`grid grid-cols-5 max-[340px]:grid-cols-4 max-[250px]:grid-cols-3 max-[180px]:grid-cols-2 `}
      >
        {data.values.filter((v) => v.toLowerCase().includes(searchText)).map((item, index) => (
          <ToggleGroupItem
            key={data.title + index}
            value={item}
            aria-label={"Toggle" + item}
            className="border-black border-[1.5px]"
            data-state={checkedItems.includes(item) ? "on" : "off"} 
            onClick={onToggle(item)}
          >
            {item}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </>
  );
};

const FilterPrice = ({ data }: { data: FilterPriceItem }) => {
  const searchParams = useSearchParamsTools();
  const [priceValue, setPriceValue] = useState<{ min:number, max:number }>(() => {
    const defaultValue = searchParams.get(data.title);

    if (defaultValue) {
      const filteredValues = defaultValue.split(",").map(v => parseFloat(v)).filter(v => !isNaN(v) && v !== undefined);
      if(filteredValues && filteredValues.length === 2)
      {
        filteredValues.sort((a, b) => a - b);
        return { min:filteredValues[0], max:filteredValues[1]}
      }
    }
    
    return data.values;
  });

  const onInputMinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseFloat(event.target.value);
    setPriceValue(prevValue => ({ ...prevValue, min: newMin }));
  };
  const onInputMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseFloat(event.target.value);
    setPriceValue(prevValue => ({ ...prevValue, max: newMax }));
  };

  const onSliderValueChange = (value: number[]) => {
    setPriceValue(prevValue => ({ ...prevValue, min: value[0], max: value[1] }));
  };

  useEffect(() => {
    searchParams.set(data.title, priceValue.min + "," + priceValue.max);
  }, [priceValue.min, priceValue.max, data.title, searchParams]);

  const savePriceChange = () => {
    // ...
  };

  return (
    <div className="h-full overflow-hidden mt-3">
      <div className="flex justify-between w-full pb-3">
        <div className="flex justify-center items-center gap-2">
          <Input className="max-w-[64px]" defaultValue={priceValue.min} onChange={onInputMinValueChange}></Input>
          <span className="font-bold">—</span>
          <Input className="max-w-[64px]" defaultValue={priceValue.max} onChange={onInputMaxValueChange}></Input>
        </div>
        <div>
          <Button 
            variant={"ghost"} 
            className="bg-gray-300"
          >
            Save
          </Button>
        </div>
      </div>
      <div className="h-[20px]">
        <DoubleThumbSlider 
          defaultValue={[priceValue.min, priceValue.max]} 
          max={data.values.max} 
          min={data.values.min} 
          step={1} minStepsBetweenThumbs={1}
          onValueChange={onSliderValueChange} />
      </div>
    </div>
  );
};

const FilterRating = ({ data, onFilterParamsChange }: { data: FilterRatingItem, onFilterParamsChange: (title: string, checkedItems: string[]) => void }) => {
  const searchParams = useSearchParamsTools();
  const [checkedItems, setCheckedItems] = useState<number[]>(() => {
    const defaultValue = searchParams.get(data.title);

    if (defaultValue) {
      return defaultValue.split(",").map((v) => parseInt(v)).filter((v) => !isNaN(v) && data.values.includes(v));
    }

    return [];
  });

  const onToggle = (value: number) => () => {
    const isChecked = checkedItems.includes(value);

    if (isChecked) {
      setCheckedItems((items) => items.filter((v) => v !== value));
    } else {
      setCheckedItems((items) => [...items, value]);
    }
  };

  
  useEffect(() => {
    const checkedItemsAsString = checkedItems.map((item) => item.toString());
    onFilterParamsChange(data.title, checkedItemsAsString);
  }, [checkedItems]);


  return (
    <div className="mt-3">
      {data.values.map((item, index) => (
        <li key={index} className="flex items-center space-x-2 pb-2" onClick={onToggle(item)}>
          <Checkbox id={data.title + item} 
            checked={checkedItems.includes(item)}
          />
          <label
            className="text-base flex gap-[3.44px]"
            htmlFor={data.title + item}
          >
            {Array.from({ length: item }).map((_, _index) => (
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
};
