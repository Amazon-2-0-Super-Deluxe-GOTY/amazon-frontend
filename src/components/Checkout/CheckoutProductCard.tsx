"use client";
import { Card, CardContent } from "@/components/ui/card";
import { splitPrice } from "@/lib/products";

export const CheckoutProductCard = ({
  name,
  quantity,
  price,
}: {
  name: string;
  quantity: number;
  price: number;
}) => {
  const priceParts = splitPrice(price * quantity);

  return (
    <Card className="w-full border-0 relative shadow-none before:ring-1 before:ring-halftone before:ring-inset before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:absolute before:inset-0 before:rounded-[inherit]">
      <CardContent className="w-full p-0">
        <div className="w-full flex p-4">
          <div className="w-full flex justify-between items-center gap-4">
            <div className="w-full flex justify-start items-start">
              <p className="text-sm md:text-base line-clamp-2">{name}</p>
            </div>
            <div className="w-full">
              <div>
                <div className="flex justify-end items-center gap-2">
                  <span className="text-xs md:text-sm font-medium">
                    {quantity}
                  </span>
                  <span className="text-xs md:text-sm font-medium">x</span>
                  <span className="text-xs md:text-sm font-medium">
                    ${price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-end items-center">
                  <div>
                    <span className="text-base md:text-xl font-medium text-black">
                      ${priceParts.whole}
                    </span>
                    <sup className="text-[10px] md:text-xs font-medium text-black">
                      {priceParts.fraction}
                    </sup>
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
