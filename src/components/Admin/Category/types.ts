import type {
  TreeNodeType,
  CheckedState as BaseCheckedState,
} from "@/lib/checkboxTree";

export interface Category {
  id: string;
  parentId?: string;
  iconId?: string;
  title: string;
  description: string;
  keywords: string[];
  isDeleted: boolean;
}

export type CategoryTreeNodeType = TreeNodeType<Category>;
export type CheckedState = BaseCheckedState;

export interface CategorySpecificity {
  id: string;
  name: string;
  appearance: "tiles" | "rows";
}
