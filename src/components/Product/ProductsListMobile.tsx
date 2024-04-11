import Link from "next/link";
import { ProductCard } from "./ProductCard";

export const ProductsListMobile = ({
  products,
}: {
  products: { title: string; price: number }[];
}) => {
  return (
    <div className="grid grid-cols-2 auto-rows-max gap-4 place-items-center">
      {products.map((product, index) => (
        <Link href={`/product/${index + 1}`} className="w-full" key={index}>
          <ProductCard title={product.title} price={product.price} />
        </Link>
      ))}
    </div>
  );
};
