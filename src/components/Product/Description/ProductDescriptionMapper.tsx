import { DescriptionHR } from "./DescriptionHR";
import { DescriptionHeader } from "./DescriptionHeader";
import { DescriptionHorizontalCard } from "./DescriptionHorizontalCard";
import { DescriptionParagraph } from "./DescriptionParagraph";
import type { DescriptionBlock } from "./types";

export const ProductDescriptionMapper = ({
  blocks,
}: {
  blocks: DescriptionBlock[];
}) => {
  return blocks.map((block) => {
    switch (block.type) {
      case "header":
        return <DescriptionHeader data={block.data} key={block.id} />;

      case "paragraph":
        return <DescriptionParagraph data={block.data} key={block.id} />;

      case "horizontalCard":
        return <DescriptionHorizontalCard data={block.data} key={block.id} />;

      case "hr":
        return <DescriptionHR data={block.data} key={block.id} />;

      default:
        return null;
    }
  });
};
