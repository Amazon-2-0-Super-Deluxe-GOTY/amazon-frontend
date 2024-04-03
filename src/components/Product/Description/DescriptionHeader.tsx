import { cn } from "@/lib/utils";
import type { DescriptionHeaderType } from "./types";
import { cva } from "class-variance-authority";

const descriptionHeader = cva("font-bold", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    level: {
      1: "text-5xl",
      2: "text-4xl",
      3: "text-3xl",
      4: "text-2xl",
      5: "text-xl",
      6: "text-lg",
    },
  },
  defaultVariants: {
    align: "center",
    level: 1,
  },
});

export const DescriptionHeader = ({
  data,
}: {
  data: DescriptionHeaderType["data"];
}) => {
  const className = descriptionHeader(data);

  switch (data.level) {
    case 1:
      return <h1 className={className}>{data.text}</h1>;
    case 2:
      return <h2 className={className}>{data.text}</h2>;
    case 3:
      return <h3 className={className}>{data.text}</h3>;
    case 4:
      return <h4 className={className}>{data.text}</h4>;
    case 5:
      return <h5 className={className}>{data.text}</h5>;
    case 6:
      return <h6 className={className}>{data.text}</h6>;

    default:
      return null;
  }
};
