import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CategoryTreeNode } from "./CategoryTreeNode";
import type { CategoryTreeType, CheckedState } from "./types";
import { updateCategoryTree } from "@/lib/categories";

export const CategoryTree = ({
  root,
  onChange,
}: {
  root: CategoryTreeType;
  onChange: (updatedRoot: CategoryTreeType) => void;
}) => {
  const onCheckedChange = (
    updatedNode: CategoryTreeType,
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
    <div>
      <div className="space-y-4">
        <Separator />
        <div className="px-4 flex items-center gap-4">
          <Checkbox
            id="subcategory-all-check"
            size="lg"
            checked={root.checkboxState}
            onCheckedChange={(checked) => onCheckedChange(root, checked)}
          />
          <label
            htmlFor="subcategory-all-check"
            className="text-xl font-medium basis-full"
          >
            Subcategory
          </label>
        </div>
        <Separator />
      </div>

      <div className="space-y-4 px-4">
        {root.subcategories.map((c) => (
          <CategoryTreeNode
            category={c}
            onCheckedChange={onCheckedChange}
            index={0}
            key={c.id}
          />
        ))}
      </div>
    </div>
  );
};
