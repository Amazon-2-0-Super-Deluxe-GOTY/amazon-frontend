type ProductDescriptionBlock<Type extends string, Data extends object> = {
  id: string;
  type: Type;
  data: Data;
};
type AlignOptions = "left" | "center" | "right";

export type DescriptionHeaderType = ProductDescriptionBlock<
  "header",
  {
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
    align: AlignOptions;
  }
>;

export type DescriptionParagraphType = ProductDescriptionBlock<
  "paragraph",
  {
    text: string;
    align: AlignOptions;
  }
>;

export type DescriptionHorizontalCardType = ProductDescriptionBlock<
  "horizontalCard",
  {
    title: string;
    text: string;
    image: string;
    direction: "ltr" | "rtl";
  }
>;

export type DescriptionHRType = ProductDescriptionBlock<"hr", {}>;

export type DescriptionBlock =
  | DescriptionHeaderType
  | DescriptionParagraphType
  | DescriptionHorizontalCardType
  | DescriptionHRType;
