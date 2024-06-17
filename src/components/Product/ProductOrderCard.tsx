import { ChevronRightIcon, HeartIcon, MinusIcon, PlusIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaQueryCSS } from "../Shared/MediaQuery";
import ClientOnlyPortal from "../Shared/ClientOnlyPortal";
import { Sheet, SheetContent } from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { DeliveryContent } from "./OrderInfoContent/DeliveryContent";
import { PaymentContent } from "./OrderInfoContent/PaymentContent";
import { SecurityContent } from "./OrderInfoContent/SecurityContent";
import { ReturnsContent } from "./OrderInfoContent/ReturnsContent";
import { SheetHeader } from "../Shared/SteetParts";
import { ScrollArea } from "../ui/scroll-area";
import { useStorageCart } from "@/lib/storage";
import type { Product } from "@/api/products";
import { splitPrice } from "@/lib/products";

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
  const { addToCart, buyNow } = useStorageCart();
  const onAddToCartClick = () => {
    const newCartItem = {
      id: product.id,
      title: "Product_" + product.id,
      price: product.price,
      quantity: count,
    };
    addToCart(newCartItem);
  };
  const onBuyNowClick = () => {
    const newCartItem = {
      id: product.id,
      title: "Product_" + product.id,
      price: product.price,
      quantity: count,
    };
    buyNow(newCartItem);
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
              <sub className="ml-2 line-through text-gray-400 text-lg">
                ${product.price}
              </sub>
            )}
          </div>
          <MediaQueryCSS maxSize="lg">
            <span>{isInStock ? "In stock" : "Out of stock"}</span>
          </MediaQueryCSS>
        </div>
        <MediaQueryCSS minSize="lg">
          <hr className="border-black mb-3" />
          <ul className="space-y-1">
            <li className="flex justify-between text-base">
              <span>Status</span>
              <span>{isInStock ? "In stock" : "Out of stock"}</span>
            </li>
            <InfoLabelsList openTab={openTab} />
          </ul>
        </MediaQueryCSS>
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
        <Button onClick={onAddToCartClick} disabled={!isInStock}>
          Add to cart
        </Button>
        <Button
          onClick={onBuyNowClick}
          variant={"secondary"}
          disabled={!isInStock}
        >
          Buy now
        </Button>
        <Button variant={"tertiary"} className="col-span-2 lg:col-span-1">
          Add to wish list
        </Button>
      </CardContent>
      <MediaQueryCSS maxSize="lg">
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
      </MediaQueryCSS>

      <MobileQuickActions
        count={count}
        increment={increment}
        decrement={decrement}
        price={product.discountPercent ? product.discountPrice : product.price}
        onAddToCard={onAddToCartClick}
        onBuyNow={onBuyNowClick}
      />

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
              <ScrollArea className="grow">
                {infoElements[openedTabIndex].render()}
              </ScrollArea>
            </>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  );
};

const MobileQuickActions = ({
  count,
  increment,
  decrement,
  price,
  onAddToCard,
  onBuyNow,
}: {
  count: number;
  increment: () => void;
  decrement: () => void;
  price: number;
  onAddToCard: () => void;
  onBuyNow: () => void;
}) => {
  const { whole, fraction } = splitPrice(price);

  return (
    <ClientOnlyPortal selector="body">
      <MediaQueryCSS maxSize="md">
        <Card className="bg-card fixed bottom-0 left-0 right-0 rounded-t-md z-10">
          <CardHeader className="space-y-3 p-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold">
                  ${whole}
                  <sup>{fraction}</sup>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button>
                  <HeartIcon />
                </button>
                <Button variant={"secondary"} onClick={onAddToCard}>
                  To cart
                </Button>
                <Button onClick={onBuyNow}>Buy</Button>
              </div>
            </div>
            <hr className="border-black" />
            <div className="flex justify-between items-center py-1">
              <span className="text-base">Quantity</span>
              <div className="flex items-center gap-4">
                <MinusIcon className="w-4 cursor-pointer" onClick={decrement} />
                <span className="text-sm select-none">{count}</span>
                <PlusIcon className="w-4 cursor-pointer" onClick={increment} />
              </div>
            </div>
          </CardHeader>
        </Card>
      </MediaQueryCSS>
    </ClientOnlyPortal>
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
