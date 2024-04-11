export type FilterTypes = "checkbox" | "tiles" | "price" | "rating";

type FilterCheckboxDataType = string[];
type FilterTilesDataType = string[];
type FilterPriceDataType = { min: number; max: number };
type FilterRatingDataType = number[];

type FiltersDataItem<Type extends FilterTypes, Values> = {
  title: string;
  type: Type;
  values: Values;
  isSearch: boolean;
};

export type FilterCheckboxItem = FiltersDataItem<
  "checkbox",
  FilterCheckboxDataType
>;
export type FilterTilesItem = FiltersDataItem<"tiles", FilterTilesDataType>;
export type FilterPriceItem = FiltersDataItem<"price", FilterPriceDataType>;
export type FilterRatingItem = FiltersDataItem<"rating", FilterRatingDataType>;

export type FilterItem =
  | FilterCheckboxItem
  | FilterTilesItem
  | FilterPriceItem
  | FilterRatingItem;
