import { Checkbox } from "@/components/ui/checkbox";
import type { CategoryTreeType, CheckedState } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function getOffset(index: number) {
  const baseOffset = 40;
  const offsetStep = 16;
  return index < 1 ? 0 : baseOffset + (offsetStep * index - 1);
}

export const CategoryTreeNode = ({
  category,
  index,
  onCheckedChange: onChange,
}: {
  category: CategoryTreeType;
  index: number;
  onCheckedChange: (
    updatedNode: CategoryTreeType,
    updatedNodeChecked: CheckedState
  ) => void;
}) => {
  const onCheckedChange = (checked: CheckedState) => {
    onChange(category, checked);
  };

  const checkboxElem = (
    <Checkbox
      size="lg"
      checked={category.checkboxState}
      onCheckedChange={onCheckedChange}
    />
  );

  return category.subcategories.length ? (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-none">
        <div
          className="flex items-center gap-4 w-full mt-4"
          style={{ paddingLeft: `${getOffset(index)}px` }}
        >
          {checkboxElem}
          <AccordionTrigger className="pt-0" headerClassName="grow">
            <span className="text-xl font-medium">{category.title}</span>
          </AccordionTrigger>
        </div>
        <AccordionContent>
          {category.subcategories.map((c) => (
            <CategoryTreeNode
              category={c}
              index={index + 1}
              onCheckedChange={onChange}
              key={c.id}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ) : (
    <div
      className="flex items-center gap-4 mt-4"
      style={{ paddingLeft: `${getOffset(index)}px` }}
    >
      {checkboxElem}
      <label
        htmlFor={`subcategory-${category.id}-check`}
        className="text-xl font-medium basis-full"
      >
        {category.title}
      </label>
    </div>
  );
};
