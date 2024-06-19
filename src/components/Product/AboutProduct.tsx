import React from "react";
import { Button } from "../ui/button";
import { useScreenSize } from "@/lib/media";
import { useExpandableList } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Card } from "../ui/card";

interface Item {
  title: string;
  text: string;
}

const mobileItemsLimit = 2;
const desktopItemsLimit = 4;

export const AboutProduct = ({
  items: initialItems,
  variant = "grid",
}: {
  items: Item[];
  variant?: "grid" | "list";
}) => {
  const isMobile = useScreenSize({ maxSize: "sm" });
  const defaultItemsLimit = isMobile ? mobileItemsLimit : desktopItemsLimit;
  const { items, isExpandable, isExpanded, onExpand, onHide } =
    useExpandableList({ maxItems: defaultItemsLimit, items: initialItems });

  if (variant === "list") {
    return (
      <div className="flex flex-col gap-2 lg:gap-3">
        {initialItems.map((item, i) => (
          <Card key={i}>
            <Accordion type="single" collapsible>
              {/* All items within an accordion should use a unique value. */}
              <AccordionItem
                className="p-4 pt-1 lg:p-6 lg:pt-3 border rounded-sm"
                value={i.toString()}
              >
                <AccordionTrigger className="font-bold lg:text-lg">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="mt-4">
                  {item.text}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {items.map((item, i) => (
          <div key={i}>
            <h3 className="font-medium text-lg lg:text-xl mb-2">
              {item.title}
            </h3>
            <p className="text-base">{item.text}</p>
          </div>
        ))}
      </div>
      {isExpandable && (
        <div className="flex justify-center mt-4">
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
