import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { OrderDetailsProductCard } from "../Cards/OrderDetailsProductCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useScreenSize } from "@/lib/media";
import { buttonVariants } from "@/components/ui/button";
import { InfoIcon, XIcon } from "@/components/Shared/Icons";
import { formatOrderDate } from "@/lib/date";

export const OrderDetailsModal = ({
  code,
  status,
  products,
  totalPrice,
  additionalInfo,
  createdAt,
}: {
  code: string;
  status: string;
  products: {
    imageUrl: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  createdAt: string;
  totalPrice: number;
  additionalInfo: {
    name: string;
    adress: string;
    paymentType: string;
  };
}) => {
  const isDesktop = useScreenSize({ minSize: "md" });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };

  const priceParts = totalPrice.toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger
          className={cn(
            buttonVariants({
              variant: "secondary",
              size: "default",
              className: "h-10 px-4 py-2 font-semibold",
            })
          )}
        >
          Details
        </DialogTrigger>
        <DialogContent
          hideClose
          className="max-w-7xl max-h-[750px] w-full p-6 pr-3 flex flex-col gap-4 bg-card"
        >
          <div className="pr-3">
            <DialogTitle>
              <div className="flex justify-between items-center pb-6">
                <div className="flex justify-center items-center gap-4 text-2xl">
                  <span>Order #{code}</span>
                  <span
                    className={cn(
                      status === "Recived" && "text-green-500",
                      status === "Ready for pickup" && "text-blue-600",
                      status === "Shipped" && "text-cyan-500",
                      status === "Ordered" && "text-halftone",
                      status === "Canceled" && "text-red-500",
                      "font-medium text-base"
                    )}
                  >
                    {status}
                  </span>
                </div>
                <DrawerClose className="flex justify-center items-center">
                  <XIcon className="w-6 h-6 stroke-3" />
                </DrawerClose>
              </div>
            </DialogTitle>
            <Separator />
          </div>
          <ScrollArea>
            <div className="flex flex-col justify-between gap-6 max-h-[560px]">
              <div className="flex justify-center items-center w-full">
                <div className="w-full h-full">
                  <div className="mb-4">
                    <div>
                      {products.map((item, i) => {
                        return (
                          <OrderDetailsProductCard
                            key={i}
                            imageUrl={item.imageUrl}
                            name={item.name}
                            quantity={item.quantity}
                            price={item.price}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between py-6">
                    <Popover>
                      <PopoverTrigger className="group">
                        <span
                          className={cn(
                            buttonVariants({ variant: "secondary" }),
                            "text-xl"
                          )}
                        >
                          How to cancel order?
                        </span>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="max-w-sm w-full">
                        <div className="space-y-2 text-sm">
                          <p className="font-semibold">How to cancel order?</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <div className="flex justify-center items-center gap-4">
                      <span className="text-2xl font-medium">Total:</span>
                      <p className="text-4xl font-semibold">
                        <span>${whole}</span>
                        <sup>{fraction}</sup>
                      </p>
                    </div>
                  </div>
                  <Separator />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-full gap-3 px-6 py-3 rounded">
                <span className="text-xl font-semibold">
                  Additional information
                </span>
                <div className="w-full h-full">
                  <p className="w-full flex justify-between items-center py-2 text-lg">
                    <span>Recipient&apos;s name</span>
                    <span>{additionalInfo.name}</span>
                  </p>
                  <p className="w-full flex justify-between items-center py-2 text-lg">
                    <span>Address</span>
                    <span>{additionalInfo.adress}</span>
                  </p>
                  <p className="w-full flex justify-between items-center py-2 text-lg">
                    <span>Payment type</span>
                    <span className="capitalize">
                      {additionalInfo.paymentType}
                    </span>
                  </p>
                  <p className="w-full flex justify-between items-center py-2 text-lg">
                    <span>Ordered on</span>
                    <span>{formatOrderDate(new Date(createdAt))}</span>
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger
        className={cn(
          buttonVariants({
            variant: "secondary",
            size: "default",
            className: "h-10 px-4 py-2 font-semibold",
          })
        )}
      >
        Details
      </DrawerTrigger>
      <DrawerContent className="max-h-[750px] w-full p-4 pr-1 flex flex-col gap-3 bg-card">
        <div className="pr-3">
          <DrawerTitle>
            <div className="flex justify-between items-center pb-6">
              <div className="flex justify-center items-center gap-4 text-xl">
                <span>Order #{code}</span>
                <span
                  className={cn(
                    status === "Recived" && "text-green-500",
                    status === "Ready for pickup" && "text-blue-600",
                    status === "Shipped" && "text-cyan-500",
                    status === "Ordered" && "text-halftone",
                    status === "Canceled" && "text-red-500",
                    "font-medium text-sm"
                  )}
                >
                  {status}
                </span>
              </div>
              <DrawerClose className="flex justify-center items-center">
                <XIcon className="w-4 h-4 stroke-3" />
              </DrawerClose>
            </div>
          </DrawerTitle>
          <Separator />
        </div>
        <ScrollArea>
          <div className="flex flex-col justify-between gap-6 max-h-[560px]">
            <div className="flex justify-center items-center w-full">
              <div className="w-full h-full">
                <div className="mt-2 mb-4">
                  <div>
                    {products.map((item, i) => {
                      return (
                        <OrderDetailsProductCard
                          key={i}
                          imageUrl={item.imageUrl}
                          name={item.name}
                          quantity={item.quantity}
                          price={item.price}
                        />
                      );
                    })}
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center py-6">
                  <Popover>
                    <PopoverTrigger className="group">
                      <InfoIcon className="w-6 h-6 group-data-[state=closed]:stroke-halftone" />
                    </PopoverTrigger>
                    <PopoverContent align="start" className="max-w-sm w-full">
                      <div className="space-y-2 text-sm">
                        <p className="font-semibold">How to cancel order?</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <div className="flex justify-center items-center gap-4 text-3xl font-semibold">
                    <span>Total:</span>
                    <p>
                      <span>$ {whole}</span>
                      <sup>{fraction}</sup>
                    </p>
                  </div>
                </div>
                <Separator />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full gap-3 p-3 rounded">
              <span className="text-base font-semibold">
                Additional information
              </span>
              <div className="w-full h-full">
                <div className="w-full flex justify-between items-start gap-3 py-2">
                  <span className="text-base font-medium">
                    Recipient&apos;s name
                  </span>
                  <span className="text-base text-right">
                    {additionalInfo.name}
                  </span>
                </div>
                <div className="w-full flex justify-between items-start gap-3 py-2">
                  <span className="text-base font-medium">Address</span>
                  <span className="text-base text-right max-w-40">
                    {additionalInfo.adress}
                  </span>
                </div>
                <div className="w-full flex justify-between items-start gap-3 py-2">
                  <span className="text-base font-medium">Payment type</span>
                  <span className="text-base text-right capitalize">
                    {additionalInfo.paymentType}
                  </span>
                </div>
                <div className="w-full flex justify-between items-start gap-3 py-2">
                  <span className="text-base font-medium">Ordered on</span>
                  <span className="text-base text-right">
                    {formatOrderDate(new Date(createdAt))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
