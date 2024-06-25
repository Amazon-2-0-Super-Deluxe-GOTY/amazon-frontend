import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { ReviewFilters } from "@/api/review";
import { Button } from "../ui/button";
import clsx from "clsx";
import { StarFullIcon } from "../Shared/Icons";

const initialStarsArray = Array.from({ length: 5 });
const maxStars = 5;

export const ReviewFilter = ({
  filters: filter,
  onFiltersChange,
}: {
  filters: ReviewFilters;
  onFiltersChange: (filters: ReviewFilters) => void;
}) => {
  const onOrderByChange = (value: string) => {
    const newFilters: ReviewFilters = {
      ...filter,
      orderBy: value as ReviewFilters["orderBy"],
    };
    onFiltersChange(newFilters);
  };
  const onRatingFilterChange = (value: number) => {
    if (value === filter.rating) return;

    const newFilters: ReviewFilters = {
      ...filter,
      rating: value,
    };
    onFiltersChange(newFilters);
  };
  const onRatingFilterClear = () => {
    const newFilters: ReviewFilters = {
      ...filter,
      rating: undefined,
    };
    onFiltersChange(newFilters);
  };

  const createOnStarsFilterChange = (value: number) => () =>
    onRatingFilterChange(value);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2">
      <div className="flex gap-2 overflow-y-auto pb-1 md:pb-0">
        <Button
          variant={"secondary"}
          className={clsx(
            "px-4",
            filter.rating === undefined && "bg-secondary-press"
          )}
          onClick={onRatingFilterClear}
        >
          All
        </Button>
        {initialStarsArray.map((_, i) => {
          const starNumber = maxStars - i;
          return (
            <Button
              variant={"secondary"}
              className={clsx(
                "px-4 flex items-center gap-2",
                filter.rating === starNumber && "bg-secondary-press"
              )}
              onClick={createOnStarsFilterChange(starNumber)}
              key={i}
            >
              {starNumber}
              <StarFullIcon
                className={"w-5 h-5 stroke-secondary fill-secondary"}
                aria-label="star"
              />
            </Button>
          );
        })}
      </div>
      <Select value={filter.orderBy} onValueChange={onOrderByChange}>
        <SelectTrigger className="w-full lg:w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="like">Top reviews</SelectItem>
          <SelectItem value="desc">Most recent</SelectItem>
          <SelectItem value="asc">Older reviews</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
