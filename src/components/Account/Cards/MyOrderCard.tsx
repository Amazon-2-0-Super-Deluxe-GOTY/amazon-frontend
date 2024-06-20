"use client"
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { OrderDetailsModal } from "../Popups/OrdersModals";
import { OrderDetails } from "@/api/orders";

export const MyOrderCard = ({
  order,
  dateOfArrived,
}: {
  order: OrderDetails;
  dateOfArrived: string;
}) => {
  const priceParts = order.totalPrice.toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];

  const products = order.orderItems;
  const additionalInfo = { name: order.customerName, adress: order.deliveryAddresses[0].country + ", " + order.deliveryAddresses[0].state + ", " + (order.deliveryAddresses[0].city ? order.deliveryAddresses[0].city + ", " + order.deliveryAddresses[0].postIndex : order.deliveryAddresses[0].postIndex ), paymentType: order.paymentMethod, dateDelivered: dateOfArrived };

  const count = order.orderItems.reduce<number>((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <Card className="w-full bg-background even:bg-card border-0 relative shadow-none before:ring-1 before:ring-gray-300 before:ring-inset before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:absolute before:inset-0 before:rounded-[inherit]">
      <CardContent className="w-full p-0">
        <div className="flex max-lg:flex-col w-full lg:justify-between lg:items-center py-5 px-4 max-lg:gap-4">
          <div className="flex flex-col justify-center items-start gap-1 lg:gap-2">
            <div className="flex justify-start items-center gap-4">
              <span className="text-base md:text-xl">Order #{order.orderNumber}</span>
              <span className={cn(order.status === "Recived" && "text-green-500",
                                  order.status === "Ready for pickup" && "text-blue-600", 
                                  order.status === "Shipped" && "text-cyan-500", 
                                  order.status === "Ordered" && "text-gray-300", 
                                  order.status === "Canceled" && "text-red-500", 
                                  "font-medium text-xs md:text-base")} >{order.status}</span>
            </div>
            <span className="text-sm md:text-base text-gray-400 font-medium">Arrived on {dateOfArrived}</span>
          </div>
          <div className="lg:absolute lg:right-4 flex flex-col justify-start items-end gap-[6px] lg:gap-2 max-lg:h-[66px]">
            <span className="text-sm md:text-base text-gray-600">Ordered {count} {count === 1 ? "item" : "items"}</span>
            <div className="max-lg:absolute max-lg:bottom-5 flex justify-center items-center gap-4 lg:gap-6">
              <div>
                <span className="text-[18px] md:text-2xl font-medium">${whole}</span>
                <sup className="text-[10px] md:text-sm font-medium">{fraction}</sup>
              </div>
              <OrderDetailsModal code={order.orderNumber} status={order.status} products={products} totalPrice={order.totalPrice} additionalInfo={additionalInfo} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
