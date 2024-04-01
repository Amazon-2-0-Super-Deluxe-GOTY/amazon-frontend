import React from "react";
import { Button } from "../ui/button";

interface Item {
  title: string;
  text: string;
}

const defaultItemsLimit = 4;

export const AboutProduct = (props: { items: Item[] }) => {
  const isExpandable = props.items.length > defaultItemsLimit;
  const [isExpanded, setIsExpanded] = React.useState(false);
  const items = React.useMemo(() => {
    if (!isExpandable || isExpanded) return props.items;
    return props.items.slice(0, defaultItemsLimit);
  }, [isExpandable, isExpanded]);

  const onExpand = () => setIsExpanded(true);
  const onHide = () => setIsExpanded(false);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {items.map((item, i) => (
          <div key={i}>
            <h3 className="font-semibold text-lg lg:text-xl mb-2">
              {item.title}
            </h3>
            <p className="text-base lg:text-lg">{item.text}</p>
          </div>
        ))}
      </div>
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
