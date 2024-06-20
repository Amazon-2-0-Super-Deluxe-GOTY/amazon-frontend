import { SearchIcon, StarFullIcon, XIcon } from "../Shared/Icons";
import type { FilterCheckedType } from "./filtersDataTypes";

export function FilterItemButton({
  type,
  value,
  onClick,
}: {
  type: FilterCheckedType["type"];
  value: string;
  onClick: () => void;
}) {
  return (
    <button
      className="bg-secondary-light flex items-center gap-3 px-5 py-2 rounded-sm"
      onClick={onClick}
    >
      {type === "rating" ? (
        <p className="inline-flex items-center gap-1">
          <StarFullIcon className="w-4 h-4" />
          <span>{value}</span>
        </p>
      ) : type === "price" ? (
        <span>{value}$</span>
      ) : type === "search" ? (
        <p className="inline-flex items-center gap-1">
          <SearchIcon className="w-4 h-4" />
          <span>{value}</span>
        </p>
      ) : (
        <span>{value}</span>
      )}
      <XIcon className="w-2 h-2 stroke-3" />
    </button>
  );
}
