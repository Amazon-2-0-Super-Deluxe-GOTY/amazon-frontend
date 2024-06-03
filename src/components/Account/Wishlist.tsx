import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { WishlistCard } from "./Cards/WishlistCard";
import { useState } from "react";

export const Wishlist = () => {

  const [wishlistProducts, setWishlistProducts] = useState<{code:string, title:string, price:number}[]>(Array.from({ length: 9 }).map((_, index) => ({
    code: index.toString(),
    title: `Product ${index + 1}`,
    price: 39.99,
  })));

  const removeWishlistItem = (code:string) => {
    setWishlistProducts(wishlistProducts.filter((item) => item.code !== code));
  };

  const [searchText, setSearchText] = useState<string>("");
  const handleSearchTextChange = (value: string) => {
    setSearchText(value);
  };
  
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center gap-3">
        <h1 className="text-2xl md:text-3xl">Wishlist</h1>
        <div className="flex w-full max-w-80">
          <Input placeholder="Search..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearchTextChange(e.target.value)
            }
          />
          <SearchIcon className="absolute md:top-2 top-12 right-2" />
        </div>
      </div>
      <Separator />
      <div className="w-full grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 py-6">
        {wishlistProducts.filter((v) => v.title.toLowerCase().includes(searchText)).map((product, index) => (
          <WishlistCard key={index} code={product.code} title={product.title} price={product.price} removeWishlistItem={removeWishlistItem} />
        ))}
      </div>
    </div>
  );
};