import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CreateCategoryForm } from "@/components/forms/CreateCategoryForm";
import type { Category } from "@/api/categories";
import type { TreeNodeType } from "@/lib/checkboxTree";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  defaultIsRoot?: boolean;
  defaultRootId?: string;
  categoriesTrees: TreeNodeType<Category>[];
}

export const CreateCategoryModal = ({
  isOpen,
  defaultIsRoot = true,
  defaultRootId,
  closeModal,
  categoriesTrees,
}: Props) => {
  const [isRoot, setIsRoot] = useState(defaultIsRoot);
  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeModal();
    }
  };

  const switchToCreateParent = () => setIsRoot(true);
  const switchToCreateChild = () => setIsRoot(false);

  useEffect(() => {
    setIsRoot(defaultIsRoot);
  }, [defaultIsRoot]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[70vw] h-[75vh] p-6 max-w-full" hideClose>
        <ScrollArea
          className="h-full"
          viewportClassName="[&>div]:h-full scroll-smooth"
        >
          <CreateCategoryForm
            onSubmit={console.log}
            onCancel={closeModal}
            isRoot={isRoot}
            defaultRootId={defaultRootId}
            categoriesTrees={categoriesTrees}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

interface FormLinkProps {
  elementId: string;
  children: string;
}

const FormLink = ({ elementId, children }: FormLinkProps) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsSelected(entries[0].isIntersecting);
      },
      { threshold: [0.55, 0.6] }
    );
    const elem = document.getElementById(elementId);
    if (elem) {
      observer.observe(elem);
      return () => observer.unobserve(elem);
    }
  }, []);

  return (
    <Link href={`#${elementId}`} className="w-full flex items-center gap-3.5">
      <div
        className={clsx(
          "w-4 h-4 bg-black rounded-sm",
          isSelected ? "visible" : "invisible"
        )}
      />
      <p className={clsx("text-lg", !isSelected && "text-gray-400")}>
        {children}
      </p>
    </Link>
  );
};
