"use client"
import React from "react";
import { CheckoutForm } from "@/components/forms/shop/checkout/CheckoutForm";
import { useRouter } from "next/navigation";
import { useUser } from "@/api/users";
import { useCart } from "@/api/products";
import { OrderProduct } from "@/api/orders";

export default function CheckOut() {
  const router = useRouter();
  const cart = useCart().data;
  const user = useUser().user;
  if(!user || !cart) return null;
  const checkout = { 
    products: cart.cartItems.reduce<OrderProduct[]>((res, item) => [
      ...res, {
        name: item.product.name,
        productId: item.product.id,
        quantity: item.product.quantity,
        price: item.product.price,
        totalPrice: item.product.price * item.product.quantity,
      }
    ], []),  
    totalPrice: cart.cartItems.reduce((sum, item) => {
      return sum + item.product.price * item.product.quantity;
    }, 0), 
  };
  const priceParts = (checkout.totalPrice)?.toFixed(2).split(".") ?? [0,0];
  const whole = priceParts[0];
  const fraction = priceParts[1];

  const headerData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    checkout: checkout,
    whole: whole,
    fraction: fraction,
  };

  const onSubmit = () => {
    router.push("/orders");
  };

  return (
    <main className="m-4 md:m-6 flex lg:justify-center">
      <CheckoutForm headerData={headerData} onSubmit={onSubmit} />
    </main>
  );
}
