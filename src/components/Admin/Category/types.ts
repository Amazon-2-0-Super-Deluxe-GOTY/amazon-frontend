import type { Category } from "@/api/categories";
import type {
  TreeNodeType,
  CheckedState as BaseCheckedState,
} from "@/lib/checkboxTree";

export type CategoryTreeNodeType = TreeNodeType<Category>;
export type CheckedState = BaseCheckedState;

export interface CategorySpecificity {
  id: string;
  name: string;
  appearance: "tiles" | "rows";
}
