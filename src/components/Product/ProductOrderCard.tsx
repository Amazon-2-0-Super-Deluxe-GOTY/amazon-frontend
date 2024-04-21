import {
  ChevronRightIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaQueryCSS } from "../MediaQuery";
import ClientOnlyPortal from "../ClientOnlyPortal";
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
import { SheetHeader } from "../ProductPage/SteetParts";
import { ScrollArea } from "../ui/scroll-area";

const infoElements = [
  {
    title: "Delivery",
    render: () => <DeliveryContent />,
  },
  {
    title: "Payment methods",
    render: () => <PaymentContent />,
  },
  {
    title: "Security",
    render: () => <SecurityContent />,
  },
  {
    title: "Returns",
    render: () => <ReturnsContent />,
  },
];

export const ProductOrderCard = ({
  isOptionsSelected,
}: {
  isOptionsSelected: boolean;
}) => {
  const [count, setCount] = useState(1);
  const [openedTabIndex, setOpenedTabIndex] = useState<number>();

  const isOpen = openedTabIndex !== undefined;

  const openTab = (index: number) => setOpenedTabIndex(index);
  const closeTab = () => setOpenedTabIndex(undefined);

  const onOpenChange = (value: boolean) => {
    if (!value) {
      closeTab();
    }
  };

  const increment = () => setCount((c) => c + 1);
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

  return (
    <Card className="bg-gray-200">
      <CardHeader className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold">
              $24<sup>99</sup>
            </span>
            <sub className="ml-2 line-through text-gray-400 text-lg">
              $39.99
            </sub>
          </div>
          <MediaQueryCSS maxSize="lg">
            <span>In stock</span>
          </MediaQueryCSS>
        </div>
        <MediaQueryCSS minSize="lg">
          <hr className="border-black mb-3" />
          <ul className="space-y-1">
            <li className="flex justify-between text-base">
              <span>Status</span>
              <span>In stock</span>
            </li>
            <InfoLabelsList openTab={openTab} />
          </ul>
        </MediaQueryCSS>
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
      <CardContent className="grid grid-cols-2 lg:grid-cols-1 gap-2 pb-3">
        <Button disabled={!isOptionsSelected}>Add to cart</Button>
        <Button disabled={!isOptionsSelected}>Buy now</Button>
        <Button variant={"outline"} className="col-span-2 lg:col-span-1">
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
        isOptionsSelected={isOptionsSelected}
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
              <ScrollArea>{infoElements[openedTabIndex].render()}</ScrollArea>
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
  isOptionsSelected,
}: {
  count: number;
  increment: () => void;
  decrement: () => void;
  isOptionsSelected: boolean;
}) => {
  return (
    <ClientOnlyPortal selector="body">
      <MediaQueryCSS maxSize="md">
        <Card className="bg-gray-200 fixed bottom-0 left-0 right-0 rounded-t-md z-10">
          <CardHeader className="space-y-3 p-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-3xl font-bold">
                  $24<sup>99</sup>
                </span>
                <sub className="ml-2 line-through text-gray-400 text-lg">
                  $39.99
                </sub>
              </div>
              <div className="flex items-center gap-2">
                <button>
                  <HeartIcon />
                </button>
                <Button variant={"outline"} disabled={!isOptionsSelected}>
                  To cart
                </Button>
                <Button disabled={!isOptionsSelected}>Buy</Button>
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
