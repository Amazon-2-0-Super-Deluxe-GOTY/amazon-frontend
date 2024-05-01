"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArmchairIcon,
  HomeIcon,
  MonitorIcon,
  PlusIcon,
  ShirtIcon,
  WrenchIcon,
} from "lucide-react";
import React, { useState } from "react";
import type {
  Category,
  CategoryTreeType,
} from "@/components/Admin/Category/types";
import { CategoryTree } from "@/components/Admin/Category/CategoryTree";
import { groupCategoriesByParentId } from "@/lib/categories";

const iconClass = "w-5 h-5";

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
  {
    id: "20",
    parentId: "2",
    title: "Computers",
  },
];

export default function Page() {
  const allCategoriesTree = React.useMemo(
    () => groupCategoriesByParentId(defaultCategoryData),
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryTreeType>();

  const onSelectCategory = (value: string) => {
    const category = allCategoriesTree.find((c) => c.id === value);
    if (category) {
      setSelectedCategory(category);
    }
  };

  return (
    <div className="grow flex flex-col lg:flex-row gap-4 lg:gap-6">
      <div className="lg:basis-2/3 space-y-4 lg:space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 basis-1/3">
            <h2 className="font-medium">Category</h2>
            <Select onValueChange={onSelectCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                <button className="mb-2 px-5 py-3 flex items-center gap-3 border rounded-sm w-full">
                  <PlusIcon className={iconClass} />
                  <span className="text-sm">Add category</span>
                </button>
                {allCategoriesTree.map((category) => (
                  <SelectItem
                    value={category.id}
                    key={category.title}
                    className="p-4"
                    checkAlign="right"
                    checkOffset={4}
                  >
                    <div className="flex items-center gap-3">
                      {category.iconId && getIcon(category.iconId)}
                      <span>{category.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input type="text" placeholder="Search..." className="basis-2/3" />
        </div>

        {!!selectedCategory ? (
          <CategoryTree
            root={selectedCategory}
            onChange={setSelectedCategory}
          />
        ) : (
          <div className="pt-6 flex justify-center items-center">
            <p>Choose a category to view it&apos;s subcategories</p>
          </div>
        )}
      </div>

      <aside className="lg:basis-1/3 grow bg-gray-200 rounded-lg sticky top-0">
        <div className="h-full flex justify-center items-center">
          <p className="px-6 py-3 rounded-sm bg-gray-100">
            Select a category to see its information
          </p>
        </div>
      </aside>
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
