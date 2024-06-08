"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import placeholder from "@/../public/Icons/placeholder2.svg";
import discountShape from "@/../public/Icons/discount-shape.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import { CustomerReviewsIcon, StarEmptyIcon } from "../Shared/Icons";

export const ProductCard = ({
  title,
  price,
  quantity,
}: {
  title: string;
  price: number;
  quantity?: number;
}) => {
  const priceParts = price.toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];
  const isOutOfStock = quantity === 0;

  return (
    <Card className="max-w-sm w-full rounded-lg border-hover-card">
      <CardHeader className="p-3 lg:p-4 pb-0">
        <div className="relative aspect-square">
          <Image
            src={placeholder}
            fill
            alt="Placeholder"
            className="object-cover rounded-sm"
          />
          {/* <div className="absolute top-1.5 right-1.5 w-16 h-10 lg:w-18 lg:h-12"> */}
          <div className="absolute top-1.5 right-1.5">
            <Image src={discountShape} alt="Discount" className="" />
            <span className="absolute left-3 top-1 lg:top-2 font-bold text-sm lg:text-sm">
              -24%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 lg:p-4 pt-1.5 lg:pt-3">
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm lg:text-lg line-clamp-2">{title}</p>
          <div className="flex gap-3.5 items-center">
            <div className="flex items-center gap-1.5">
              <StarEmptyIcon className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="text-xs lg:text-sm font-medium">4.7</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CustomerReviewsIcon className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="text-xs lg:text-sm font-medium">228</span>
            </div>
          </div>
          <div className="text-base lg:text-xl font-medium mt-3">
            <span>${whole}</span>
            <sup>{fraction}</sup>
            <sub className="ml-2 line-through text-gray-400">$39.99</sub>
          </div>
        </div>
      </CardContent>
      {/* {isOutOfStock && (
        <div className="absolute inset-0 bg-gray-200/50">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center max-w-[230px] w-full">
            <span className="xl:text-xl text-base">Out of Stock</span>
            <Button className="mt-4 text-wrap xl:text-sm text-xs">
              Notify when available
            </Button>
          </div>
        </div>
      )} */}
    </Card>
  );
};
