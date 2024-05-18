import Link from "next/link";
import { ProductCard } from "../Product/ProductCard";

export function SuggestionsProducts({
  products,
}: {
  products: { title: string; price: number }[];
}) {

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4">
        {products.map((product, index) => (
          <div
            key={index}
          >
            <Link href={`/product/${index + 1}`} >
              <ProductCard title={product.title} price={product.price} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
