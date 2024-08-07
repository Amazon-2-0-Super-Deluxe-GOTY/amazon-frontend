import { useEffect, useMemo, useState } from "react";
import { MediaQueryCSS } from "../Shared/MediaQuery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import type {
  FilterCheckboxItem,
  FilterItem,
  FilterPriceItem,
  FilterRatingItem,
  FilterTilesItem,
} from "./filtersDataTypes";
import { useSearchParamsTools } from "@/lib/router";
import { DoubleThumbSlider } from "../ui/slider";
import { Button } from "../ui/button";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { StarEmptyIcon, StarFullIcon } from "../Shared/Icons";
import { Separator } from "../ui/separator";
import { parsePriceParamValue } from "@/lib/products";

const separator = "--";

export function FilterCardVariation({
  filters,
  isOpen = true,
}: {
  filters: FilterItem[];
  isOpen?: boolean;
}) {
  const searchableFiltersCount = filters.filter((f) => f.isSearch).length;
  const [searchQueries, setSearchQueries] = useState<string[]>([]);

  const onSearch =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchQueries = [...searchQueries];
      newSearchQueries[index] = e.target.value;
      setSearchQueries(newSearchQueries);
    };

  useEffect(() => {
    if (searchableFiltersCount > searchQueries.length) {
      const newQueries = Array.from({
        length: searchableFiltersCount - searchQueries.length,
      }).fill("") as string[];
      setSearchQueries((current) => [...current, ...newQueries]);
    }
  }, [filters.values, searchableFiltersCount, searchQueries.length]);

  return filters.map((filter, i) => {
    return (
      <div key={filter.title + i}>
        <div
          className={
            "max-h-[414px] w-full py-6 px-5 pt-3 bg-card rounded-lg lg:shadow"
          }
        >
          <Accordion
            type="single"
            defaultValue={isOpen ? i.toString() : undefined}
            collapsible
          >
            <AccordionItem value={i.toString()} className="border-none">
              <AccordionTrigger className="font-semibold text-heading-3">
                {filter.title}
              </AccordionTrigger>
              <AccordionContent>
                {filter.isSearch && (
                  <div className="px-1">
                    <Input
                      placeholder="Search..."
                      className="my-3 bg-card"
                      value={searchQueries[i] ?? ""}
                      onChange={onSearch(i)}
                    />
                  </div>
                )}
                <ScrollArea className="px-1">
                  <div className="list-none p-0 m-0 max-h-64 w-full">
                    {(() => {
                      switch (filter.type) {
                        case "checkbox":
                          return (
                            <CheckboxFilterCard
                              filter={filter}
                              search={searchQueries[i] ?? ""}
                            />
                          );

                        case "tiles":
                          return (
                            <FilterTiles
                              filter={filter}
                              search={searchQueries[i] ?? ""}
                            />
                          );

                        case "price":
                          return <FilterPrice filter={filter} />;

                        case "rating":
                          return <FilterRating filter={filter} />;

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
          <Separator />
        </MediaQueryCSS>
      </div>
    );
  });
}

interface FilterCardProps<T extends FilterItem> {
  filter: T;
  search?: string;
}

function CheckboxFilterCard({
  filter,
  search,
}: FilterCardProps<FilterCheckboxItem>) {
  const searchParams = useSearchParamsTools();
  const checkedItems = useMemo<string[]>(() => {
    const existingParams = searchParams.get?.(filter.title);
    if (!existingParams) return [];
    return existingParams
      .split(separator)
      .filter((param) => filter.values.includes(param));
  }, [searchParams, filter.title, filter.values]);

  const filteredValues = useMemo(() => {
    const searchLower = search?.toLowerCase();
    return searchLower
      ? filter.values.filter((item) => item.toLowerCase().includes(searchLower))
      : filter.values;
  }, [filter.values, search]);

  const onToggle = (item: string) => () => {
    const newItems = checkedItems.includes(item)
      ? checkedItems.filter((elem) => elem !== item)
      : [...checkedItems, item];
    if (newItems.length > 0) {
      searchParams.set(filter.title, newItems.join(separator));
    } else {
      searchParams.set(filter.title, undefined);
    }
  };

  return (
    <ul>
      {filteredValues.map((item, index) => (
        <li
          key={index}
          className="flex items-center space-x-2 pb-1 cursor-pointer"
          onClick={onToggle(item)}
        >
          <Checkbox checked={!!checkedItems.find((v) => v === item)} />
          <span className="text-base">{item}</span>
        </li>
      ))}
    </ul>
  );
}

const FilterTiles = ({ filter, search }: FilterCardProps<FilterTilesItem>) => {
  const searchParams = useSearchParamsTools();
  const checkedItems = useMemo<string[]>(() => {
    const existingParams = searchParams.get?.(filter.title);
    if (!existingParams) return [];
    return existingParams
      .split(separator)
      .filter((param) => filter.values.includes(param));
  }, [searchParams, filter.title, filter.values]);

  const filteredValues = useMemo(() => {
    const searchLower = search?.toLowerCase();
    return searchLower
      ? filter.values.filter((item) => item.toLowerCase().includes(searchLower))
      : filter.values;
  }, [filter.values, search]);

  const onToggle = (item: string) => () => {
    const newItems = checkedItems.includes(item)
      ? checkedItems.filter((elem) => elem !== item)
      : [...checkedItems, item];
    if (newItems.length > 0) {
      searchParams.set(filter.title, newItems.join(separator));
    } else {
      searchParams.set(filter.title, undefined);
    }
  };

  return (
    <>
      <ToggleGroup
        variant="outline"
        type="multiple"
        className={`grid grid-cols-5 max-[340px]:grid-cols-4 max-[250px]:grid-cols-3 max-[180px]:grid-cols-2 `}
      >
        {filteredValues.map((item, index) => (
          <ToggleGroupItem
            key={filter.title + index}
            value={item}
            aria-label={"Toggle" + item}
            className="border-black border-[1.5px]"
            data-state={checkedItems?.includes(item) ? "on" : "off"}
            onClick={onToggle(item)}
          >
            {item}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </>
  );
};

const FilterPrice = ({ filter }: FilterCardProps<FilterPriceItem>) => {
  const searchParams = useSearchParamsTools();

  function parsePriceValue() {
    const defaultValue = searchParams.get?.(filter.type);
    const value = parsePriceParamValue(defaultValue);
    return value ? value : filter.values;
  }

  const [priceValue, setPriceValue] = useState<{ min: number; max: number }>(
    parsePriceValue
  );

  const onInputMinValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newMin = parseFloat(event.target.value);

    if (isNaN(newMin)) return;

    if (newMin < filter.values.min) {
      newMin = filter.values.min;
    }

    if (newMin > filter.values.max) {
      newMin = filter.values.max;
    }

    if (newMin > priceValue.max) {
      newMin = priceValue.max;
    }

    setPriceValue((prevValue) => ({ ...prevValue, min: newMin }));
  };
  const onInputMaxValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newMax = parseFloat(event.target.value);

    if (isNaN(newMax)) return;

    if (newMax < filter.values.min) {
      newMax = filter.values.min;
    }

    if (newMax > filter.values.max) {
      newMax = filter.values.max;
    }

    if (newMax < priceValue.min) {
      newMax = priceValue.min;
    }

    setPriceValue((prevValue) => ({ ...prevValue, max: newMax }));
  };

  const onSliderValueChange = (value: number[]) => {
    setPriceValue({
      min: value[0],
      max: value[1],
    });
  };

  function savePriceChange() {
    searchParams.set(filter.type, `${priceValue.min}-${priceValue.max}`);
  }

  useEffect(() => {
    const newValue = parsePriceValue();
    if (priceValue.min !== newValue.min || priceValue.max !== newValue.max) {
      setPriceValue(newValue);
    }
  }, [searchParams.get?.(filter.type)]);

  return (
    <div className="h-full overflow-hidden mt-3">
      <div className="flex justify-between w-full p-1 pb-3">
        <div className="flex justify-between items-center gap-2">
          <Input
            className="w-16 bg-card text-center"
            value={priceValue.min}
            min={priceValue.min}
            max={priceValue.max}
            onChange={onInputMinValueChange}
          />
          <span className="font-bold">—</span>
          <Input
            className="w-16 bg-card text-center"
            value={priceValue.max}
            min={priceValue.min}
            max={priceValue.max}
            onChange={onInputMaxValueChange}
          />
        </div>
        <div>
          <Button variant={"primary"} onClick={savePriceChange}>
            Save
          </Button>
        </div>
      </div>
      <div className="h-5 px-1">
        <DoubleThumbSlider
          defaultValue={[filter.values.min, filter.values.max]}
          value={[priceValue.min, priceValue.max]}
          max={filter.values.max}
          min={filter.values.min}
          step={1}
          minStepsBetweenThumbs={1}
          onValueChange={onSliderValueChange}
        />
      </div>
    </div>
  );
};

const maxRating = 5;
const FilterRating = ({ filter }: FilterCardProps<FilterRatingItem>) => {
  const searchParams = useSearchParamsTools();

  const checkedItems = useMemo<number[]>(() => {
    const existingParams = searchParams
      .get?.(filter.type)
      ?.split(separator)
      .map(Number);

    if (!existingParams || existingParams.some(isNaN)) return [];
    return existingParams;
  }, [searchParams, filter]);

  const onToggle = (value: number) => () => {
    const newItems = checkedItems.includes(value)
      ? checkedItems.filter((elem) => elem !== value)
      : [...checkedItems, value];
    if (newItems.length > 0) {
      searchParams.set(filter.type, newItems.join(separator));
    } else {
      searchParams.set(filter.type, undefined);
    }
  };

  return (
    <div className="mt-3">
      {filter.values.map((item, index) => (
        <li
          key={index}
          className="flex items-center space-x-2 pb-2"
          onClick={onToggle(item)}
        >
          <Checkbox checked={checkedItems.includes(item)} />
          <span className="text-base flex gap-[3.44px]">
            {Array.from({ length: item }).map((_, index) => (
              <StarFullIcon key={index} className="fill-current w-6 h-6" />
            ))}
            {Array.from({ length: maxRating - item }).map((_, index) => (
              <StarEmptyIcon key={index} className="w-6 h-6" />
            ))}
          </span>
        </li>
      ))}
    </div>
  );
};
