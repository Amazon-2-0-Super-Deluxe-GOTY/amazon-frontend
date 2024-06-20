"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, StarIcon } from "lucide-react";
import placeholder from "@/../public/Icons/placeholder.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RemoveFromWishListModal } from "../Popups/WishlistModals";
import { ProductShort } from "@/api/products";

export const WishlistCard = ({
  product,
  removeWishlistItem,
}: {
  product: ProductShort
  removeWishlistItem: (productId: string) => void;
}) => {
  const code = product.id;
  const priceParts = product.discountPercent ? product.discountPrice.toFixed(2).split(".") : product.price.toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];
  const isOutOfStock = product.quantity === 0;

  return (
    <Link href={`/product/${product.slug}`} className="contents">
      <Card className="max-w-sm w-full border-0 relative shadow-none before:ring-1 before:ring-gray-300 before:ring-inset before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:absolute before:inset-0 before:rounded-[inherit]">
        <CardHeader className="pb-0">
          <div className="relative aspect-square">
            <Image src={product.productImages[0].imageUrl ?? placeholder} fill={true} alt="Placeholder" className="object-cover" />
            {product.discountPercent && 
              <div className="absolute top-6 left-0 rounded-e-xl bg-gray-100 px-2 pl-4 pr-6">
                -{product.discountPercent}%
              </div>
            }
            <div className="absolute right-[-8px] top-[-8px]">
              <RemoveFromWishListModal onRemoveItem={() => removeWishlistItem(code)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-3 flex flex-col justify-center items-center">
            <span className="text-lg line-clamp-2">{product.name}</span>
            <div className="pb-3 flex gap-3 items-center">
              <div className="flex items-center gap-1">
                <StarIcon width={16} height={16} />
                <span className="text-sm">{product.generalRate}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle width={16} height={16} />
                <span className="text-sm">{product.reviewsCount}</span>
              </div>
            </div>
            <div>
              <span className="text-xl">${whole}</span>
              <sup>{fraction}</sup>
              {product.discountPercent && <sub className="ml-2 line-through text-gray-400">${product.price.toFixed(2)}</sub>}
            </div>
          </div>
        </CardContent>
        {isOutOfStock && (
          <div className="absolute inset-0 bg-gray-200/50">
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center max-w-[230px] w-full">
              <span className="text-base xl:text-xl">Out of Stock</span>
              <Button className="mt-4 text-wrap text-xs xl:text-sm">Notify when available</Button>
            </div>
          </div>
        )}
      </Card>
    </Link>
  );
};
