import type { Category } from "@/api/categories";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type TreeNodeType,
  createTreeArray,
  findNodeById,
} from "@/lib/checkboxTree";
import { useMemo } from "react";

export function CategorySelect({
  categories,
  value,
  onValueChange,
  disallowRoots,
}: {
  categories?: Category[];
  value?: string;
  onValueChange: (value: string) => void;
  disallowRoots?: boolean;
}) {
  const treeRoots = useMemo(
    () =>
      createTreeArray(categories ?? [], {
        getId: (value) => value.id,
        getParentId: (value) => value.parentId,
      }),
    [categories]
  );
  const selectedCategory = categories?.find((c) => c.id === value);

  const isOpen = (node: TreeNodeType<Category>) => {
    if (node.value.id === value) return false;
    return (
      !!value &&
      !!findNodeById(node, value, {
        getId: (value) => value.id,
        getParentId: (value) => value.parentId,
      })
    );
  };

  const isDisabled = (node: TreeNodeType<Category>) =>
    disallowRoots ? node.isRoot : false;

  return (
    <Select
      value={value}
      onValueChange={(value) => value && onValueChange(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Choose category">
          <p className="p-2 text-start">{selectedCategory?.name}</p>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="p-4 min-w-96">
        {treeRoots.map((root) => (
          <SelectItemRecursive
            isOpen={isOpen}
            isDisabled={isDisabled}
            root={root}
            index={0}
            key={root.value.id}
          />
        ))}
      </SelectContent>
    </Select>
  );
}

function getOffset(index: number) {
  const offsetStep = 16;
  return index < 1 ? 0 : offsetStep * index;
}

function SelectItemRecursive({
  root,
  index,
  isOpen,
  isDisabled,
}: {
  root: TreeNodeType<Category>;
  index: number;
  isOpen: (node: TreeNodeType<Category>) => boolean;
  isDisabled: (node: TreeNodeType<Category>) => boolean;
}) {
  return root.nodes.length > 0 ? (
    <Accordion
      type="single"
      defaultValue={isOpen(root) ? "item-1" : undefined}
      collapsible
    >
      <AccordionItem value="item-1" className="border-none">
        <div
          className="flex hover:bg-muted has-[:focus]:bg-muted has-[[data-state=checked]]:bg-muted"
          style={{ paddingLeft: `${getOffset(index)}px` }}
        >
          <SelectItem
            value={root.value.id}
            className="p-4"
            checkAlign="right"
            checkOffset={2}
            disabled={isDisabled(root)}
          >
            <p>{root.value.name}</p>
          </SelectItem>
          <AccordionTrigger className="p-4" />
        </div>
        <AccordionContent>
          {root.nodes.map((node) => (
            <SelectItemRecursive
              root={node}
              isOpen={isOpen}
              isDisabled={isDisabled}
              index={index + 1}
              key={node.value.id}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ) : (
    <SelectItem
      value={root.value.id}
      className="p-4 data-[state=checked]:bg-muted"
      style={{ paddingLeft: `${getOffset(index + 1)}px` }}
      checkAlign="right"
      checkOffset={4}
      disabled={isDisabled(root)}
    >
      <p>{root.value.name}</p>
    </SelectItem>
  );
}
