import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart, type CartItem } from "@/api/products";
import { MinusIcon, PlusIcon, TrashIcon } from "../Shared/Icons";
import { splitPrice } from "@/lib/products";
import { useDebounce } from "use-debounce";

export const CartProducts = ({ cartItems }: { cartItems: CartItem[] }) => {
  const { updateCartItemQuantity, deleteCartItems } = useCart();

  const updateQuantity = (cartItemId: string) => (newQuantity: number) => {
    updateCartItemQuantity.mutate({ cartItemId, quantity: newQuantity });
  };

  const deleteItem = (cartItemId: string) => () => {
    deleteCartItems.mutate({ cartItemIds: [cartItemId] });
  };

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id} className="my-2">
          <CartProductCard
            cartItem={item}
            updateQuantity={updateQuantity(item.id)}
            deleteItem={deleteItem(item.id)}
          />
        </div>
      ))}
    </div>
  );
};

const CartProductCard = ({
  updateQuantity,
  deleteItem,
  cartItem,
}: {
  cartItem: CartItem;
  updateQuantity: (newQuantity: number) => void;
  deleteItem: () => void;
}) => {
  // const { removeFromCart, incrementQuantity, decrementQuantity } = useStorageCart();
  const [count, setCount] = useState(cartItem.quantity);
  const increment = () =>
    setCount(
      count < cartItem.product.quantity ? count + 1 : cartItem.product.quantity
    );
  const decrement = () => setCount(count > 1 ? count - 1 : 1);

  const [countDebounced] = useDebounce(count, 300);

  useEffect(() => {
    if (countDebounced !== cartItem.quantity) {
      updateQuantity(countDebounced);
    }
  }, [countDebounced, cartItem.quantity]);

  const price = cartItem.product.discountPercent
    ? cartItem.product.discountPrice
    : cartItem.product.price;
  const totalPrice = count * price;

  const priceParts = splitPrice(price);
  const totalPriceParts = splitPrice(totalPrice);

  const onDelete = deleteItem;

  return (
    <div className="hover:bg-secondary-light transition-colors rounded-lg">
      <div className="w-full flex max-md:gap-2 gap-6 p-6 max-md:p-3">
        <div className="w-24 lg:w-40 flex-1 basis-40 aspect-square relative">
          <Image
            src={cartItem.product.imageUrl}
            alt={cartItem.product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full flex flex-col justify-between">
          <div className="w-full flex justify-between items-center">
            <span className="text-xl max-md:text-sm">
              {cartItem.product.name}
            </span>
            <button onClick={onDelete}>
              <TrashIcon className="max-md:h-4 max-md:w-4 stroke-3" />
            </button>
          </div>
          <div className="w-full flex justify-end items-end">
            <div className="max-md:flex max-md:justify-end max-md:items-end max-md:gap-3">
              <div className="flex justify-end items-center gap-4 md:mb-2 max-md:gap-2 max-md:mr-6 max-sm:mr-2">
                <button onClick={decrement}>
                  <MinusIcon className="w-4 stroke-3" />
                </button>
                <span className="text-sm select-none max-md:text-xs">
                  {count}
                </span>
                <button onClick={increment}>
                  <PlusIcon className="w-4 stroke-3" />
                </button>
              </div>
              <div className="flex justify-end items-center max-md:justify-end max-md:items-end">
                <div className="flex max-md:flex-col justify-end items-end">
                  <p className="text-2xl font-medium max-md:text-base">
                    <span>${totalPriceParts.whole}</span>
                    <sup>{totalPriceParts.fraction}</sup>
                  </p>
                  <div className="inline-flex gap-1 ml-2 text-halftone font-medium text-sm max-md:text-xs">
                    <span>{cartItem.quantity}</span>
                    <span>x</span>
                    <p>
                      <span>${priceParts.whole}</span>
                      <sup>{priceParts.fraction}</sup>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
