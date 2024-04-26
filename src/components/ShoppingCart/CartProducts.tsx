import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, MinusIcon, PlusIcon, StarIcon, Trash2Icon, TrashIcon } from "lucide-react";
import placeholder from "@/../public/Icons/placeholder.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";

export const CartProducts = ({
  products,
}: {
  products: { title: string; price: number }[];
}) => {

  return (
    <div>
    {products.map((product, index) => (
      <div key={index}>
        <CartProductCard title={product.title} price={product.price} />
      </div>
    ))}
    </div>
  );
};

const CartProductCard = ({
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

  const [count, setCount] = useState(1);
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => (c > 1 ? c - 1 : 1));

  return (
    <Card className="w-full border-0 relative shadow-none before:ring-1 before:ring-gray-300 before:ring-inset before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:absolute before:inset-0 before:rounded-[inherit]">
      <CardContent>
        <div className="w-full flex pt-6">
          <div className="w-40 h-full bg-gray-300 ">
            <Image src={placeholder} alt="Placeholder" className="object-cover" />
          </div>
          <div className="w-full pl-6">
            <div className="w-full flex justify-between items-start">
              <span>{title}</span>
              <Button variant={"ghost"}>
                <TrashIcon />
              </Button>
            </div>
            <div className="flex h-full justify-end items-end pb-12">
              <div className="">
                <div className="">

                <div>
                  <div className="flex items-center gap-4">
                    <MinusIcon className="w-4 cursor-pointer" onClick={decrement} />
                    <span className="text-sm select-none">{count}</span>
                    <PlusIcon className="w-4 cursor-pointer" onClick={increment} />
                  </div>
                </div>
                <div>
                  <span className="text-xl">${whole}</span>
                  <sup>{fraction}</sup>
                  <sub className="ml-2 line-through text-gray-400">$39.99</sub>
                </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
