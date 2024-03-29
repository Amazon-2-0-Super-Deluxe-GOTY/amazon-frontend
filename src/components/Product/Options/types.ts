export type AdditionalProductDataTypes = "size" | "color";
export type SizesData = {
  title: string;
  short: string;
  isAvailable: boolean;
}[];
export type ColorsData = { title: string; hex: string; isAvailable: boolean }[];

export type OptionsComponent = {
  type: AdditionalProductDataTypes;
  data: SizesData | ColorsData;
};
