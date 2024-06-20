"use client"
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import placeholder from "@/../public/Icons/placeholder.svg";

export const OrderDetailsProductCard = ({
  name,
  quantity,
  price,
}: {
  name:string;
  quantity:number;
  price:number;
}) => {
  const priceParts = (price*quantity).toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];

  return (
    <Card className="w-full bg-background even:bg-card border-0 relative shadow-none before:ring-1 before:ring-gray-300 before:ring-inset before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:absolute before:inset-0 before:rounded-[inherit]">
      <CardContent className="w-full p-0">
      <div className="w-full flex md:p-6 p-3">
        <div className="w-[100px] h-full bg-gray-300">
          <Image src={placeholder} alt="Placeholder" className="object-cover" />
        </div>
        <div className="w-full pl-3 md:pl-6 flex justify-between" >
          <div className="w-full max-w-3xl flex justify-start items-start mr-14 md:mr-24">
            <p className="text-sm md:text-xl line-clamp-2">{name}</p>
          </div>
          <div className="absolute right-3 bottom-3 md:right-6 md:bottom-6">
            <div>
              <div className="flex justify-end items-center gap-3" >
                <span className="text-xs md:text-base font-medium">{quantity}</span>
                <span className="text-xs md:text-base font-medium">x</span>
                <span className="text-xs md:text-base font-medium">${price}</span>
              </div>
              <div className="flex justify-end items-center" >
                <div className="flex">
                  <div>
                    <span className="text-base md:text-3xl font-medium text-black" >${whole}</span>
                    <sup className="text-xs md:text-lg font-medium text-black" >{fraction}</sup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </CardContent>
    </Card>
  );
};
