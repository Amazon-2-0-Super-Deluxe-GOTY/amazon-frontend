import { useEffect, useState } from "react";

import Image from "next/image";
import RatingFillStar from "@/../public/Icons/RatingFillStar.svg";
import RatingLineStar from "@/../public/Icons/RatingLineStar.svg";

import { Checkbox } from "../ui/checkbox";
import {
  FilterCheckboxItem,
  FilterTilesItem,
  FilterPriceItem,
  FilterRatingItem,
  FilterItem,
  FilterCheckedType,
} from "./filtersDataTypes";
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
import { MediaQueryCSS } from "../Shared/MediaQuery";

export const FilterCardVariation = ({
  filters,
  checkedItems,
  setCheckedItems,
  isOpen = true,
}: {
  filters: FilterItem[];
  checkedItems: FilterCheckedType;
  setCheckedItems: React.Dispatch<React.SetStateAction<FilterCheckedType>>;
  isOpen?: boolean;
}) => {
  const [searchTextArray, setSearchTextArray] = useState<string[]>(
    filters.map(() => "")
  );
  const handleSearchTextChange = (index: number, value: string) => {
    const updatedSearchTextArray = [...searchTextArray];
    updatedSearchTextArray[index] = value.toLowerCase();
    setSearchTextArray(updatedSearchTextArray);
  };

  return filters.map((filter, i) => (
    <div key={filter.title + i}>
      <div
        className={
          "max-h-[414px] w-full py-6 px-5 pt-3 bg-gray-200 rounded-lg lg:shadow"
        }
      >
        <Accordion
          type="single"
          defaultValue={isOpen ? i.toString() : ""}
          collapsible
        >
          <AccordionItem value={i.toString()}>
            <AccordionTrigger className="font-semibold">
              {filter.title}
            </AccordionTrigger>
            <AccordionContent>
              {filter.isSearch ? (
                <div className="px-1">
                  <Input
                    placeholder="Search..."
                    className="my-3"
                    value={searchTextArray[i]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleSearchTextChange(i, e.target.value)
                    }
                  />
                </div>
              ) : (
                <></>
              )}
              <ScrollArea className="px-1">
                <div className="list-none p-0 m-0 max-h-64 w-full">
                  {(() => {
                    switch (filter.type) {
                      case "checkbox":
                        return (
                          <FilterCheckbox
                            data={filter}
                            searchText={searchTextArray[i]}
                            checkedItems={checkedItems.find(
                              (v) => v.title === filter.title
                            )}
                            setCheckedItems={setCheckedItems}
                          />
                        );
                      case "tiles":
                        return (
                          <FilterTiles
                            data={filter}
                            searchText={searchTextArray[i]}
                            checkedItems={checkedItems.find(
                              (v) => v.title === filter.title
                            )}
                            setCheckedItems={setCheckedItems}
                          />
                        );
                      case "price":
                        return (
                          <FilterPrice
                            data={filter}
                            checkedItems={checkedItems.find(
                              (v) => v.title === filter.title
                            )}
                            setCheckedItems={setCheckedItems}
                          />
                        );
                      case "rating":
                        return (
                          <FilterRating
                            data={filter}
                            checkedItems={checkedItems.find(
                              (v) => v.title === filter.title
                            )}
                            setCheckedItems={setCheckedItems}
                          />
                        );

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

const FilterCheckbox = ({
  data,
  checkedItems,
  setCheckedItems,
  searchText,
}: {
  data: FilterCheckboxItem;
  checkedItems: { title: string; values: string[] } | undefined;
  setCheckedItems: React.Dispatch<React.SetStateAction<FilterCheckedType>>;
  searchText: string;
}) => {
  const searchParams = useSearchParamsTools();

  const onToggle = (value: string) => () => {
    if (value.length <= 0) return;

    const isChecked = checkedItems?.values.includes(value);
    if (isChecked) {
      if (checkedItems?.values.length === 1)
        searchParams.set(data.title, undefined);
      else
        searchParams.set(
          data.title,
          checkedItems?.values.filter((v) => v !== value).join(",")
        );

      setCheckedItems((prevItems) =>
        prevItems.map((item) =>
          item.title === data.title
            ? { ...item, values: item.values.filter((val) => val !== value) }
            : item
        )
      );
    } else {
      searchParams.set(
        data.title,
        checkedItems?.values
          ? checkedItems?.values.join(",") + "," + value
          : value
      );

      setCheckedItems((prevItems) => [
        ...prevItems.filter((item) => item.title !== data.title),
        {
          title: data.title,
          values: [
            ...(prevItems.find((item) => item.title === data.title)?.values ||
              []),
            value,
          ],
        },
      ]);
    }
  };

  return (
    <ul>
      {data.values
        .filter((v) => v.toLowerCase().includes(searchText))
        .map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 pb-1"
            onClick={onToggle(item)}
          >
            <Checkbox
              checked={
                checkedItems?.values.find((v) => v === item) ? true : false
              }
            />
            <span className="text-base">{item}</span>
          </li>
        ))}
    </ul>
  );
};

const FilterTiles = ({
  data,
  checkedItems,
  setCheckedItems,
  searchText,
}: {
  data: FilterTilesItem;
  checkedItems: { title: string; values: string[] } | undefined;
  setCheckedItems: React.Dispatch<React.SetStateAction<FilterCheckedType>>;
  searchText: string;
}) => {
  const searchParams = useSearchParamsTools();

  const onToggle = (value: string) => () => {
    if (value.length <= 0) return;

    const isChecked = checkedItems?.values.includes(value);
    if (isChecked) {
      if (checkedItems?.values.length === 1)
        searchParams.set(data.title, undefined);
      else
        searchParams.set(
          data.title,
          checkedItems?.values.filter((v) => v !== value).join(",")
        );

      setCheckedItems((prevItems) =>
        prevItems.map((item) =>
          item.title === data.title
            ? { ...item, values: item.values.filter((val) => val !== value) }
            : item
        )
      );
    } else {
      searchParams.set(
        data.title,
        checkedItems?.values
          ? checkedItems?.values.join(",") + "," + value
          : value
      );

      setCheckedItems((prevItems) => [
        ...prevItems.filter((item) => item.title !== data.title),
        {
          title: data.title,
          values: [
            ...(prevItems.find((item) => item.title === data.title)?.values ||
              []),
            value,
          ],
        },
      ]);
    }
  };

  return (
    <>
      <ToggleGroup
        variant="outline"
        type="multiple"
        className={`grid grid-cols-5 max-[340px]:grid-cols-4 max-[250px]:grid-cols-3 max-[180px]:grid-cols-2 `}
      >
        {data.values
          .filter((v) => v.toLowerCase().includes(searchText))
          .map((item, index) => (
            <ToggleGroupItem
              key={data.title + index}
              value={item}
              aria-label={"Toggle" + item}
              className="border-black border-[1.5px]"
              data-state={
                checkedItems?.values.find((v) => v === item) ? "on" : "off"
              }
              onClick={onToggle(item)}
            >
              {item}
            </ToggleGroupItem>
          ))}
      </ToggleGroup>
    </>
  );
};

const FilterPrice = ({
  data,
  checkedItems,
  setCheckedItems,
}: {
  data: FilterPriceItem;
  checkedItems: { title: string; values: string[] } | undefined;
  setCheckedItems: React.Dispatch<React.SetStateAction<FilterCheckedType>>;
}) => {
  const searchParams = useSearchParamsTools();

  const [priceValue, setPriceValue] = useState<{ min: number; max: number }>(
    () => {
      const defaultValue = searchParams.get?.("Price");

      if (defaultValue) {
        const filteredValues = defaultValue
          .split("-")
          .map((v) => parseFloat(v))
          .filter((v) => !isNaN(v) && v !== undefined);
        if (filteredValues && filteredValues.length === 2) {
          filteredValues.sort((a, b) => a - b);
          return { min: filteredValues[0], max: filteredValues[1] };
        }
      }

      return data.values;
    }
  );

  const onInputMinValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newMin = parseFloat(event.target.value);
    if (newMin) setPriceValue((prevValue) => ({ ...prevValue, min: newMin }));
  };
  const onInputMaxValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newMax = parseFloat(event.target.value);
    if (newMax) setPriceValue((prevValue) => ({ ...prevValue, max: newMax }));
  };

  const onSliderValueChange = (value: number[]) => {
    setPriceValue((prevValue) => ({
      ...prevValue,
      min: value[0],
      max: value[1],
    }));
  };

  function savePriceChange() {
    setSearchParams();
    if (checkedItems) {
      setCheckedItems((prevItems) =>
        prevItems.map((item) =>
          item.title === data.title
            ? { ...item, values: [priceValue.min + "-" + priceValue.max] }
            : item
        )
      );
    } else {
      setCheckedItems((prevItems) => [
        ...prevItems.filter((item) => item.title !== data.title),
        { title: data.title, values: [priceValue.min + "-" + priceValue.max] },
      ]);
    }
  }

  const setSearchParams = () => {
    const params = searchParams.get?.(data.title);
    if (params) {
      if (priceValue.min && priceValue.max)
        searchParams.set(data.title, priceValue.min + "-" + priceValue.max);
      else searchParams.set(data.title, undefined);
    } else {
      if (priceValue.min && priceValue.max)
        searchParams.set(data.title, priceValue.min + "-" + priceValue.max);
    }
  };

  useEffect(() => {
    if (!checkedItems) setPriceValue(data.values);
  }, [checkedItems, data.values]);

  return (
    <div className="h-full overflow-hidden mt-3">
      <div className="flex justify-between w-full p-1 pb-3">
        <div className="flex justify-center items-center gap-2">
          <Input
            className="max-w-16"
            value={priceValue.min}
            onChange={onInputMinValueChange}
          ></Input>
          <span className="font-bold">—</span>
          <Input
            className="max-w-16"
            value={priceValue.max}
            onChange={onInputMaxValueChange}
          ></Input>
        </div>
        <div>
          <Button
            variant={"tertiary"}
            className="bg-gray-300"
            onClick={savePriceChange}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="h-5 px-1">
        <DoubleThumbSlider
          defaultValue={[data.values.min, data.values.max]}
          value={[priceValue.min, priceValue.max]}
          max={data.values.max}
          min={data.values.min}
          step={1}
          minStepsBetweenThumbs={1}
          onValueChange={onSliderValueChange}
        />
      </div>
    </div>
  );
};

const FilterRating = ({
  data,
  checkedItems,
  setCheckedItems,
}: {
  data: FilterRatingItem;
  checkedItems: { title: string; values: string[] } | undefined;
  setCheckedItems: React.Dispatch<React.SetStateAction<FilterCheckedType>>;
}) => {
  const searchParams = useSearchParamsTools();

  const onToggle = (value: string) => () => {
    if (value.length <= 0) return;

    const isChecked = checkedItems?.values.includes(value);
    if (isChecked) {
      if (checkedItems?.values.length === 1)
        searchParams.set(data.title, undefined);
      else
        searchParams.set(
          data.title,
          checkedItems?.values.filter((v) => v !== value).join(",")
        );

      setCheckedItems((prevItems) =>
        prevItems.map((item) =>
          item.title === data.title
            ? { ...item, values: item.values.filter((val) => val !== value) }
            : item
        )
      );
    } else {
      searchParams.set(
        data.title,
        checkedItems?.values
          ? checkedItems?.values.join(",") + "," + value
          : value
      );

      setCheckedItems((prevItems) => [
        ...prevItems.filter((item) => item.title !== data.title),
        {
          title: data.title,
          values: [
            ...(prevItems.find((item) => item.title === data.title)?.values ||
              []),
            value,
          ],
        },
      ]);
    }
  };

  return (
    <div className="mt-3">
      {data.values.map((item, index) => (
        <li
          key={index}
          className="flex items-center space-x-2 pb-2"
          onClick={onToggle(item.toString())}
        >
          <Checkbox
            checked={
              checkedItems?.values.find((v) => v === item.toString())
                ? true
                : false
            }
          />
          <span className="text-base flex gap-[3.44px]">
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
          </span>
        </li>
      ))}
    </div>
  );
};
