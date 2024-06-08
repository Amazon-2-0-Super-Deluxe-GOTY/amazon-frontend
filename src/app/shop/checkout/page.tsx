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

  const isLoggedIn = !!user;
  const headerData = {
    firstName: isLoggedIn ? user.firstName : "",
    secondName: isLoggedIn ? user.secondName : "",
    email: isLoggedIn ? user.email : "",
    checkout: checkout,
  };

  const priceParts = (headerData.checkout.totalCost).toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];

  const param = useSearchParamsTools();

  return (
    <main className="grid grid-cols-[57.6875fr_40.8125fr] w-full h-full gap-6">
      <section className="w-full flex flex-col gap-6">
        <div className="w-full grid grid-cols-2">
          <span className="text-2xl md:text-3xl">Logo</span>
          <span className="text-2xl md:text-3xl">Checkout</span>
        </div>
        <Separator />
        {/* <CheckoutForm /> */}
      </section>
      <section className="w-full">
        <div className="w-full flex flex-col gap-4 rounded-lg bg-gray-100 p-6">
          <span className="text-xl md:text-2xl">Summary</span>
          <Separator />
          <div>
            <ScrollArea className="mr-[-12px]">
              <div className="max-h-[410px]">
                {headerData.checkout.products.map((item, i) => {
                  return(
                    <CheckoutProductCard key={i} name={item.title} quantity={item.quantity} price={item.price} />
                  );
                })}
              </div>
            </ScrollArea>
          </div>
          <Separator />
          <div className="w-full flex justify-end items-center gap-6">
            <span className="text-xl md:text-2xl">Total:</span>
            <div>
              <span className="text-xl md:text-3xl font-medium text-black">${whole}</span>
              <sup className="text-xs md:text-lg font-medium text-black">{fraction}</sup>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center gap-2">
            <Button>Place order</Button>
            <span className="w-full text-center text-sm md:text-base">By clicking “Place order” you agree with <Link href={"/legal-notice?tab=terms-open"} className="text-blue-400 font-semibold">PERRY Terms and Conditions</Link></span>
          </div>
        </div>
      </section>
    </main>
  );
}
