import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { InfoIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useScreenSize } from "@/lib/media";
  
export const PlaceOrderModal = () => {
  const isDesktop = useScreenSize({minSize:"md"});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return (

    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 font-semibold">
      Place order
    </DialogTrigger>
    <DialogContent hideClose className="max-w-7xl max-h-[750px] w-full p-6 pr-3 flex flex-col gap-4">
      <DialogTitle>
        <div className="flex justify-center items-center">
            <span>Success!</span>
            <Separator />
            <span>Your order was placed successfully!</span>
            <Button></Button>
        </div>
      </DialogTitle>
    </DialogContent>
  </Dialog>
  );
};
