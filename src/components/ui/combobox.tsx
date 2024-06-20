"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "../Shared/Icons";

type ComboboxDataItem = {
  value: string;
  label: string;
};

function ComboboxFilters({ data }: { data: ComboboxDataItem[] }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data.find((item) => item.value === value)?.label
            : "Selected filters"}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-gray-400">
        <Command>
          <CommandInput placeholder="Search filter..." />
          <CommandEmpty>No filters found.</CommandEmpty>
          <CommandGroup>
            {/* {data.map((item) => (
            //   <CommandItem
            //     key={item.value}
            //     value={item.value}
            //     onSelect={(currentValue) => {
            //       setValue(currentValue === value ? "" : currentValue)
            //       setOpen(false)
            //     }}
            //   >
            //     <Check
            //       className={cn(
            //         "mr-2 h-4 w-4",
            //         value === item.value ? "opacity-100" : "opacity-0"
            //       )}
            //     />
            //      {item.label}
            //   </CommandItem>
            
            <div key={item.value}>
                {item.label}
            </div>
            ))} */}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { ComboboxFilters };
