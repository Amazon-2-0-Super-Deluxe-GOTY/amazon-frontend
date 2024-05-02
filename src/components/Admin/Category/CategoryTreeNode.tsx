import { Checkbox } from "@/components/ui/checkbox";
import type { CategoryTreeNodeType, CheckedState } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import clsx from "clsx";

function getOffset(index: number) {
  const baseOffset = 40;
  const offsetStep = 16;
  return index < 1 ? offsetStep : baseOffset + (offsetStep * index - 1);
}

export const CategoryTreeNode = ({
  node,
  index,
  onCheckedChange: onChange,
  onSelect,
  isSelected,
}: {
  node: CategoryTreeNodeType;
  index: number;
  onCheckedChange: (
    updatedNode: CategoryTreeNodeType,
    updatedNodeChecked: CheckedState
  ) => void;
  onSelect: (node: CategoryTreeNodeType) => void;
  isSelected: (categoryId: string) => boolean;
}) => {
  const category = node.category;
  const nodeSelected = isSelected(category.id);

  const onCheckedChange = (checked: CheckedState) => {
    onChange(node, checked);
  };

  const onSelectNode = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node);
  };

  const checkboxElem = (
    <Checkbox
      size="lg"
      checked={node.checkboxState}
      onCheckedChange={onCheckedChange}
      onClick={(e) => e.stopPropagation()}
    />
  );

  return node.subcategories.length ? (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-none">
        <div
          className={clsx(
            "flex items-center gap-4 w-full py-2 px-4",
            nodeSelected && "bg-gray-200 rounded-lg"
          )}
          style={{ paddingLeft: `${getOffset(index)}px` }}
        >
          {checkboxElem}
          <AccordionTrigger
            className="pt-0"
            headerClassName="grow"
            onClick={onSelectNode}
          >
            <span className="text-xl font-medium">{category.title}</span>
          </AccordionTrigger>
        </div>
        <AccordionContent>
          {node.subcategories.map((c) => (
            <CategoryTreeNode
              node={c}
              index={index + 1}
              onCheckedChange={onChange}
              onSelect={onSelect}
              isSelected={isSelected}
              key={c.category.id}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ) : (
    <div
      className={clsx(
        "flex items-center gap-4 py-2 px-4",
        nodeSelected && "bg-gray-200 rounded-lg"
      )}
      style={{ paddingLeft: `${getOffset(index)}px` }}
    >
      {checkboxElem}
      <label
        htmlFor={`subcategory-${category.id}-check`}
        className="text-xl font-medium basis-full"
        onClick={onSelectNode}
      >
        {category.title}
      </label>
    </div>
  );
};
