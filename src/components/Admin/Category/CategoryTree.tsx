import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CategoryTreeNode } from "./CategoryTreeNode";
import type { CategoryTreeNodeType, CheckedState } from "./types";
import type { Category } from "@/api/categories";
import { PlusIcon } from "lucide-react";
import { useMemo } from "react";
import { type TreeNodeType, treeToArray } from "@/lib/checkboxTree";
import { Button } from "@/components/ui/button";
import { AlertDialog } from "../AlertDialog";
import clsx from "clsx";
import { useModal } from "../Modal";

export const CategoryTree = ({
  root,
  onCheckedChange,
  onSelect,
  onDelete,
  onCreateClick,
  isSelected,
}: {
  root: CategoryTreeNodeType;
  onCheckedChange: (
    updatedNode: CategoryTreeNodeType,
    updatedNodeChecked: CheckedState
  ) => void;
  onSelect: (node: CategoryTreeNodeType) => void;
  onDelete: (nodes: TreeNodeType<Category>[]) => void;
  onCreateClick: (rootId: string) => void;
  isSelected: (categoryId: string) => boolean;
}) => {
  const { showModal } = useModal();

  const checkedNodes = useMemo(() => {
    return root ? treeToArray(root).filter((v) => v.checked === true) : [];
  }, [root]);

  const handleDelete = () => {
    showModal({
      component: AlertDialog,
      props: {
        title: "Are you sure?",
        text: "Deleting subcategories means losing both the categories and their products.",
      },
    }).then(({ action }) => action === "CONFIRM" && onDelete(checkedNodes));
  };

  return (
    <div>
      <div className="space-y-2">
        <Separator />
        <div
          className={clsx(
            "flex justify-between items-center px-4 py-2",
            isSelected(root.value.id) && "bg-gray-200 rounded-lg"
          )}
        >
          <div className="flex items-center gap-4">
            <Checkbox
              size="lg"
              checked={root.checked}
              onCheckedChange={(checked) => onCheckedChange(root, checked)}
            />
            <h2
              className="text-xl font-medium basis-full cursor-pointer"
              onClick={() => onSelect(root)}
            >
              {root.value.title}
            </h2>
          </div>
          {checkedNodes.length > 0 ? (
            <Button
              variant={"link"}
              className="py-0 h-max text-lg text-red-600"
              onClick={handleDelete}
            >
              Delete
            </Button>
          ) : (
            <button onClick={() => onCreateClick(root.value.id)}>
              <PlusIcon className="w-6 h-6" />
            </button>
          )}
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
