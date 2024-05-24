import { Separator } from "../ui/separator";
import { useState } from "react";
import { MyOrderCard } from "./Cards/MyOrderCard";

const orderItems = Array.from({ length: 9 }).map((_, index) => ({
  code: index.toString(),
  status: index%2===0 ? "Recived" : index%3===0 ? "Ready for pickup" : index%5===0 ? "Shipped" : index%7===0 ? "Cancelled" : "Ordered",
  cost: Math.floor(Math.random() * 200 + 1),
  count: Math.floor(Math.random() * 20 + 1),
  date: "24.05.2024",
}));

export const MyOrders = () => {
  
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl">My orders</h1>
      <Separator />
      <div className="w-full py-6">
        {orderItems.map((order, index) => (
          <MyOrderCard key={index} code={order.code} status={order.status} cost={order.cost} count={order.count} dateOfArrived={order.date} />
        ))}
      </div>
    </div>
  );
};