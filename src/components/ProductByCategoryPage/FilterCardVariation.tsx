import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { FilterCheckboxItem, FilterItem } from "./filtersDataTypes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import { useSearchParamsTools } from "@/lib/router";

export const FilterCardVariation = ({ filters }: { filters: FilterItem[] }) => {
  return filters.map((filter, i) => (
    <div
      className={"max-h-[414px] p-6 pt-3 bg-gray-200 rounded-lg lg:shadow"}
      key={i}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value={i.toString()}>
          <AccordionTrigger className="font-semibold">
            {filter.title}
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea>
              {(() => {
                switch (filter.type) {
                  case "checkbox":
                    return <FilterCheckbox data={filter} />;

                  default:
                    return null;
                }
              })()}
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ));
};

const FilterCheckbox = ({ data }: { data: FilterCheckboxItem }) => {
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
    searchParams.set(data.title, checkedItems.join(","));
  }, [checkedItems.length]);

  return (
    <ul>
      {data.values.map((item, index) => (
        <li key={index} className="flex items-center space-x-2 pb-1">
          <label className="text-base">
            <Checkbox
              checked={checkedItems.includes(item)}
              onClick={onToggle(item)}
            />
            {item}
          </label>
        </li>
      ))}
    </ul>
  );
};
