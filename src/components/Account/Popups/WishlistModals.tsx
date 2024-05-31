import { ChangeEmailForm } from "@/components/forms/shop/account/ChangeEmailForm";
import { ChangeFirstLastNameForm } from "@/components/forms/shop/account/ChangeFirstLastNameForm";
import { ChangePasswordForm } from "@/components/forms/shop/account/ChangePasswordForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
  
export const RemoveFromWishListModal = ({
  onRemoveItem,
} : {
  onRemoveItem: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };
  const onRemove = () =>{
    onRemoveItem();
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 font-semibold max-md:px-2 max-md:h-8 max-md:text-xs">
        Remove
      </DialogTrigger>
      <DialogContent className="max-w-[464px] gap-6" hideClose>
        <div className="flex flex-col justify-center items-center gap-4">
            <span className="text-3xl font-semibold">Are you sure?</span>
          <Separator />
          <span className="text-xl text-center">This action will remove this item from your wishlist.</span>
        </div>
        <div className="flex justify-between items-center gap-3">
          <Button type="reset" variant={"outline"} className="w-full" onClick={onClose}>
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
