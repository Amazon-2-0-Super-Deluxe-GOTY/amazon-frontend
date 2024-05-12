import { getIcon } from "@/lib/categories";
import type { Category, CategorySpecificity } from "./types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronRight, FilePenLineIcon, Trash2Icon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { CategoryPrimaryForm } from "@/components/forms/CategoryPrimaryForm";
import { CategorySpecificityForm } from "@/components/forms/CategorySpecificityForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog } from "../AlertDialog";

interface Props {
  category?: Category;
  parentCategory?: Category;
  mainCategory?: Category;
  onViewMain?: () => void;
  onDelete: (id: string) => void;
}

const iconClassLarge = "w-8 h-8";

export const CategoryAsideCard = ({
  category,
  parentCategory,
  mainCategory,
  onViewMain,
  onDelete,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const hasParent = !!parentCategory;
  const hasMain = !!mainCategory && mainCategory.id !== category?.id;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openAlert = () => setIsAlertOpen(true);
  const closeAlert = () => setIsAlertOpen(false);

  const handleDelete = () => {
    if (category) {
      closeAlert();
      onDelete(category?.id);
    }
  };

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
              value={category.isDeleted ? "Inactive" : "Active"}
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
            <Button
              className="w-full flex items-center gap-2 text-base"
              onClick={openModal}
            >
              <FilePenLineIcon className={"w-5 h-5"} />
              Edit
            </Button>
            <Button
              className="w-full flex items-center gap-2 text-base"
              onClick={openAlert}
            >
              <Trash2Icon className={"w-5 h-5"} />
              Delete
            </Button>
          </div>
          <EditCategoryModal
            isOpen={isModalOpen}
            closeModal={closeModal}
            category={category}
          />
        </div>
      ) : (
        <div className="h-full flex justify-center items-center">
          <p className="px-6 py-3 rounded-sm bg-gray-100">
            Select a category to see its information
          </p>
        </div>
      )}
      <AlertDialog
        title="Are you sure?"
        text="You will not be able to restore the category with the products there!"
        isOpen={isAlertOpen}
        closeModal={closeAlert}
        onSubmit={handleDelete}
      />
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

interface EditCategoryModalProps {
  isOpen: boolean;
  closeModal: () => void;
  category: Category;
}

const specificities: CategorySpecificity[] = [
  {
    id: "1",
    name: "Color",
    appearance: "tiles",
  },
  {
    id: "2",
    name: "Color 2",
    appearance: "rows",
  },
  {
    id: "3",
    name: "Size",
    appearance: "tiles",
  },
  {
    id: "4",
    name: "Size 2",
    appearance: "rows",
  },
];

const EditCategoryModal = ({
  isOpen,
  closeModal,
  category,
}: EditCategoryModalProps) => {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeModal();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[70vw] h-[75vh] p-6 max-w-full">
        <ScrollArea className="h-full" viewportClassName="[&>div]:h-full">
          <Tabs
            defaultValue="primary"
            // className="flex flex-col xl:flex-row gap-6 w-full p-1 h-full"
            className="grid xl:grid-cols-[1fr_min-content_1fr_1fr] gap-6 w-full p-1 h-full"
          >
            <TabsList className="max-xl:col-span-2 xl:flex-col gap-3.5 h-max p-0 bg-transparent">
              <CustomTabsTrigger value="primary">Primary</CustomTabsTrigger>
              <CustomTabsTrigger value="specificity">
                Category specificity
              </CustomTabsTrigger>
            </TabsList>
            <Separator orientation="vertical" className="hidden xl:block" />
            <div className="col-span-2 relative">
              <CustomTabsContent value="primary">
                <div className="space-y-3.5">
                  <h2 className="text-3xl font-semibold">Primary</h2>
                  <Separator />
                </div>

                <CategoryPrimaryForm
                  category={category}
                  onSubmit={console.log}
                  onCancel={closeModal}
                />
              </CustomTabsContent>
              <CustomTabsContent value="specificity">
                <div className="space-y-3.5">
                  <h2 className="text-3xl font-semibold">
                    Category specificity
                  </h2>
                  <Separator />
                </div>

                <CategorySpecificityForm
                  specificities={specificities}
                  onSubmit={console.log}
                  onCancel={closeModal}
                />
              </CustomTabsContent>
            </div>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const CustomTabsTrigger = ({
  value,
  children,
}: {
  value: string;
  children: string;
}) => (
  <TabsTrigger
    className="w-full justify-center xl:justify-start text-base lg:text-lg px-4 py-3 bg-none rounded-sm data-[state=active]:ring-2 ring-gray-200"
    value={value}
  >
    {children}
  </TabsTrigger>
);

const CustomTabsContent = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => (
  <TabsContent
    value={value}
    className="flex flex-col gap-6 mt-0 h-full data-[state=inactive]:hidden"
  >
    {children}
  </TabsContent>
);
