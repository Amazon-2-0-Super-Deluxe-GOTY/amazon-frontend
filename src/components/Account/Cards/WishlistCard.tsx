"use client";
import { RemoveFromWishListModal } from "../Popups/WishlistModals";
import { ProductShort } from "@/api/products";
import { ProductCard } from "@/components/Product/ProductCard";

export const WishlistCard = ({
  product,
  removeWishlistItem,
}: {
  product: ProductShort;
  removeWishlistItem: (productId: string) => void;
}) => {
  return (
    <div className="relative">
      <div className="absolute right-3 top-3 z-10">
        <RemoveFromWishListModal
          onRemoveItem={() => removeWishlistItem(product.id)}
        />
      </div>
      <ProductCard product={product} />
    </div>
  );
};
