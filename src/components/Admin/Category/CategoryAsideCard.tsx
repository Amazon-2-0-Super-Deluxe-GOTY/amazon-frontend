import { getIcon } from "@/lib/categories";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AlertDialog } from "../AlertDialog";
import { useModal } from "../../Shared/Modal";
import { getCategories, type Category } from "@/api/categories";
import { CreateCategoryModal } from "./CreateCategoryModal";
import { EditIcon, TrashIcon } from "@/components/Shared/Icons";

interface Props {
  category?: Category;
  parentCategory?: Category;
  mainCategory?: Category;
  allCategories?: Category[];
  onViewMain?: () => void;
  onDelete: (id: number) => void;
  onUpdate: () => void;
}

const iconClassLarge = "w-10 h-10";

export const CategoryAsideCard = ({
  category,
  parentCategory,
  mainCategory,
  allCategories,
  onViewMain,
  onDelete,
  onUpdate,
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
          text: "You can't restore this category and its subcategories; the products will be deactivated.",
        },
      }).then(({ action }) => action === "CONFIRM" && onDelete(category?.id));
    }
  };

  return (
    <aside className="lg:basis-1/3 grow bg-card shadow-lg shadow-color-card rounded-lg sticky top-0">
      {!!category ? (
        <div className="p-6 flex flex-col gap-6 h-full">
          <div className="space-y-3.5">
            <div className="flex items-center gap-4">
              {category.logo && getIcon(category.logo, iconClassLarge)}
              <h1 className="text-2xl font-semibold">{category.name}</h1>
            </div>
            <Separator />
          </div>
          <p className="text-sm">{category.description}</p>
          <Separator />
          <div className="space-y-2">
            <InfoElement
              title="Status"
              value={category.isActive ? "Active" : "Inactive"}
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
              <Separator />
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
              variant={"secondary"}
              className="w-full flex items-center gap-2 text-base"
              onClick={openModal}
            >
              <EditIcon className={"w-6 h-6 stroke-secondary stroke-2"} />
              Edit
            </Button>
            <Button
              variant={"destructive"}
              className="w-full flex items-center gap-2 text-base"
              onClick={handleDelete}
            >
              <TrashIcon className={"w-6 h-6 stroke-destructive stroke-2"} />
              Delete
            </Button>
          </div>
          <CreateCategoryModal
            isRoot={!category.parentId}
            isOpen={isModalOpen}
            closeModal={closeModal}
            category={category}
            onSubmit={onUpdate}
            allCategories={allCategories ?? []}
          />
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          <p className="px-6 py-3 rounded-sm bg-secondary-light w-max text-lg">
            Select a category to see its information
          </p>
        </div>
      )}
    </aside>
  );
};

const InfoElement = ({ title, value }: { title: string; value: string }) => {
  return (
    <p className="flex justify-between">
      <span className="font-bold text-base">{title}</span>
      <span className="text-sm">{value}</span>
    </p>
  );
};
