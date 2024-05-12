import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CategoryTreeNode } from "./CategoryTreeNode";
import type { CategoryTreeNodeType, CheckedState } from "./types";
import { PlusIcon } from "lucide-react";

export const CategoryTree = ({
  root,
  onCheckedChange,
  onSelect,
  onCreateClick,
  isSelected,
}: {
  root: CategoryTreeNodeType;
  onCheckedChange: (
    updatedNode: CategoryTreeNodeType,
    updatedNodeChecked: CheckedState
  ) => void;
  onSelect: (node: CategoryTreeNodeType) => void;
  onCreateClick: (rootId: string) => void;
  isSelected: (categoryId: string) => boolean;
}) => {
  return (
    <div onClick={() => onSelect(root)}>
      <div className="space-y-4">
        <Separator />
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-4">
            <Checkbox
              size="lg"
              checked={root.checked}
              onCheckedChange={(checked) => onCheckedChange(root, checked)}
            />
            <h2 className="text-xl font-medium basis-full cursor-pointer">
              Subcategory
            </h2>
          </div>
          <button onClick={() => onCreateClick(root.value.id)}>
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>

        <Separator />
      </div>

      <div className="space-y-4 mt-4">
        {root.nodes.map((node) => (
          <CategoryTreeNode
            node={node}
            index={0}
            onCheckedChange={onCheckedChange}
            onSelect={onSelect}
            isSelected={isSelected}
            key={node.value.id}
          />
        ))}
      </div>
    </div>
  );
};
