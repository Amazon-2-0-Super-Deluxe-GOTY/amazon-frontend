"use client";
import { Separator } from "../ui/separator";
import { MyOrderCard } from "./Cards/MyOrderCard";
import { useOrders } from "@/api/orders";

export const MyOrders = () => {
  const orders = useOrders().orders.data;
  if(!orders) return null;
  const dateOfArrived = "14.07.2024";
  
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl md:text-3xl">My orders</h1>
      <Separator />
      <div className="w-full md:py-6">
        {orders?.map((order, index) => (
          <MyOrderCard key={index} order={order} dateOfArrived={dateOfArrived} />
        ))}
      </div>
    </div>
  );
};