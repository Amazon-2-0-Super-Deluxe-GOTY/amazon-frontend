"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import type {
  Category,
  CategoryTreeNodeType,
} from "@/components/Admin/Category/types";
import { CategoryTree } from "@/components/Admin/Category/CategoryTree";
import { getIcon, groupCategoriesByParentId } from "@/lib/categories";
import { Separator } from "@/components/ui/separator";

const defaultCategoryData: Category[] = [
  {
    id: "1",
    title: "Fashion",
    iconId: "shirt",
    description:
      "Explore a diverse collection of clothing, footwear, accessories, and more to elevate your style and keep up with the latest fashion trends. From timeless classics to bold statements, find everything you need to express your individuality and stay fashionable.",
    keywords: ["fashion", "clothes"],
  },
  {
    id: "2",
    title: "Electronics",
    iconId: "monitor",
    description: "Test description",
    keywords: [],
  },
  {
    id: "3",
    title: "Household",
    iconId: "home",
    description: "Test description",
    keywords: [],
  },
  {
    id: "4",
    title: "Furniture",
    iconId: "armchair",
    description: "Test description",
    keywords: [],
  },
  {
    id: "5",
    title: "Work tools",
    iconId: "wrench",
    description: "Test description",
    keywords: [],
  },
  {
    id: "11",
    parentId: "1",
    title: "Women's Fashion",
    description: "Test description",
    keywords: [],
  },
  {
    id: "12",
    parentId: "11",
    title: "Casual Women's Clothing",
    description: "Test description",
    keywords: [],
  },
  {
    id: "13",
    parentId: "12",
    title: "Tops",
    description: "Test description",
    keywords: [],
  },
  {
    id: "14",
    parentId: "13",
    title: "T-shirts and Tank Tops",
    description: "Test description",
    keywords: [],
  },
  {
    id: "15",
    parentId: "13",
    title: "Blouses and Shirts",
    description: "Test description",
    keywords: [],
  },
  {
    id: "16",
    parentId: "12",
    title: "Bottoms",
    description: "Test description",
    keywords: [],
  },
  {
    id: "17",
    parentId: "16",
    title: "Jeans and Denim",
    description: "Test description",
    keywords: [],
  },
  {
    id: "18",
    parentId: "16",
    title: "Pants and Trousers",
    description: "Test description",
    keywords: [],
  },
  {
    id: "19",
    parentId: "1",
    title: "Men's Fashion",
    description: "Test description",
    keywords: [],
  },
  {
    id: "20",
    parentId: "2",
    title: "Computers",
    description: "Test description",
    keywords: [],
  },
];

const iconClassSmall = "w-5 h-5";
const iconClassLarge = "w-8 h-8";

export default function Page() {
  const allCategoriesTree = React.useMemo(
    () => groupCategoriesByParentId(defaultCategoryData),
    []
  );
  const [selectedRootCategory, setSelectedRootCategory] =
    useState<CategoryTreeNodeType>();
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const onSelectRootCategory = (value: string) => {
    const node = allCategoriesTree.find((c) => c.category.id === value);
    if (node) {
      setSelectedRootCategory(node);
      setSelectedCategory(node.category);
    }
  };

  const onSelectCategory = (node: CategoryTreeNodeType) => {
    setSelectedCategory(node.category);
  };

  const isSelected = (categoryId: string) =>
    selectedCategory?.id === categoryId;

  return (
    <div className="grow flex flex-col lg:flex-row gap-4 lg:gap-6">
      <div className="lg:basis-2/3 space-y-4 lg:space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 basis-1/3">
            <h2 className="font-medium">Category</h2>
            <Select onValueChange={onSelectRootCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                <button className="mb-2 px-5 py-3 flex items-center gap-3 border rounded-sm w-full">
                  <PlusIcon className={iconClassSmall} />
                  <span className="text-sm">Add category</span>
                </button>
                {allCategoriesTree.map(({ category }) => (
                  <SelectItem
                    value={category.id}
                    key={category.title}
                    className="p-4"
                    checkAlign="right"
                    checkOffset={4}
                  >
                    <div className="flex items-center gap-3">
                      {category.iconId &&
                        getIcon(category.iconId, iconClassSmall)}
                      <span>{category.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input type="text" placeholder="Search..." className="basis-2/3" />
        </div>

        {!!selectedRootCategory ? (
          <CategoryTree
            root={selectedRootCategory}
            onChange={setSelectedRootCategory}
            onSelect={onSelectCategory}
            isSelected={isSelected}
          />
        ) : (
          <div className="pt-6 flex justify-center items-center">
            <p>Choose a category to view it&apos;s subcategories</p>
          </div>
        )}
      </div>

      <aside className="lg:basis-1/3 grow bg-gray-200 rounded-lg sticky top-0">
        {!!selectedCategory ? (
          <div className="p-6 space-y-6 h-full">
            <div className="space-y-3.5">
              <div className="flex items-center gap-4">
                {selectedCategory.iconId &&
                  getIcon(selectedCategory.iconId, iconClassLarge)}
                <h1 className="text-2xl font-semibold">
                  {selectedCategory.title}
                </h1>
              </div>
              <Separator />
            </div>
          </div>
        ) : (
          <div className="h-full flex justify-center items-center">
            <p className="px-6 py-3 rounded-sm bg-gray-100">
              Select a category to see its information
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
