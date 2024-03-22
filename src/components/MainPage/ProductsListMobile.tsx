import { ProductCard } from "../Product/ProductCard";

export const ProductsListMobile = ({
  products,
}: {
  products: { title: string; price: number }[];
}) => {
  return (
    <div className="grid grid-cols-2 auto-rows-max gap-4">
      {products.map((product, index) => (
        <ProductCard key={index} title={product.title} price={product.price} />
      ))}
    </div>
  );
};
