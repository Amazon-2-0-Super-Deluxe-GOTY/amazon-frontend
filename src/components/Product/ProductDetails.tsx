import { useScreenSize } from "@/lib/media";
import { useExpandableList } from "@/lib/utils";
import React, { useMemo } from "react";
import { Button } from "../ui/button";

interface Item {
  title: string;
  text: string;
}
const defaultItemsLimit = 6;

export const ProductDetails = (props: { items: Item[] }) => {
  const { items, isExpandable, isExpanded, onExpand, onHide } =
    useExpandableList({ maxItems: defaultItemsLimit, items: props.items });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {items.map((item, i) => (
        <div className="text-base lg:text-lg" key={i}>
          <h3 className="font-semibold">{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
      {isExpandable && (
        <div className="flex justify-center mt-4 col-span-2 lg:col-span-3">
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
