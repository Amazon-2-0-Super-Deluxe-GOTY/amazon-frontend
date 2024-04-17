"use client";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { useExpandableList } from "@/lib/utils";
import { Button } from "../ui/button";

export const ProductsListMobile = ({
  products,
  maxSize,
}: {
  products: { title: string; price: number }[];
  maxSize?: number;
}) => {
  const { items, isExpandable, isExpanded, onExpand, onHide } =
    useExpandableList({
      maxItems: maxSize ?? products.length,
      items: products,
    });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 auto-rows-max gap-4 place-items-center">
      {items.map((product, index) => (
        <Link href={`/product/${index + 1}`} className="w-full" key={index}>
          <ProductCard title={product.title} price={product.price} />
        </Link>
      ))}
      {isExpandable && (
        <div className="flex justify-center col-span-2">
          {isExpanded ? (
            <Button variant={"outline"} onClick={onHide}>
              Hide
            </Button>
          ) : (
            <Button variant={"outline"} onClick={onExpand}>
              View more
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
