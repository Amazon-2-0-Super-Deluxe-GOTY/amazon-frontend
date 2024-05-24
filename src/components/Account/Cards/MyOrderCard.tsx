"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, StarIcon } from "lucide-react";
import placeholder from "@/../public/Icons/placeholder.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

  return (
    <Card className="w-full border-0 relative shadow-none even:bg-gray-100 before:ring-1 before:ring-gray-300 before:ring-inset before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:absolute before:inset-0 before:rounded-[inherit]">
      <CardContent className="w-full p-0">
        <div className="flex w-full justify-between items-center py-5 px-4">
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="flex justify-start items-center gap-4">
              <span className="text-xl">Order #{code}</span>
              <span className={cn(status === "Recived" && "text-green-500",
                                  status === "Ready for pickup" && "text-blue-600", 
                                  status === "Shipped" && "text-cyan-500", 
                                  status === "Ordered" && "text-gray-300", 
                                  status === "Cancelled" && "text-red-500", 
                                  "font-medium text-base")} >{status}</span>
            </div>
            <span className="text-base text-gray-400 font-medium">Arrived on {dateOfArrived}</span>
          </div>
          <div className="flex flex-col justify-center items-end gap-2">
            <span className="text-base text-gray-600">Ordered {count} {count === 1 ? "item" : "items"}</span>
            <div className="flex justify-center items-center gap-6">
              <div>
                <span className="text-2xl font-medium">${whole}</span>
                <sup className="text-sm font-medium">{fraction}</sup>
              </div>
              <Button variant={"outline"} className="text-sm" >Details</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
