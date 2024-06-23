import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart, type CartItem } from "@/api/products";
import { MinusIcon, PlusIcon, TrashIcon } from "../Shared/Icons";
import { splitPrice } from "@/lib/products";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

export const CartProducts = ({
  cartItems,
  closeModal,
}: {
  cartItems: CartItem[];
  closeModal: () => void;
}) => {
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
            closeModal={closeModal}
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
  closeModal,
}: {
  cartItem: CartItem;
  updateQuantity: (newQuantity: number) => void;
  deleteItem: () => void;
  closeModal: () => void;
}) => {
  const onUpdateQuantity = useDebouncedCallback(
    (newQuantity: number) => updateQuantity(newQuantity),
    300
  );

  const [count, setCount] = useState(cartItem.quantity);

  const canIncrement = count < cartItem.product.quantity;
  const canDecrement = count > 1;

  const increment = () => {
    if (!canIncrement) return;
    const newQuantity =
      count < cartItem.product.quantity ? count + 1 : cartItem.product.quantity;
    setCount(newQuantity);
    onUpdateQuantity(newQuantity);
  };
  const decrement = () => {
    if (!canDecrement) return deleteItem();
    const newQuantity = count > 1 ? count - 1 : 1;
    setCount(newQuantity);
    onUpdateQuantity(newQuantity);
  };

  useEffect(() => {
    setCount(cartItem.quantity);
  }, [cartItem.quantity]);

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
        <Image
          src={cartItem.product.imageUrl}
          alt={cartItem.product.name}
          width={160}
          height={160}
          className="object-cover rounded-sm aspect-square max-sm:w-20"
          sizes="(max-width: 640px) 80px, 150px"
        />
        <div className="w-full flex flex-col justify-between">
          <div className="w-full flex justify-between items-center">
            <Link
              href={`/product/${cartItem.product.slug}`}
              onClick={closeModal}
            >
              <p className="text-xl max-md:text-sm max-w-[820px] line-clamp-2">
                {cartItem.product.name}
              </p>
            </Link>
            <button onClick={onDelete}>
              <TrashIcon className="max-md:h-4 max-md:w-4 stroke-3" />
            </button>
          </div>
          <div className="w-full flex justify-end items-end">
            <div className="max-md:flex max-md:justify-end max-md:items-end max-md:gap-3">
              <div className="flex justify-end items-center gap-4 md:mb-2 max-md:gap-2 max-md:mr-6 max-sm:mr-2">
                <button onClick={decrement} className="disabled:opacity-20">
                  <MinusIcon className="w-4 stroke-3" />
                </button>
                <span className="text-sm select-none max-md:text-xs">
                  {count}
                </span>
                <button
                  onClick={increment}
                  disabled={!canIncrement}
                  className="disabled:opacity-20"
                >
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
