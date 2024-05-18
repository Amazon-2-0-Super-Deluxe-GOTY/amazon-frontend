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
import React, { useRef, useState } from "react";
import type {
  Category,
  CategoryTreeNodeType,
  CheckedState,
} from "@/components/Admin/Category/types";
import { CategoryTree } from "@/components/Admin/Category/CategoryTree";
import { getIcon } from "@/lib/categories";
import { CategoryAsideCard } from "@/components/Admin/Category/CategoryAsideCard";
import {
  TreeNodeType,
  createTreeArray,
  useCheckboxTree,
} from "@/lib/checkboxTree";
import { CreateCategoryModal } from "@/components/Admin/Category/CreateCategoryModal";
import Image from "next/image";
import placeholder from "@/../public/Icons/placeholder.svg";

const defaultCategoryData: Category[] = [
  {
    id: "1",
    title: "Fashion",
    iconId: "shirt",
    description:
      "Explore a diverse collection of clothing, footwear, accessories, and more to elevate your style and keep up with the latest fashion trends. From timeless classics to bold statements, find everything you need to express your individuality and stay fashionable.",
    keywords: ["fashion", "clothes"],
    isDeleted: false,
  },
  {
    id: "2",
    title: "Electronics",
    iconId: "monitor",
    description: "Test description",
    keywords: [],
    isDeleted: false,
  },
  {
    id: "3",
    title: "Household",
    iconId: "home",
    description: "Test description",
    keywords: [],
    isDeleted: false,
  },
  {
    id: "4",
    title: "Furniture",
    iconId: "armchair",
    description: "Test description",
    keywords: [],
    isDeleted: false,
  },
  {
    id: "5",
    title: "Work tools",
    iconId: "wrench",
    description: "Test description",
    keywords: [],
    isDeleted: false,
  },
  {
    id: "11",
    parentId: "1",
    title: "Women's Fashion",
    description: "Test description",
    keywords: [],
    isDeleted: false,
  },
  {
    id: "12",
    parentId: "11",
    title: "Casual Women's Clothing",
    description: "Test description",
    keywords: [],
    isDeleted: false,
  },
  {
    id: "13",
    parentId: "12",
    title: "Tops",
    description: "Test description",
    keywords: [],
    isDeleted: false,
  },
  {
    id: "14",
    parentId: "13",
    title: "T-shirts and Tank Tops",
    description: "Test description",
    keywords: [],
    isDeleted: false,
  },
  {
    id: "15",
    parentId: "13",
    title: "Blouses and Shirts",
    description: "Test description",
    keywords: [],
    isDeleted: false,
  },
  {
    id: "16",
    parentId: "12",
    title: "Bottoms",
    description: "Test description",
    keywords: [],
    isDeleted: false,
  },
  {
    id: "17",
    parentId: "16",
    title: "Jeans and Denim",
    description: "Test description",
    keywords: [],
    isDeleted: false,
  },
  {
    id: "18",
    parentId: "16",
    title: "Pants and Trousers",
    description: "Test description",
    keywords: [],
    isDeleted: false,
  },
  {
    id: "19",
    parentId: "1",
    title: "Men's Fashion",
    description: "Test description",
    keywords: [],
    isDeleted: false,
  },
  {
    id: "20",
    parentId: "2",
    title: "Computers",
    description: "Test description",
    keywords: [],
    isDeleted: false,
  },
];

const iconClassSmall = "w-5 h-5";

const treeOptions = {
  getId: (value: Category) => value.id,
  getParentId: (value: Category) => value.parentId,
};

export default function Page() {
  const allCategoriesTrees = React.useMemo(
    () => createTreeArray(defaultCategoryData, treeOptions),
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const checkboxTree = useCheckboxTree<Category, string>({
    options: treeOptions,
  });
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const createModalParams = useRef<{
    defaultIsRoot?: boolean;
    defaultRootId?: string;
  }>({});

  const displayedTreeRoot = React.useMemo(() => {
    return search
      ? checkboxTree.filter((n) => n.value.title.toLowerCase().includes(search))
      : checkboxTree.root;
  }, [checkboxTree.root, search]);

  const onSelectRootCategory = (value: string) => {
    const node = allCategoriesTrees.find((c) => c.value.id === value);
    if (node) {
      checkboxTree.set(node);
      setSelectedCategory(node.value);
    }
  };

  const onCheckedChange = (
    updatedNode: CategoryTreeNodeType,
    updatedNodeChecked: CheckedState
  ) => {
    if (checkboxTree.root) {
      // copy node from original tree if search query is't empty, so it won't replace original node
      const nodeToUpdate = search
        ? checkboxTree.findById(updatedNode.value.id)
        : updatedNode;

      const updatedTree = checkboxTree.update(
        checkboxTree.root,
        nodeToUpdate!,
        updatedNodeChecked
      );
      checkboxTree.set(updatedTree);
    }
  };

  const onSelectCategory = (node: CategoryTreeNodeType) => {
    setSelectedCategory(node.value);
  };

  const onDeleteCategory = (id: string) => {
    const node = checkboxTree.findById(id);
    if (!node) return;

    const newTree = checkboxTree.remove(node);
    checkboxTree.set(newTree);
  };

  const onDeleteCategories = (nodes: TreeNodeType<Category>[]) => {
    const newTree = checkboxTree.removeMany(nodes);
    checkboxTree.set(newTree);
  };

  const isSelected = (categoryId: string) =>
    selectedCategory?.id === categoryId;

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openCreateModalAsRoot = () => {
    createModalParams.current = { defaultIsRoot: true };
    openCreateModal();
  };
  const openCreateModalAsChild = (rootId: string) => {
    createModalParams.current = { defaultIsRoot: false, defaultRootId: rootId };
    openCreateModal();
  };

  return (
    <div className="grow flex flex-col lg:flex-row gap-4 lg:gap-6">
      <div className="lg:basis-2/3 flex flex-col gap-4 lg:gap-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 basis-1/3">
            <h2 className="font-medium">Category</h2>
            <Select onValueChange={onSelectRootCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                <button
                  className="mb-2 px-5 py-3 flex items-center gap-3 border rounded-sm w-full"
                  onClick={openCreateModalAsRoot}
                >
                  <PlusIcon className={iconClassSmall} />
                  <span className="text-sm">Add category</span>
                </button>
                {allCategoriesTrees.map(({ value: category }) => (
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
          <Input
            type="text"
            placeholder="Search..."
            className="basis-2/3"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>

        <div className="grow">
          {!!displayedTreeRoot ? (
            displayedTreeRoot.nodes.length > 0 ? (
              <CategoryTree
                root={displayedTreeRoot}
                onCheckedChange={onCheckedChange}
                onSelect={onSelectCategory}
                onDelete={onDeleteCategories}
                onCreateClick={openCreateModalAsChild}
                isSelected={isSelected}
              />
            ) : (
              <div className="h-full flex justify-center items-center">
                <button
                  className="p-8 max-w-sm w-full border rounded-lg flex flex-col gap-3 items-center"
                  onClick={() =>
                    checkboxTree.root &&
                    openCreateModalAsChild(checkboxTree.root.value.id)
                  }
                >
                  <PlusIcon className="w-12 h-12" />
                  <span className="text-xl font-medium">
                    Create subcategory
                  </span>
                </button>
              </div>
            )
          ) : (
            <div className="h-full flex flex-col justify-center items-center gap-3">
              <Image
                src={placeholder}
                alt="placeholder"
                className="max-w-xs aspect-video object-cover"
              />
              <p>No subcategories in the selected category</p>
            </div>
          )}
        </div>
      </div>

      <CategoryAsideCard
        category={selectedCategory}
        parentCategory={defaultCategoryData.find(
          (c) => c.id === selectedCategory?.parentId
        )}
        mainCategory={checkboxTree.root?.value}
        onViewMain={() =>
          !!checkboxTree.root && onSelectCategory(checkboxTree.root)
        }
        onDelete={onDeleteCategory}
      />

      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        closeModal={closeCreateModal}
        categoriesTrees={allCategoriesTrees}
        {...createModalParams.current}
      />
    </div>
  );
}
