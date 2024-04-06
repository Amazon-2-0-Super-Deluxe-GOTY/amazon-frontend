import React from "react";
import { ProductDescriptionMapper } from "./Description/ProductDescriptionMapper";
import type { DescriptionBlock } from "./Description/types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const maxHeight = 1300;

export const ProductDescription = ({
  blocks,
}: {
  blocks: DescriptionBlock[];
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isExpandable, setIsExpandable] = React.useState<boolean | undefined>(
    undefined
  );

  const onExpand = () => setIsExpanded(true);
  const onHide = () => setIsExpanded(false);

  return (
    <div>
      <article
        className={cn(
          "flex flex-col gap-4",
          isExpandable && !isExpanded && "overflow-hidden"
        )}
        style={{
          height: isExpandable && !isExpanded ? `${maxHeight}px` : "auto",
        }}
        ref={(ref) => {
          const contentContainerRef = ref as HTMLDivElement;
          if (isExpandable === undefined && contentContainerRef) {
            setIsExpandable(contentContainerRef.offsetHeight > maxHeight);
          }
        }}
      >
        <ProductDescriptionMapper blocks={blocks} />
      </article>
      {isExpandable && (
        <div className="flex justify-center mt-4">
          {isExpanded ? (
            <Button variant={"outline"} onClick={onHide}>
              Hide
            </Button>
          ) : (
            <Button variant={"outline"} onClick={onExpand}>
              View more
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
