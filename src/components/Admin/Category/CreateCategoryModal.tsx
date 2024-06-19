import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateCategoryForm } from "@/components/forms/CreateCategoryForm";
import {
  createCategory,
  updateCategory,
  type Category,
} from "@/api/categories";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  isRoot: boolean;
  category?: Category;
  allCategories: Category[];
  onSubmit: () => void;
}

interface FormReturnValues {
  name: string;
  description: string;
  isActive: boolean;
  categoryPropertyKeys: {
    name: string;
  }[];
  image: {
    id: string;
    imageUrl: string;
  };
  logo: string | null | undefined;
  parentId: number | null | undefined;
}

export const CreateCategoryModal = ({
  isOpen,
  isRoot,
  category,
  closeModal,
  allCategories,
  onSubmit: onSubmitParent,
}: Props) => {
  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
  });
  const editCategoryMutation = useMutation({
    mutationFn: updateCategory,
  });

  const defaultValues = useMemo(
    () =>
      category
        ? {
            ...category,
            image: { id: category?.image.id, imageUrl: category?.image.url },
          }
        : undefined,
    [category]
  );

  const isEdit = !!category;

  const onSubmit = (values: FormReturnValues) => {
    if (isEdit) {
      editCategoryMutation
        .mutateAsync({
          id: category.id,
          parentCategoryId: values.parentId ?? null,
          name: values.name,
          description: values.description,
          imageId: values.image.id,
          isActive: values.isActive,
          logo: values.logo ?? null,
          propertyKeys: values.categoryPropertyKeys,
        })
        .then((r) => {
          if (r.status === 200) {
            onSubmitParent();
            closeModal();
          }
        });
    } else {
      createCategoryMutation
        .mutateAsync({
          parentCategoryId: values.parentId ?? null,
          name: values.name,
          description: values.description,
          imageId: values.image.id,
          isActive: values.isActive,
          logo: values.logo ?? null,
          propertyKeys: values.categoryPropertyKeys,
        })
        .then((r) => {
          if (r.status === 200) {
            onSubmitParent();
            closeModal();
          }
        });
    }
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeModal();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[75vw] lg:w-[50vw] h-[70vh] p-6 max-w-full"
        hideClose
      >
        <div className="h-full max-h-full overflow-hidden flex flex-col gap-6">
          <div className="space-y-3.5">
            <h2 className="text-3xl font-semibold">
              {isRoot
                ? isEdit
                  ? "Edit category"
                  : "Create category"
                : isEdit
                ? "Edit subcategory"
                : "Create subcategory"}
            </h2>
            <Separator />
          </div>
          <ScrollArea className="grow">
            <CreateCategoryForm
              onSubmit={onSubmit}
              isRoot={isRoot}
              defaultValues={defaultValues}
              allCategories={allCategories}
            />
          </ScrollArea>
          <div className="flex justify-end gap-3.5 bg-background">
            <Button type="button" variant={"secondary"} onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" form="create-category-form">
              {isEdit ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
