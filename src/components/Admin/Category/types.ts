import type { CheckedState as RadixCheckedState } from "@radix-ui/react-checkbox";

export interface Category {
  id: string;
  parentId?: string;
  title: string;
  iconId?: string;
}

export interface CategoryTreeType {
  id: string;
  title: string;
  iconId?: string;
  isRoot: boolean;
  subcategories: CategoryTreeType[];
  checkboxState: CheckedState;
}

export type CheckedState = RadixCheckedState;
