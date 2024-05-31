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
    <Card className="w-full even:bg-gray-100 border-0 relative shadow-none before:ring-1 before:ring-gray-300 before:ring-inset before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:absolute before:inset-0 before:rounded-[inherit]">
      <CardContent className="w-full p-0">
      <div className="w-full flex p-6" >
        <div className="w-[100px] h-full bg-gray-300" >
          <Image src={placeholder} alt="Placeholder" className="object-cover" />
        </div>
        <div className="w-full pl-6 flex justify-between" >
          <div className="w-full max-w-3xl flex justify-start items-start mr-24">
            <span className="w-full flex text-xl">{name}</span>
          </div>
          <div className="absolute right-6 bottom-6">
            <div>
              <div className="flex justify-end items-center gap-3" >
                <span className="text-base font-medium">{quantity}</span>
                <span className="text-base font-medium">x</span>
                <span className="text-base font-medium">${price}</span>
              </div>
              <div className="flex justify-end items-center" >
                <div className="flex">
                  <div>
                    <span className="text-3xl font-medium text-black" >${whole}</span>
                    <sup className="text-lg font-medium text-black" >{fraction}</sup>
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
