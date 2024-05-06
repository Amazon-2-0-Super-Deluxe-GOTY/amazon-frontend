import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CategoryTreeNode } from "./CategoryTreeNode";
import type { CategoryTreeNodeType, CheckedState } from "./types";

export const CategoryTree = ({
  root,
  onCheckedChange,
  onSelect,
  isSelected,
}: {
  root: CategoryTreeNodeType;
  onCheckedChange: (
    updatedNode: CategoryTreeNodeType,
    updatedNodeChecked: CheckedState
  ) => void;
  onSelect: (node: CategoryTreeNodeType) => void;
  isSelected: (categoryId: string) => boolean;
}) => {
  return (
    <div onClick={() => onSelect(root)}>
      <div className="space-y-4">
        <Separator />
        <div className="px-4 flex items-center gap-4">
          <Checkbox
            size="lg"
            checked={root.checked}
            onCheckedChange={(checked) => onCheckedChange(root, checked)}
          />
          <h2 className="text-xl font-medium basis-full cursor-pointer">
            {root.value.title}
          </h2>
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
