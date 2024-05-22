import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateCategoryForm } from "@/components/forms/CreateCategoryForm";
import type { Category } from "@/api/categories";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  isRoot: boolean;
  category?: Category;
  allCategories: Category[];
}

export const CreateCategoryModal = ({
  isOpen,
  isRoot,
  category,
  closeModal,
  allCategories,
}: Props) => {
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
        <ScrollArea
          className="h-full"
          viewportClassName="[&>div]:h-full scroll-smooth p-2"
        >
          <CreateCategoryForm
            onSubmit={console.log}
            onCancel={closeModal}
            isRoot={isRoot}
            defaultValues={category}
            allCategories={allCategories}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
