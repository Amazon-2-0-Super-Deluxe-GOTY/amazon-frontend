"use client";
import { Separator } from "../ui/separator";
import { OrderCardSkeleton } from "./Cards/AccountSkeleton";
import { MyOrderCard } from "./Cards/MyOrderCard";
import { useOrders } from "@/api/orders";

export const MyOrders = () => {
  const { orders } = useOrders();
  if (!orders) return null;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl md:text-3xl font-semibold">My orders</h1>
      <Separator />
      {orders.isLoading ? (
        <div className="w-full flex flex-col gap-2">
          {Array.from({ length: 6 }, (_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
      ) : orders.data?.length! > 0 ? (
        <div className="w-full md:py-6">
          {orders.data?.map((order, index) => (
            <MyOrderCard key={index} order={order} />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <span className="text-lg md:text-xl text-center">No orders.</span>
        </div>
      )}
    </div>
  );
};
