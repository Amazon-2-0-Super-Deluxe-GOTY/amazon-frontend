import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateCategoryForm } from "@/components/forms/CreateCategoryForm";
import type { Category } from "@/api/categories";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  isRoot: boolean;
  category?: Category;
  allCategories: Category[];
  onSubmit: (values: Omit<Category, "id">) => void;
}

export const CreateCategoryModal = ({
  isOpen,
  isRoot,
  category,
  closeModal,
  allCategories,
  onSubmit,
}: Props) => {
  const isEdit = !!category;

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
              onCancel={closeModal}
              isRoot={isRoot}
              defaultValues={category}
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
