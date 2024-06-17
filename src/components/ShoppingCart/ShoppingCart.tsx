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
import { SuggestionsProducts } from "./SuggestionsProducts";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { CartProducts } from "./CartProducts";
import { useScreenSize } from "@/lib/media";
import { useStorageCart } from "@/lib/storage";
import { Separator } from "../ui/separator";
import { ShoppingCartIcon, XIcon } from "../Shared/Icons";
import { useMemo } from "react";

export const ShoppingCart = () => {
  const isDesktop = useScreenSize({ minSize: "md" });

  const suggestionsProducts = Array.from({ length: 12 }).map((_, index) => ({
    title: `Product ${index + 1}`,
    price: 39.99,
  }));

  return (
    <>
      {isDesktop ? (
        <ShoppingCartDesktop suggestionsProducts={suggestionsProducts} />
      ) : (
        <ShoppingCartMobile suggestionsProducts={suggestionsProducts} />
      )}
    </>
  );
};

const ShoppingCartMobile = ({
  suggestionsProducts,
}: {
  suggestionsProducts: { title: string; price: number }[];
}) => {
  const { products, isOpenCartModal, setIsOpenCartModal } = useStorageCart();
  const productsCount = useMemo(
    () => products.reduce((prev, current) => prev + current.quantity, 0),
    [products]
  );
  const isAuthorized = false;

  return (
    <Drawer open={isOpenCartModal} onOpenChange={setIsOpenCartModal}>
      <DrawerTrigger>
        <ShoppingCartIconWithBadge productsCount={productsCount} />
      </DrawerTrigger>
      <DrawerContent className="h-full max-h-[95%]">
        <DrawerHeader className="pt-2">
          <DrawerTitle>
            <div className="flex justify-between items-center pb-6">
              <div className="flex justify-start items-center gap-4">
                <ShoppingCartIcon className="w-5 h-5" />
                <span className="text-xl">Shopping cart</span>
              </div>
              <DrawerClose className="flex items-center w-4 h-4 mr-4">
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
                const cartState = !isAuthorized
                  ? products.length > 0
                    ? "products"
                    : "empty"
                  : "not-authorized";
                switch (cartState) {
                  case "empty":
                    return (
                      <div>
                        <div className="py-10">
                          <div className="text-center text-lg gap-4">
                            <h1 className="font-medium text-2xl">
                              No items added
                            </h1>
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
                            <h1 className="font-medium text-2xl">
                              Not logged in
                            </h1>
                            <h3>
                              Log in to enjoy the best experience on PERRY
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  case "products":
                    return (
                      <div className="w-full h-full">
                        <div className="mt-2 mb-4">
                          <div>
                            <CartProducts />
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
                            <Button
                              variant={"secondary"}
                              className="text-base max-sm:text-sm max-sm:px-3"
                            >
                              Continue shopping
                            </Button>
                            <Button className="text-base max1-sm:text-sm max-sm:px-3">
                              Checkout
                            </Button>
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
              {products.length > 0 ? (
                <div className="font-semibold text-center text-xl mx-4 mt-3">
                  You might also like
                </div>
              ) : (
                <>
                  <div className="pb-6">
                    <Separator />
                  </div>
                  <div className="font-semibold text-center text-xl mx-4 mt-3">
                    Suggestions
                  </div>
                </>
              )}
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

const ShoppingCartDesktop = ({
  suggestionsProducts,
}: {
  suggestionsProducts: { title: string; price: number }[];
}) => {
  const { products, isOpenCartModal, setIsOpenCartModal } = useStorageCart();
  const productsCount = useMemo(
    () => products.reduce((prev, current) => prev + current.quantity, 0),
    [products]
  );
  const isAuthorized = false;

  return (
    <Dialog open={isOpenCartModal} onOpenChange={setIsOpenCartModal}>
      <DialogTrigger>
        <ShoppingCartIconWithBadge productsCount={productsCount} />
      </DialogTrigger>
      <DialogContent
        hideClose
        className="max-w-7xl max-h-[750px] w-full h-full p-6 pr-3"
      >
        <div className="pr-3">
          <DialogTitle>
            <div className="flex justify-between items-center pb-6">
              <div className="flex gap-4">
                <ShoppingCartIcon className="w-8 h-8" />
                <span className="text-2xl">Shopping cart</span>
              </div>
              <DialogClose className="w-4 h-4 flex justify-center items-center">
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
                const cartState = !isAuthorized
                  ? products.length > 0
                    ? "products"
                    : "empty"
                  : "not-authorized";
                switch (cartState) {
                  case "empty":
                    return (
                      <div>
                        <div className="pb-10 pt-6">
                          <div className="text-center text-lg gap-4">
                            <h1 className="font-medium text-2xl">
                              No items added
                            </h1>
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
                            <h1 className="font-medium text-2xl">
                              Not logged in
                            </h1>
                            <h3>
                              Log in to enjoy the best experience on PERRY
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  case "products":
                    return (
                      <div className="w-full h-full">
                        <div className="mt-2 mb-4">
                          <div>
                            <CartProducts />
                          </div>
                        </div>
                        <Separator />
                        <div className="flex justify-between py-6">
                          <Button variant={"secondary"} className="text-xl">
                            Continue shopping
                          </Button>
                          <div className="flex justify-center items-center gap-4">
                            <span className="text-2xl font-medium">Total:</span>
                            <span className="text-2xl font-medium">$ 999</span>
                            <sup className="text-xl font-bold mt-3 -ml-3">
                              00
                            </sup>
                            <Button className="text-xl">Checkout</Button>
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
            {products.length > 0 ? (
              <span className="font-medium text-2xl">You might also like</span>
            ) : (
              <>
                <div className="pb-6">
                  <Separator />
                </div>
                <span className="font-medium text-2xl">Suggestions</span>
              </>
            )}
            <div className="pt-6">
              <SuggestionsProducts products={suggestionsProducts} />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const ShoppingCartIconWithBadge = ({
  productsCount,
}: {
  productsCount: number;
}) => {
  return (
    <div className="relative p-2">
      <ShoppingCartIcon className="w-8 h-8 stroke-3" />
      {productsCount > 0 && (
        <span className="bg-primary text-primary-foreground text-xs w-5 h-5 inline-flex justify-center items-center rounded-full absolute -top-2.5 -right-2.5">
          {productsCount}
        </span>
      )}
    </div>
  );
};
