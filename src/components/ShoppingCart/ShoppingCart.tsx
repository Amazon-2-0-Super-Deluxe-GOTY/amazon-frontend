import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingCartIcon, XIcon } from "lucide-react";
import { SuggestionsProducts } from "./SuggestionsProducts";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { CartProducts } from "./CartProducts";
import { useScreenSize } from "@/lib/media";

const Separator = () => {
  return (
    <div>
      <hr className="border-gray-300 border-[1px]"/>
    </div>
  );
};

export const ShoppingCart = () => {
  const isDesktop = useScreenSize({ minSize: "md" });

  // const [cartState, setCartState] = useState<string>("empty");
  // const [cartState, setCartState] = useState<string>("not-authorized");
  const [cartState, setCartState] = useState<string>("products");
  const ChangeCartState = (value:string) => {
    if(value)
    {
      setCartState(value);
    }
  }

  const suggestionsProducts = Array.from({ length: 9 }).map((_, index) => ({
    title: `Product ${index + 1}`,
    price: 39.99,
  }));

  let cartProducts = Array.from({ length: 9 }).map((_, index) => ({
    title: `Product ${index + 1}`,
    price: 39.99,
  }));

  return (
    <>
      {isDesktop ? 
      <ShoppingCartDesktop products={cartProducts} suggestionsProducts={suggestionsProducts} cartState={cartState} ChangeCartState={ChangeCartState} /> : 
      <ShoppingCartMobile products={cartProducts} suggestionsProducts={suggestionsProducts} cartState={cartState} ChangeCartState={ChangeCartState} />}
    </>
  );
};

const ShoppingCartMobile = ({ products, suggestionsProducts, cartState, ChangeCartState }: {
  products: { title: string; price: number; }[],
  suggestionsProducts: { title: string; price: number; }[],
  cartState: string,
  ChangeCartState: (value:string) => void
 }) => {

  return (
    <Drawer>
      <DrawerTrigger><ShoppingCartIcon className="text-gray-700" /></DrawerTrigger>
      <DrawerContent className="h-full max-h-[95%]">
        <DrawerHeader className="pt-2">
          <DrawerTitle>
            <div className="flex justify-between items-center pb-6">
              <div className="flex justify-start items-center gap-4">
                <ShoppingCartIcon className="text-gray-700 w-5 h-5" />
                <span className="text-xl">Shopping cart</span>
              </div>
              <DrawerClose className="flex items-center w-4 h-4 mr-4" >
                <XIcon />
              </DrawerClose>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="pl-3">
          <div>
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
                      <div className="mt-2 mb-4">
                        <ScrollArea>
                          <div className="max-h-56">
                            <CartProducts products={products} ChangeCartState={ChangeCartState} />
                          </div>
                        </ScrollArea>
                      </div>
                      <Separator />
                      <div className="my-3">
                        <div className="flex justify-between items-center gap-1 mb-[6px]">
                          <span className="text-xl font-medium">Total:</span>
                          <div>
                            <span className="text-xl font-medium">$ 999</span>
                            <sup className="text-sm font-bold mt-3">00</sup>
                          </div>
                        </div>
                        <div className="w-full flex justify-between items-center gap-1">
                          <Button variant={"secondary"} className="text-base max-sm:text-sm max-sm:px-3">Continue shopping</Button>
                          <Button variant={"default"} className="text-base max-sm:text-sm max-sm:px-3">Checkout</Button>
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
          <div className="w-full h-full">
            {cartState.includes("products") ?
              <div className="font-semibold text-center text-xl mx-4 mt-3">You might also like</div> :
              (<>
                <div className="pb-6">
                  <Separator />
                </div>
                <div className="font-semibold text-center text-xl mx-4 mt-3">Suggestions</div>
              </>)}
            <div className="max-w-[1254px] flex justify-center items-center pt-3">
              <SuggestionsProducts products={suggestionsProducts} />
            </div>
          </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

const ShoppingCartDesktop = ({ products, suggestionsProducts, cartState, ChangeCartState }: {
  products: { title: string; price: number; }[],
  suggestionsProducts: { title: string; price: number; }[],
  cartState: string,
  ChangeCartState: (value:string) => void
 }) => {

  return (
    <Dialog>
      <DialogTrigger><ShoppingCartIcon className="text-gray-700" /></DialogTrigger>
      <DialogContent hideClose className="max-w-7xl max-h-[780px] w-full h-full">
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-between items-center pb-6">
              <div className="flex gap-4">
                <ShoppingCartIcon className="text-gray-700 w-8 h-8" />
                <span className="text-3xl">Shopping cart</span>
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
                      <div className="mt-2 mb-4">
                        <ScrollArea>
                          <div className="max-h-56">
                            <CartProducts products={products} ChangeCartState={ChangeCartState} />
                          </div>
                        </ScrollArea>
                      </div>
                      <Separator />
                      <div className="flex justify-between py-6">
                        <Button variant={"secondary"} className="text-xl">Continue shopping</Button>
                        <div className="flex justify-center items-center gap-4">
                          <span className="text-3xl font-medium">Total:</span>
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
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
};

