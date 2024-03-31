import { ChevronRightIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaQueryCSS } from "../MediaQuery";

export const ProductOrderCard = () => {
  const [count, setCount] = useState(1);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => (c > 1 ? c - 1 : 1));

  return (
    <Card className="bg-gray-200">
      <CardHeader className="space-y-3">
        <div>
          <span className="text-3xl font-bold">
            $24<sup>99</sup>
          </span>
          <sub className="ml-2 line-through text-gray-400 text-lg">$39.99</sub>
        </div>
        <MediaQueryCSS minSize="lg">
          <hr className="border-black mb-3" />
          <ul className="space-y-1">
            <li className="flex justify-between text-base">
              <span>Status</span>
              <span>In stock</span>
            </li>
            <InfoLabel title="Delivery" />
            <InfoLabel title="Payment methods" />
            <InfoLabel title="Guarantee" />
            <InfoLabel title="Returns" />
          </ul>
        </MediaQueryCSS>
        <hr className="border-black" />
        <div className="flex justify-between items-center py-1">
          <span className="text-base">Quantity</span>
          <div className="flex items-center gap-4">
            <MinusIcon className="w-4 cursor-pointer" onClick={decrement} />
            <span className="text-sm select-none">{count}</span>
            <PlusIcon className="w-4 cursor-pointer" onClick={increment} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 lg:grid-cols-1 gap-2">
        <Button>Add to cart</Button>
        <Button>Buy now</Button>
        <Button variant={"outline"} className="col-span-2 lg:col-span-1">
          Add to wish list
        </Button>
      </CardContent>
    </Card>
  );
};

const InfoLabel = ({ title }: { title: string }) => {
  return (
    <li className="flex justify-between items-center py-1 cursor-pointer">
      <span className="text-base">{title}</span>
      <ChevronRightIcon className="w-4 h-4" />
    </li>
  );
};
