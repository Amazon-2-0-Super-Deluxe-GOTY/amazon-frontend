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
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { CartProducts } from "./CartProducts";
import { useScreenSize } from "@/lib/media";
import { useStorageCart } from "@/lib/storage";

const Separator = () => {
  return (
    <div>
      <hr className="border-gray-300 border-[1px]"/>
    </div>
  );
};

export const ShoppingCart = () => {
  const isDesktop = useScreenSize({ minSize: "md" });

  //#region get cart products
  const { products } = useStorageCart();
  let cartProducts = products.map((item, index) => ({
    title: item.title,
    price: item.price,
    quantity: item.quantity,
  }));
  //#endregion

  const suggestionsProducts = Array.from({ length: 12 }).map((_, index) => ({
    title: `Product ${index + 1}`,
    price: 39.99,
  }));

  // const [cartState, setCartState] = useState<string>("not-authorized");
  const [cartState, setCartState] = useState<string>(products.length > 0 ? "products" : "empty");
  const ChangeCartState = (value:string) => {
    setCartState(value);
  }

  useEffect(() => {
    if(cartState !== "not-authorized")
      setCartState(products.length > 0 ? "products" : "empty");
  }, [products]);

  return (
    <>
      {isDesktop ? 
      <ShoppingCartDesktop products={cartProducts} suggestionsProducts={suggestionsProducts} cartState={cartState} ChangeCartState={ChangeCartState} /> : 
      <ShoppingCartMobile products={cartProducts} suggestionsProducts={suggestionsProducts} cartState={cartState} ChangeCartState={ChangeCartState} />}
    </>
  );
};

const ShoppingCartMobile = ({ products, suggestionsProducts, cartState, ChangeCartState }: {
  products: { title: string; price: number; quantity: number; }[],
  suggestionsProducts: { title: string; price: number; }[],
  cartState: string,
  ChangeCartState: (value:string) => void
 }) => {
  const { isOpenCartModal, setIsOpenCartModal } = useStorageCart();

  return (
    <Drawer open={isOpenCartModal} onOpenChange={setIsOpenCartModal} >
      <DrawerTrigger ><ShoppingCartIcon className="text-gray-700" /></DrawerTrigger>
      <DrawerContent className="h-full max-h-[95%]" >
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
          <Separator />
        </DrawerHeader>
        <ScrollArea className="pl-4 pr-1">
          <div>
          <div className="w-full h-full flex justify-center items-center">
            {(() => {
              switch (cartState) {
                case "empty":
                  return (
                    <div>
                      <div className="py-10">
                        <div className="text-center text-lg gap-4">
                          <h1 className="font-medium text-2xl">No items added</h1>
                          <h3>Browse to find your perfect product :)</h3>
                        </div>
                      </div>
                    </div>
                  );
                case "not-authorized":
                  return (
                    <div>
                      <div className="py-10">
                        <div className="text-center text-lg gap-4">
                          <h1 className="font-medium text-2xl">Not logged in</h1>
                          <h3>Log in to enjoy the best experience on PERRY</h3>
                        </div>
                      </div>
                    </div>
                  );
                case "products":
                  return (
                    <div className="w-full h-full">
                      <div className="mt-2 mb-4">
                          <div>
                            <CartProducts ChangeCartState={ChangeCartState} />
                          </div>
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
  products: { title: string; price: number; quantity: number; }[],
  suggestionsProducts: { title: string; price: number; }[],
  cartState: string,
  ChangeCartState: (value:string) => void
 }) => {
  const { isOpenCartModal, setIsOpenCartModal } = useStorageCart();

  return (
    <Dialog open={isOpenCartModal} onOpenChange={setIsOpenCartModal} >
      <DialogTrigger><ShoppingCartIcon className="text-gray-700" /></DialogTrigger>
      <DialogContent hideClose className="max-w-7xl max-h-[750px] w-full h-full p-6 pr-3">
        <div className="pr-3">
        <DialogTitle>
          <div className="flex justify-between items-center pb-6">
            <div className="flex gap-4">
              <ShoppingCartIcon className="text-gray-700 w-8 h-8" />
              <span className="text-2xl">Shopping cart</span>
            </div>
            <DialogClose className="w-4 h-4 flex justify-center items-center" >
              <XIcon />
            </DialogClose>
          </div>
        </DialogTitle>
        <Separator />
        </div>
        <ScrollArea>
          <div>
            <div className="w-full h-full flex justify-center items-center">
              {(() => {
                switch (cartState) {
                  case "empty":
                    return (
                      <div>
                        <div className="pb-10 pt-6">
                          <div className="text-center text-lg gap-4">
                            <h1 className="font-medium text-2xl">No items added</h1>
                            <h3>Browse to find your perfect product :)</h3>
                          </div>
                        </div>
                      </div>
                    );
                  case "not-authorized":
                    return (
                      <div>
                        <div className="pb-10 pt-6">
                          <div className="text-center text-lg gap-4">
                            <h1 className="font-medium text-2xl">Not logged in</h1>
                            <h3>Log in to enjoy the best experience on PERRY</h3>
                          </div>
                        </div>
                      </div>
                    );
                  case "products":
                    return (
                      <div className="w-full h-full">
                        <div className="mt-2 mb-4">
                          <div>
                            <CartProducts ChangeCartState={ChangeCartState} />
                          </div>
                        </div>
                        <Separator />
                        <div className="flex justify-between py-6">
                          <Button variant={"secondary"} className="text-xl">Continue shopping</Button>
                          <div className="flex justify-center items-center gap-4">
                            <span className="text-2xl font-medium">Total:</span>
                            <span className="text-2xl font-medium">$ 999</span>
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
          </div>
          <div className=" mt-6">
            {cartState.includes("products") ?
              <span className="font-medium text-2xl">You might also like</span> :
              (<>
                <div className="pb-6">
                  <Separator />
                </div>
                <span className="font-medium text-2xl">Suggestions</span>
              </>)}
            <div className="pt-6">
              <SuggestionsProducts products={suggestionsProducts} />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
