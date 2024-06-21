"use client";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { OrderDetailsModal } from "../Popups/OrdersModals";
import { OrderDetails } from "@/api/orders";

export const MyOrderCard = ({ order }: { order: OrderDetails }) => {
  const priceParts = order.totalPrice.toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];

  const products = order.orderItems;
  const deliveryAddress = order.deliveryAddresses[0];
  const additionalInfo = {
    name: order.customerName,
    adress: [
      deliveryAddress.country,
      deliveryAddress.state,
      deliveryAddress.city,
      deliveryAddress.postIndex,
    ]
      .filter((i) => !!i)
      .join(", "),
    paymentType: order.paymentMethod,
  };

  const count = order.orderItems.reduce<number>((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <Card className="w-full bg-background even:bg-card border-0 relative shadow-none ring-1 ring-transparent ring-inset hover:ring-halftone transition-all">
      <CardContent className="w-full px-4 py-4.5 flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-base md:text-xl">
              Order #{order.orderNumber}
            </span>
            <span
              className={cn(
                order.status === "Recived" && "text-green-500",
                order.status === "Ready for pickup" && "text-blue-600",
                order.status === "Shipped" && "text-cyan-500",
                order.status === "Ordered" && "text-halftone",
                order.status === "Canceled" && "text-red-500",
                "font-medium text-xs md:text-base"
              )}
            >
              {order.status}
            </span>
          </div>
          <span className="text-sm md:text-base text-halftone">
            Ordered {count} {count === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="w-full flex justify-end items-center">
          <div className="flex items-center gap-6">
            <p>
              <span className="text-[18px] md:text-2xl font-medium">
                ${whole}
              </span>
              <sup className="text-[10px] md:text-sm font-medium">
                {fraction}
              </sup>
            </p>
            <OrderDetailsModal
              code={order.orderNumber}
              status={order.status}
              products={products}
              totalPrice={order.totalPrice}
              additionalInfo={additionalInfo}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
