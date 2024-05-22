import { useState } from "react";
import Image from "next/image";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import placeholder from "@/../public/Icons/placeholder.svg";
import { cn } from "@/lib/utils";
import { useStorageCart } from "@/lib/storage";

export const CartProducts = () => {
  const { products } = useStorageCart();

  return (
    <div>
    {products.map((product, index) => (
      <div key={product.id} className={cn("my-2", index%2 !== 0 && "bg-gray-100")} >
        <CartProductCard id={product.id} title={product.title} price={product.price} quantity={product.quantity} />
      </div>
    ))}
    </div>
  );
};

const CartProductCard = ({
  id, 
  title,
  price,
  quantity,
}: {
  id: string;
  title: string;
  price: number;
  quantity: number;
}) => {

  const priceParts = price.toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];

  const { removeFromCart, incrementQuantity, decrementQuantity } = useStorageCart();
  const [count, setCount] = useState(quantity);
  const increment = () => { incrementQuantity(id); setCount((c) => c + 1); };
  const decrement = () => { decrementQuantity(id); setCount((c) => (c > 1 ? c - 1 : 1)); };
  const onDelete = () => { removeFromCart(id); };

  return (
    <div className="w-full border-0 relative shadow-none ring-1 ring-transparent hover:ring-gray-300 ring-inset transition-all duration-300 rounded-lg">
      <div className="w-full flex p-6 max-md:p-3" >
        <div className="w-40 h-full bg-gray-300 max-md:w-24" >
          <Image src={placeholder} alt="Placeholder" className="object-cover" />
        </div>
        <div className="w-full pl-6 flex flex-col justify-between max-md:pl-2" >
          <div className="w-full flex justify-between items-center">
            <span className="text-xl max-md:text-sm">{title}</span>
            <TrashIcon className="max-md:h-4 max-md:w-4" onClick={onDelete} />
          </div>
          <div className="w-full flex justify-end items-end">
            <div className="max-md:flex max-md:justify-end max-md:items-end max-md:gap-3" >
              <div className="flex justify-end items-center gap-4 md:mb-2 max-md:gap-2 max-md:mr-6 max-sm:mr-2" >
                <MinusIcon className="w-4 cursor-pointer" onClick={decrement} />
                <span className="text-sm select-none max-md:text-xs" >{count}</span>
                <PlusIcon className="w-4 cursor-pointer" onClick={increment} />
              </div>
              <div className="flex justify-end items-center max-md:justify-end max-md:items-end" >
                <div className="flex max-md:flex-col md:justify-end md:items-end">
                  <div>
                    <span className="text-2xl font-medium text-black max-md:text-base" >${whole}</span>
                    <sup>{fraction}</sup>
                  </div>
                  <sub className="ml-2 line-through text-gray-400 font-medium text-sm max-md:text-[10px]" >$39.99</sub>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
