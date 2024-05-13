import { useState } from "react";

export type CheckedState = boolean | "indeterminate";

interface NodeOptions<TValue, TId> {
  getId: (value: TValue) => TId;
  getParentId: (value: TValue) => TId | undefined;
}

export interface TreeNodeType<TValue> {
  value: TValue;
  isRoot: boolean;
  nodes: TreeNodeType<TValue>[];
  checked: CheckedState;
}

export function createTreeArray<TValue, TId>(
  data: TValue[],
  options: NodeOptions<TValue, TId>,
  parentId?: TId
): TreeNodeType<TValue>[] {
  const elems = data.filter((i) => {
    return options.getParentId(i) === parentId;
  });

  const nodes: TreeNodeType<TValue>[] = [];
  for (let elem of elems) {
    nodes.push({
      value: elem,
      isRoot: !options.getParentId(elem),
      nodes: createTreeArray(data, options, options.getId(elem)),
      checked: false,
    });
  }
  return nodes;
}

function updateNodesCheckedState<TValue>(
  nodes: TreeNodeType<TValue>[],
  checked: CheckedState
) {
  const updatedNodes: TreeNodeType<TValue>[] = [];
  for (let node of nodes) {
    updatedNodes.push({
      value: node.value,
      isRoot: node.isRoot,
      checked: checked,
      nodes: updateNodesCheckedState(node.nodes, checked),
    });
  }
  return updatedNodes;
}

function getCheckedState(
  checkedValues: CheckedState[],
  nodeChecked: CheckedState,
  isRoot: boolean
) {
  if (checkedValues.length === 0 && !nodeChecked) return false;

  const hasTrue = checkedValues.some((v) => v === true);
  const hasFalse = checkedValues.some((v) => v === false);
  const hasIndeterminate = checkedValues.some((v) => v === "indeterminate");

  const checked =
    hasIndeterminate || (hasTrue && hasFalse)
      ? "indeterminate"
      : (nodeChecked === true && !hasFalse && !isRoot) ||
        (!!checkedValues.length && checkedValues.every((v) => v === true));

  return checked;
}

export function updateTree<TValue, TId>(
  root: TreeNodeType<TValue>,
  updatedNode: TreeNodeType<TValue>,
  updatedNodeChecked: CheckedState,
  options: NodeOptions<TValue, TId>
): TreeNodeType<TValue> {
  if (options.getId(root.value) === options.getId(updatedNode.value)) {
    return {
      value: updatedNode.value,
      isRoot: updatedNode.isRoot,
      checked: updatedNodeChecked,
      nodes: updateNodesCheckedState(updatedNode.nodes, updatedNodeChecked),
    };
  }

  const copiedNodes: TreeNodeType<TValue>[] = [];
  for (let node of root.nodes) {
    copiedNodes.push(
      updateTree(node, updatedNode, updatedNodeChecked, options)
    );
  }

  const checkedValues = copiedNodes.map((n) => n.checked);
  const checked = getCheckedState(checkedValues, root.checked, root.isRoot);

  return {
    value: root.value,
    isRoot: root.isRoot,
    checked: checked,
    nodes: copiedNodes,
  };
}

export function filterTree<TValue>(
  root: TreeNodeType<TValue>,
  predicate: (node: TreeNodeType<TValue>) => boolean
): TreeNodeType<TValue> | undefined {
  const filteredNodes: TreeNodeType<TValue>[] = [];
  for (let node of root.nodes) {
    const matchedNode = filterTree(node, predicate);
    if (matchedNode) {
      filteredNodes.push(matchedNode);
    }
  }

  const isMatch = filteredNodes.length > 0 ? true : predicate(root);

  const checkedValues = filteredNodes.map((n) => n.checked);
  const checked = getCheckedState(checkedValues, root.checked, root.isRoot);

  return isMatch
    ? {
        value: root.value,
        isRoot: root.isRoot,
        checked: checked,
        nodes: filteredNodes,
      }
    : undefined;
}

export function findNodeById<TValue, TId>(
  root: TreeNodeType<TValue>,
  nodeId: TId,
  options: NodeOptions<TValue, TId>
): TreeNodeType<TValue> | undefined {
  const isMatch = options.getId(root.value) === nodeId;

  if (isMatch) return root;

  for (let node of root.nodes) {
    const checkedNode = findNodeById(node, nodeId, options);
    if (checkedNode) return checkedNode;
  }

  return undefined;
}

export function treeToArray<TValue>(
  root: TreeNodeType<TValue>
): TreeNodeType<TValue>[] {
  const childNodesArray = root.nodes.flatMap((n) => treeToArray(n));
  return [root, ...childNodesArray];
}

export function getNodesByCheckedState<TValue>(
  root: TreeNodeType<TValue>,
  checkedState: CheckedState
): TreeNodeType<TValue>[] {
  const filteredNodes: TreeNodeType<TValue>[][] = [];
  for (let node of root.nodes) {
    const matchedNodes = getNodesByCheckedState(node, checkedState);
    if (matchedNodes) {
      filteredNodes.push(matchedNodes);
    }
  }

  const isMatch = root.checked === checkedState;
  const nodesFlattened = filteredNodes.flat();

  return isMatch ? [root, ...nodesFlattened] : nodesFlattened;
}

export function appendTreeNode<TValue, TId>(
  root: TreeNodeType<TValue>,
  appendRoot: TreeNodeType<TValue>,
  value: TValue,
  options: NodeOptions<TValue, TId>
): TreeNodeType<TValue> {
  if (options.getId(root.value) === options.getId(appendRoot.value)) {
    const newNodes: TreeNodeType<TValue>[] = [
      ...appendRoot.nodes,
      { value, isRoot: false, checked: false, nodes: [] },
    ];
    return {
      value: appendRoot.value,
      isRoot: appendRoot.isRoot,
      checked: getCheckedState(
        newNodes.map((n) => n.checked),
        appendRoot.checked,
        appendRoot.isRoot
      ),
      nodes: newNodes,
    };
  }

  const copiedNodes: TreeNodeType<TValue>[] = [];
  for (let node of root.nodes) {
    copiedNodes.push(appendTreeNode(node, appendRoot, value, options));
  }

  const checkedValues = copiedNodes.map((n) => n.checked);
  const checked = getCheckedState(checkedValues, root.checked, root.isRoot);

  return {
    value: root.value,
    isRoot: root.isRoot,
    checked: checked,
    nodes: copiedNodes,
  };
}

export function removeTreeNode<TValue, TId>(
  root: TreeNodeType<TValue>,
  nodeToRemove: TreeNodeType<TValue>,
  options: NodeOptions<TValue, TId>
): TreeNodeType<TValue> | undefined {
  if (options.getId(root.value) === options.getId(nodeToRemove.value)) {
    return undefined;
  }

  const copiedNodes: TreeNodeType<TValue>[] = [];
  for (let node of root.nodes) {
    const nodeCopy = removeTreeNode(node, nodeToRemove, options);
    if (nodeCopy) {
      copiedNodes.push(nodeCopy);
    }
  }

  const checkedValues = copiedNodes.map((n) => n.checked);
  const checked = getCheckedState(checkedValues, root.checked, root.isRoot);

  return {
    value: root.value,
    isRoot: root.isRoot,
    checked: checked,
    nodes: copiedNodes,
  };
}

export function removeTreeNodes<TValue, TId>(
  root: TreeNodeType<TValue>,
  nodesToRemove: TreeNodeType<TValue>[],
  options: NodeOptions<TValue, TId>
): TreeNodeType<TValue> | undefined {
  if (
    nodesToRemove.some(
      (node) => options.getId(root.value) === options.getId(node.value)
    )
  ) {
    return undefined;
  }

  const copiedNodes: TreeNodeType<TValue>[] = [];
  for (let node of root.nodes) {
    const nodeCopy = removeTreeNodes(node, nodesToRemove, options);
    if (nodeCopy) {
      copiedNodes.push(nodeCopy);
    }
  }

  const checkedValues = copiedNodes.map((n) => n.checked);
  const checked = getCheckedState(checkedValues, root.checked, root.isRoot);

  return {
    value: root.value,
    isRoot: root.isRoot,
    checked: checked,
    nodes: copiedNodes,
  };
}

export function useCheckboxTree<TValue, TId>({
  initialTree,
  options,
}: {
  initialTree?: TreeNodeType<TValue>;
  options: NodeOptions<TValue, TId>;
}) {
  const [tree, setTree] = useState(initialTree);

  return {
    root: tree,
    set: setTree,
    update: (
      root: TreeNodeType<TValue>,
      updatedNode: TreeNodeType<TValue>,
      updatedNodeChecked: CheckedState
    ) => updateTree(root, updatedNode, updatedNodeChecked, options),
    filter: (predicate: (node: TreeNodeType<TValue>) => boolean) => {
      if (!tree) return;

      return filterTree(tree, predicate);
    },
    findById: (nodeId: TId) => {
      if (!tree) return;

      return findNodeById(tree, nodeId, options);
    },
    getByCheckedState: (checkedState: CheckedState) => {
      if (!tree) return;

      return getNodesByCheckedState(tree, checkedState);
    },
    append: (appendRoot: TreeNodeType<TValue>, value: TValue) => {
      if (!tree) return;

      return appendTreeNode(tree, appendRoot, value, options);
    },
    remove: (nodeToRemove: TreeNodeType<TValue>) => {
      if (!tree) return;

      return removeTreeNode(tree, nodeToRemove, options);
    },
    removeMany: (nodesToRemove: TreeNodeType<TValue>[]) => {
      if (!tree) return;

      return removeTreeNodes(tree, nodesToRemove, options);
    },
  };
}
