"use client"
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { OrderDetailsModal } from "../Popups/OrdersModals";

export const MyOrderCard = ({
  code,
  status,
  cost,
  count,
  dateOfArrived,
}: {
  code: string;
  status: string;
  cost: number;
  count: number;
  dateOfArrived: string;
}) => {
  const priceParts = cost.toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];

  const products = Array.from({ length: count }).map((_, index) => ({
    name: "PUMIEY Women's Long Sleeve T-Shirts Crew Neck Slim Fit Tops Sexy Basic Tee Smoke Cloud Pro Collection, Color: Blue, Size: S",
    quantity: Math.floor(Math.random() * 20 + 1),
    price: Math.floor(Math.random() * 200 + 1),
  }));
  const additionalInfo = { name: "Qwerty Aswdesh", adress: "Canada, Ontario, Something Street, 1919", paymentType: "Cash", dateDelivered: dateOfArrived };

  return (
    <Card className="w-full bg-background even:bg-card border-0 relative shadow-none before:ring-1 before:ring-gray-300 before:ring-inset before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:absolute before:inset-0 before:rounded-[inherit]">
      <CardContent className="w-full p-0">
        <div className="flex max-lg:flex-col w-full lg:justify-between lg:items-center py-5 px-4 max-lg:gap-4">
          <div className="flex flex-col justify-center items-start gap-1 lg:gap-2">
            <div className="flex justify-start items-center gap-4">
              <span className="text-base md:text-xl">Order #{code}</span>
              <span className={cn(status === "Recived" && "text-green-500",
                                  status === "Ready for pickup" && "text-blue-600", 
                                  status === "Shipped" && "text-cyan-500", 
                                  status === "Ordered" && "text-gray-300", 
                                  status === "Cancelled" && "text-red-500", 
                                  "font-medium text-xs md:text-base")} >{status}</span>
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
              <OrderDetailsModal code={code} status={status} products={products} additionalInfo={additionalInfo} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
