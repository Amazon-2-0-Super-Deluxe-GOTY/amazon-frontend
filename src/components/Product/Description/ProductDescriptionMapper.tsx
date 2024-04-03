import { DescriptionHeader } from "./DescriptionHeader";
import type { DescriptionBlock } from "./types";

export const ProductDescriptionMapper = ({
  blocks,
}: {
  blocks: DescriptionBlock[];
}) => {
  return (
    <div>
      {blocks.map((block) => {
        switch (block.type) {
          case "header":
            return <DescriptionHeader data={block.data} key={block.id} />;

          default:
            return null;
        }
      })}
    </div>
  );
};
