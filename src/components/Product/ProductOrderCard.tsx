import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaQueryCSS } from "../Shared/MediaQuery";
import { Sheet, SheetContent } from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { PaymentContent } from "./OrderInfoContent/PaymentContent";
import { SecurityContent } from "./OrderInfoContent/SecurityContent";
import { SheetHeader } from "../Shared/SteetParts";
import { ScrollArea } from "../ui/scroll-area";
import { useStorageCart } from "@/lib/storage";
import { ProductShort, useCart, type Product } from "@/api/products";
import { splitPrice } from "@/lib/products";
import { ChevronRightIcon, MinusIcon, PlusIcon } from "../Shared/Icons";
import { useWishlist } from "@/api/wishlist";

const infoElements = [
  {
    title: "Payment methods",
    render: () => <PaymentContent />,
  },
  {
    title: "Security",
    render: () => <SecurityContent />,
  },
];

export const ProductOrderCard = ({ product }: { product: Product }) => {
  const [count, setCount] = useState(1);
  const [openedTabIndex, setOpenedTabIndex] = useState<number>();
  const displayedPrice = product.discountPercent
    ? product.discountPrice
    : product.price;
  const { whole, fraction } = splitPrice(displayedPrice);

  const isInStock = product.quantity > 0;

  const isOpen = openedTabIndex !== undefined;

  const openTab = (index: number) => setOpenedTabIndex(index);
  const closeTab = () => setOpenedTabIndex(undefined);

  const onOpenChange = (value: boolean) => {
    if (!value) {
      closeTab();
    }
  };

  const increment = () =>
    setCount((c) => (c < product.quantity ? c + 1 : product.quantity));
  const decrement = () => setCount((c) => (c > 1 ? c - 1 : 1));

  const hasPrev = useMemo(() => {
    return openedTabIndex === undefined ? false : openedTabIndex > 0;
  }, [openedTabIndex]);
  const hasNext = useMemo(() => {
    return openedTabIndex === undefined
      ? false
      : openedTabIndex + 1 < infoElements.length;
  }, [openedTabIndex]);

  const toPrev = () => {
    if (hasPrev && openedTabIndex !== undefined) {
      setOpenedTabIndex(openedTabIndex - 1);
    }
  };
  const toNext = () => {
    if (hasNext && openedTabIndex !== undefined) {
      setOpenedTabIndex(openedTabIndex + 1);
    }
  };

  //#region AddProductToCart
  const { openModal } = useStorageCart();
  const { addToCart, cart } = useCart();

  const canAddToCart = useMemo(() => {
    if (!cart.data) return true;

    const existingCartItem = cart.data.cartItems.find(
      (i) => i.product.id === product.id
    );
    return existingCartItem
      ? count < existingCartItem.product.quantity - existingCartItem.quantity
      : true;
  }, [cart.data, count, product.id]);

  const onAddToCartClick = () => {
    if (!canAddToCart) return;
    addToCart.mutateAsync({ productId: product.id, quantity: count });
  };
  const onBuyNowClick = () => {
    if (!canAddToCart) return;
    addToCart
      .mutateAsync({ productId: product.id, quantity: count })
      .then(openModal);
  };
  //#endregion

  //#region AddProductToWishlist
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

  const canAddToWishlist = useMemo(() => {
    if (!wishlist.data) return true;

    const isInWishlistItem = wishlist.data.find(
      (i: ProductShort) => i.id === product.id
    );
    return isInWishlistItem ? false : true;
  }, [wishlist.data, product.id]);

  const onAddToWishlist = () => {
    if (!canAddToWishlist)
      removeFromWishlist.mutateAsync({ productIds: [product.id] });
    else addToWishlist.mutateAsync({ productId: product.id });
  };
  //#endregion

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold">
              ${whole}
              <sup>{fraction}</sup>
            </span>
            {product.discountPercent && (
              <sub className="ml-2 line-through text-halftone text-lg">
                ${product.price}
              </sub>
            )}
          </div>
          <MediaQueryCSS maxSize="lg">
            {isInStock ? (
              <span className="text-secondary">In stock</span>
            ) : (
              <span className="text-destructive">Out of stock</span>
            )}
          </MediaQueryCSS>
        </div>
        <div>
          <hr className="border-black mb-3" />
          <ul className="space-y-1">
            <MediaQueryCSS minSize="lg">
              <li className="flex justify-between text-base">
                <span>Status</span>
                {isInStock ? (
                  <span className="text-secondary">In stock</span>
                ) : (
                  <span className="text-destructive">Out of stock</span>
                )}
              </li>
            </MediaQueryCSS>
            <InfoLabelsList openTab={openTab} />
          </ul>
        </div>
        <hr className="border-black" />
        <div className="flex justify-between items-center py-1">
          <span className="text-base">Quantity</span>
          <div className="flex items-center gap-4">
            <button onClick={decrement}>
              <MinusIcon className="w-4" />
            </button>
            <span className="text-sm">{count}</span>
            <button onClick={increment}>
              <PlusIcon className="w-4" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 lg:grid-cols-1 gap-2 pb-3">
        <Button
          onClick={onAddToCartClick}
          disabled={!isInStock || !canAddToCart}
        >
          Add to cart
        </Button>
        <Button
          onClick={onBuyNowClick}
          variant={"secondary"}
          disabled={!isInStock || !canAddToCart}
        >
          Buy now
        </Button>
        <Button
          variant={"tertiary"}
          className="col-span-2 lg:col-span-1"
          onClick={onAddToWishlist}
        >
          {canAddToWishlist ? "Add to wish list" : "Remove from wish list"}
        </Button>
      </CardContent>
      {/* <MediaQueryCSS maxSize="lg">
        <CardFooter className="justify-center gap-2 ">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="flex justify-center items-center gap-1">
                Details
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <InfoLabelsList openTab={openTab} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      </MediaQueryCSS> */}

      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent
          hideClose
          className="sm:max-w-full w-screen lg:w-[40vw] flex flex-col"
        >
          {isOpen && (
            <>
              <SheetHeader
                title={infoElements[openedTabIndex].title}
                pageControls={{
                  hasPrev,
                  hasNext,
                  onPrev: toPrev,
                  onNext: toNext,
                }}
              />
              <ScrollArea className="grow" viewportClassName="p-0">
                {infoElements[openedTabIndex].render()}
              </ScrollArea>
            </>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  );
};

const InfoLabelsList = ({ openTab }: { openTab: (index: number) => void }) => {
  return infoElements.map((elem, i) => (
    <li
      key={i}
      className="w-full flex justify-between items-center py-1 cursor-pointer"
      onClick={() => openTab(i)}
    >
      <span className="text-base">{elem.title}</span>
      <ChevronRightIcon className="w-4 h-4" />
    </li>
  ));
};
