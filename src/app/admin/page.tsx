"use client";
// TODO: we can probably switch it to server component lately
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Separator } from "@/components/ui/separator";
import {
  ArmchairIcon,
  HomeIcon,
  MonitorIcon,
  PlusIcon,
  ShirtIcon,
  WrenchIcon,
} from "lucide-react";
import React, { useState } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";

const iconClass = "w-5 h-5";
interface Category {
  id: string;
  parentId?: string;
  title: string;
  iconId?: string;
}

interface CategoryTree {
  id: string;
  title: string;
  iconId?: string;
  isRoot: boolean;
  subcategories: CategoryTree[];
  checkboxState: CheckedState;
}

const defaultCategoryData: Category[] = [
  {
    id: "1",
    title: "Fashion",
    iconId: "shirt",
  },
  {
    id: "2",
    title: "Electronics",
    iconId: "monitor",
  },
  {
    id: "3",
    title: "Household",
    iconId: "home",
  },
  {
    id: "4",
    title: "Furniture",
    iconId: "armchair",
  },
  {
    id: "5",
    title: "Work tools",
    iconId: "wrench",
  },
  {
    id: "11",
    parentId: "1",
    title: "Women's Fashion",
  },
  {
    id: "12",
    parentId: "11",
    title: "Casual Women's Clothing",
  },
  {
    id: "13",
    parentId: "12",
    title: "Tops",
  },
  {
    id: "14",
    parentId: "13",
    title: "T-shirts and Tank Tops",
  },
  {
    id: "15",
    parentId: "13",
    title: "Blouses and Shirts",
  },
  {
    id: "16",
    parentId: "12",
    title: "Bottoms",
  },
  {
    id: "17",
    parentId: "16",
    title: "Jeans and Denim",
  },
  {
    id: "18",
    parentId: "16",
    title: "Pants and Trousers",
  },
  {
    id: "19",
    parentId: "1",
    title: "Men's Fashion",
  },
];

function groupByParentId(data: Category[], parentId?: string): CategoryTree[] {
  const elems = data.filter((i) => {
    return i.parentId === parentId;
  });

  const elemsTree: CategoryTree[] = [];
  for (let elem of elems) {
    elemsTree.push({
      ...elem,
      isRoot: !elem.parentId,
      subcategories: groupByParentId(data, elem.id),
      checkboxState: false,
    });
  }
  return elemsTree;
}

function updateNodesCheckedState(
  children: CategoryTree[],
  checked: CheckedState
) {
  const updatedNodes: CategoryTree[] = [];
  for (let elem of children) {
    updatedNodes.push({
      ...elem,
      checkboxState: checked,
      subcategories: updateNodesCheckedState(elem.subcategories, checked),
    });
  }
  return updatedNodes;
}

function updateCheckboxTree(
  root: CategoryTree,
  updatedNode: CategoryTree,
  updatedNodeChecked: CheckedState
): CategoryTree {
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

  const copiedNodes: CategoryTree[] = [];
  for (let node of root.subcategories) {
    copiedNodes.push(updateCheckboxTree(node, updatedNode, updatedNodeChecked));
  }

  const checkedValues = copiedNodes.map((n) => n.checkboxState);

  const hasTrue = checkedValues.some((v) => v === true);
  const hasFalse = checkedValues.some((v) => v === false);
  const hasIndeterminate = checkedValues.some((v) => v === "indeterminate");

  const checked =
    hasIndeterminate || (hasTrue && hasFalse)
      ? "indeterminate"
      : root.checkboxState === true ||
        (!!checkedValues.length && checkedValues.every((v) => v === true));

  return {
    ...root,
    checkboxState: checked,
    subcategories: copiedNodes,
  };
}

export default function Page() {
  const allCategoriesTree = React.useMemo(
    () => groupByParentId(defaultCategoryData),
    []
  );
  const [selectedCategory, setSelectedCategory] = useState(
    () => allCategoriesTree[0]
  );

  const onCheckedChange = (
    updatedNode: CategoryTree,
    updatedNodeChecked: CheckedState
  ) => {
    const updatedTree = updateCheckboxTree(
      selectedCategory,
      updatedNode,
      updatedNodeChecked
    );
    setSelectedCategory(updatedTree);
  };

  return (
    <div className="grow flex flex-col lg:flex-row gap-4 lg:gap-6">
      <div className="lg:basis-2/3 space-y-4 lg:space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 basis-1/3">
            <h2 className="font-medium">Category</h2>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                <button className="mb-2 px-5 py-3 flex items-center gap-3 border rounded-sm w-full">
                  <PlusIcon className={iconClass} />
                  <span className="text-sm">Add category</span>
                </button>
                {allCategoriesTree.map((item, i) => (
                  <SelectItem
                    value={item.title}
                    key={item.title}
                    className="p-4"
                    checkAlign="right"
                    checkOffset={4}
                  >
                    <div className="flex items-center gap-3">
                      {item.iconId && getIcon(item.iconId)}
                      <span>{item.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input type="text" placeholder="Search..." className="basis-2/3" />
        </div>

        <div className="space-y-4">
          <Separator />
          <div className="px-4 flex items-center gap-4">
            <Checkbox
              id="subcategory-all-check"
              size="lg"
              checked={selectedCategory.checkboxState}
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
          {selectedCategory.subcategories.map((c) => (
            <CategoryLabelRecursive
              category={c}
              onCheckedChange={onCheckedChange}
              index={0}
              key={c.id}
            />
          ))}
        </div>
      </div>

      <aside className="lg:basis-1/3 grow bg-gray-100 rounded-lg sticky top-0"></aside>
    </div>
  );
}

const _icons = new Map<string, React.ReactNode>([
  ["shirt", <ShirtIcon className={iconClass} key={"shirt"} />],
  ["monitor", <MonitorIcon className={iconClass} key={"monitor"} />],
  ["home", <HomeIcon className={iconClass} key={"home"} />],
  ["armchair", <ArmchairIcon className={iconClass} key={"armchair"} />],
  ["wrench", <WrenchIcon className={iconClass} key={"wrench"} />],
]);

function getIcon(iconId: string): React.ReactNode | undefined {
  // const elem = icons.find((i) => i.iconId === iconId);
  // return elem ? elem.icon : null;
  return _icons.get(iconId);
}

function getOffset(index: number) {
  const baseOffset = 40;
  const offsetStep = 16;
  return index < 1 ? 0 : baseOffset + (offsetStep * index - 1);
}

const CategoryLabelRecursive = ({
  category,
  index,
  onCheckedChange: onChange,
}: {
  category: CategoryTree;
  index: number;
  onCheckedChange: (
    updatedNode: CategoryTree,
    updatedNodeChecked: CheckedState
  ) => void;
}) => {
  const onCheckedChange = (checked: CheckedState) => {
    onChange(category, checked);
  };

  const checkboxElem = (
    <Checkbox
      size="lg"
      checked={category.checkboxState}
      onCheckedChange={onCheckedChange}
    />
  );

  return category.subcategories.length ? (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-none">
        <div
          className="flex items-center gap-4 w-full mt-4"
          style={{ paddingLeft: `${getOffset(index)}px` }}
        >
          {checkboxElem}
          <AccordionTrigger className="pt-0" headerClassName="grow">
            <span className="text-xl font-medium">{category.title}</span>
          </AccordionTrigger>
        </div>
        <AccordionContent>
          {category.subcategories.map((c) => (
            <CategoryLabelRecursive
              category={c}
              index={index + 1}
              onCheckedChange={onChange}
              key={c.id}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ) : (
    <div
      className="flex items-center gap-4 mt-4"
      style={{ paddingLeft: `${getOffset(index)}px` }}
    >
      {checkboxElem}
      <label
        htmlFor={`subcategory-${category.id}-check`}
        className="text-xl font-medium basis-full"
      >
        {category.title}
      </label>
    </div>
  );
};
