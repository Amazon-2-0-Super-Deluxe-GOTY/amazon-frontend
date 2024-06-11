"use client"
import React from "react";
import { useState, useEffect } from "react";
import { cn, textAvatar } from "@/lib/utils";
import { useSearchParamsTools } from "@/lib/router";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Slash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckoutProductCard } from "@/components/Checkout/CheckoutProductCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckoutForm } from "@/components/forms/shop/checkout/CheckoutForm";

const products = Array.from({ length: 9 }).map((_, index) => ({
  code: index.toString(),
  title: `Product ${index + 1}`,
  quantity: index + 1,
  price: (index + 1) * 23.5,
}));

export default function CheckOut({
  params,
} : {
  params: {checkoutId:string};
}) {
  const user = { firstName: "Qwerty", secondName: "Aswd", email: "qwerty228@gmail.com" };
  const checkout = { id: params.checkoutId, products: products, totalCost: products.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0), };

  const priceParts = (checkout.totalCost).toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];

  const isLoggedIn = !!user;
  const headerData = {
    firstName: isLoggedIn ? user.firstName : "",
    secondName: isLoggedIn ? user.secondName : "",
    email: isLoggedIn ? user.email : "",
    checkout: checkout,
    whole: whole,
    fraction: fraction,
  };

  return (
    <main className="px-4 md:px-6 pb-4">
      <CheckoutForm headerData={headerData} />
    </main>
  );
}
