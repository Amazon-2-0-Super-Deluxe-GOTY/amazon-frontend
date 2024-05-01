import type {
  Category,
  CategoryTreeType,
  CheckedState,
} from "@/components/Admin/Category/types";

export function groupCategoriesByParentId(
  data: Category[],
  parentId?: string
): CategoryTreeType[] {
  const elems = data.filter((i) => {
    return i.parentId === parentId;
  });

  const elemsTree: CategoryTreeType[] = [];
  for (let elem of elems) {
    elemsTree.push({
      ...elem,
      isRoot: !elem.parentId,
      subcategories: groupCategoriesByParentId(data, elem.id),
      checkboxState: false,
    });
  }
  return elemsTree;
}

function updateNodesCheckedState(
  children: CategoryTreeType[],
  checked: CheckedState
) {
  const updatedNodes: CategoryTreeType[] = [];
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
  root: CategoryTreeType,
  updatedNode: CategoryTreeType,
  updatedNodeChecked: CheckedState
): CategoryTreeType {
  if (root.id === updatedNode.id) {
    return {
      ...updatedNode,
      checkboxState: updatedNodeChecked,
      subcategories: updateNodesCheckedState(
        updatedNode.subcategories,
        updatedNodeChecked
      ),
    };
  }

  const copiedNodes: CategoryTreeType[] = [];
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
