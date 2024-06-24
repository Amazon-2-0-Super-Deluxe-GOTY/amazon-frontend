import { SearchIcon } from "../Shared/Icons";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { WishlistCard } from "./Cards/WishlistCard";
import { useState } from "react";
import { useWishlist } from "@/api/wishlist";
import { WishlistCardSkeleton } from "./Cards/AccountSkeleton";

export const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const removeWishlistItem = (productId: string) => {
    const item = wishlist.data?.find((item) => item.id === productId);
    if (!item) return null;
    removeFromWishlist.mutateAsync({ productIds: [item.id] });
  };

  const [searchText, setSearchText] = useState<string>("");
  const handleSearchTextChange = (value: string) => {
    setSearchText(value);
  };

  return (
    <div className="flex flex-col gap-3 min-h-[614px]">
      <div className="flex justify-between items-center gap-6">
        <h1 className="text-2xl md:text-3xl font-semibold">Wishlist</h1>
        <div className="flex w-full max-w-80 relative">
          <Input
            placeholder="Search..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearchTextChange(e.target.value)
            }
          />
          <SearchIcon className="absolute right-2 translate-y-1/3" />
        </div>
      </div>
      <Separator />
      {wishlist.isLoading ? (
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 py-6 gap-2">
          {Array.from({ length: 8 }, (_, i) => (
            <WishlistCardSkeleton key={i} />
          ))}
        </div>
      ) : wishlist.data?.length! > 0 ? (
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 py-6 gap-2">
          {wishlist.data
            ?.filter((v) => v.name.toLowerCase().includes(searchText))
            .map((product, index) => (
              <WishlistCard
                key={index}
                product={product}
                removeWishlistItem={removeWishlistItem}
              />
            ))}
        </div>
      ) : (
        <div className="w-full  flex justify-center items-center">
          <span className="text-lg md:text-xl text-center">
            There are no items in your wishlist.
          </span>
        </div>
      )}
    </div>
  );
};
