import { getIcon } from "@/lib/categories";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FilePenLineIcon, Trash2Icon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog } from "../AlertDialog";
import { useModal } from "../../Shared/Modal";
import { getCategories, type Category } from "@/api/categories";
import { CreateCategoryModal } from "./CreateCategoryModal";

interface Props {
  category?: Category;
  parentCategory?: Category;
  mainCategory?: Category;
  allCategories?: Category[];
  onViewMain?: () => void;
  onDelete: (id: string) => void;
}

const iconClassLarge = "w-8 h-8";

export const CategoryAsideCard = ({
  category,
  parentCategory,
  mainCategory,
  allCategories,
  onViewMain,
  onDelete,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showModal } = useModal();
  const hasParent = !!parentCategory;
  const hasMain = !!mainCategory && mainCategory.id !== category?.id;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    if (category) {
      showModal({
        component: AlertDialog,
        props: {
          title: "Are you sure?",
          text: "You will not be able to restore the category with the products there!",
        },
      }).then(({ action }) => action === "CONFIRM" && onDelete(category?.id));
    }
  };

  return (
    <aside className="lg:basis-1/3 grow bg-gray-200 rounded-lg sticky top-0">
      {!!category ? (
        <div className="p-6 flex flex-col gap-6 h-full">
          <div className="space-y-3.5">
            <div className="flex items-center gap-4">
              {category.iconId && getIcon(category.iconId, iconClassLarge)}
              <h1 className="text-2xl font-semibold">{category.name}</h1>
            </div>
            <Separator className="bg-black" />
          </div>
          <p>{category.description}</p>
          <Separator className="bg-black" />
          <div className="space-y-2">
            <InfoElement
              title="Status"
              value={category.isDeleted ? "Inactive" : "Active"}
            />
            <InfoElement
              title="Role"
              value={category.parentId ? "Child category" : "Parent category"}
            />
            {hasParent && (
              <InfoElement
                title="Parent category"
                value={parentCategory.name}
              />
            )}
            {hasMain && (
              <InfoElement title="Main category" value={mainCategory.name} />
            )}
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
            <Button
              className="w-full flex items-center gap-2 text-base"
              onClick={openModal}
            >
              <FilePenLineIcon className={"w-5 h-5"} />
              Edit
            </Button>
            <Button
              className="w-full flex items-center gap-2 text-base"
              onClick={handleDelete}
            >
              <Trash2Icon className={"w-5 h-5"} />
              Delete
            </Button>
          </div>
          <CreateCategoryModal
            isRoot={!category.parentId}
            isOpen={isModalOpen}
            closeModal={closeModal}
            category={category}
            onSubmit={console.log}
            allCategories={allCategories ?? []}
          />
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          <p className="px-6 py-3 rounded-sm bg-gray-100 w-max">
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
