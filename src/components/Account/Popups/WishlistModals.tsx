import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const RemoveFromWishListModal = ({
  onRemoveItem,
}: {
  onRemoveItem: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };
  const onRemove = () => {
    onRemoveItem();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger
        className={cn(
          buttonVariants({
            variant: "secondary",
            size: "sm",
            className:
              "bg-background h-8 max-md:text-sm px-5 py-3 md:px-4 md:py-2",
          })
        )}
      >
        Remove
      </DialogTrigger>
      <DialogContent className="max-w-[464px] gap-5 md:gap-6" hideClose>
        <div className="flex flex-col justify-center items-center gap-3 md:gap-4">
          <span className="text-xl md:text-3xl font-semibold">
            Are you sure?
          </span>
          <Separator />
          <span className="text-base md:text-xl text-center max-md:pt-2">
            This action will remove this item from your wishlist.
          </span>
        </div>
        <div className="flex justify-between items-center gap-3">
          <Button
            type="reset"
            variant={"secondary"}
            className="w-full"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
