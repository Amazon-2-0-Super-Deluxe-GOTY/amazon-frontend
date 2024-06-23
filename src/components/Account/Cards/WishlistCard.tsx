"use client";
import { AlertDialog } from "@/components/Admin/AlertDialog";
import { RemoveFromWishListModal } from "../Popups/WishlistModals";
import { ProductShort } from "@/api/products";
import { ProductCard } from "@/components/Product/ProductCard";
import { useModal } from "@/components/Shared/Modal";
import { Button } from "@/components/ui/button";

export const WishlistCard = ({
  product,
  removeWishlistItem,
}: {
  product: ProductShort;
  removeWishlistItem: (productId: string) => void;
}) => {
  const { showModal } = useModal();

  const onRemove = () => {
    showModal({
      component: AlertDialog,
      props: {
        title: "Are you sure?",
        text: "This action will remove this item from your wishlist.",
        buttonCloseText: "Cancel",
        buttonConfirmText: "Remove",
        colorVariant: "destructive",
      },
    }).then((res) => {
      if (res.action === "CONFIRM") {
        removeWishlistItem(product.id);
      }
    });
  };

  return (
    <div className="relative h-full">
      <div className="absolute right-3 top-3 z-10">
        <Button
          variant={"secondary"}
          size={"sm"}
          className="bg-background h-8 max-md:text-sm px-5 py-3 md:px-4 md:py-2"
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
      <ProductCard product={product} />
    </div>
  );
};
