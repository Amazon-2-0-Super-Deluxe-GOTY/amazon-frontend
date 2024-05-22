import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateCategoryForm } from "@/components/forms/CreateCategoryForm";
import type { Category } from "@/api/categories";
import type { TreeNodeType } from "@/lib/checkboxTree";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  isRoot: boolean;
  defaultRootId?: string;
  allCategories: Category[];
}

export const CreateCategoryModal = ({
  isOpen,
  isRoot,
  defaultRootId,
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
      <DialogContent className="w-[75vw] lg:w-[50vw] p-6 max-w-full" hideClose>
        <ScrollArea
          className="h-full"
          viewportClassName="[&>div]:h-full scroll-smooth p-2"
        >
          <CreateCategoryForm
            onSubmit={console.log}
            onCancel={closeModal}
            isRoot={isRoot}
            defaultRootId={defaultRootId}
            allCategories={allCategories}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
