import { useScreenSize } from "@/lib/media";
import { useExpandableList } from "@/lib/utils";
import React, { useMemo } from "react";
import { Button } from "../ui/button";

interface Item {
  key: string;
  value: string;
}
const defaultItemsLimit = 6;

export const ProductDetails = (props: { items: Item[] }) => {
  const { items, isExpandable, isExpanded, onExpand, onHide } =
    useExpandableList({ maxItems: defaultItemsLimit, items: props.items });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {items.map((item, i) => (
        <div key={i}>
          <h3 className="font-bold text-base lg:text-lg">{item.key}</h3>
          <p className="text-base">{item.value}</p>
        </div>
      ))}
      {isExpandable && (
        <div className="flex justify-center mt-4 col-span-2 lg:col-span-3">
          {isExpanded ? (
            <Button variant={"secondary"} onClick={onHide}>
              Hide
            </Button>
          ) : (
            <Button variant={"secondary"} onClick={onExpand}>
              View more
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
