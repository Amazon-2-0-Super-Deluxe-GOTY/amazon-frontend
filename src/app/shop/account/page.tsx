"use client";
import React from "react";
import { useState, useEffect } from "react";
import { cn, textAvatar } from "@/lib/utils";
import { useSearchParamsTools } from "@/lib/router";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Slash } from "lucide-react";
import HouseLine from "@/../public/Icons/HouseLine.svg";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AccountSettings } from "@/components/Account/AccountSettings";
import { Wishlist } from "@/components/Account/Wishlist";
import { MyOrders } from "@/components/Account/MyOrders";

export default function AccountPage() {
  const user = {
    avatar: "user",
    fullName: "Qwert Aswdesh",
    email: "qwerty11@gmail.com",
  };
  const isLoggedIn = !!user;
  const headerData = {
    avatarImage: isLoggedIn ? user.avatar : "",
    avatarFallback: isLoggedIn ? textAvatar(user.fullName) : "?",
    title: isLoggedIn ? user.fullName : "Not signed in",
    description: isLoggedIn
      ? "Customer"
      : "Log in to enjoy a more pleasant experience",
  };

  const param = useSearchParamsTools();

  const [isOpenTab, setIsOpenTab] = useState<boolean>(() => {
    const defaultValue = param.get?.("tab");
    if (defaultValue) {
      const value = defaultValue.split("-")[1];
      if (value && value === "open") return true;
    }
    return false;
  });

  const [accountTab, setAccountTab] = useState<string>(() => {
    const defaultValue = param.get?.("tab");
    if (defaultValue) {
      const value = defaultValue.split("-")[0];
      if (value) return value;
    }
    return "";
  });

  const onChangeAccountTab = (name: string) => {
    setAccountTab(name);
    setIsOpenTab(true);
  };

  const onBack = () => {
    setIsOpenTab(false);
  };

  useEffect(() => {
    param.set("tab", accountTab + "-" + (isOpenTab ? "open" : "switch"));
  }, [onChangeAccountTab, onBack]);

  return (
    <main className="flex flex-col items-center w-full px-4">
      <section
        className={cn(
          "w-full flex items-left gap-1",
          isOpenTab && "max-md:hidden"
        )}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <Image src={HouseLine} width={24} height={24} alt="Home" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/account">Account</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <section className="w-full md:pt-5">
        <div className="grid md:grid-cols-[0.5fr_min-content_1fr_1fr] gap-6 w-full p-1 h-full">
          <aside
            className={cn(
              "flex flex-col gap-6 sticky h-max py-6 px-4 min-h-[582px]",
              isOpenTab && "max-md:hidden"
            )}
          >
            <div className="flex gap-4">
              <AvatarNameBlock
                image={headerData.avatarImage}
                fallback={headerData.avatarFallback}
              />
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-semibold">
                  {headerData.title}
                </span>
                <span className="text-sm sm:text-base font-light">
                  {headerData.description}
                </span>
              </div>
            </div>
            <Button
              variant={"tertiary"}
              onClick={() => onChangeAccountTab("orders")}
              className="flex justify-start font-normal text-base"
            >
              My orders
            </Button>
            <Button
              variant={"tertiary"}
              onClick={() => onChangeAccountTab("wishlist")}
              className="flex justify-start font-normal text-base"
            >
              Wishlist
            </Button>
            <Button
              variant={"tertiary"}
              onClick={() => onChangeAccountTab("settings")}
              className="flex justify-start font-normal text-base"
            >
              Account settings
            </Button>
          </aside>
          <Separator orientation="vertical" className="hidden md:block" />
          <div
            className={cn(
              "col-span-2 relative md:block",
              !isOpenTab && "max-md:hidden"
            )}
          >
            <div>
              <Button
                variant={"tertiary"}
                className="pl-2 mb-3 md:hidden"
                onClick={onBack}
              >
                <ChevronLeft />
                <span className="text-base">Back</span>
              </Button>
              {(() => {
                switch (accountTab) {
                  case "settings":
                    return <AccountSettings user={user} />;
                  case "wishlist":
                    return <Wishlist />;
                  case "orders":
                    return <MyOrders />;
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const AvatarNameBlock = ({
  image,
  fallback,
}: {
  image: string;
  fallback: string;
}) => {
  return (
    <Avatar className="w-12 h-12">
      <AvatarImage src={image} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
