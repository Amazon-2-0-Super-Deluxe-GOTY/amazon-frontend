import { cva } from "class-variance-authority";
import type { DescriptionParagraphType } from "./types";

const descriptionParagraph = cva("text-base", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
});

export const DescriptionParagraph = ({
  data,
}: {
  data: DescriptionParagraphType["data"];
}) => {
  return (
    <p className={descriptionParagraph(data)}>
      <span className="inline-block max-w-[80ch]">{data.text}</span>
    </p>
  );
};
