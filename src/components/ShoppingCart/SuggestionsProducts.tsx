import { ProductCard } from "../Product/ProductCard";
import type { ProductShort } from "@/api/products";

export function SuggestionsProducts({
  products,
}: {
  products: ProductShort[];
}) {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
