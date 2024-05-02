import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CategoryTreeNode } from "./CategoryTreeNode";
import type { CategoryTreeNodeType, CheckedState } from "./types";
import { updateCategoryTree } from "@/lib/categories";

export const CategoryTree = ({
  root,
  onChange,
  onSelect,
  isSelected,
}: {
  root: CategoryTreeNodeType;
  onChange: (updatedRoot: CategoryTreeNodeType) => void;
  onSelect: (node: CategoryTreeNodeType) => void;
  isSelected: (categoryId: string) => boolean;
}) => {
  const onCheckedChange = (
    updatedNode: CategoryTreeNodeType,
    updatedNodeChecked: CheckedState
  ) => {
    const updatedTree = updateCategoryTree(
      root,
      updatedNode,
      updatedNodeChecked
    );
    onChange(updatedTree);
  };

  return (
    <div onClick={() => onSelect(root)}>
      <div className="space-y-4">
        <Separator />
        <div className="px-4 flex items-center gap-4">
          <Checkbox
            size="lg"
            checked={root.checkboxState}
            onCheckedChange={(checked) => onCheckedChange(root, checked)}
          />
          <h2 className="text-xl font-medium basis-full cursor-pointer">
            {root.category.title}
          </h2>
        </div>
        <Separator />
      </div>

      <div className="space-y-4 mt-4">
        {root.subcategories.map((node) => (
          <CategoryTreeNode
            node={node}
            index={0}
            onCheckedChange={onCheckedChange}
            onSelect={onSelect}
            isSelected={isSelected}
            key={node.category.id}
          />
        ))}
      </div>
    </div>
  );
};
