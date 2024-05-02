import type {
  Category,
  CategoryTreeNodeType,
  CheckedState,
} from "@/components/Admin/Category/types";
import {
  ArmchairIcon,
  HomeIcon,
  MonitorIcon,
  ShirtIcon,
  WrenchIcon,
} from "lucide-react";

export function groupCategoriesByParentId(
  data: Category[],
  parentId?: string
): CategoryTreeNodeType[] {
  const elems = data.filter((i) => {
    return i.parentId === parentId;
  });

  const elemsTree: CategoryTreeNodeType[] = [];
  for (let elem of elems) {
    elemsTree.push({
      category: elem,
      isRoot: !elem.parentId,
      subcategories: groupCategoriesByParentId(data, elem.id),
      checkboxState: false,
    });
  }
  return elemsTree;
}

function updateNodesCheckedState(
  children: CategoryTreeNodeType[],
  checked: CheckedState
) {
  const updatedNodes: CategoryTreeNodeType[] = [];
  for (let elem of children) {
    updatedNodes.push({
      ...elem,
      checkboxState: checked,
      subcategories: updateNodesCheckedState(elem.subcategories, checked),
    });
  }
  return updatedNodes;
}

export function updateCategoryTree(
  root: CategoryTreeNodeType,
  updatedNode: CategoryTreeNodeType,
  updatedNodeChecked: CheckedState
): CategoryTreeNodeType {
  if (root.category.id === updatedNode.category.id) {
    return {
      ...updatedNode,
      checkboxState: updatedNodeChecked,
      subcategories: updateNodesCheckedState(
        updatedNode.subcategories,
        updatedNodeChecked
      ),
    };
  }

  const copiedNodes: CategoryTreeNodeType[] = [];
  for (let node of root.subcategories) {
    copiedNodes.push(updateCategoryTree(node, updatedNode, updatedNodeChecked));
  }

  const checkedValues = copiedNodes.map((n) => n.checkboxState);

  const hasTrue = checkedValues.some((v) => v === true);
  const hasFalse = checkedValues.some((v) => v === false);
  const hasIndeterminate = checkedValues.some((v) => v === "indeterminate");

  const checked =
    hasIndeterminate || (hasTrue && hasFalse)
      ? "indeterminate"
      : (root.checkboxState === true && !hasFalse) ||
        (!!checkedValues.length && checkedValues.every((v) => v === true));

  return {
    ...root,
    checkboxState: checked,
    subcategories: copiedNodes,
  };
}

const icons = new Map<string, (className?: string) => React.ReactNode>([
  ["shirt", (className) => <ShirtIcon className={className} key={"shirt"} />],
  [
    "monitor",
    (className) => <MonitorIcon className={className} key={"monitor"} />,
  ],
  ["home", (className) => <HomeIcon className={className} key={"home"} />],
  [
    "armchair",
    (className) => <ArmchairIcon className={className} key={"armchair"} />,
  ],
  [
    "wrench",
    (className) => <WrenchIcon className={className} key={"wrench"} />,
  ],
]);

export function getIcon(
  iconId: string,
  className?: string
): React.ReactNode | undefined {
  return icons.get(iconId)?.(className);
}
