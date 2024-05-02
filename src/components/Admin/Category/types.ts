import type { CheckedState as RadixCheckedState } from "@radix-ui/react-checkbox";

export interface Category {
  id: string;
  parentId?: string;
  iconId?: string;
  title: string;
  description: string;
  keywords: string[];
}

export interface CategoryTreeNodeType {
  category: Category;
  isRoot: boolean;
  subcategories: CategoryTreeNodeType[];
  checkboxState: CheckedState;
}

export type CheckedState = RadixCheckedState;
