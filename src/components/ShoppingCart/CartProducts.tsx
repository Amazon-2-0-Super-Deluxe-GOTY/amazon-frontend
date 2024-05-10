import { useState } from "react";
import Image from "next/image";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import placeholder from "@/../public/Icons/placeholder.svg";
import { useScreenSize } from "@/lib/media";
import { cn } from "@/lib/utils";
import { useStorageCart } from "@/lib/storage";

export const CartProducts = ({
  ChangeCartState,
}: {
  ChangeCartState: (value:string) => void;
}) => {

  const { products, RemoveFromCart } = useStorageCart();
  const onDelete = (value:string) => {
    if(value)
    {
      const product = products.find((item, index) => item.title === value );
      if(product && products.length === 1)
      {
        ChangeCartState("empty");
      }
      RemoveFromCart(product);
    }
  };

  return (
    <div>
    {products.map((product, index) => (
      <div key={index} className={cn("my-2", index%2 !== 0 && "bg-gray-100")} >
        <CartProductCard title={product.title} price={product.price} quantity={product.quantity} onDelete={onDelete} />
      </div>
    ))}
    </div>
  );
};

const CartProductCard = ({
  title,
  price,
  quantity,
  onDelete,
}: {
  title: string;
  price: number;
  quantity: number;
  onDelete: (value:string) => void;
}) => {
  const isDesktop = useScreenSize({ minSize: "md" });

  const priceParts = price.toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];

  const { IncrementQuantity, DecrementQuantity } = useStorageCart();
  const [count, setCount] = useState(quantity);
  const increment = () => { IncrementQuantity({title: title, price: price, quantity: quantity}); setCount((c) => c + 1); };
  const decrement = () => { DecrementQuantity({title: title, price: price, quantity: quantity}); setCount((c) => (c > 1 ? c - 1 : 1)); };

  return (
    <div className="w-full border-0 relative shadow-none ring-1 ring-transparent hover:ring-gray-300 ring-inset transition-all duration-300 rounded-lg">
      <div className={cn("w-full flex p-6", !isDesktop && "p-3")} >
        <div className={cn("w-40 h-full bg-gray-300", !isDesktop && "w-24")}>
          <Image src={placeholder} alt="Placeholder" className="object-cover" />
        </div>
        <div className={cn("w-full pl-6 flex flex-col justify-between", !isDesktop && "pl-2")}>
          <div className="w-full flex justify-between items-center">
            <span className="text-sm">{title}</span>
            <TrashIcon className={cn(!isDesktop && "h-4 w-4")} onClick={() => onDelete(title)} />
          </div>
          <div className="w-full flex justify-end items-end">
            <div className={cn(!isDesktop && "flex justify-end items-end")}>
              <div className={cn("flex justify-end items-center gap-4 mb-2", !isDesktop && "gap-2 mb-0 mr-6 max-sm:mr-2")}>
                <MinusIcon className="w-4 cursor-pointer" onClick={decrement} />
                <span className={cn("text-sm select-none", !isDesktop && "text-xs")}>{count}</span>
                <PlusIcon className="w-4 cursor-pointer" onClick={increment} />
              </div>
              <div className={cn("flex justify-end items-center", !isDesktop && "justify-end items-end")} >
                <div className="flex flex-col mb-3">
                  <div>
                    <span className={cn("text-2xl font-medium text-black", !isDesktop && "text-base")}>${whole}</span>
                    <sup>{fraction}</sup>
                  </div>
                  <sub className={cn("ml-2 line-through text-gray-400 font-medium text-sm", !isDesktop && "text-[10px]")}>$39.99</sub>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
