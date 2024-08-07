"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export const OrderDetailsProductCard = ({
  imageUrl,
  name,
  quantity,
  price,
}: {
  imageUrl: string;
  name: string;
  quantity: number;
  price: number;
}) => {
  const priceParts = (price * quantity).toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];

  return (
    <Card className="w-full border-0 relative shadow-none before:ring-1 before:ring-halftone before:ring-inset before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:absolute before:inset-0 before:rounded-[inherit]">
      <CardContent className="w-full p-0">
        <div className="w-full flex md:p-6 p-3">
          <Image
            src={imageUrl}
            width={100}
            height={100}
            alt={name}
            className="object-cover aspect-square rounded-sm"
          />
          <div className="w-full pl-3 md:pl-6 flex justify-between">
            <div className="w-full max-w-3xl flex justify-start items-start mr-14 md:mr-24">
              <p className="text-sm md:text-xl line-clamp-2">{name}</p>
            </div>
            <div className="absolute right-3 bottom-3 md:right-6 md:bottom-6">
              <div>
                <p className="flex justify-end items-center gap-2 text-halftone text-xs md:text-base font-medium">
                  <span>{quantity}</span>
                  <span>x</span>
                  <span>${price.toFixed(2)}</span>
                </p>
                <div className="flex justify-end items-center">
                  <div className="flex">
                    <div>
                      <span className="text-base md:text-2xl font-medium text-foreground">
                        ${whole}
                      </span>
                      <sup className="text-xs md:text-lg font-medium text-foreground">
                        {fraction}
                      </sup>
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
