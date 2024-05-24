"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, StarIcon } from "lucide-react";
import placeholder from "@/../public/Icons/placeholder.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const WishlistCard = ({
  code,
  title,
  price,
  quantity,
  removeWishlistItem,
}: {
  code: string;
  title: string;
  price: number;
  quantity?: number;
  removeWishlistItem: (code: string) => void;
}) => {
  const priceParts = price.toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];
  const isOutOfStock = quantity === 0;

  return (
    <Card className="max-w-sm w-full border-0 relative shadow-none before:ring-1 before:ring-gray-300 before:ring-inset before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:absolute before:inset-0 before:rounded-[inherit]">
      <CardHeader className="pb-0">
        <div className="relative aspect-square">
          <Link href={`/product/${code}`}>
            <Image src={placeholder} fill={true} alt="Placeholder" />
          </Link>
          <div className="absolute top-6 left-0 rounded-e-xl bg-gray-100 px-2 pl-4 pr-6">
            -24%
          </div>
          <Button 
            variant={"outline"} 
            className="absolute right-[-6px] top-[-6px] py-0 px-[16px] font-semibold"
            onClick={() => removeWishlistItem(code)}
          >Remove</Button>
        </div>
      </CardHeader>
      <CardContent>
      <Link href={`/product/${code}`}>
        <div className="mt-3 flex flex-col justify-center items-center">
          <span className="text-lg line-clamp-2">{title}</span>
          <div className="pb-3 flex gap-3 items-center">
            <div className="flex items-center gap-1">
              <StarIcon width={16} height={16} />
              <span className="text-sm">4.7</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle width={16} height={16} />
              <span className="text-sm">228</span>
            </div>
          </div>
          <div>
            <span className="text-xl">${whole}</span>
            <sup>{fraction}</sup>
            <sub className="ml-2 line-through text-gray-400">$39.99</sub>
          </div>
        </div>
      </Link>
      </CardContent>
      {isOutOfStock && (
        <div className="absolute inset-0 bg-gray-200/50">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center max-w-[230px] w-full">
            <span className="xl:text-xl text-base">Out of Stock</span>
            <Button className="mt-4 text-wrap xl:text-sm text-xs">Notify when available</Button>
          </div>
        </div>
      )}
    </Card>
  );
};
