"use client";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { useExpandableList } from "@/lib/utils";
import { Button } from "../ui/button";
import { ProductShort } from "@/api/products";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export const ProductsListMobile = ({
  products,
  maxSize,
  isLoading,
}: {
  products: ProductShort[];
  maxSize?: number;
  isLoading: boolean;
}) => {
  const { items, isExpandable, isExpanded, onExpand, onHide } =
    useExpandableList({
      maxItems: maxSize ?? products.length,
      items: products,
    });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 auto-rows-max gap-4 place-items-center">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        : items.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      {isExpandable && (
        <div className="flex justify-center col-span-2 sm:col-span-3">
          {isExpanded ? (
            <Button variant={"secondary"} onClick={onHide}>
              Hide
            </Button>
          ) : (
            <Button variant={"secondary"} onClick={onExpand}>
              View more
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
