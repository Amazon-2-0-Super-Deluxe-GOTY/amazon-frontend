"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import placeholder from "@/../public/Icons/placeholder2.svg";
import discountShape from "@/../public/Icons/discount-shape.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  CustomerReviewsIcon,
  StarEmptyIcon,
  StarFullIcon,
} from "../Shared/Icons";

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
    <Card className="max-w-sm w-full rounded-lg border-hover-card relative @container">
      <CardHeader className="p-3 @md-card:p-4 pb-0">
        <div className="relative aspect-square">
          <Image
            src={placeholder}
            fill
            alt="Placeholder"
            className="object-cover rounded-sm"
          />
          <div className="absolute top-1.5 right-1.5 w-12 h-8 @md-card:w-16 @md-card:h-10 @lg-card:w-24 @lg-card:h-16">
            <Image
              src={discountShape}
              alt="Discount"
              fill
              style={{
                filter: "drop-shadow(0px 4px 8px hsla(0, 0%, 3%, 0.25))",
              }}
            />
            <span className="absolute left-[18%] top-[20%] font-bold text-xs @md-card:text-sm @lg-card:text-lg">
              -24%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 @md-card:p-4 pt-1.5 @md-card:pt-3">
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm @md-card:text-lg @lg-card:text-2xl line-clamp-2">
            {title}
          </p>
          <div className="flex gap-3.5 items-center">
            <div className="flex items-center gap-1.5">
              <StarFullIcon className="w-4 h-4 @md-card:w-6 @md-card:h-6 @lg-card:w-7 @lg-card:h-7" />
              <span className="text-xs @md-card:text-sm font-medium">4.7</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CustomerReviewsIcon className="w-4 h-4 @md-card:w-6 @md-card:h-6 @lg-card:w-7 @lg-card:h-7" />
              <span className="text-xs @md-card:text-sm font-medium">228</span>
            </div>
          </div>
          <div className="mt-3">
            <p className="inline text-base @md-card:text-xl @lg-card:text-3xl font-semibold">
              <span>${whole}</span>
              <sup>{fraction}</sup>
            </p>
            <sub className="ml-2 line-through text-foreground/50 text-xs @md-card:text-base @lg-card:text-lg">
              $39.99
            </sub>
          </div>
        </div>
      </CardContent>
      {isOutOfStock && (
        <div className="absolute -inset-0.5 bg-card/50">
          <div className="relative aspect-square">
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center max-w-[230px] w-full">
              <span className="text-xl @md-card:text-2xl @lg-card:text-4xl font-semibold">
                Out of stock
              </span>
              <Button className="mt-4">Stock alert</Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
