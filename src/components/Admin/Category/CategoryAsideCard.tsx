import { getIcon } from "@/lib/categories";
import type { Category } from "./types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronRight, FilePenLineIcon, Trash2Icon } from "lucide-react";

interface Props {
  category?: Category;
  parentCategory?: Category;
  mainCategory?: Category;
  onViewMain?: () => void;
}

const iconClassLarge = "w-8 h-8";

export const CategoryAsideCard = ({
  category,
  parentCategory,
  mainCategory,
  onViewMain,
}: Props) => {
  const hasParent = !!parentCategory;
  const hasMain = !!mainCategory && mainCategory.id !== category?.id;

  return (
    <aside className="lg:basis-1/3 grow bg-gray-200 rounded-lg sticky top-0">
      {!!category ? (
        <div className="p-6 flex flex-col gap-6 h-full">
          <div className="space-y-3.5">
            <div className="flex items-center gap-4">
              {category.iconId && getIcon(category.iconId, iconClassLarge)}
              <h1 className="text-2xl font-semibold">{category.title}</h1>
            </div>
            <Separator className="bg-black" />
          </div>
          <p>{category.description}</p>
          <Separator className="bg-black" />
          <div className="space-y-2">
            <InfoElement
              title="Status"
              value={category.isDeleted ? "Deleted" : "Active"}
            />
            <InfoElement
              title="Role"
              value={category.parentId ? "Child category" : "Parent category"}
            />
            {hasParent && (
              <InfoElement
                title="Parent category"
                value={parentCategory.title}
              />
            )}
            {hasMain && (
              <InfoElement title="Main category" value={mainCategory.title} />
            )}
          </div>
          <Separator className="bg-black" />
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xl">Keywords</span>
              <ChevronRight className={"w-6 h-6"} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xl">Category specificity</span>
              <ChevronRight className={"w-6 h-6"} />
            </div>
          </div>
          {hasMain && (
            <>
              <Separator className="bg-black" />
              <Button
                variant={"link"}
                type="button"
                className="text-lg p-0 justify-start"
                onClick={onViewMain}
              >
                View main category
              </Button>
            </>
          )}
          <div className="mt-auto flex gap-3.5">
            <Button className="w-full flex items-center gap-2 text-base">
              <FilePenLineIcon className={"w-5 h-5"} />
              Edit
            </Button>
            <Button className="w-full flex items-center gap-2 text-base">
              <Trash2Icon className={"w-5 h-5"} />
              Delete
            </Button>
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
  );
};

const InfoElement = ({ title, value }: { title: string; value: string }) => {
  return (
    <p className="text-lg flex justify-between">
      <span className="font-semibold">{title}</span>
      <span>{value}</span>
    </p>
  );
};
