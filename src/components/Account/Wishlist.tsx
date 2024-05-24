import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { WishlistCard } from "./Cards/WishlistCard";
import { useState } from "react";

const wishlistProducts = Array.from({ length: 9 }).map((_, index) => ({
  code: index.toString(),
  title: `Product ${index + 1}`,
  price: 39.99,
}));

export const Wishlist = () => {
  const removeWishlistItem = (code:string) => {
    wishlistProducts
  };

  const [searchText, setSearchText] = useState<string>("");
  const handleSearchTextChange = (value: string) => {
    setSearchText(value);
  };
  
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Wishlist</h1>
        <div className="flex w-full max-w-80">
          <Input placeholder="Search..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearchTextChange(e.target.value)
            }
          />
          <SearchIcon className="absolute top-2 right-2" />
        </div>
      </div>
      <Separator />
      <div className="w-full grid grid-cols-5 py-6">
        {wishlistProducts.filter((v) => v.title.toLowerCase().includes(searchText)).map((product, index) => (
          <WishlistCard key={index} code={product.code} title={product.title} price={product.price} removeWishlistItem={removeWishlistItem} />
        ))}
      </div>
    </div>
  );
};