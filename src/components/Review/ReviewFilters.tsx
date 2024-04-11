import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { ReviewFilters } from "./types";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const initialStarsArray = Array.from({ length: 5 });
const maxStars = 5;

export const ReviewFilter = ({
  onFiltersChange,
}: {
  onFiltersChange: (filters: ReviewFilters) => void;
}) => {
  const [filter, setFilter] = useState<ReviewFilters>({ filterBy: "recent" });

  const onFilterByChange = (value: ReviewFilters["filterBy"]) => {
    const newFilters = { ...filter, filterBy: value };
    setFilter(newFilters);
    onFiltersChange(newFilters);
  };
  const onStarsFilterChange = (value: number) => {
    if (value === filter.stars) return;

    const newFilters = {
      ...filter,
      stars: value as ReviewFilters["stars"],
    };
    setFilter(newFilters);
    onFiltersChange(newFilters);
  };
  const onStarsFilterClear = () => {
    const newFilters = {
      ...filter,
      stars: undefined,
    };
    setFilter(newFilters);
    onFiltersChange(newFilters);
  };

  const createOnStarsFilterChange = (value: number) => () =>
    onStarsFilterChange(value);

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
      <div className="flex gap-2 overflow-y-auto pb-1 md:pb-0">
        <div
          className={cn(
            "border rounded-md px-3 py-2 flex gap-2 items-center text-sm cursor-pointer",
            filter.stars === undefined && "bg-gray-100"
          )}
          onClick={onStarsFilterClear}
        >
          All
          <StarIcon className={"w-4 h-4 fill-black"} aria-label="star" />
        </div>
        {initialStarsArray.map((_, i) => {
          const starNumber = maxStars - i;
          return (
            <div
              className={cn(
                "border rounded-md px-3 py-2 flex gap-2 items-center text-sm cursor-pointer",
                filter.stars === starNumber && "bg-gray-100"
              )}
              onClick={createOnStarsFilterChange(starNumber)}
              key={i}
            >
              {starNumber}
              <StarIcon className={"w-4 h-4 fill-black"} aria-label="star" />
            </div>
          );
        })}
      </div>
      <Select value={filter.filterBy} onValueChange={onFilterByChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Most recent</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
