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
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { CartProducts } from "./CartProducts";

export const ShoppingCart = ({ products }: {
  products: {  }

 }) => {
  // const [cartState, setCartState] = useState<string>("empty");
  // const [cartState, setCartState] = useState<string>("not-authorized");
  const [cartState, setCartState] = useState<string>("products");

  const suggestionsProducts = Array.from({ length: 9 }).map((_, index) => ({
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
              <DialogClose className="w-4 h-4 mr-4" >
                <XIcon />
              </DialogClose>
            </div>
          </DialogTitle>
          <Separator />
          <div className="w-full h-full flex justify-center items-center">
            {(() => {
              switch (cartState) {
                case "empty":
                  return (
                    <div>
                      <div className="py-10">
                        <div className="text-center text-xl gap-4">
                          <h1 className="font-medium text-3xl">No items added</h1>
                          <h3>Browse to find your perfect product :)</h3>
                        </div>
                      </div>
                    </div>
                  );
                case "not-authorized":
                  return (
                    <div>
                      <div className="py-10">
                        <div className="text-center text-xl gap-4">
                          <h1 className="font-medium text-3xl">Not logged in</h1>
                          <h3>Log in to enjoy the best experience on PERRY</h3>
                        </div>
                      </div>
                    </div>
                  );
                case "products":
                  return (
                    <div className="w-full h-full">
                      <div>
                        <ScrollArea>
                          <div className="max-h-56">
                            <CartProducts products={suggestionsProducts} />
                          </div>
                        </ScrollArea>
                      </div>
                      <Separator />
                      <div className="flex justify-between py-6">
                        <Button variant={"secondary"} className="text-xl">Continue shopping</Button>
                        <div className="flex justify-center items-center gap-4">
                          <span className="text-4xl font-medium">$ 999</span>
                          <sup className="text-xl font-bold mt-3 -ml-3">00</sup>
                          <Button variant={"default"} className="text-xl">Checkout</Button>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  );
                    
                default:
                  return null;
              }
            })()}
          </div>
          <div>
            {cartState.includes("products") ?
              <span className="font-medium text-3xl">You might also like</span> :
              (<>
                <div className="pb-6">
                  <Separator />
                </div>
                <span className="font-medium text-3xl">Suggestions</span>
              </>)}
            <div className="max-w-[1254px] pt-6">
              <SuggestionsProducts products={suggestionsProducts} />
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const Separator = () => {
  return (
    <div>
      <hr className="border-gray-300 border-[1px]"/>
    </div>
  );
};
