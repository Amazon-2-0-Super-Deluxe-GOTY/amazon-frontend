import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShoppingCartIcon, XIcon } from "lucide-react";
import { SuggestionsProducts } from "./SuggestionsProducts";

export const ShoppingCart = ({ }: {

 }) => {
  const products = Array.from({ length: 9 }).map((_, index) => ({
    title: `Product ${index + 1}`,
    price: 39.99,
  }));

  return (
    <Dialog>
      <DialogTrigger><ShoppingCartIcon className="text-gray-700" /></DialogTrigger>
      <DialogContent hideClose className="max-w-7xl max-h-[780px] w-full h-full">
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-between items-center pb-6">
              <div className="flex gap-4">
                <ShoppingCartIcon className="text-gray-700 w-8 h-8" />
                <span className=" text-3xl">Shopping cart</span>
              </div>
              <DialogClose className="w-4 h-4 mr-12" >
                <XIcon />
              </DialogClose>
            </div>
          </DialogTitle>
          <hr className="border-gray-300 border-[1px] mr-6"/>
          <div className="w-full h-full flex justify-center items-center">
            <div className="py-10">
              <div className="text-center text-xl gap-4">
                <h1 className="font-medium text-3xl">No items added</h1>
                <h3>Browse to find your perfect product :)</h3>
              </div>
            </div>
          </div>
          <div className="pb-4">
            <hr className="border-gray-300 border-[1px] mr-6"/>
            <div className="pt-6">
              <span className="font-medium text-3xl">Suggestions</span>
              <div className="max-w-[1254px] pt-6 pr-6">
                <SuggestionsProducts products={products} />
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
  