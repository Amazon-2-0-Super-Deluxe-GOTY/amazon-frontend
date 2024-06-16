import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
  
export const PlaceOrderModal = ({
  isOpen,
} : {
  isOpen: boolean;
}) => {

  return (
    <Dialog open={isOpen}>
      <DialogContent hideClose className="max-w-[464px] w-full flex flex-col p-6 rounded-lg">
        <DialogTitle className="flex flex-col w-full">
          <span className="text-xl md:text-3xl font-semibold text-center w-full mb-3">Success!</span>
          <Separator />
        </DialogTitle>
        <div className="flex flex-col justify-center items-center gap-4 w-full">
            <span className="text-base md:text-xl text-center w-full">Your order was placed successfully!</span>
            <Button className="w-full"><a href={"/"} className="text-base md:text-lg font-normal">To main page</a></Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
